export type LanguageCode = 'es' | 'fr' | 'ja' | 'de' | 'ko' | 'zh';

export interface Language {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flag: string;
  color: string;
  learners: number;
}

export interface Unit {
  id: string;
  languageCode: LanguageCode;
  title: string;
  description: string;
  order: number;
  lessonIds: string[];
}

export type ActivityType = 'vocabulary' | 'translate' | 'multiple-choice' | 'listen';

export interface Activity {
  id: string;
  type: ActivityType;
  question: string;
  correctAnswer: string;
  options?: string[];
}

export interface VocabularyItem {
  id?: string;
  word: string;
  translation: string;
  pronunciation?: string;
  emoji?: string;
}

export interface Phrase {
  id?: string;
  text: string;
  translation: string;
  pronunciation?: string;
}

export interface LessonGoal {
  description: string;
  xpReward?: number;
}

export interface AITeacherPrompt {
  characterName: string;
  systemPrompt: string;
  introMessage: string;
  topicList: string[];
}

export interface Lesson {
  id?: string;
  unitId: string;
  title: string;
  description: string;
  icon?: string;
  xpReward?: number;
  order?: number;
  goals: LessonGoal[];
  vocabulary: VocabularyItem[];
  phrases?: Phrase[];
  activities?: Activity[];
  aiTeacherPrompt?: AITeacherPrompt;
}
