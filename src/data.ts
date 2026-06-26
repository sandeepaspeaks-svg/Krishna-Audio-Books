import { Audiobook, ProductionService } from './types';

export const FEATURED_AUDIOBOOKS: Audiobook[] = [
  {
    id: 'bhagavad-gita',
    title: 'Bhagavad-gita As It Is',
    subTitle: 'The sublime dialogue on duty, dharma, and devotion',
    author: 'A.C. Bhaktivedanta Swami Prabhupada',
    narrator: 'Dravida Das',
    description: 'Complete professional audiobook narration of the world’s premier handbook on spiritual consciousness, including Sanskrit transliterations and translations.',
    longDescription: 'The Bhagavad-gita is the widely acclaimed spiritual classic that answers the most fundamental questions of life, identity, and the universe. This audiobook presentation contains the complete Sanskrit verses, English translations, and extensive purports, rendered in a deep, meditative, classical narration style. Ideal for daily study, meditation, and spiritual reflection.',
    coverImage: 'bg-gradient-to-br from-amber-700 via-yellow-800 to-orange-950',
    tags: ['Sanskrit Classics', 'Vedanta', 'Bhakti Yoga', 'Dharma'],
    duration: '24h 45m',
    chaptersCount: 18,
    tracks: [
      {
        title: 'Chapter 1: Observing the Armies on the Battlefield of Kurukshetra',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
        duration: '42:15',
        narrator: 'Dravida Das'
      },
      {
        title: 'Chapter 2: Contents of the Gita Summarized (Soul & Self-Realization)',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
        duration: '1:18:24',
        narrator: 'Dravida Das'
      },
      {
        title: 'Chapter 3: Karma-yoga (Path of Selfless Action)',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
        duration: '48:10',
        narrator: 'Dravida Das'
      },
      {
        title: 'Chapter 4: Transcendental Knowledge (Divine Descent and Wisdom)',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3',
        duration: '52:45',
        narrator: 'Dravida Das'
      },
      {
        title: 'Chapter 12: Devotional Service (Bhakti Yoga)',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3',
        duration: '34:20',
        narrator: 'Dravida Das'
      }
    ],
    links: [
      { type: 'free', label: 'Listen on KrishnaPath', url: 'https://www.krishnapath.org/audio/bhagavad-gita-as-it-is-audiobook/' },
      { type: 'youtube', label: 'YouTube Playlist', url: 'https://www.youtube.com/results?search_query=bhagavad+gita+as+it+is+audiobook+dravida' },
      { type: 'purchase', label: 'Purchase CD/Digital', url: 'https://store.bbt.info/' }
    ]
  },
  {
    id: 'srimad-bhagavatam',
    title: 'Srimad-Bhagavatam',
    subTitle: 'The beautiful story of the Personality of Godhead',
    author: 'A.C. Bhaktivedanta Swami Prabhupada',
    narrator: 'Amala-bhakta Das',
    description: 'A multi-volume epic chronicle covering cosmology, history, philosophy, and the devotional pastimes of the Supreme Lord.',
    longDescription: 'Srimad-Bhagavatam (Bhagavata Purana) is an epic philosophical work composed by Srila Vyasadeva. This audiobook edition represents a colossal achievement in devotional recording, covering the historical lineages, cosmological layouts, and beautiful stories of avataras, concluding with the pastimes of Lord Krishna. Beautifully narrated with soft background ambient sounds.',
    coverImage: 'bg-gradient-to-br from-yellow-700 via-orange-800 to-amber-950',
    tags: ['Puranas', 'Avataras', 'Spiritual History', 'Cosmology'],
    duration: '185h 30m',
    chaptersCount: 335,
    tracks: [
      {
        title: 'Canto 1 Chapter 1: Questions by the Sages of Naimisaranya',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3',
        duration: '38:40',
        narrator: 'Amala-bhakta Das'
      },
      {
        title: 'Canto 1 Chapter 2: Divinity and Divine Service',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
        duration: '45:12',
        narrator: 'Amala-bhakta Das'
      },
      {
        title: 'Canto 1 Chapter 3: Krsna is the Source of All Incarnations',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3',
        duration: '50:18',
        narrator: 'Amala-bhakta Das'
      }
    ],
    links: [
      { type: 'free', label: 'Listen on KrishnaPath', url: 'https://www.krishnapath.org/audio/srimad-bhagavatam-audiobook/' },
      { type: 'soundcloud', label: 'SoundCloud Canto 1', url: 'https://soundcloud.com/search?q=srimad%20bhagavatam%20audiobook' }
    ]
  },
  {
    id: 'caitanya-caritamrta',
    title: 'Sri Caitanya-caritamrta',
    subTitle: 'The life and teachings of Sri Caitanya Mahaprabhu',
    author: 'A.C. Bhaktivedanta Swami Prabhupada',
    narrator: 'Various Vaishnava Narrators',
    description: 'The definitive biographical account detailing the golden avatara’s congregational chanting movement, philosophy, and ecstatic love.',
    longDescription: 'Sri Caitanya-caritamrta is the principal biography and philosophical treatise on Sri Caitanya Mahaprabhu, written by Srila Krsnadasa Kaviraja Gosvami. It describes the deep theological synthesis of Acintya-Bheda-Abheda and the ultimate path of Raganuga-Bhakti. This audiobook directory indexes the complete Adi, Madhya, and Antya Lilas.',
    coverImage: 'bg-gradient-to-br from-orange-600 via-red-800 to-amber-900',
    tags: ['Biography', 'Gaudiya Vaishnavism', 'Sankirtan', 'Ecstatic Devotion'],
    duration: '95h 15m',
    chaptersCount: 62,
    tracks: [
      {
        title: 'Adi-lila Chapter 1: The Spiritual Masters',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3',
        duration: '55:30',
        narrator: 'Vaishnava Reader'
      },
      {
        title: 'Adi-lila Chapter 2: Chaitanya Mahaprabhu is the Supreme Personality of Godhead',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-10.mp3',
        duration: '1:02:40',
        narrator: 'Vaishnava Reader'
      }
    ],
    links: [
      { type: 'free', label: 'Listen on KrishnaPath', url: 'https://www.krishnapath.org/audio/sri-caitanya-caritamrta-audiobook/' },
      { type: 'youtube', label: 'Watch Madhya-lila Narrations', url: 'https://www.youtube.com' }
    ]
  },
  {
    id: 'nectar-of-devotion',
    title: 'The Nectar of Devotion',
    subTitle: 'The complete science of Bhakti-yoga',
    author: 'A.C. Bhaktivedanta Swami Prabhupada',
    narrator: 'Dravida Das',
    description: 'A comprehensive study of Srila Rupa Gosvami’s Bhakti-rasamrta-sindhu, defining the fine states of divine love.',
    longDescription: 'The Nectar of Devotion is a summary study of Bhakti-rasamrta-sindhu, the seminal work on devotional science. It systematically teaches how to purify the senses, perform sadhana-bhakti, develop bhava-bhakti, and ultimately relish prema-bhakti, the transcendent flavor of loving relationship with the Supreme Lord.',
    coverImage: 'bg-gradient-to-br from-red-700 via-amber-800 to-stone-900',
    tags: ['Devotional Science', 'Yoga Philosophy', 'Rasa Theology'],
    duration: '16h 20m',
    chaptersCount: 51,
    tracks: [
      {
        title: 'Chapter 1: Characteristics of Pure Devotional Service',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-11.mp3',
        duration: '28:15',
        narrator: 'Dravida Das'
      },
      {
        title: 'Chapter 2: The First Stages of Devotional Service',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-12.mp3',
        duration: '24:50',
        narrator: 'Dravida Das'
      }
    ],
    links: [
      { type: 'free', label: 'Listen on KrishnaPath', url: 'https://www.krishnapath.org/audio/nectar-of-devotion-audiobook/' }
    ]
  },
  {
    id: 'nectar-of-instruction',
    title: 'The Nectar of Instruction',
    subTitle: 'Eleven key verses for spiritual progress',
    author: 'A.C. Bhaktivedanta Swami Prabhupada',
    narrator: 'Amala-bhakta Das',
    description: 'An essential audiobook of Srila Rupa Gosvami’s Sri Upadesamrta, guiding spiritual practitioners on mind control and pure Bhakti.',
    longDescription: 'Sri Upadesamrta contains eleven timeless verses that form the foundation of spiritual practice. It covers the six activities that spoil devotional service, the six activities that accelerate it, and lists the qualities of a genuine guru and disciple, culminating in the description of Radha-kunda as the ultimate sacred site.',
    coverImage: 'bg-gradient-to-br from-emerald-800 via-teal-900 to-stone-950',
    tags: ['Upadesamrta', 'Sadhana Guide', 'Vaishnava Etiquette'],
    duration: '3h 45m',
    chaptersCount: 11,
    tracks: [
      {
        title: 'Text 1: Controlling the Six Urges (Vaco Vegam)',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-13.mp3',
        duration: '18:10',
        narrator: 'Amala-bhakta Das'
      },
      {
        title: 'Text 2: Six Impediments to Devotional Service (Atyaharah)',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3',
        duration: '22:35',
        narrator: 'Amala-bhakta Das'
      }
    ],
    links: [
      { type: 'free', label: 'Listen on KrishnaPath', url: 'https://www.krishnapath.org/audio/the-nectar-of-instruction-audiobook/' }
    ]
  },
  {
    id: 'lectures-teachings',
    title: 'Other Lectures & Teachings',
    subTitle: 'Spiritual discourses and historic audio recordings',
    author: 'Various Acharyas & Panditas',
    narrator: 'Historical Vaishnava Teachers',
    description: 'A curated collection of profound lectures, classroom recordings, and classical commentaries on Upanishads and Vedanta.',
    longDescription: 'Beyond books, the spoken word holds a profound spiritual potency. This directory maps external links and audio archives containing thousands of transcribed lectures, question-and-answer sessions, and devotional bhajans that guide spiritual life across generations.',
    coverImage: 'bg-gradient-to-br from-stone-800 via-yellow-900 to-amber-950',
    tags: ['Lectures', 'Discourses', 'Bhajans', 'Vedanta Talks'],
    duration: '500h+',
    chaptersCount: 1500,
    tracks: [
      {
        title: 'Historical Lecture on Gita Chapter 2 Verse 13 (London, 1973)',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-15.mp3',
        duration: '35:50',
        narrator: 'A.C. Bhaktivedanta Swami Prabhupada'
      },
      {
        title: 'Srimad-Bhagavatam Lecture 1.1.1 (Vrindavan, 1974)',
        url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-16.mp3',
        duration: '44:12',
        narrator: 'A.C. Bhaktivedanta Swami Prabhupada'
      }
    ],
    links: [
      { type: 'free', label: 'Explore Bhaktivedanta Archives', url: 'https://archives.bhaktivedanta.org/' },
      { type: 'free', label: 'ISKCON Desire Tree Lectures', url: 'https://audio.iskcondesiretree.com/' }
    ]
  }
];

export const PRODUCTION_SERVICES: ProductionService[] = [
  {
    id: 'narration',
    title: 'Professional Narration',
    description: 'Immersive, devotional recitation of sacred texts by trained narrators who understand correct Sanskrit, Hindi, and Bengali pronunciation, with appropriate tonal reverence and rhythmic pauses.',
    details: [
      'Proper Sanskrit, Bengali, and Hindi pronunciation (shlokas, mantras)',
      'Highly resonant, experienced voice artists (male and female available)',
      'Respectful, meditative, and non-dramatic classical pacing suitable for spiritual texts',
      'Versatile styles: from classroom lectures to slow poetic recitation'
    ],
    icon: 'Mic'
  },
  {
    id: 'editing-mastering',
    title: 'Audio Editing & Mastering',
    description: 'Meticulous cleaning of recording artifacts, breath control, background noise reduction, and professional audio mastering to ensure crystal-clear sound across all headphones and sound systems.',
    details: [
      'State-of-the-art spectral repair to remove room noise, mouth clicks, and plosives',
      'Gentle dynamics control to maintain readability without compressing vocal emotion',
      'Equalization tuned for maximum warmth and readability',
      'Loudness standardized for leading distribution channels (Audible, Spotify)'
    ],
    icon: 'Sliders'
  },
  {
    id: 'chapter-organization',
    title: 'Chapter & Verse Metadata',
    description: 'Expert structuring of complex spiritual books into standard digital structures. We index individual Shlokas, translations, and purports so listeners can navigate scripture effortlessly.',
    details: [
      'Precise, user-friendly chapter, section, and verse markers',
      'Embedded metadata tags matching ID3 standards',
      'Sanskrit chapter-heading pronunciation announcements',
      'Audible-compliant table of contents structure'
    ],
    icon: 'FolderTree'
  },
  {
    id: 'ambient-music',
    title: 'Ambient & Sacred Sound Design',
    description: 'Enhance your audiobook experience with soft, tasteful background soundscapes—incorporating traditional drone instruments like the tanpura, flute, or gentle sitar, blended respectfully behind the voice.',
    details: [
      'Continuous, meditative tanpura drone alignment in background key',
      'Subtle bamboo flute (Bansuri) transitions between chapters or sections',
      'Optional slow-paced kartal (cymbals) or mridanga ambient introduction',
      'Tastefully mixed so instrumentation never interferes with vocal clarity'
    ],
    icon: 'Music'
  },
  {
    id: 'distribution-guidance',
    title: 'Global Distribution Guidance',
    description: 'We assist publishers and independent authors in uploading their newly completed audiobooks to major platforms like Audible, iTunes, Spotify, Google Play, Kobo, and spiritual archives.',
    details: [
      'ACX (Audible, Amazon, iTunes) compliance audits and full submission support',
      'Alternative digital platforms configuration (Findaway Voices, Draft2Digital)',
      'Private RSS podcast stream setup for spiritual courses or subscription-only audio',
      'Guidance for releasing audio for free public download on archives'
    ],
    icon: 'Radio'
  },
  {
    id: 'private-production',
    title: 'Custom & Private Production',
    description: 'Tailored solutions for spiritual institutions, temples, and private archives to digitize historical voice recordings, translate existing lectures, or record private archives for future preservation.',
    details: [
      'Audio restoration of legacy cassette tape recordings or vintage lectures',
      'Confidential archival recordings of private ashram manuscripts',
      'Multi-language projects (translating and recording in parallel)',
      'Highly flexible project scopes with dedicated spiritual focus'
    ],
    icon: 'ShieldCheck'
  }
];

export const FAQS = [
  {
    question: "Do your narrators know correct Sanskrit pronunciation?",
    answer: "Yes, this is our core specialization. Traditional spiritual audio requires meticulous pronunciation of Sanskrit words, shlokas, and mantras. Our voice artists are extensively trained in correct vocal placements (retroflex, palatal, visargas, etc.) and respectful recitation styles."
  },
  {
    question: "Can we include traditional background music or drones?",
    answer: "Absolutely. We can mix a gentle, continuous classical Tanpura (stringed drone) behind the narration, which is highly traditional and helps listeners focus during meditation. We also provide bamboo flute (Bansuri) or sitar transitions between chapters."
  },
  {
    question: "How long does a typical audiobook take to produce?",
    answer: "A standard book of about 60,000 words (equivalent to roughly 6-7 hours of audio) takes approximately 4-6 weeks from initial reading to final mastered files, including reviews, corrections, and ACX audio standard auditing."
  },
  {
    question: "Do you publish or distribute our audiobooks directly?",
    answer: "We are a full-service production house, meaning we handle the recording, editing, mastering, and formatting. While you (or your organization) retain 100% of the rights and royalties, we guide you step-by-step through setting up your accounts on Audible (ACX), Spotify, and other major distribution channels."
  },
  {
    question: "Do you offer services for translated or regional works?",
    answer: "Yes. We support production in English, Hindi, Sanskrit, Bengali, Spanish, and Russian. We can arrange narrators fluent in these languages who maintain a devotional, scholarly, and respectful cadence."
  }
];
