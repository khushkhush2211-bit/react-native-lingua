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
  };

  return (
    <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center px-4 py-4">
        <TouchableOpacity onPress={() => router.back()} className="p-2">
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="flex-1 text-center text-lg font-bold text-[#0D132B] mr-8">
          Choose a language
        </Text>
      </View>

        {/* Search Bar */}
        <View className="px-4 mb-3">
          <View className="flex-row items-center border border-gray-200 rounded-full px-4 py-2.5 bg-white">
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 ml-2 text-base text-[#0D132B] p-0"
            placeholder="Search languages"
            placeholderTextColor="#9CA3AF"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
      </View>

      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 190 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-4">
          {filteredLanguages.map((lang) => {
            const isSelected = selectedLanguageId === lang.id;

            return (
              <TouchableOpacity
                key={lang.id}
                onPress={() => handleSelectLanguage(lang.id)}
                className={`flex-row items-center p-4 mb-3 rounded-2xl border bg-white ${
                  isSelected ? 'border-[#6C4EF5]' : 'border-gray-200'
                }`}
              >
                {/* 2-Letter Code */}
                <View className="w-10 h-10 rounded-full border border-gray-200 items-center justify-center bg-white">
                  <Text className="text-sm font-bold text-[#0D132B]">{lang.id.toUpperCase()}</Text>
                </View>

                {/* Info */}
                <View className="flex-1 ml-4">
                  <Text className="text-base font-bold text-[#0D132B]">{lang.name}</Text>
                  <Text className="text-[13px] text-[#9CA3AF] mt-0.5">{formatLearners(lang.learners)}</Text>
                </View>

                {/* Right Icon */}
                {isSelected ? (
                  <View className="w-6 h-6 rounded-full bg-[#6C4EF5] items-center justify-center">
                    <Ionicons name="checkmark" size={16} color="white" />
                  </View>
                ) : (
                  <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Monuments Illustration */}
      <View className="absolute bottom-0 w-full items-center pointer-events-none">
        <Image
          source={images.monuments}
          style={{ width: '100%', height: 190 }}
          resizeMode="cover"
        />
      </View>
    </View>
  );
}
