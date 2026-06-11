import { Lesson } from "@/types/learning";

export const lessons: Lesson[] = [
  // Spanish Unit 1: Lesson 1
  {
    id: "es-u1-l1",
    unitId: "es-unit-1",
    title: "Saying Hello",
    description: "Learn the basics of greeting people.",
    order: 1,
    goals: [
      { description: "Say hello and goodbye." },
      { description: "Ask someone how they are." }
    ],
    vocabulary: [
      { id: "v-hola", word: "Hola", translation: "Hello", pronunciation: "oh-lah" },
      { id: "v-adios", word: "Adiós", translation: "Goodbye", pronunciation: "ah-dee-ohs" },
      { id: "v-gracias", word: "Gracias", translation: "Thank you", pronunciation: "grah-see-ahs" },
    ],
    phrases: [
      { id: "p-como-estas", phrase: "¿Cómo estás?", translation: "How are you?", pronunciation: "koh-moh ehs-tahs" },
      { id: "p-muy-bien", phrase: "Muy bien", translation: "Very well", pronunciation: "mwee bee-en" }
    ],
    activities: [
      {
        id: "a-es-1",
        type: "translate_text",
        question: "How do you say 'Hello'?",
        correctAnswer: "Hola",
        options: ["Adiós", "Gracias", "Hola", "Por favor"]
      },
      {
        id: "a-es-2",
        type: "multiple_choice",
        question: "Select the correct translation for: 'Adiós'",
        correctAnswer: "Goodbye",
        options: ["Hello", "Goodbye", "Please", "Thanks"]
      }
    ],
    aiTeacherPrompt: `You are a friendly Spanish teacher. Your student is a beginner learning to say hello and goodbye.
    
    Vocabulary to cover:
    - Hola (Hello)
    - Adiós (Goodbye)
    - Gracias (Thank you)
    
    Phrases to practice:
    - ¿Cómo estás? (How are you?)
    - Muy bien (Very well)
    
    Start by enthusiastically greeting the student. Teach them 'Hola' and '¿Cómo estás?'. Encourage them to repeat after you. Keep sentences short and use simple vocabulary. If they make a mistake, gently correct them and praise their effort.`
  },
  
  // French Unit 1: Lesson 1
  {
    id: "fr-u1-l1",
    unitId: "fr-unit-1",
    title: "Saying Hello",
    description: "Learn the basics of greeting people.",
    order: 1,
    goals: [
      { description: "Say hello and goodbye." },
      { description: "Ask someone how they are." }
    ],
    vocabulary: [
      { id: "v-bonjour", word: "Bonjour", translation: "Hello", pronunciation: "bohn-zhoor" },
      { id: "v-au-revoir", word: "Au revoir", translation: "Goodbye", pronunciation: "oh-ruh-vwahr" },
      { id: "v-merci", word: "Merci", translation: "Thank you", pronunciation: "mair-see" },
    ],
    phrases: [
      { id: "p-comment-ca-va", phrase: "Comment ça va ?", translation: "How are you?", pronunciation: "koh-mahn sah vah" },
      { id: "p-ca-va-bien", phrase: "Ça va bien", translation: "It's going well", pronunciation: "sah vah bee-en" }
    ],
    activities: [
      {
        id: "a-fr-1",
        type: "translate_text",
        question: "How do you say 'Hello'?",
        correctAnswer: "Bonjour",
        options: ["Au revoir", "Merci", "Bonjour", "S'il vous plaît"]
      }
    ],
    aiTeacherPrompt: `You are a cheerful French teacher. Your student is a beginner.
    
    Vocabulary to cover:
    - Bonjour (Hello)
    - Au revoir (Goodbye)
    - Merci (Thank you)
    
    Phrases to practice:
    - Comment ça va ? (How are you?)
    - Ça va bien (It's going well)
    
    Begin with a warm "Bonjour!". Introduce the basics of French greetings. Keep your responses encouraging and concise. Focus on clear pronunciation and invite the student to speak.`
  }
];
