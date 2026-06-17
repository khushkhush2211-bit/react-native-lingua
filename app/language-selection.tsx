import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Image, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { LANGUAGES } from '@/data/languages';
import { useUserStore } from '@/store/useUserStore';
import { images } from '@/constants/images';

export default function LanguageSelectionScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const { selectedLanguageId, setSelectedLanguageId } = useUserStore();

  const filteredLanguages = LANGUAGES.filter((lang) =>
    lang.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatLearners = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M learners';
    }
    return num.toLocaleString() + ' learners';
  };

  const handleSelectLanguage = (code: string) => {
    setSelectedLanguageId(code);
  };

  return (
    <View className="flex-1 bg-[#F7F7F7] items-center">
      <View className="flex-1 w-full max-w-[430px] bg-white overflow-hidden relative" style={{ paddingTop: insets.top }}>
        {/* Header */}
        <View className="flex-row items-center justify-center px-4 py-4 relative">
          <TouchableOpacity 
            onPress={() => router.back()} 
            className="absolute left-4 p-2 z-10"
          >
            <Ionicons name="chevron-back" size={24} color="#0D132B" />
          </TouchableOpacity>
          <Text className="text-[17px] font-bold text-[#0D132B]">
            Choose a language
          </Text>
        </View>

        {/* Search Bar */}
        <View className="px-4 mb-4 mt-2">
          <View className="flex-row items-center border border-gray-100 rounded-2xl px-4 py-3.5 bg-[#FAFAFA]">
            <Ionicons name="search" size={20} color="#9CA3AF" />
            <TextInput
              className="flex-1 ml-2 text-[15px] text-[#0D132B] p-0"
              placeholder="Search languages"
              placeholderTextColor="#9CA3AF"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        <ScrollView 
          className="flex-1 z-10 w-full" 
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="px-4">
            {filteredLanguages.map((lang) => {
              const isSelected = selectedLanguageId === lang.code;

              return (
                <TouchableOpacity
                  key={lang.code}
                  onPress={() => handleSelectLanguage(lang.code)}
                  className={`flex-row items-center px-4 py-3 mb-1 rounded-[20px] ${
                    isSelected ? 'border-2 border-[#8B5CF6] bg-[#F4F2FF]' : 'border-2 border-transparent bg-transparent'
                  }`}
                >
                  {/* Flag Image */}
                  <View className="w-10 h-10 rounded-full overflow-hidden">
                    <Image 
                      source={{ uri: lang.flag }} 
                      style={{ width: '100%', height: '100%' }} 
                      resizeMode="cover" 
                    />
                  </View>

                  {/* Info */}
                  <View className="flex-1 ml-4 justify-center">
                    <Text className="text-[16px] font-bold text-[#0D132B]">{lang.name}</Text>
                    <Text className="text-[14px] text-[#9CA3AF] mt-0.5">{formatLearners(lang.learners)}</Text>
                  </View>

                  {/* Right Icon */}
                  {isSelected ? (
                    <View className="w-6 h-6 rounded-full bg-[#8B5CF6] items-center justify-center">
                      <Ionicons name="checkmark" size={16} color="white" />
                    </View>
                  ) : (
                    <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
                  )}
                </TouchableOpacity>
              );
            })}

            <TouchableOpacity 
              onPress={() => router.push('/(tabs)')}
              className="bg-[#8B5CF6] py-4 rounded-[20px] items-center justify-center mt-6 mb-8"
              activeOpacity={0.8}
            >
              <Text className="text-white font-bold text-[16px]">Continue</Text>
            </TouchableOpacity>
          </View>

          {/* Globe/Monuments Illustration */}
          <View className="w-full pointer-events-none overflow-hidden mt-auto" style={{ height: 180 }}>
            <View style={{ width: '100%', aspectRatio: 1024/1024, position: 'absolute', top: 0 }}>
              <Image
                source={images.monuments}
                style={{ width: '100%', height: '100%' }}
                resizeMode="contain"
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
