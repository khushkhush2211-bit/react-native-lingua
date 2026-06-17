import { Lesson } from "@/types/learning";

export const LESSONS: Lesson[] = [
  // SPANISH LESSONS (Luna)
  {
    id: "es-l1",
    unitId: "es-unit-1",
    title: "Hola! Greetings",
    description: "Learn how to say hello and goodbye in Spanish",
    icon: "👋",
    xpReward: 10,
    goals: [
      { description: "Learn 5 greeting words", xpReward: 5 },
      { description: "Complete all activities", xpReward: 5 },
    ],
    vocabulary: [
      {
        word: "Hola",
        translation: "Hello",
        pronunciation: "OH-lah",
        emoji: "👋",
      },
      {
        word: "Adiós",
        translation: "Goodbye",
        pronunciation: "ah-DYOHS",
        emoji: "👋",
      },
      {
        word: "Buenos días",
        translation: "Good morning",
        pronunciation: "BWEH-nohs DEE-ahs",
        emoji: "🌅",
      },
      {
        word: "Buenas tardes",
        translation: "Good afternoon",
        pronunciation: "BWEH-nahs TAR-dehs",
        emoji: "☀️",
      },
      {
        word: "Buenas noches",
        translation: "Good night!",
        pronunciation: "BWEH-nahs NOH-chehs",
        emoji: "🌙",
      },
    ],
    phrases: [
      {
        text: '¿Cómo estás?',
        translation: 'How are you?',
        pronunciation: 'KOH-moh ehs-TAHS',
      },
      {
        text: 'Estoy bien, gracias.',
        translation: 'I am fine, thank you.',
        pronunciation: 'ehs-TOY BYEHN, GRAH-syahs',
      },
      {
        text: 'Mucho gusto.',
        translation: 'Nice to meet you.',
        pronunciation: 'MOO-choh GOOS-toh',
      },
    ],
    activities: [
      {
        id: "es-a1",
        type: "translate",
        question: "How do you say 'Hello'?",
        correctAnswer: "Hola",
      },
      {
        id: "es-a2",
        type: "multiple-choice",
        question: "Select the correct translation for: Adiós",
        correctAnswer: "Goodbye",
        options: ["Hello", "Goodbye", "Please", "Thanks"],
      },
    ],
    aiTeacherPrompt: {
      characterName: "Luna",
      systemPrompt:
        "You are Luna, a friendly and enthusiastic Spanish teacher. Keep your responses short, encouraging, and focused on beginner Spanish.",
      introMessage:
        "¡Hola! I am Luna. Are you ready to learn some Spanish greetings?",
      topicList: ["Greetings", "Saying Hello and Goodbye"],
    },
  },
  {
    id: "es-l2",
    unitId: "es-unit-1",
    title: "Introductions",
    description: "Learn to introduce yourself.",
    order: 2,
    goals: [{ description: "Introduce yourself by name." }],
    vocabulary: [
      { id: "es-v3", word: "Yo", translation: "I", pronunciation: "yoh" },
      { id: "es-v4", word: "Tú", translation: "You", pronunciation: "too" },
    ],
    phrases: [
      {
        id: "es-p2",
        text: "Me llamo",
        translation: "My name is",
        pronunciation: "meh yah-moh",
      },
    ],
    activities: [
      {
        id: "es-a3",
        type: "translate",
        question: "Translate 'My name is'",
        correctAnswer: "Me llamo",
      },
    ],
    aiTeacherPrompt: {
      characterName: "Luna",
      systemPrompt:
        "You are Luna, a friendly Spanish teacher. Help the student practice introducing themselves.",
      introMessage:
        "¡Hola de nuevo! Let us learn how to say your name in Spanish.",
      topicList: ["Introductions", "Names"],
    },
  },
  {
    id: "es-l3",
    unitId: "es-unit-1",
    title: "Polite Expressions",
    description: "Learn please and thank you.",
    order: 3,
    goals: [{ description: "Say please and thank you." }],
    vocabulary: [
      {
        id: "es-v5",
        word: "Gracias",
        translation: "Thank you",
        pronunciation: "grah-see-ahs",
      },
      {
        id: "es-v6",
        word: "Por favor",
        translation: "Please",
        pronunciation: "por fah-vor",
      },
    ],
    phrases: [],
    activities: [
      {
        id: "es-a4",
        type: "multiple-choice",
        question: "How do you say 'Thank you'?",
        correctAnswer: "Gracias",
        options: ["Hola", "Por favor", "Gracias", "Adiós"],
      },
    ],
    aiTeacherPrompt: {
      characterName: "Luna",
      systemPrompt: "You are Luna. Teach the student polite Spanish words.",
      introMessage:
        'Ready to be polite? Let us learn "please" and "thank you"!',
      topicList: ["Manners", "Polite Expressions"],
    },
  },

  // FRENCH LESSONS (Claire)
  {
    id: "fr-l1",
    unitId: "fr-unit-1",
    title: "Saying Hello",
    description: "Learn the basics of greeting people.",
    order: 1,
    goals: [{ description: "Say hello." }],
    vocabulary: [
      {
        id: "fr-v1",
        word: "Bonjour",
        translation: "Hello",
        pronunciation: "bohn-zhoor",
      },
      {
        id: "fr-v2",
        word: "Au revoir",
        translation: "Goodbye",
        pronunciation: "oh-ruh-vwahr",
      },
    ],
    phrases: [],
    activities: [
      {
        id: "fr-a1",
        type: "translate",
        question: "How do you say 'Hello'?",
        correctAnswer: "Bonjour",
      },
    ],
    aiTeacherPrompt: {
      characterName: "Claire",
      systemPrompt: "You are Claire, an elegant and patient French teacher.",
      introMessage: "Bonjour! I am Claire. Let us learn some French together.",
      topicList: ["Greetings"],
    },
  },
  {
    id: "fr-l2",
    unitId: "fr-unit-1",
    title: "Introductions",
    description: "Introduce yourself.",
    order: 2,
    goals: [{ description: "Introduce yourself." }],
    vocabulary: [
      { id: "fr-v3", word: "Je", translation: "I", pronunciation: "zhuh" },
    ],
    phrases: [
      {
        id: "fr-p1",
        text: "Je m'appelle",
        translation: "My name is",
        pronunciation: "zhuh mah-pell",
      },
    ],
    activities: [
      {
        id: "fr-a2",
        type: "translate",
        question: "Translate 'My name is'",
        correctAnswer: "Je m'appelle",
      },
    ],
    aiTeacherPrompt: {
      characterName: "Claire",
      systemPrompt: "You are Claire. Help the student introduce themselves.",
      introMessage: "Let us practice saying your name in French.",
      topicList: ["Introductions"],
    },
  },

  // JAPANESE LESSONS (Yuki)
  {
    id: "ja-l1",
    unitId: "ja-unit-1",
    title: "Saying Hello",
    description: "Learn Japanese greetings.",
    order: 1,
    goals: [{ description: "Say hello in Japanese." }],
    vocabulary: [
      {
        id: "ja-v1",
        word: "こんにちは",
        translation: "Hello",
        pronunciation: "konnichiwa",
      },
    ],
    phrases: [],
    activities: [
      {
        id: "ja-a1",
        type: "translate",
        question: "How do you say 'Hello'?",
        correctAnswer: "こんにちは",
      },
    ],
    aiTeacherPrompt: {
      characterName: "Yuki",
      systemPrompt: "You are Yuki, a polite Japanese teacher.",
      introMessage: "こんにちは! I am Yuki. Ready to learn Japanese?",
      topicList: ["Greetings"],
    },
  },
  {
    id: "ja-l2",
    unitId: "ja-unit-1",
    title: "Introductions",
    description: "Learn Japanese introductions.",
    order: 2,
    goals: [{ description: "Introduce yourself." }],
    vocabulary: [
      { id: "ja-v2", word: "私", translation: "I", pronunciation: "watashi" },
    ],
    phrases: [
      {
        id: "ja-p1",
        text: "私は...です",
        translation: "I am...",
        pronunciation: "watashi wa ... desu",
      },
    ],
    activities: [
      {
        id: "ja-a2",
        type: "translate",
        question: "Translate 'I'",
        correctAnswer: "私",
      },
    ],
    aiTeacherPrompt: {
      characterName: "Yuki",
      systemPrompt: "You are Yuki. Teach self-introductions.",
      introMessage: "Let us learn how to introduce yourself respectfully.",
      topicList: ["Introductions"],
    },
  },

  // GERMAN LESSONS (Max)
  {
    id: "de-l1",
    unitId: "de-unit-1",
    title: "Saying Hello",
    description: "Learn German greetings.",
    order: 1,
    goals: [{ description: "Say hello in German." }],
    vocabulary: [
      {
        id: "de-v1",
        word: "Hallo",
        translation: "Hello",
        pronunciation: "hah-loh",
      },
    ],
    phrases: [],
    activities: [
      {
        id: "de-a1",
        type: "translate",
        question: "How do you say 'Hello'?",
        correctAnswer: "Hallo",
      },
    ],
    aiTeacherPrompt: {
      characterName: "Max",
      systemPrompt: "You are Max, a direct and structured German teacher.",
      introMessage: "Hallo! I am Max. Let us start learning German.",
      topicList: ["Greetings"],
    },
  },
  {
    id: "de-l2",
    unitId: "de-unit-1",
    title: "Introductions",
    description: "Learn German introductions.",
    order: 2,
    goals: [{ description: "Introduce yourself." }],
    vocabulary: [
      { id: "de-v2", word: "Ich", translation: "I", pronunciation: "ikh" },
    ],
    phrases: [
      {
        id: "de-p1",
        text: "Ich bin",
        translation: "I am",
        pronunciation: "ikh bin",
      },
    ],
    activities: [
      {
        id: "de-a2",
        type: "translate",
        question: "Translate 'I am'",
        correctAnswer: "Ich bin",
      },
    ],
    aiTeacherPrompt: {
      characterName: "Max",
      systemPrompt: "You are Max. Teach introductions.",
      introMessage: "Let us practice introducing yourself in German.",
      topicList: ["Introductions"],
    },
  },
];
