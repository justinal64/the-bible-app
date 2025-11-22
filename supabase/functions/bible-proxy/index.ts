import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const API_BIBLE_BASE_URL = "https://api.scripture.api.bible/v1"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const apiKey = Deno.env.get('BIBLE_API_KEY')
    if (!apiKey) {
      throw new Error('BIBLE_API_KEY is not set')
    }

    // Get the path and params from the request body (sent by supabase.functions.invoke)
    const { path, params } = await req.json()

    // Construct the query string from params object
    const queryString = new URLSearchParams(params).toString()
    // Use the correct REST API endpoint
    const targetUrl = `https://rest.api.bible/v1${path}?${queryString}`

    console.log(`Proxying request to: ${targetUrl}`)
    console.log(`Using API key: ${apiKey.substring(0, 5)}...`)

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'api-key': apiKey,
        'Accept': 'application/json',
      },
    })

    const data = await response.json()

    // Parse API.Bible response if it contains content
    let parsedData = data;
    if (data.data && data.data.content) {
      const content = data.data.content;
      const verseMap = new Map<string, string>();

      // Recursive function to extract text grouped by verseId
      const extractText = (node: any) => {
        if (node.type === 'text' && node.attrs?.verseId) {
          const currentText = verseMap.get(node.attrs.verseId) || '';
          verseMap.set(node.attrs.verseId, currentText + node.text);
        }

        if (node.items) {
          node.items.forEach(extractText);
        }
      };

      content.forEach(extractText);

      // Convert map to array format expected by frontend
      // We return a simplified structure: { verseId: text } or an array of objects
      // Let's return the array of objects to match what the frontend expects
      const verses = Array.from(verseMap.entries()).map(([verseId, text]) => {
        const verseNum = parseInt(verseId.split('.').pop() || '0', 10);
        return {
          id: verseId,
          verse: verseNum,
          text: text.trim(),
        };
      }).sort((a, b) => a.verse - b.verse);

      parsedData = { data: verses };
    }

    return new Response(JSON.stringify(parsedData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: response.status,
    })
  } catch (error) {
    console.error('Error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 500,
    })
  }
})
