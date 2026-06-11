import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { languages } from '@/data/languages';
import { useUserStore } from '@/store/useUserStore';
import { images } from '@/constants/images';

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const { selectedLanguageId, setSelectedLanguageId } = useUserStore();

  const filteredLanguages = languages.filter((lang) =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatLearners = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M learners';
    }
    return num.toLocaleString() + ' learners';
  };

  const handleSelectLanguage = (id: string) => {
    setSelectedLanguageId(id);
    // In a real app, we might navigate to the next screen or tabs here
    // router.push('/(tabs)');
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center px-6 py-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons name="chevron-back" size={24} color="#1F2937" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-xl font-bold text-gray-900 -ml-8">
          Choose a language
        </Text>
      </View>

      {/* Search Bar */}
      <View className="px-6 mb-6 mt-2">
        <View className="flex-row items-center border border-gray-200 rounded-full px-4 py-3 bg-white">
          <Ionicons name="search" size={20} color="#9CA3AF" />
          <TextInput
            className="flex-1 ml-2 text-base text-gray-900"
            placeholder="Search languages"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Popular Section */}
        <View className="px-6">
          <Text className="text-lg font-bold text-gray-900 mb-4">Popular</Text>

          {filteredLanguages.map((lang) => {
            const isSelected = selectedLanguageId === lang.id;

            return (
              <TouchableOpacity
                key={lang.id}
                onPress={() => handleSelectLanguage(lang.id)}
                className={`flex-row items-center p-4 mb-3 rounded-2xl border-2 ${
                  isSelected ? 'border-brand-purple bg-purple-50/30' : 'border-gray-100 bg-white'
                }`}
                style={Platform.select({
                  ios: {
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: isSelected ? 0 : 0.05,
                    shadowRadius: 8,
                  },
                  android: {
                    elevation: isSelected ? 0 : 2,
                  },
                })}
              >
                {/* Flag */}
                <View className="w-12 h-12 rounded-full border border-gray-100 items-center justify-center overflow-hidden bg-white">
                  <Text className="text-3xl">{lang.flagIcon}</Text>
                </View>

                {/* Info */}
                <View className="flex-1 ml-4">
                  <Text className="text-lg font-bold text-gray-900">{lang.name}</Text>
                  <Text className="text-sm text-gray-500 mt-0.5">{formatLearners(lang.learners)}</Text>
                </View>

                {/* Right Icon */}
                {isSelected ? (
                  <View className="w-6 h-6 rounded-full bg-brand-purple items-center justify-center">
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                ) : (
                  <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                )}
              </TouchableOpacity>
            );
          })}

          {/* See All Languages Button */}
          <TouchableOpacity className="flex-row items-center p-4 rounded-2xl border-2 border-gray-100 mt-2 bg-white">
            <Ionicons name="globe-outline" size={24} color="#4B5563" />
            <Text className="ml-4 font-bold text-gray-900 text-lg">See all languages</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Monuments Illustration */}
      <View className="absolute bottom-0 w-full items-center pointer-events-none">
        <Image
          source={images.monuments}
          style={{ width: '100%', height: 160 }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}
