export interface AudiobookTrack {
  title: string;
  url: string; // url to audio or placeholder
  duration: string;
  narrator: string;
}

export interface AudiobookLink {
  type: 'free' | 'purchase' | 'explore' | 'spotify' | 'youtube' | 'soundcloud';
  label: string;
  url: string;
}

export interface Audiobook {
  id: string;
  title: string;
  subTitle?: string;
  author: string;
  narrator: string;
  description: string;
  longDescription: string;
  coverImage: string;
  tags: string[];
  duration: string;
  chaptersCount: number;
  tracks: AudiobookTrack[];
  links: AudiobookLink[];
}

export interface ProductionService {
  id: string;
  title: string;
  description: string;
  details: string[];
  icon: string;
}

export interface QuoteFormInput {
  name: string;
  email: string;
  organization: string;
  bookTitle: string;
  authorName: string;
  wordCount: number;
  narratorGender: 'male' | 'female' | 'no-preference';
  audioStyle: 'narration-only' | 'narration-drone' | 'narration-music-fx';
  estimatedDuration?: string;
  estimatedCost?: string;
  comments: string;
}

export interface ContactFormInput {
  name: string;
  email: string;
  subject: string;
  message: string;
}
