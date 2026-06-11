export interface Language {
  id: string; // e.g., 'es', 'fr'
  name: string; // e.g., 'Spanish', 'French'
  flagIcon: string; // e.g., '🇪🇸', '🇫🇷'
  learners: number; // e.g., 28400000
}

export interface Unit {
  id: string; // e.g., 'es-unit-1'
  languageId: string; // Reference to Language.id
  title: string; // e.g., 'Basic Greetings'
  description: string; // e.g., 'Learn to say hello and introduce yourself.'
  order: number; // 1, 2, 3...
  color?: string; // Optional hex color for UI theming
}

export interface VocabularyItem {
  id: string; // e.g., 'vocab-hola'
  word: string; // e.g., 'Hola'
  translation: string; // e.g., 'Hello'
  pronunciation?: string; // e.g., 'oh-lah'
}

export interface PhraseItem {
  id: string; // e.g., 'phrase-como-estas'
  phrase: string; // e.g., '¿Cómo estás?'
  translation: string; // e.g., 'How are you?'
  pronunciation?: string; // e.g., 'koh-moh ehs-tahs'
}

export type ActivityType = 'multiple_choice' | 'translate_text' | 'listen_and_select' | 'speak';

export interface Activity {
  id: string;
  type: ActivityType;
  question: string;
  options?: string[]; // Used for multiple choice
  correctAnswer: string;
}

export interface LessonGoal {
  description: string;
}

export interface Lesson {
  id: string; // e.g., 'es-unit-1-lesson-1'
  unitId: string; // Reference to Unit.id
  title: string; // e.g., 'Saying Hello'
  description: string; // e.g., 'Learn the basics of greeting people.'
  order: number; // 1, 2, 3...
  goals: LessonGoal[];
  vocabulary: VocabularyItem[];
  phrases: PhraseItem[];
  activities: Activity[];
  
  // Future-proofing for Vision Agent / AI Teacher feature
  aiTeacherPrompt?: string; 
}
