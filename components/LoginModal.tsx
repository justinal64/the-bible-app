import React, { useState } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { BlurView } from 'expo-blur';
import { X, Mail, Lock, AlertCircle, User } from 'lucide-react-native';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';
import { GlassCard } from './ui/GlassCard';

interface LoginModalProps {
  visible: boolean;
  onClose: () => void;
}

export function LoginModal({ visible, onClose }: LoginModalProps) {
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!email || !password || (!isLogin && (!firstName || !lastName))) {
      setError('Please fill in all fields');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const result = isLogin
        ? await signIn(email, password)
        : await signUp(email, password, firstName, lastName);

      if (result.error) {
        setError(result.error.message);
      } else {
        // Success
        onClose();
        // Reset form
        setEmail('');
        setPassword('');
        setFirstName('');
        setLastName('');
        setError(null);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 justify-center items-center bg-black/60 px-4">
          <GlassCard style={{ width: '100%', maxWidth: 400, padding: 0, overflow: 'hidden' }}>
            {/* Header */}
            <View className="flex-row justify-between items-center p-4 border-b border-white/10">
              <Text className="text-xl font-bold text-white">
                {isLogin ? 'Welcome Back' : 'Create Account'}
              </Text>
              <TouchableOpacity onPress={onClose} className="p-1">
                <X size={24} color="#A0A0B0" />
              </TouchableOpacity>
            </View>

            <View className="p-6">
              {/* Error Message */}
              {error && (
                <View className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 flex-row items-center mb-4">
                  <AlertCircle size={20} color="#FF4B4B" />
                  <Text className="text-red-200 ml-2 flex-1 text-sm">{error}</Text>
                </View>
              )}

              {!isLogin && (
                <View className="flex-row gap-3 mb-4">
                  <View className="flex-1">
                    <Text className="text-gray-400 mb-2 text-sm font-medium">First Name</Text>
                    <View className="flex-row items-center bg-white/5 border border-white/10 rounded-xl px-4 h-12 focus:border-gold/50">
                      <User size={20} color="#A0A0B0" />
                      <TextInput
                        className="flex-1 ml-3 text-white text-base"
                        placeholder="John"
                        placeholderTextColor="#666"
                        value={firstName}
                        onChangeText={setFirstName}
                      />
                    </View>
                  </View>
                  <View className="flex-1">
                    <Text className="text-gray-400 mb-2 text-sm font-medium">Last Name</Text>
                    <View className="flex-row items-center bg-white/5 border border-white/10 rounded-xl px-4 h-12 focus:border-gold/50">
                      <TextInput
                        className="flex-1 ml-3 text-white text-base"
                        placeholder="Doe"
                        placeholderTextColor="#666"
                        value={lastName}
                        onChangeText={setLastName}
                      />
                    </View>
                  </View>
                </View>
              )}

              {/* Email Input */}
              <View className="mb-4">
                <Text className="text-gray-400 mb-2 text-sm font-medium">Email</Text>
                <View className="flex-row items-center bg-white/5 border border-white/10 rounded-xl px-4 h-12 focus:border-gold/50">
                  <Mail size={20} color="#A0A0B0" />
                  <TextInput
                    className="flex-1 ml-3 text-white text-base"
                    placeholder="name@example.com"
                    placeholderTextColor="#666"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />
                </View>
              </View>

              {/* Password Input */}
              <View className="mb-6">
                <Text className="text-gray-400 mb-2 text-sm font-medium">Password</Text>
                <View className="flex-row items-center bg-white/5 border border-white/10 rounded-xl px-4 h-12 focus:border-gold/50">
                  <Lock size={20} color="#A0A0B0" />
                  <TextInput
                    className="flex-1 ml-3 text-white text-base"
                    placeholder="••••••••"
                    placeholderTextColor="#666"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                  />
                </View>
              </View>

              {/* Submit Button */}
              <Button
                title={loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
                onPress={handleSubmit}
                variant="primary"
                size="lg"
                disabled={loading}
              />

              {/* Toggle Mode */}
              <View className="flex-row justify-center mt-6">
                <Text className="text-gray-400">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                </Text>
                <TouchableOpacity onPress={() => {
                  setIsLogin(!isLogin);
                  setError(null);
                }}>
                  <Text className="text-gold font-bold">
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </GlassCard>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
