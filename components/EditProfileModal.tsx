import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { X, User, AlertCircle } from 'lucide-react-native';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';
import { GlassCard } from './ui/GlassCard';

interface EditProfileModalProps {
  visible: boolean;
  onClose: () => void;
}

export function EditProfileModal({ visible, onClose }: EditProfileModalProps) {
  const { user, updateProfile } = useAuth();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.user_metadata) {
      setFirstName(user.user_metadata.first_name || '');
      setLastName(user.user_metadata.last_name || '');
    }
  }, [user, visible]);

  const handleSubmit = async () => {
    if (!firstName || !lastName) {
      setError('Please fill in all fields');
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const { error } = await updateProfile(firstName, lastName);

      if (error) {
        setError(error.message);
      } else {
        onClose();
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
                Edit Profile
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

              {/* First Name */}
              <View className="mb-4">
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

              {/* Last Name */}
              <View className="mb-6">
                <Text className="text-gray-400 mb-2 text-sm font-medium">Last Name</Text>
                <View className="flex-row items-center bg-white/5 border border-white/10 rounded-xl px-4 h-12 focus:border-gold/50">
                  <User size={20} color="#A0A0B0" />
                  <TextInput
                    className="flex-1 ml-3 text-white text-base"
                    placeholder="Doe"
                    placeholderTextColor="#666"
                    value={lastName}
                    onChangeText={setLastName}
                  />
                </View>
              </View>

              {/* Submit Button */}
              <Button
                title={loading ? 'Saving...' : 'Save Changes'}
                onPress={handleSubmit}
                variant="primary"
                size="lg"
                disabled={loading}
              />
            </View>
          </GlassCard>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
