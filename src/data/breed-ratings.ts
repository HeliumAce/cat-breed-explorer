import type { Breed } from '../types/breeds';

export type Rating = 1 | 2 | 3 | 4 | 5;
export type TraitRatings = Record<
  'adaptability' | 'affection_level' | 'energy_level' | 'intelligence' | 'child_friendly'
  | 'vocalisation' | 'grooming' | 'shedding_level' | 'dog_friendly' | 'social_needs',
  Rating
>;

export type ReviewedTraitRatings = Record<keyof TraitRatings, Rating | null>;

export const temperamentLabelVocabulary = [
  'Active', 'Adaptable', 'Affectionate', 'Calm', 'Confident', 'Curious',
  'Gentle', 'Independent', 'Intelligent', 'Interactive', 'Loyal',
  'Mischievous', 'Playful', 'Quiet', 'Reserved', 'Sensitive', 'Sociable', 'Talkative',
] as const;
export type TemperamentLabel = typeof temperamentLabelVocabulary[number];

export const ratingAttributes: { key: keyof TraitRatings; label: string; display: 'stars' | 'scale' }[] = [
  { key: 'adaptability', label: 'Adaptability', display: 'stars' },
  { key: 'affection_level', label: 'Affection', display: 'scale' },
  { key: 'energy_level', label: 'Energy', display: 'scale' },
  { key: 'intelligence', label: 'Intelligence', display: 'scale' },
  { key: 'child_friendly', label: 'Child friendly', display: 'scale' },
  { key: 'vocalisation', label: 'Vocalization', display: 'scale' },
  { key: 'dog_friendly', label: 'Dog friendliness', display: 'scale' },
  { key: 'shedding_level', label: 'Shedding', display: 'scale' },
  { key: 'grooming', label: 'Grooming needs', display: 'scale' },
  { key: 'social_needs', label: 'Social needs', display: 'scale' },
];

export function isRating(value: unknown): value is Rating {
  return typeof value === 'number' && Number.isInteger(value) && value >= 1 && value <= 5;
}

export function hasCompleteRatings(breed: Partial<Record<keyof TraitRatings, unknown>>): boolean {
  return ratingAttributes.every(({ key }) => isRating(breed[key]));
}

export interface BreedRatingEntry {
  name: string;
  ratings: ReviewedTraitRatings;
  temperamentLabels: TemperamentLabel[];
  temperamentEvidence: { source: string; section: string; summary: string };
  sources: string[];
  rationale: Record<keyof TraitRatings, string>;
  evidenceBasis: 'breed-profile' | 'related-breed' | 'mixed-population' | 'limited';
  groomingCare?: 'skin';
  notes?: string;
}

// Authored editorial estimates, not scores supplied or endorsed by the sources.
// 1 = low, 3 = moderate, 5 = high. Individual cats vary.
// null = insufficient evidence, never an average or a zero. Coat/extra-toe
// population labels and parent breeds do not establish a personality score.
// Evidence is recorded per entry; related-breed and sparse-evidence inferences
// are explicit. No ratings are inferred or randomized at request time.
export const ratingMethodology = {
  version: 3,
  preparedOn: '2026-11-07',
  catalogueCheckedOn: '2026-11-07',
  traitsAuditedOn: '2026-11-07',
  status: 'editorial',
} as const;

export const excludedBreedRatings: Record<string, { name: string; reason: string; source: string }> = {
  kell: {
    name: 'Kellas Cat',
    reason: 'Wild-domestic hybrid population, not a domestic pet breed; excluded from pet ratings and quiz recommendations.',
    source: 'https://www.catbreedexplorer.com/api/breeds?id=kell',
  },
};

export const breedRatingAliases: Record<string, string> = { chas: 'chau' };

export function isQuizEligible(breed: Breed): boolean {
  return Object.prototype.hasOwnProperty.call(breedRatings, breed.id)
    && !Object.prototype.hasOwnProperty.call(excludedBreedRatings, breed.id)
    && hasCompleteRatings(breedRatings[breed.id].ratings)
    && hasCompleteRatings(breed);
}

export const breedRatings: Record<string, BreedRatingEntry> = {
  "abys": {
    "name": "Abyssinian",
    "ratings": {
      "adaptability": 4,
      "affection_level": 4,
      "energy_level": 5,
      "intelligence": 5,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Active",
      "Curious",
      "Interactive",
      "Intelligent"
    ],
    "temperamentEvidence": {
      "source": "https://cfa.org/breed/abyssinian/",
      "section": "Personality and activity level",
      "summary": "Exploration, climbing and interactive problem-solving are emphasised; affection often takes the form of shared activity."
    },
    "sources": [
      "https://cfa.org/breed/abyssinian/",
      "https://tica.org/breed/abyssinian/"
    ],
    "rationale": {
      "adaptability": "Confident and curious; well-socialized individuals can handle changes in environment.",
      "affection_level": "Seeks interaction and attention, often through play rather than prolonged lap time.",
      "energy_level": "A consistently active, climbing and exploring breed.",
      "intelligence": "Strong curiosity and problem-solving behaviour support a high editorial estimate.",
      "child_friendly": "Interactive play can suit children who handle cats gently.",
      "vocalisation": "Usually communicates less insistently than highly vocal breeds.",
      "grooming": "Short coat generally needs little routine combing.",
      "shedding_level": "Low-to-moderate seasonal shedding is an editorial estimate.",
      "dog_friendly": "Sociability can support careful introductions to cat-friendly dogs.",
      "social_needs": "Typically wants regular interaction and shared activity."
    },
    "evidenceBasis": "breed-profile"
  },
  "aege": {
    "name": "Aegean",
    "ratings": {
      "adaptability": 4,
      "affection_level": 4,
      "energy_level": 4,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 4,
      "grooming": 2,
      "shedding_level": 3,
      "dog_friendly": 4,
      "social_needs": 3
    },
    "temperamentLabels": [
      "Active",
      "Affectionate",
      "Curious",
      "Talkative"
    ],
    "temperamentEvidence": {
      "source": "https://www.catster.com/cat-breeds/aegean-cat/",
      "section": "Personality and activity level",
      "summary": "The island-cat profile describes an outgoing, vocal companion that enjoys activity and family attention."
    },
    "sources": [
      "https://www.catster.com/cat-breeds/aegean-cat/"
    ],
    "rationale": {
      "adaptability": "Outgoing island-cat profile supports flexibility.",
      "affection_level": "Affectionate interaction balances independent exploration.",
      "energy_level": "Frequent play and exploration support high activity.",
      "intelligence": "Curiosity and responsiveness to training support an above-moderate estimate.",
      "child_friendly": "Outgoing disposition can suit gentle children.",
      "vocalisation": "Described as talkative; above-moderate communication.",
      "grooming": "Weekly coat care rather than intensive daily maintenance.",
      "shedding_level": "Moderate shedding is described in the profile.",
      "dog_friendly": "Sociability can support introductions to compatible dogs.",
      "social_needs": "Enjoys company but can occupy itself for part of the day."
    },
    "evidenceBasis": "breed-profile"
  },
  "abob": {
    "name": "American Bobtail",
    "ratings": {
      "adaptability": 5,
      "affection_level": 5,
      "energy_level": 3,
      "intelligence": 4,
      "child_friendly": 5,
      "vocalisation": 2,
      "grooming": 2,
      "shedding_level": 3,
      "dog_friendly": 5,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Adaptable",
      "Playful",
      "Intelligent"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/american-bobtail/",
      "section": "Personality and activity level",
      "summary": "Family attachment, moderate activity and learning games support these labels without implying constant high energy."
    },
    "sources": [
      "https://tica.org/breed/american-bobtail/"
    ],
    "rationale": {
      "adaptability": "Easygoing family temperament supports broad adaptability.",
      "affection_level": "Strong attachment to the whole family supports high affection.",
      "energy_level": "Interactive play balanced with companionship suggests moderate activity.",
      "intelligence": "Interactive games and trainability support an above-moderate estimate.",
      "child_friendly": "Family-oriented, tolerant temperament supports a high estimate with gentle handling.",
      "vocalisation": "Quiet communication rather than persistent calling is an editorial estimate.",
      "grooming": "Both coat lengths are described as relatively easy to maintain.",
      "shedding_level": "Moderate seasonal loose hair is an editorial coat estimate.",
      "dog_friendly": "Profile explicitly includes compatible dogs among suitable companions.",
      "social_needs": "Strong family attachment suggests regular companionship needs."
    },
    "evidenceBasis": "breed-profile"
  },
  "acur": {
    "name": "American Curl",
    "ratings": {
      "adaptability": 5,
      "affection_level": 5,
      "energy_level": 4,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 2,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Curious",
      "Playful",
      "Adaptable"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/american-curl/",
      "section": "Personality and activity level",
      "summary": "TICA describes curious family involvement, adjustment to new situations and persistent kitten-like play; voices are soft."
    },
    "sources": [
      "https://tica.org/breed/american-curl/"
    ],
    "rationale": {
      "adaptability": "Profile describes adjustment to varied situations.",
      "affection_level": "Physical affection and close involvement with people support a high estimate.",
      "energy_level": "Persistent kitten-like exploration supports above-moderate activity.",
      "intelligence": "Inquisitive exploration and games support an above-moderate estimate.",
      "child_friendly": "Sweet disposition can suit children who handle ears and body gently.",
      "vocalisation": "Typically communicates with soft sounds rather than loud demands.",
      "grooming": "Silky coat generally needs light routine care; ears need attention.",
      "shedding_level": "Relatively light shedding is an editorial coat estimate.",
      "dog_friendly": "Social nature can support compatible dogs after introductions.",
      "social_needs": "Thrives on human interaction and participation."
    },
    "evidenceBasis": "breed-profile"
  },
  "amer": {
    "name": "American Ringtail",
    "ratings": {
      "adaptability": 4,
      "affection_level": 4,
      "energy_level": 4,
      "intelligence": 3,
      "child_friendly": 3,
      "vocalisation": 3,
      "grooming": 2,
      "shedding_level": 3,
      "dog_friendly": 3,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Curious",
      "Playful"
    ],
    "temperamentEvidence": {
      "source": "https://www.catster.com/cat-breeds/american-ringtail-cat/",
      "section": "Personality and activity level",
      "summary": "Exploration and family affection are supported; the source does not establish exceptional intelligence."
    },
    "sources": [
      "https://www.catster.com/cat-breeds/american-ringtail-cat/"
    ],
    "rationale": {
      "adaptability": "Outgoing but sometimes cautious around unfamiliar people.",
      "affection_level": "Loving family interactions support above-moderate affection.",
      "energy_level": "Exploration and play support above-moderate activity.",
      "intelligence": "Use a moderate estimate rather than assuming exceptional trainability.",
      "child_friendly": "Better suited to respectful older children than rough handling.",
      "vocalisation": "Conversational tendencies suggest moderate vocalization.",
      "grooming": "Ordinary short-coat upkeep suggests light grooming.",
      "shedding_level": "Moderate loose hair is an editorial estimate.",
      "dog_friendly": "Territorial tendencies make introductions important; use a moderate estimate.",
      "social_needs": "Affectionate and outgoing, with regular interaction needs."
    },
    "evidenceBasis": "breed-profile"
  },
  "asho": {
    "name": "American Shorthair",
    "ratings": {
      "adaptability": 5,
      "affection_level": 4,
      "energy_level": 3,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 1,
      "shedding_level": 3,
      "dog_friendly": 4,
      "social_needs": 3
    },
    "temperamentLabels": [
      "Adaptable",
      "Calm",
      "Playful",
      "Independent"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/american-shorthair/",
      "section": "Personality and activity level",
      "summary": "The profile balances even temperament and self-directed time with ordinary play."
    },
    "sources": [
      "https://tica.org/breed/american-shorthair/"
    ],
    "rationale": {
      "adaptability": "Easygoing temperament is described as adaptable to varied households.",
      "affection_level": "Loyal family companionship supports above-moderate affection.",
      "energy_level": "Playfulness balanced with a settled household manner.",
      "intelligence": "Smart, curious behaviour supports an above-moderate estimate.",
      "child_friendly": "Gentle disposition can suit respectful children.",
      "vocalisation": "Low vocal demand is an editorial estimate.",
      "grooming": "Short coat generally needs simple routine care.",
      "shedding_level": "Dense short coat suggests moderate seasonal shedding.",
      "dog_friendly": "Easygoing household temperament supports careful dog introductions.",
      "social_needs": "Enjoys family activity without the intensity of highly demanding breeds."
    },
    "evidenceBasis": "breed-profile"
  },
  "awir": {
    "name": "American Wirehair",
    "ratings": {
      "adaptability": 5,
      "affection_level": 4,
      "energy_level": 3,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 3
    },
    "temperamentLabels": [
      "Affectionate",
      "Gentle",
      "Playful",
      "Adaptable"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/american-wirehair/",
      "section": "Personality and activity level",
      "summary": "An easygoing companion with playful, family-oriented interactions; no exceptional vocal or activity claim."
    },
    "sources": [
      "https://tica.org/breed/american-wirehair/"
    ],
    "rationale": {
      "adaptability": "Shares the adaptable, easygoing American Shorthair temperament.",
      "affection_level": "Loyal and people-oriented disposition supports affection.",
      "energy_level": "Play and curiosity balanced with a gentle household manner.",
      "intelligence": "Smart and curious behaviour supports an above-moderate estimate.",
      "child_friendly": "Gentle temperament can suit respectful children.",
      "vocalisation": "Low vocal demand is an editorial estimate.",
      "grooming": "Wiry coat needs very little brushing; excessive handling can damage it.",
      "shedding_level": "Lower loose-hair burden is an editorial estimate.",
      "dog_friendly": "Easygoing temperament can support compatible dogs.",
      "social_needs": "Likes family involvement without an extreme demand for company."
    },
    "evidenceBasis": "breed-profile"
  },
  "aphr": {
    "name": "Aphrodite Giant",
    "ratings": {
      "adaptability": null,
      "affection_level": null,
      "energy_level": null,
      "intelligence": null,
      "child_friendly": null,
      "vocalisation": null,
      "grooming": null,
      "shedding_level": null,
      "dog_friendly": null,
      "social_needs": null
    },
    "temperamentLabels": [],
    "temperamentEvidence": {
      "source": "https://en.woc.center/articles/standards-apl/",
      "section": "Evidence limit",
      "summary": "Temperament labels withheld; see the entry review notes for the evidence limit."
    },
    "sources": [
      "https://en.woc.center/articles/standards-apl/"
    ],
    "rationale": {
      "adaptability": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "affection_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "energy_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "intelligence": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "child_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "vocalisation": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "grooming": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "shedding_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "dog_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "social_needs": "Unavailable: corroborated evidence for this trait is insufficient; see review notes."
    },
    "evidenceBasis": "limited",
    "notes": "Conformation standards support size, shape and seasonal coat, but not a uniform temperament or maintenance score across coat varieties."
  },
  "amau": {
    "name": "Arabian Mau",
    "ratings": {
      "adaptability": 4,
      "affection_level": 4,
      "energy_level": 5,
      "intelligence": 4,
      "child_friendly": 3,
      "vocalisation": 4,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 3,
      "social_needs": 3
    },
    "temperamentLabels": [
      "Active",
      "Independent",
      "Curious",
      "Talkative"
    ],
    "temperamentEvidence": {
      "source": "https://www.catster.com/cat-breeds/arabian-mau/",
      "section": "Personality and activity level",
      "summary": "The profile describes high activity and vocal interaction alongside independence rather than prolonged lap time."
    },
    "sources": [
      "https://www.catster.com/cat-breeds/arabian-mau/"
    ],
    "rationale": {
      "adaptability": "Independent, exploratory disposition suggests flexibility when enrichment is provided.",
      "affection_level": "Seeks attention while retaining an independent style.",
      "energy_level": "Very active play and exploration support the highest activity category.",
      "intelligence": "Interest in puzzles supports an above-moderate learning estimate.",
      "child_friendly": "Prefer respectful older children; rough handling is a poor fit.",
      "vocalisation": "Can make insistent requests for attention.",
      "grooming": "Short close coat suggests minimal routine combing.",
      "shedding_level": "Lower shedding burden is an editorial short-coat estimate.",
      "dog_friendly": "Moderate estimate; compatibility depends on introductions and individual temperament.",
      "social_needs": "Enjoys attention while also pursuing independent activity."
    },
    "evidenceBasis": "breed-profile"
  },
  "asia": {
    "name": "Asian Semi-longhair",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 4,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 4,
      "grooming": 3,
      "shedding_level": 3,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Curious",
      "Interactive",
      "Talkative"
    ],
    "temperamentEvidence": {
      "source": "https://www.gccfcats.org/getting-a-cat/choosing/cat-breeds/asian/",
      "section": "Personality and activity level",
      "summary": "GCCF's Tiffanie/Asian description supports investigation, companionship and conversational interaction."
    },
    "sources": [
      "https://www.gccfcats.org/getting-a-cat/choosing/cat-breeds/asian/"
    ],
    "rationale": {
      "adaptability": "Interactive, sociable Asian-group temperament supports household flexibility.",
      "affection_level": "People-oriented Burmese-group background supports close bonds.",
      "energy_level": "Lively, energetic group description supports high activity.",
      "intelligence": "Curiosity and interaction support an above-moderate estimate.",
      "child_friendly": "Sociability can suit respectful children.",
      "vocalisation": "Conversational tendency is an editorial Burmese-group inference.",
      "grooming": "Semi-long coat needs regular combing.",
      "shedding_level": "Moderate shedding is an editorial coat estimate.",
      "dog_friendly": "Sociable group character can support compatible dogs.",
      "social_needs": "Interactive temperament supports frequent company."
    },
    "evidenceBasis": "related-breed",
    "notes": "Uses the GCCF Asian/Tiffanie group profile for this semi-longhaired catalogue entry."
  },
  "amis": {
    "name": "Australian Mist",
    "ratings": {
      "adaptability": 5,
      "affection_level": 5,
      "energy_level": 3,
      "intelligence": 4,
      "child_friendly": 5,
      "vocalisation": 3,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Gentle",
      "Sociable",
      "Calm"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/australian-mist/",
      "section": "Personality and activity level",
      "summary": "The profile describes a tolerant family companion that enjoys play without being constantly active."
    },
    "sources": [
      "https://tica.org/breed/australian-mist/"
    ],
    "rationale": {
      "adaptability": "Easygoing sociability supports adjustment to busy households.",
      "affection_level": "Dedicated, people-oriented character supports high affection.",
      "energy_level": "Lively play balanced with a relaxed companion style.",
      "intelligence": "Interactive curiosity supports an above-moderate estimate.",
      "child_friendly": "Tolerant family-companion profile supports a high estimate.",
      "vocalisation": "Moderate conversational tendency is an editorial estimate.",
      "grooming": "Short coat needs simple routine care.",
      "shedding_level": "Lower loose-hair burden is an editorial estimate.",
      "dog_friendly": "Social disposition can support compatible dogs.",
      "social_needs": "Best suited to frequent human contact rather than long absences."
    },
    "evidenceBasis": "breed-profile"
  },
  "bali": {
    "name": "Balinese",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 5,
      "intelligence": 5,
      "child_friendly": 4,
      "vocalisation": 4,
      "grooming": 2,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 5
    },
    "temperamentLabels": [
      "Affectionate",
      "Active",
      "Interactive",
      "Talkative"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/balinese/",
      "section": "Personality and activity level",
      "summary": "TICA describes frequent conversation and social activity, with a softer, less insistent voice than the Siamese."
    },
    "sources": [
      "https://tica.org/breed/balinese/"
    ],
    "rationale": {
      "adaptability": "Social, involved companion when stimulation needs are met.",
      "affection_level": "Strong attachment to people supports high affection.",
      "energy_level": "Athletic Siamese-group play supports very high activity.",
      "intelligence": "Interactive problem-solving supports a high editorial estimate.",
      "child_friendly": "Social nature can suit respectful children.",
      "vocalisation": "Frequent conversation is supported, but TICA describes a softer, less insistent voice than the Siamese; above-moderate rather than the maximum estimate.",
      "grooming": "Fine semi-long coat needs light routine combing.",
      "shedding_level": "Lower shedding burden is an editorial fine-coat estimate.",
      "dog_friendly": "Social nature can support cat-friendly dogs.",
      "social_needs": "Strong companionship needs and close human attachment."
    },
    "evidenceBasis": "breed-profile"
  },
  "bamb": {
    "name": "Bambino",
    "ratings": {
      "adaptability": null,
      "affection_level": null,
      "energy_level": null,
      "intelligence": null,
      "child_friendly": null,
      "vocalisation": null,
      "grooming": 4,
      "shedding_level": 1,
      "dog_friendly": null,
      "social_needs": null
    },
    "temperamentLabels": [],
    "temperamentEvidence": {
      "source": "https://www.wrinklebottom.com/elf-bambino-dwelf-minskin-hairless-hybrids/",
      "section": "Evidence limit",
      "summary": "Temperament labels withheld; see the entry review notes for the evidence limit."
    },
    "sources": [
      "https://www.wrinklebottom.com/elf-bambino-dwelf-minskin-hairless-hybrids/",
      "https://www.petmd.com/cat/breeds/sphynx"
    ],
    "rationale": {
      "adaptability": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "affection_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "energy_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "intelligence": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "child_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "vocalisation": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "grooming": "Related hairless-care guidance supports regular skin and ear care; adjust the routine to actual fur coverage with a vet.",
      "shedding_level": "Very sparse coat supports low hair shedding; this does not imply low allergens or low skin-care needs.",
      "dog_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "social_needs": "Unavailable: corroborated evidence for this trait is insufficient; see review notes."
    },
    "evidenceBasis": "related-breed",
    "groomingCare": "skin",
    "notes": "Only near-bare coat care is estimated from related hairless guidance. Sphynx/Munchkin ancestry does not establish a Bambino personality."
  },
  "beng": {
    "name": "Bengal",
    "ratings": {
      "adaptability": 3,
      "affection_level": 4,
      "energy_level": 5,
      "intelligence": 5,
      "child_friendly": 4,
      "vocalisation": 4,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Active",
      "Curious",
      "Confident",
      "Interactive"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/bengal/",
      "section": "Personality and activity level",
      "summary": "Climbing, investigating and interactive activity are central; no guarantee about dogs or handling follows from the labels."
    },
    "sources": [
      "https://tica.org/breed/bengal/"
    ],
    "rationale": {
      "adaptability": "Needs substantial enrichment; use a moderate flexibility estimate.",
      "affection_level": "People-oriented interaction supports above-moderate affection.",
      "energy_level": "Persistent athletic play supports the highest activity category.",
      "intelligence": "Inquisitive problem-solving supports a high estimate.",
      "child_friendly": "Can suit engaged families with respectful children.",
      "vocalisation": "Expressive communication supports an above-moderate estimate.",
      "grooming": "Short pelt-like coat generally needs little combing.",
      "shedding_level": "Lower hair cleanup is an editorial coat estimate.",
      "dog_friendly": "Social play can suit compatible dogs after introductions.",
      "social_needs": "Needs frequent interaction and mentally engaging play."
    },
    "evidenceBasis": "breed-profile"
  },
  "birm": {
    "name": "Birman",
    "ratings": {
      "adaptability": 5,
      "affection_level": 5,
      "energy_level": 2,
      "intelligence": 4,
      "child_friendly": 5,
      "vocalisation": 2,
      "grooming": 2,
      "shedding_level": 3,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Gentle",
      "Quiet",
      "Playful"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/birman/",
      "section": "Personality and activity level",
      "summary": "A laidback, soft-voiced companion can still enjoy fetch and thinking toys; playful does not mean persistently high energy."
    },
    "sources": [
      "https://tica.org/breed/birman/"
    ],
    "rationale": {
      "adaptability": "Laid-back profile describes adjustment to varied homes.",
      "affection_level": "Enjoys being held and relaxing with trusted people.",
      "energy_level": "Relaxed disposition suggests low-to-moderate activity.",
      "intelligence": "Curiosity supports an above-moderate editorial estimate.",
      "child_friendly": "Gentle family-companion profile supports a high estimate.",
      "vocalisation": "Soft replies rather than persistent loud calling.",
      "grooming": "Silky coat needs routine but relatively light combing.",
      "shedding_level": "Moderate seasonal shedding is an editorial estimate.",
      "dog_friendly": "Friendly profile explicitly includes cat-friendly dogs.",
      "social_needs": "Strong desire for human companionship."
    },
    "evidenceBasis": "breed-profile"
  },
  "bomb": {
    "name": "Bombay",
    "ratings": {
      "adaptability": 5,
      "affection_level": 5,
      "energy_level": 3,
      "intelligence": 4,
      "child_friendly": 5,
      "vocalisation": 3,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 5,
      "social_needs": 5
    },
    "temperamentLabels": [
      "Affectionate",
      "Sociable",
      "Playful",
      "Curious"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/bombay/",
      "section": "Personality and activity level",
      "summary": "The source emphasises family involvement, affection and games rather than independence."
    },
    "sources": [
      "https://tica.org/breed/bombay/"
    ],
    "rationale": {
      "adaptability": "Social family disposition supports broad adjustment.",
      "affection_level": "Seeks close and frequent contact with its people.",
      "energy_level": "Games and companionship suggest moderate activity.",
      "intelligence": "Tricks and puzzle play support an above-moderate estimate.",
      "child_friendly": "Tolerant family-oriented profile supports a high estimate.",
      "vocalisation": "Moderate conversational tendency is an editorial estimate.",
      "grooming": "Short sleek coat needs little routine combing.",
      "shedding_level": "Lower coat-hair burden is an editorial estimate.",
      "dog_friendly": "Sociability with other pets supports a high estimate for compatible dogs.",
      "social_needs": "Strong desire to remain near people suggests high social needs."
    },
    "evidenceBasis": "breed-profile"
  },
  "braz": {
    "name": "Brazilian Shorthair",
    "ratings": {
      "adaptability": 4,
      "affection_level": 4,
      "energy_level": 4,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 4,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Active",
      "Affectionate",
      "Curious",
      "Talkative"
    ],
    "temperamentEvidence": {
      "source": "https://www.catster.com/cat-breeds/brazilian-shorthair-cat/",
      "section": "Personality and activity level",
      "summary": "The profile supports energetic exploration, social attention and vocal communication."
    },
    "sources": [
      "https://www.catster.com/cat-breeds/brazilian-shorthair-cat/"
    ],
    "rationale": {
      "adaptability": "Can adjust to varied homes when play needs are provided for.",
      "affection_level": "Affectionate family contact supports closeness.",
      "energy_level": "Active, mischievous play supports high activity.",
      "intelligence": "Curiosity supports an above-moderate learning estimate.",
      "child_friendly": "Family contact can suit children taught gentle handling.",
      "vocalisation": "Talkative profile supports above-moderate vocalization.",
      "grooming": "Short close coat needs simple routine care.",
      "shedding_level": "Lower shedding burden is an editorial coat estimate.",
      "dog_friendly": "Compatible dogs may be accepted when they do not chase the cat.",
      "social_needs": "Frequent family interaction is preferred over long absences."
    },
    "evidenceBasis": "breed-profile"
  },
  "bslo": {
    "name": "British Longhair",
    "ratings": {
      "adaptability": 4,
      "affection_level": 3,
      "energy_level": 2,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 1,
      "grooming": 4,
      "shedding_level": 4,
      "dog_friendly": 4,
      "social_needs": 2
    },
    "temperamentLabels": [
      "Calm",
      "Independent",
      "Quiet",
      "Loyal"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/british-longhair/",
      "section": "Personality and activity level",
      "summary": "TICA describes low activity, quiet company and comfort with time alone; the longer coat does not change that temperament."
    },
    "sources": [
      "https://tica.org/breed/british-longhair/"
    ],
    "rationale": {
      "adaptability": "Calm household manner supports adjustment with predictable routines.",
      "affection_level": "Devoted but often prefers sitting beside people rather than being carried.",
      "energy_level": "Generally quiet activity with occasional playful bursts.",
      "intelligence": "Observant, deliberate behaviour supports an above-moderate estimate.",
      "child_friendly": "Tolerant of respectful children; dislikes being carried around.",
      "vocalisation": "Quiet, unobtrusive profile supports low vocalization.",
      "grooming": "Plush long coat requires regular thorough combing.",
      "shedding_level": "Dense long coat supports above-moderate seasonal shedding.",
      "dog_friendly": "Profile describes tolerance of compatible dogs.",
      "social_needs": "Can occupy itself and tolerate reasonable periods alone."
    },
    "evidenceBasis": "breed-profile"
  },
  "bsho": {
    "name": "British Shorthair",
    "ratings": {
      "adaptability": 4,
      "affection_level": 3,
      "energy_level": 2,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 1,
      "grooming": 2,
      "shedding_level": 4,
      "dog_friendly": 4,
      "social_needs": 2
    },
    "temperamentLabels": [
      "Calm",
      "Independent",
      "Quiet",
      "Loyal"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/british-shorthair/",
      "section": "Personality and activity level",
      "summary": "TICA describes quiet nearby companionship and independence rather than a need to be carried or constantly held."
    },
    "sources": [
      "https://tica.org/breed/british-shorthair/"
    ],
    "rationale": {
      "adaptability": "Calm household manner supports adjustment with predictable routines.",
      "affection_level": "Loyal but usually less physically demanding than lap-oriented breeds.",
      "energy_level": "Low-key activity punctuated by playful moments.",
      "intelligence": "Observant, deliberate behaviour supports an above-moderate estimate.",
      "child_friendly": "Tolerant of respectful children; dislikes being carried around.",
      "vocalisation": "Quiet, unobtrusive profile supports low vocalization.",
      "grooming": "Short coat needs routine brushing rather than long-coat maintenance.",
      "shedding_level": "Dense plush coat supports above-moderate seasonal loose hair.",
      "dog_friendly": "Profile describes tolerance of compatible dogs.",
      "social_needs": "Independent disposition supports a lower need for constant company."
    },
    "evidenceBasis": "breed-profile"
  },
  "brit": {
    "name": "British Tipped",
    "ratings": {
      "adaptability": 4,
      "affection_level": 3,
      "energy_level": 2,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 1,
      "grooming": 2,
      "shedding_level": 4,
      "dog_friendly": 4,
      "social_needs": 2
    },
    "temperamentLabels": [
      "Calm",
      "Independent",
      "Quiet",
      "Loyal"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/british-shorthair/",
      "section": "Personality and activity level",
      "summary": "Tipping is a British Shorthair colour variety; no distinct personality is inferred from the pattern."
    },
    "sources": [
      "https://tica.org/breed/british-shorthair/"
    ],
    "rationale": {
      "adaptability": "Uses the calm British-group temperament estimate.",
      "affection_level": "Tipped colour does not establish a different affection level.",
      "energy_level": "Uses the low-key British-group activity estimate.",
      "intelligence": "Uses the observant British-group learning estimate.",
      "child_friendly": "Uses the British-group estimate for respectful children.",
      "vocalisation": "Uses the quiet British-group communication estimate.",
      "grooming": "Assumes the short-coated British variety represented by the API.",
      "shedding_level": "Dense British-type coat suggests seasonal loose hair.",
      "dog_friendly": "Uses the British-group estimate for compatible dogs.",
      "social_needs": "Colour pattern does not establish different companionship needs."
    },
    "evidenceBasis": "related-breed",
    "notes": "British Tipped is treated as a British coat-pattern variety, not a separate personality type."
  },
  "bure": {
    "name": "Burmese",
    "ratings": {
      "adaptability": 5,
      "affection_level": 5,
      "energy_level": 4,
      "intelligence": 5,
      "child_friendly": 5,
      "vocalisation": 4,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 5,
      "social_needs": 5
    },
    "temperamentLabels": [
      "Affectionate",
      "Sociable",
      "Playful",
      "Interactive"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/burmese/",
      "section": "Personality and activity level",
      "summary": "Burmese profiles emphasise close family contact and playful social participation."
    },
    "sources": [
      "https://tica.org/breed/burmese/"
    ],
    "rationale": {
      "adaptability": "Tolerant, social companion style supports broad household flexibility.",
      "affection_level": "Strong devotion and people orientation support high affection.",
      "energy_level": "Lively games and interactive play support high activity.",
      "intelligence": "Learning tricks and puzzle play support a high estimate.",
      "child_friendly": "Tolerant family profile supports a high estimate with gentle handling.",
      "vocalisation": "Expressive Burmese communication supports an above-moderate estimate.",
      "grooming": "Short glossy coat needs little routine combing.",
      "shedding_level": "Lower coat-hair burden is an editorial estimate.",
      "dog_friendly": "Tolerance of household pets supports a high estimate for compatible dogs.",
      "social_needs": "Strong need for interaction and attention."
    },
    "evidenceBasis": "breed-profile"
  },
  "buri": {
    "name": "Burmilla",
    "ratings": {
      "adaptability": 4,
      "affection_level": 4,
      "energy_level": 3,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 2,
      "shedding_level": 3,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Gentle",
      "Playful",
      "Quiet"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/burmilla/",
      "section": "Personality and activity level",
      "summary": "TICA explicitly describes a playful but quiet and gentle companion."
    },
    "sources": [
      "https://tica.org/breed/burmilla/"
    ],
    "rationale": {
      "adaptability": "Sociability balanced with a laid-back side supports flexibility.",
      "affection_level": "Affectionate mixed Burmese/Persian companion style.",
      "energy_level": "Playful into adulthood without the highest activity intensity.",
      "intelligence": "Inquisitive trick-learning supports an above-moderate estimate.",
      "child_friendly": "Sociable temperament can suit respectful children.",
      "vocalisation": "TICA explicitly describes a quiet, gentle companion despite its playfulness.",
      "grooming": "Short coat needs light routine care; some lines are longer coated.",
      "shedding_level": "Moderate coat-hair burden is an editorial estimate.",
      "dog_friendly": "Social disposition can support compatible dogs.",
      "social_needs": "Regular family interaction and play are desirable."
    },
    "evidenceBasis": "breed-profile"
  },
  "burm": {
    "name": "Burmoir",
    "ratings": {
      "adaptability": null,
      "affection_level": null,
      "energy_level": null,
      "intelligence": null,
      "child_friendly": null,
      "vocalisation": null,
      "grooming": null,
      "shedding_level": null,
      "dog_friendly": null,
      "social_needs": null
    },
    "temperamentLabels": [],
    "temperamentEvidence": {
      "source": "https://www.gccfcats.org/getting-a-cat/choosing/cat-breeds/asian/",
      "section": "Evidence limit",
      "summary": "Temperament labels withheld; see the entry review notes for the evidence limit."
    },
    "sources": [
      "https://www.gccfcats.org/getting-a-cat/choosing/cat-breeds/asian/"
    ],
    "rationale": {
      "adaptability": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "affection_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "energy_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "intelligence": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "child_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "vocalisation": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "grooming": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "shedding_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "dog_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "social_needs": "Unavailable: corroborated evidence for this trait is insufficient; see review notes."
    },
    "evidenceBasis": "limited",
    "notes": "Could not corroborate this API label independently. Asian/Burmilla documentation does not establish Burmoir as a distinct breed or a safe alias."
  },
  "cspa": {
    "name": "California Spangled",
    "ratings": {
      "adaptability": 4,
      "affection_level": 4,
      "energy_level": 5,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 3,
      "grooming": 1,
      "shedding_level": 3,
      "dog_friendly": 3,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Active",
      "Curious",
      "Affectionate",
      "Intelligent"
    ],
    "temperamentEvidence": {
      "source": "https://www.petmd.com/cat/breeds/c_ct_california_spangled_cat",
      "section": "Personality and activity level",
      "summary": "PetMD describes an athletic hunter-style player that is affectionate and responsive to mental activity."
    },
    "sources": [
      "https://www.petmd.com/cat/breeds/c_ct_california_spangled_cat"
    ],
    "rationale": {
      "adaptability": "Social companion description supports reasonable flexibility.",
      "affection_level": "Affectionate, loyal profile supports closeness.",
      "energy_level": "Athletic, active profile supports very high activity.",
      "intelligence": "Curiosity supports an above-moderate estimate.",
      "child_friendly": "Social disposition may suit respectful children.",
      "vocalisation": "Moderate provisional estimate; direct vocal evidence is limited.",
      "grooming": "Short coat suggests minimal routine combing.",
      "shedding_level": "Moderate shedding is an editorial coat estimate.",
      "dog_friendly": "Moderate provisional estimate; dog-specific evidence is limited.",
      "social_needs": "Social, interactive profile suggests regular companionship."
    },
    "evidenceBasis": "breed-profile",
    "notes": "PetMD supports companion behaviour; obsolete rarity counts and recognition forecasts are not used."
  },
  "cara": {
    "name": "Caracat",
    "ratings": {
      "adaptability": null,
      "affection_level": null,
      "energy_level": null,
      "intelligence": null,
      "child_friendly": null,
      "vocalisation": null,
      "grooming": null,
      "shedding_level": null,
      "dog_friendly": null,
      "social_needs": null
    },
    "temperamentLabels": [],
    "temperamentEvidence": {
      "source": "https://catvets.com/resource/2025-hybrid-cats-position-statement/",
      "section": "Evidence limit",
      "summary": "Temperament labels withheld; see the entry review notes for the evidence limit."
    },
    "sources": [
      "https://catvets.com/resource/2025-hybrid-cats-position-statement/"
    ],
    "rationale": {
      "adaptability": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "affection_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "energy_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "intelligence": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "child_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "vocalisation": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "grooming": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "shedding_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "dog_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "social_needs": "Unavailable: corroborated evidence for this trait is insufficient; see review notes."
    },
    "evidenceBasis": "limited",
    "notes": "The API gives no generation or verified pedigree. FelineVMA identifies specialist husbandry needs for early wild-domestic hybrids; routine pet bonding tips would be inappropriate without stronger evidence."
  },
  "ctif": {
    "name": "Chantilly-Tiffany",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 2,
      "intelligence": 3,
      "child_friendly": 4,
      "vocalisation": 3,
      "grooming": 3,
      "shedding_level": 2,
      "dog_friendly": 3,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Gentle",
      "Loyal",
      "Interactive"
    ],
    "temperamentEvidence": {
      "source": "https://www.hillspet.com/cat-care/cat-breeds/chantilly",
      "section": "Personality and activity level",
      "summary": "Hill's describes a devoted, sweet companion that enjoys people and interactive play; chirping alone is not loud demanding behaviour."
    },
    "sources": [
      "https://www.hillspet.com/cat-care/cat-breeds/chantilly",
      "https://breeds.tcainc.org/BreedInfo/FAQTfny/FAQTiffany.html"
    ],
    "rationale": {
      "adaptability": "Sweet companion temperament suggests reasonable household flexibility.",
      "affection_level": "Devoted, affectionate character supports strong closeness.",
      "energy_level": "Settled companion style suggests lower activity.",
      "intelligence": "Moderate editorial estimate without comparative cognitive evidence.",
      "child_friendly": "Gentle character can suit respectful children.",
      "vocalisation": "Soft conversational voice suggests moderate frequency rather than loudness.",
      "grooming": "Semi-long silky coat needs regular combing.",
      "shedding_level": "Limited undercoat supports a lower loose-hair estimate.",
      "dog_friendly": "Moderate estimate; compatibility remains individual.",
      "social_needs": "Devoted companion profile suggests regular company."
    },
    "evidenceBasis": "breed-profile"
  },
  "char": {
    "name": "Chartreux",
    "ratings": {
      "adaptability": 4,
      "affection_level": 4,
      "energy_level": 3,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 1,
      "grooming": 2,
      "shedding_level": 3,
      "dog_friendly": 4,
      "social_needs": 2
    },
    "temperamentLabels": [
      "Calm",
      "Quiet",
      "Loyal",
      "Reserved"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/chartreux/",
      "section": "Personality and activity level",
      "summary": "TICA describes placid companionship, some reserve and quiet voices, with play still possible."
    },
    "sources": [
      "https://tica.org/breed/chartreux/"
    ],
    "rationale": {
      "adaptability": "Calm, amiable household manner supports flexibility.",
      "affection_level": "Loyal companionship supports above-moderate affection.",
      "energy_level": "Playful moments balanced with a calm disposition.",
      "intelligence": "Observant problem-solving supports an above-moderate estimate.",
      "child_friendly": "Gentle family profile supports respectful children.",
      "vocalisation": "Very quiet communication supports the lowest vocal category.",
      "grooming": "Woolly coat needs routine brushing.",
      "shedding_level": "Dense undercoat suggests moderate seasonal shedding.",
      "dog_friendly": "Amiable temperament can support compatible dogs.",
      "social_needs": "Can remain content during reasonable periods alone."
    },
    "evidenceBasis": "breed-profile"
  },
  "chau": {
    "name": "Chausie",
    "ratings": {
      "adaptability": 3,
      "affection_level": 4,
      "energy_level": 5,
      "intelligence": 5,
      "child_friendly": 2,
      "vocalisation": 4,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 3,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Active",
      "Curious",
      "Interactive",
      "Talkative"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/chausie/",
      "section": "Personality and activity level",
      "summary": "TICA describes an active, people-oriented learner that is very talkative."
    },
    "sources": [
      "https://tica.org/breed/chausie/"
    ],
    "rationale": {
      "adaptability": "High enrichment demands limit easy adjustment to every household.",
      "affection_level": "Forms strong bonds despite a very active style.",
      "energy_level": "Extremely sustained play and athleticism support the highest category.",
      "intelligence": "Opening cabinets and interactive challenges support a high estimate.",
      "child_friendly": "Profile favours adults or families without young children.",
      "vocalisation": "TICA calls the breed very talkative; the prior moderate estimate understated the direct profile.",
      "grooming": "Short coat needs simple routine brushing.",
      "shedding_level": "Lower hair burden is an editorial short-coat estimate.",
      "dog_friendly": "Moderate estimate; individual compatibility and introductions matter.",
      "social_needs": "Long periods alone are a poor fit for its interaction needs."
    },
    "evidenceBasis": "breed-profile"
  },
  "chas": {
    "name": "Chausie",
    "ratings": {
      "adaptability": 3,
      "affection_level": 4,
      "energy_level": 5,
      "intelligence": 5,
      "child_friendly": 2,
      "vocalisation": 4,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 3,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Active",
      "Curious",
      "Interactive",
      "Talkative"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/chausie/",
      "section": "Personality and activity level",
      "summary": "Same reviewed breed as chau; the API spelling is an alias, not a distinct temperament."
    },
    "sources": [
      "https://tica.org/breed/chausie/"
    ],
    "rationale": {
      "adaptability": "High enrichment demands limit easy adjustment to every household.",
      "affection_level": "Forms strong bonds despite a very active style.",
      "energy_level": "Extremely sustained play and athleticism support the highest category.",
      "intelligence": "Opening cabinets and interactive challenges support a high estimate.",
      "child_friendly": "Profile favours adults or families without young children.",
      "vocalisation": "TICA calls the breed very talkative; the prior moderate estimate understated the direct profile.",
      "grooming": "Short coat needs simple routine brushing.",
      "shedding_level": "Lower hair burden is an editorial short-coat estimate.",
      "dog_friendly": "Moderate estimate; individual compatibility and introductions matter.",
      "social_needs": "Long periods alone are a poor fit for its interaction needs."
    },
    "evidenceBasis": "breed-profile",
    "notes": "Alias of chau: the API contains a second Chausie ID. Scores and evidence intentionally remain identical."
  },
  "chee": {
    "name": "Cheetoh",
    "ratings": {
      "adaptability": 4,
      "affection_level": 4,
      "energy_level": 5,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 3,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Curious",
      "Playful",
      "Sociable"
    ],
    "temperamentEvidence": {
      "source": "https://catzinc.org/wp-content/uploads/2018/09/cheetoh.pdf",
      "section": "General description",
      "summary": "The standard describes social curiosity and athletic play; absolute promises of gentleness are not repeated."
    },
    "sources": [
      "https://catzinc.org/wp-content/uploads/2018/09/cheetoh.pdf",
      "https://www.catster.com/cat-breeds/cheetoh-cat/"
    ],
    "rationale": {
      "adaptability": "Domestic companion breeding goal supports reasonable flexibility.",
      "affection_level": "Gentle, affectionate profile supports closeness.",
      "energy_level": "Athletic Bengal/Ocicat background supports very high activity.",
      "intelligence": "Interactive curiosity supports an above-moderate estimate.",
      "child_friendly": "Gentle breeding goal can suit respectful children.",
      "vocalisation": "Moderate vocalization is an editorial estimate.",
      "grooming": "Short coat generally needs little routine combing.",
      "shedding_level": "Lower loose-hair burden is an editorial estimate.",
      "dog_friendly": "Sociable companion profile may support compatible dogs.",
      "social_needs": "Frequent interactive play and company are desirable."
    },
    "evidenceBasis": "breed-profile"
  },
  "csho": {
    "name": "Colorpoint Shorthair",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 5,
      "intelligence": 5,
      "child_friendly": 4,
      "vocalisation": 5,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 5
    },
    "temperamentLabels": [
      "Active",
      "Affectionate",
      "Interactive",
      "Talkative"
    ],
    "temperamentEvidence": {
      "source": "https://cfa.org/breed/colorpoint-shorthair/",
      "section": "Personality and activity level",
      "summary": "The CFA profile describes an outgoing, social and vocal Siamese-related companion."
    },
    "sources": [
      "https://cfa.org/breed/colorpoint-shorthair/"
    ],
    "rationale": {
      "adaptability": "Interactive companion style needs an engaged household.",
      "affection_level": "Close physical involvement and devotion support high affection.",
      "energy_level": "Athletic, inventive play supports very high activity.",
      "intelligence": "Strong communication and inventive play support a high estimate.",
      "child_friendly": "Social character can suit respectful children.",
      "vocalisation": "Frequent, insistent communication supports high vocalization.",
      "grooming": "Short silky coat needs minimal routine grooming.",
      "shedding_level": "Lower shedding burden is an editorial estimate.",
      "dog_friendly": "Profile describes friendships with compatible dogs.",
      "social_needs": "Strong demand for attention supports high social needs."
    },
    "evidenceBasis": "breed-profile"
  },
  "crex": {
    "name": "Cornish Rex",
    "ratings": {
      "adaptability": 5,
      "affection_level": 5,
      "energy_level": 5,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 2,
      "shedding_level": 1,
      "dog_friendly": 4,
      "social_needs": 5
    },
    "temperamentLabels": [
      "Active",
      "Affectionate",
      "Playful",
      "Quiet"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/cornish-rex/",
      "section": "Personality and activity level",
      "summary": "TICA describes acrobatic play and lap affection but says the breed is usually quiet."
    },
    "sources": [
      "https://tica.org/breed/cornish-rex/"
    ],
    "rationale": {
      "adaptability": "Social companion style supports flexibility when warmth and play are provided.",
      "affection_level": "People-focused affection supports a high estimate.",
      "energy_level": "Persistent running and jumping support very high activity.",
      "intelligence": "Interactive curiosity supports an above-moderate estimate.",
      "child_friendly": "Social profile can suit respectful children.",
      "vocalisation": "TICA says Cornish Rex cats are usually quiet; athletic play does not imply a high vocal need.",
      "grooming": "Delicate wavy coat needs gentle care, not vigorous brushing.",
      "shedding_level": "Sparse coat supports a low loose-hair estimate.",
      "dog_friendly": "Profile explicitly includes cat-friendly dogs.",
      "social_needs": "Prefers companionship over long periods alone."
    },
    "evidenceBasis": "breed-profile"
  },
  "cymr": {
    "name": "Cymric",
    "ratings": {
      "adaptability": 4,
      "affection_level": 4,
      "energy_level": 3,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 3,
      "grooming": 2,
      "shedding_level": 4,
      "dog_friendly": 4,
      "social_needs": 3
    },
    "temperamentLabels": [
      "Affectionate",
      "Calm",
      "Playful",
      "Loyal"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/cymric/",
      "section": "Personality and activity level",
      "summary": "The Cymric shares the Manx's even temperament and family attachment; a soft voice may still be conversational."
    },
    "sources": [
      "https://tica.org/breed/cymric/"
    ],
    "rationale": {
      "adaptability": "Gentle, loyal household style supports reasonable flexibility.",
      "affection_level": "Family devotion supports above-moderate affection.",
      "energy_level": "Enjoys play but is not among the most relentlessly active breeds.",
      "intelligence": "Trainability and interactive play support an above-moderate estimate.",
      "child_friendly": "Gentle character can suit respectful children.",
      "vocalisation": "TICA distinguishes a soft voice from conversational frequency; moderate communication is compatible with gentle trilling.",
      "grooming": "TICA describes mostly weekly combing, with more during shedding seasons; long hair alone does not require a higher burden.",
      "shedding_level": "Dense long coat supports above-moderate seasonal shedding.",
      "dog_friendly": "Social household character can support compatible dogs.",
      "social_needs": "Regular family involvement without exceptional dependence."
    },
    "evidenceBasis": "breed-profile"
  },
  "cypr": {
    "name": "Cyprus",
    "ratings": {
      "adaptability": null,
      "affection_level": null,
      "energy_level": null,
      "intelligence": null,
      "child_friendly": null,
      "vocalisation": null,
      "grooming": null,
      "shedding_level": null,
      "dog_friendly": null,
      "social_needs": null
    },
    "temperamentLabels": [],
    "temperamentEvidence": {
      "source": "https://pubmed.ncbi.nlm.nih.gov/15073370/",
      "section": "Evidence limit",
      "summary": "Temperament labels withheld; see the entry review notes for the evidence limit."
    },
    "sources": [
      "https://pubmed.ncbi.nlm.nih.gov/15073370/",
      "https://en.woc.center/articles/standards-apl/"
    ],
    "rationale": {
      "adaptability": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "affection_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "energy_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "intelligence": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "child_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "vocalisation": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "grooming": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "shedding_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "dog_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "social_needs": "Unavailable: corroborated evidence for this trait is insufficient; see review notes."
    },
    "evidenceBasis": "limited",
    "notes": "Archaeology supports an ancient cat–human association on Cyprus, but not a uniform modern breed temperament or an automatic alias to the pedigree Aphrodite. A population-specific profile is still needed."
  },
  "drex": {
    "name": "Devon Rex",
    "ratings": {
      "adaptability": 5,
      "affection_level": 5,
      "energy_level": 3,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 2,
      "shedding_level": 1,
      "dog_friendly": 4,
      "social_needs": 5
    },
    "temperamentLabels": [
      "Affectionate",
      "Curious",
      "Mischievous",
      "Quiet"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/devon-rex/",
      "section": "Personality and activity level",
      "summary": "TICA describes close household involvement and playful mischief without much talking."
    },
    "sources": [
      "https://tica.org/breed/devon-rex/"
    ],
    "rationale": {
      "adaptability": "Social, interactive household manner supports flexibility.",
      "affection_level": "Close involvement with people supports high affection.",
      "energy_level": "TICA explicitly describes a moderately active cat that enjoys toys; close social involvement is not constant high activity.",
      "intelligence": "Puzzle solving and fetching support an above-moderate estimate.",
      "child_friendly": "Social profile can suit respectful children.",
      "vocalisation": "TICA says Devons are not particularly talkative, with occasional chirps.",
      "grooming": "Fine wavy coat needs gentle upkeep and ear attention.",
      "shedding_level": "Sparse coat supports a low loose-hair estimate.",
      "dog_friendly": "Profile explicitly includes cat-friendly dogs.",
      "social_needs": "Strong interaction needs support substantial companionship."
    },
    "evidenceBasis": "breed-profile"
  },
  "doml": {
    "name": "Domestic Longhair",
    "ratings": {
      "adaptability": null,
      "affection_level": null,
      "energy_level": null,
      "intelligence": null,
      "child_friendly": null,
      "vocalisation": null,
      "grooming": 4,
      "shedding_level": null,
      "dog_friendly": null,
      "social_needs": null
    },
    "temperamentLabels": [],
    "temperamentEvidence": {
      "source": "https://www.pdsa.org.uk/pet-help-and-advice/looking-after-your-pet/kittens-cats/domestic-breeds",
      "section": "Evidence limit",
      "summary": "Temperament labels withheld; see the entry review notes for the evidence limit."
    },
    "sources": [
      "https://www.pdsa.org.uk/pet-help-and-advice/looking-after-your-pet/kittens-cats/domestic-breeds",
      "https://www.cats.org.uk/help-and-advice/caring-for-your-cat/grooming"
    ],
    "rationale": {
      "adaptability": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "affection_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "energy_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "intelligence": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "child_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "vocalisation": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "grooming": "Cats Protection recommends daily care for long coats; substantial routine maintenance is supported without assuming Persian-level coat density.",
      "shedding_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "dog_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "social_needs": "Unavailable: corroborated evidence for this trait is insufficient; see review notes."
    },
    "evidenceBasis": "mixed-population",
    "notes": "Domestic Longhair is a diverse coat-length population. Daily long-coat care is supported; temperament and shedding amount cannot be inferred from hair length."
  },
  "domm": {
    "name": "Domestic Mediumhair",
    "ratings": {
      "adaptability": null,
      "affection_level": null,
      "energy_level": null,
      "intelligence": null,
      "child_friendly": null,
      "vocalisation": null,
      "grooming": null,
      "shedding_level": null,
      "dog_friendly": null,
      "social_needs": null
    },
    "temperamentLabels": [],
    "temperamentEvidence": {
      "source": "https://www.pdsa.org.uk/pet-help-and-advice/looking-after-your-pet/kittens-cats/domestic-breeds",
      "section": "Evidence limit",
      "summary": "Temperament labels withheld; see the entry review notes for the evidence limit."
    },
    "sources": [
      "https://www.pdsa.org.uk/pet-help-and-advice/looking-after-your-pet/kittens-cats/domestic-breeds",
      "https://www.cats.org.uk/help-and-advice/caring-for-your-cat/grooming"
    ],
    "rationale": {
      "adaptability": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "affection_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "energy_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "intelligence": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "child_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "vocalisation": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "grooming": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "shedding_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "dog_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "social_needs": "Unavailable: corroborated evidence for this trait is insufficient; see review notes."
    },
    "evidenceBasis": "mixed-population",
    "notes": "Domestic Mediumhair is a diverse coat-length population. Individual coat density, shedding, grooming effort and temperament vary too much for one numerical profile."
  },
  "doms": {
    "name": "Domestic Shorthair",
    "ratings": {
      "adaptability": null,
      "affection_level": null,
      "energy_level": null,
      "intelligence": null,
      "child_friendly": null,
      "vocalisation": null,
      "grooming": 2,
      "shedding_level": null,
      "dog_friendly": null,
      "social_needs": null
    },
    "temperamentLabels": [],
    "temperamentEvidence": {
      "source": "https://www.pdsa.org.uk/pet-help-and-advice/looking-after-your-pet/kittens-cats/domestic-breeds",
      "section": "Evidence limit",
      "summary": "Temperament labels withheld; see the entry review notes for the evidence limit."
    },
    "sources": [
      "https://www.pdsa.org.uk/pet-help-and-advice/looking-after-your-pet/kittens-cats/domestic-breeds",
      "https://www.cats.org.uk/help-and-advice/caring-for-your-cat/grooming"
    ],
    "rationale": {
      "adaptability": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "affection_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "energy_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "intelligence": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "child_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "vocalisation": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "grooming": "Cats Protection supports light weekly short-coat brushing; adjust to the individual.",
      "shedding_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "dog_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "social_needs": "Unavailable: corroborated evidence for this trait is insufficient; see review notes."
    },
    "evidenceBasis": "mixed-population",
    "notes": "Domestic Shorthair is a diverse coat-length population, not a single personality. Short-coat grooming can be estimated; behavioural and shedding variation cannot be represented by a neutral three."
  },
  "dons": {
    "name": "Donskoy",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 4,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 3,
      "grooming": 4,
      "shedding_level": 1,
      "dog_friendly": 4,
      "social_needs": 5
    },
    "temperamentLabels": [
      "Affectionate",
      "Sociable",
      "Playful",
      "Interactive"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/donskoy/",
      "section": "Personality and activity level",
      "summary": "The direct Donskoy profile supports social family involvement and play, independently of its coat."
    },
    "sources": [
      "https://tica.org/breed/donskoy/"
    ],
    "rationale": {
      "adaptability": "Good-natured, social disposition supports household flexibility.",
      "affection_level": "Loving handling and companionship support high affection.",
      "energy_level": "Exploration and movement support high activity.",
      "intelligence": "Clever, inquisitive character supports an above-moderate estimate.",
      "child_friendly": "Gentle social character can suit respectful children.",
      "vocalisation": "Moderate vocalization is an editorial estimate.",
      "grooming": "Hairless skin and ears need regular care despite little brushing.",
      "shedding_level": "Little coat hair to shed; not an allergen claim.",
      "dog_friendly": "Social profile may support compatible dogs.",
      "social_needs": "Frequent social contact is desirable."
    },
    "evidenceBasis": "breed-profile",
    "groomingCare": "skin"
  },
  "lihu": {
    "name": "Dragon Li",
    "ratings": {
      "adaptability": 3,
      "affection_level": 4,
      "energy_level": 4,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 1,
      "shedding_level": 3,
      "dog_friendly": 4,
      "social_needs": 3
    },
    "temperamentLabels": [
      "Active",
      "Independent",
      "Curious"
    ],
    "temperamentEvidence": {
      "source": "https://www.catster.com/cat-breeds/chinese-dragon-li-cat/",
      "section": "Personality and activity level",
      "summary": "The source describes an exploring, hunting-oriented cat with an independent streak; no superlative trainability claim."
    },
    "sources": [
      "https://www.catster.com/cat-breeds/chinese-dragon-li-cat/"
    ],
    "rationale": {
      "adaptability": "Use a moderate estimate for an independent natural-breed profile.",
      "affection_level": "Affectionate family interaction supports above-moderate closeness.",
      "energy_level": "Active exploration supports high activity.",
      "intelligence": "Learning and problem-solving descriptions support an above-moderate estimate.",
      "child_friendly": "Gentle, playful family profile can suit respectful children.",
      "vocalisation": "Lower vocal demand is an editorial estimate.",
      "grooming": "Short coat needs simple routine grooming.",
      "shedding_level": "Moderate short-coat shedding is an editorial estimate.",
      "dog_friendly": "Social profile describes compatibility with carefully introduced dogs.",
      "social_needs": "Regular contact balanced with independent activity."
    },
    "evidenceBasis": "breed-profile"
  },
  "dwel": {
    "name": "Dwelf",
    "ratings": {
      "adaptability": null,
      "affection_level": null,
      "energy_level": null,
      "intelligence": null,
      "child_friendly": null,
      "vocalisation": null,
      "grooming": 4,
      "shedding_level": 1,
      "dog_friendly": null,
      "social_needs": null
    },
    "temperamentLabels": [],
    "temperamentEvidence": {
      "source": "https://www.wrinklebottom.com/elf-bambino-dwelf-minskin-hairless-hybrids/",
      "section": "Evidence limit",
      "summary": "Temperament labels withheld; see the entry review notes for the evidence limit."
    },
    "sources": [
      "https://www.wrinklebottom.com/elf-bambino-dwelf-minskin-hairless-hybrids/",
      "https://www.petmd.com/cat/breeds/sphynx"
    ],
    "rationale": {
      "adaptability": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "affection_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "energy_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "intelligence": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "child_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "vocalisation": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "grooming": "Related hairless-care guidance supports regular skin and ear care; adjust the routine to actual fur coverage with a vet.",
      "shedding_level": "Very sparse coat supports low hair shedding; this does not imply low allergens or low skin-care needs.",
      "dog_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "social_needs": "Unavailable: corroborated evidence for this trait is insufficient; see review notes."
    },
    "evidenceBasis": "related-breed",
    "groomingCare": "skin",
    "notes": "Only near-bare coat care is estimated. Three parent breeds and the API care sentence do not establish behaviour."
  },
  "emau": {
    "name": "Egyptian Mau",
    "ratings": {
      "adaptability": 3,
      "affection_level": 4,
      "energy_level": 5,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 3,
      "grooming": 1,
      "shedding_level": 3,
      "dog_friendly": 3,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Active",
      "Loyal",
      "Playful",
      "Reserved"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/egyptian-mau/",
      "section": "Personality and activity level",
      "summary": "The source supports athletic play and attachment to familiar people, with reserve around unfamiliar situations."
    },
    "sources": [
      "https://tica.org/breed/egyptian-mau/"
    ],
    "rationale": {
      "adaptability": "Reserved reaction to strangers and surprises suggests moderate flexibility.",
      "affection_level": "Strong family bonds and lap time support affection.",
      "energy_level": "Athletic climbing and running support very high activity.",
      "intelligence": "Opening doors and drawers supports an above-moderate estimate.",
      "child_friendly": "Can suit playful children who respect its sensitivity.",
      "vocalisation": "Trills and conversation suggest moderate vocalization.",
      "grooming": "Short coat needs simple routine brushing.",
      "shedding_level": "Moderate seasonal shedding is an editorial estimate.",
      "dog_friendly": "Compatible pets may be accepted; sensitivity warrants a moderate estimate.",
      "social_needs": "Devotion to family supports regular companionship."
    },
    "evidenceBasis": "breed-profile"
  },
  "elfc": {
    "name": "Elf Cat",
    "ratings": {
      "adaptability": null,
      "affection_level": null,
      "energy_level": null,
      "intelligence": null,
      "child_friendly": null,
      "vocalisation": null,
      "grooming": 4,
      "shedding_level": 1,
      "dog_friendly": null,
      "social_needs": null
    },
    "temperamentLabels": [],
    "temperamentEvidence": {
      "source": "https://www.wrinklebottom.com/elf-bambino-dwelf-minskin-hairless-hybrids/",
      "section": "Evidence limit",
      "summary": "Temperament labels withheld; see the entry review notes for the evidence limit."
    },
    "sources": [
      "https://www.wrinklebottom.com/elf-bambino-dwelf-minskin-hairless-hybrids/",
      "https://www.petmd.com/cat/breeds/sphynx"
    ],
    "rationale": {
      "adaptability": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "affection_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "energy_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "intelligence": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "child_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "vocalisation": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "grooming": "Related hairless-care guidance supports regular skin and ear care; adjust the routine to actual fur coverage with a vet.",
      "shedding_level": "Very sparse coat supports low hair shedding; this does not imply low allergens or low skin-care needs.",
      "dog_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "social_needs": "Unavailable: corroborated evidence for this trait is insufficient; see review notes."
    },
    "evidenceBasis": "related-breed",
    "groomingCare": "skin",
    "notes": "Only near-bare coat care is estimated. Curled ears and Sphynx ancestry do not establish personality."
  },
  "ebur": {
    "name": "European Burmese",
    "ratings": {
      "adaptability": 5,
      "affection_level": 5,
      "energy_level": 4,
      "intelligence": 5,
      "child_friendly": 5,
      "vocalisation": 4,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 5
    },
    "temperamentLabels": [
      "Affectionate",
      "Sociable",
      "Playful",
      "Interactive"
    ],
    "temperamentEvidence": {
      "source": "https://cfa.org/breed/european-burmese/",
      "section": "Personality and activity level",
      "summary": "CFA describes a closely involved, playful family companion; the European form has its own direct profile."
    },
    "sources": [
      "https://cfa.org/breed/european-burmese/"
    ],
    "rationale": {
      "adaptability": "Outgoing, companion-oriented character supports flexible household adjustment.",
      "affection_level": "Strong loyalty and physical affection support a high estimate.",
      "energy_level": "Playful interaction supports high activity.",
      "intelligence": "Intelligent, responsive character supports a high estimate.",
      "child_friendly": "Friendly family-companion profile supports respectful children.",
      "vocalisation": "Conversational Burmese-group communication supports an above-moderate estimate.",
      "grooming": "Short silky coat generally needs minimal combing.",
      "shedding_level": "Lower loose-hair burden is an editorial estimate.",
      "dog_friendly": "Social character can support compatible dogs.",
      "social_needs": "Strong desire for involvement supports high social needs."
    },
    "evidenceBasis": "breed-profile"
  },
  "eshr": {
    "name": "European Shorthair",
    "ratings": {
      "adaptability": 4,
      "affection_level": 3,
      "energy_level": 3,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 1,
      "shedding_level": 3,
      "dog_friendly": 3,
      "social_needs": 3
    },
    "temperamentLabels": [
      "Adaptable",
      "Curious",
      "Playful",
      "Calm"
    ],
    "temperamentEvidence": {
      "source": "https://fifeweb.org/wp-content/uploads/2026/05/Breed-Profile-EUR.pdf",
      "section": "Temperament",
      "summary": "FIFe's breed council profile describes a balanced, curious cat suited to an active family, with moderate activity."
    },
    "sources": [
      "https://fifeweb.org/wp-content/uploads/2026/05/Breed-Profile-EUR.pdf"
    ],
    "rationale": {
      "adaptability": "FIFe describes a balanced, adaptable cat able to handle an active family environment.",
      "affection_level": "Friendly companion profile without exceptional dependence.",
      "energy_level": "FIFe explicitly describes medium activity with ordinary hunting-style play.",
      "intelligence": "FIFe's breed council profile directly describes intelligence, curiosity and mental agility; an above-moderate editorial estimate is now supported.",
      "child_friendly": "Sweet temperament can suit respectful children.",
      "vocalisation": "Lower vocal demand is a provisional estimate.",
      "grooming": "Short dense coat needs simple routine grooming.",
      "shedding_level": "Moderate seasonal shedding is an editorial estimate.",
      "dog_friendly": "Moderate provisional estimate; individual introductions matter.",
      "social_needs": "Regular company balanced with independent activity."
    },
    "evidenceBasis": "breed-profile",
    "notes": "Reviewed against the FIFe breed council profile; this pedigree European is distinct from a generic domestic shorthair population."
  },
  "exlh": {
    "name": "Exotic Longhair",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 2,
      "intelligence": 3,
      "child_friendly": 4,
      "vocalisation": 1,
      "grooming": 5,
      "shedding_level": 5,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Gentle",
      "Quiet",
      "Calm"
    ],
    "temperamentEvidence": {
      "source": "https://cfa.org/breed/exotic/",
      "section": "Personality and activity level",
      "summary": "CFA's Exotic personality description also informs the longhair; coat length provides no evidence of different affection or sociability."
    },
    "sources": [
      "https://cfa.org/breed/exotic/",
      "https://tica.org/breed/exotic-shorthair/",
      "https://tica.org/breed/persian/"
    ],
    "rationale": {
      "adaptability": "Persian-group companion context supports predictable-home adjustment.",
      "affection_level": "Use the same Exotic companion estimate as the shorthaired form; CFA's shared profile supplies no reason for less affection.",
      "energy_level": "Quiet, settled Persian-group style suggests lower activity.",
      "intelligence": "Moderate editorial estimate without comparative cognitive evidence.",
      "child_friendly": "Use the shared Exotic estimate for respectfully handled children; coat length does not establish compatibility.",
      "vocalisation": "Quiet Persian-group communication supports low vocalization.",
      "grooming": "Long dense Persian-type coat needs intensive combing.",
      "shedding_level": "Dense long coat supports a high seasonal loose-hair estimate.",
      "dog_friendly": "CFA describes carefully introduced coexistence with dogs for Exotics; use the same estimate as the shorthaired form.",
      "social_needs": "Use the same Exotic companionship estimate as the shorthaired form; a long coat does not establish lower social needs."
    },
    "evidenceBasis": "related-breed",
    "notes": "Longhair Exotic classification verified in CFA. Behaviour agrees with the shorthaired Exotic; dense long-coat care remains distinct."
  },
  "esho": {
    "name": "Exotic Shorthair",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 2,
      "intelligence": 3,
      "child_friendly": 4,
      "vocalisation": 1,
      "grooming": 2,
      "shedding_level": 4,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Gentle",
      "Quiet",
      "Calm"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/exotic-shorthair/",
      "section": "Personality and activity level",
      "summary": "TICA describes a gentle, quiet companion with some playfulness and close family contact."
    },
    "sources": [
      "https://tica.org/breed/exotic-shorthair/"
    ],
    "rationale": {
      "adaptability": "Gentle companion disposition supports predictable-home adjustment.",
      "affection_level": "Affectionate Persian-related character supports high affection.",
      "energy_level": "Quiet but somewhat livelier than Persian; still low activity.",
      "intelligence": "Moderate editorial estimate without comparative cognitive evidence.",
      "child_friendly": "Gentle character can suit respectful children.",
      "vocalisation": "Quiet manners support the lowest vocal category.",
      "grooming": "Short coat reduces combing work relative to Persian.",
      "shedding_level": "Dense plush coat still supports above-moderate loose hair.",
      "dog_friendly": "Gentle household character can support compatible dogs.",
      "social_needs": "Affectionate companion style suggests regular company."
    },
    "evidenceBasis": "breed-profile"
  },
  "fold": {
    "name": "Foldex",
    "ratings": {
      "adaptability": 4,
      "affection_level": 4,
      "energy_level": 3,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 2,
      "shedding_level": 4,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Gentle",
      "Playful",
      "Calm"
    ],
    "temperamentEvidence": {
      "source": "https://www.catster.com/cat-breeds/foldex-cat-exotic-fold/",
      "section": "Personality and activity level",
      "summary": "The profile supports gentle interaction and ordinary play; this is not a promise of tolerance for rough handling."
    },
    "sources": [
      "https://www.catster.com/cat-breeds/foldex-cat-exotic-fold/"
    ],
    "rationale": {
      "adaptability": "Confident, approachable disposition supports household flexibility.",
      "affection_level": "Enjoys attention and interaction with family.",
      "energy_level": "Playfulness balanced with patience suggests moderate activity.",
      "intelligence": "Basic trick learning supports an above-moderate estimate.",
      "child_friendly": "Gentle character can suit respectful children.",
      "vocalisation": "Quiet, patient profile supports lower vocal demand.",
      "grooming": "Plush short coat needs routine brushing.",
      "shedding_level": "Dense coat suggests above-moderate seasonal loose hair.",
      "dog_friendly": "Sociable character may support compatible dogs.",
      "social_needs": "Enjoys regular attention and family participation."
    },
    "evidenceBasis": "breed-profile"
  },
  "gene": {
    "name": "Genetta",
    "ratings": {
      "adaptability": null,
      "affection_level": null,
      "energy_level": null,
      "intelligence": null,
      "child_friendly": null,
      "vocalisation": null,
      "grooming": null,
      "shedding_level": null,
      "dog_friendly": null,
      "social_needs": null
    },
    "temperamentLabels": [],
    "temperamentEvidence": {
      "source": "https://www.munchkincatguide.com/the-munchkin-cat-bengal-mix-the-genetta/",
      "section": "Evidence limit",
      "summary": "Temperament labels withheld; see the entry review notes for the evidence limit."
    },
    "sources": [
      "https://www.munchkincatguide.com/the-munchkin-cat-bengal-mix-the-genetta/"
    ],
    "rationale": {
      "adaptability": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "affection_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "energy_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "intelligence": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "child_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "vocalisation": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "grooming": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "shedding_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "dog_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "social_needs": "Unavailable: corroborated evidence for this trait is insufficient; see review notes."
    },
    "evidenceBasis": "limited",
    "notes": "Available accounts describe an experimental project, but an independent standard and substantive care/behaviour evidence could not be corroborated. Parent-breed traits alone are insufficient."
  },
  "germ": {
    "name": "German Rex",
    "ratings": {
      "adaptability": 4,
      "affection_level": 4,
      "energy_level": 4,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 3,
      "grooming": 3,
      "shedding_level": 1,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Active",
      "Playful",
      "Intelligent"
    ],
    "temperamentEvidence": {
      "source": "https://www.petmd.com/cat/breeds/c_ct_german_rex_cat",
      "section": "Personality and activity level",
      "summary": "PetMD describes an active, friendly cat that can learn games and also seeks quiet petting."
    },
    "sources": [
      "https://www.petmd.com/cat/breeds/c_ct_german_rex_cat"
    ],
    "rationale": {
      "adaptability": "Friendly people-oriented disposition supports household flexibility.",
      "affection_level": "Affectionate companionship supports above-moderate closeness.",
      "energy_level": "Playfulness supports high activity.",
      "intelligence": "Curiosity and interactive play support an above-moderate estimate.",
      "child_friendly": "Friendly character can suit respectful children.",
      "vocalisation": "Moderate communication is an editorial estimate.",
      "grooming": "Gentle coat care plus attention to skin oils and ears warrants a moderate maintenance estimate.",
      "shedding_level": "Sparse rex coat supports a lower loose-hair estimate.",
      "dog_friendly": "Social character may support compatible dogs.",
      "social_needs": "People-oriented disposition suggests regular interaction."
    },
    "evidenceBasis": "breed-profile"
  },
  "hbro": {
    "name": "Havana Brown",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 3,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 3,
      "social_needs": 5
    },
    "temperamentLabels": [
      "Affectionate",
      "Curious",
      "Interactive",
      "Playful"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/havana/",
      "section": "Personality and activity level",
      "summary": "TICA describes close attention to people, investigation and interactive games."
    },
    "sources": [
      "https://tica.org/breed/havana/"
    ],
    "rationale": {
      "adaptability": "Gentle companion character can adjust to attentive homes.",
      "affection_level": "Seeks close contact and frequent attention.",
      "energy_level": "Curiosity and play balanced with lap time suggest moderate activity.",
      "intelligence": "Puzzle toys and tricks support an above-moderate estimate.",
      "child_friendly": "Gentle character can suit respectful children.",
      "vocalisation": "Soft conversation supports lower vocalization.",
      "grooming": "Short coat needs minimal routine combing.",
      "shedding_level": "Lower hair burden is an editorial estimate.",
      "dog_friendly": "Moderate estimate; direct dog-specific evidence is limited.",
      "social_needs": "Strong attention-seeking attachment supports high social needs."
    },
    "evidenceBasis": "breed-profile"
  },
  "high": {
    "name": "Highlander",
    "ratings": {
      "adaptability": 4,
      "affection_level": 4,
      "energy_level": 5,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 1,
      "grooming": 2,
      "shedding_level": 3,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Active",
      "Confident",
      "Playful",
      "Quiet"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/highlander/",
      "section": "Personality and activity level",
      "summary": "TICA distinguishes physically energetic chase games from a relatively quiet voice."
    },
    "sources": [
      "https://tica.org/breed/highlander/"
    ],
    "rationale": {
      "adaptability": "Confident, people-friendly manner supports adjustment.",
      "affection_level": "Enjoys human company and attention.",
      "energy_level": "Frequent chasing and play support very high activity.",
      "intelligence": "Interactive curiosity supports an above-moderate estimate.",
      "child_friendly": "Friendly domestic companion profile can suit respectful children.",
      "vocalisation": "Profile explicitly describes a relatively quiet voice.",
      "grooming": "Routine care estimate; coat length varies.",
      "shedding_level": "Moderate estimate for varied coat types.",
      "dog_friendly": "Social disposition can support compatible dogs.",
      "social_needs": "Likes involvement and attention from family."
    },
    "evidenceBasis": "breed-profile"
  },
  "hima": {
    "name": "Himalayan",
    "ratings": {
      "adaptability": 4,
      "affection_level": 4,
      "energy_level": 2,
      "intelligence": 3,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 5,
      "shedding_level": 5,
      "dog_friendly": 3,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Calm",
      "Gentle",
      "Quiet",
      "Affectionate"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/himalayan/",
      "section": "Personality and activity level",
      "summary": "TICA describes an easygoing, sofa-sharing cat that prefers a calm environment but can enjoy toys."
    },
    "sources": [
      "https://tica.org/breed/himalayan/"
    ],
    "rationale": {
      "adaptability": "Easygoing disposition supports routine changes when handled gently.",
      "affection_level": "Enjoys lap time and nearby family companionship.",
      "energy_level": "Placid style with short play bursts suggests lower activity.",
      "intelligence": "Moderate editorial estimate without comparative cognitive evidence.",
      "child_friendly": "Gentle households and respectful children are a reasonable fit.",
      "vocalisation": "Soft communication supports lower vocalization.",
      "grooming": "Long Persian-type coat requires intensive maintenance.",
      "shedding_level": "Dense long coat supports high seasonal loose hair.",
      "dog_friendly": "Moderate estimate for calm, carefully introduced dogs.",
      "social_needs": "Regular close companionship is desirable."
    },
    "evidenceBasis": "breed-profile"
  },
  "jbob": {
    "name": "Japanese Bobtail",
    "ratings": {
      "adaptability": 5,
      "affection_level": 4,
      "energy_level": 5,
      "intelligence": 5,
      "child_friendly": 4,
      "vocalisation": 4,
      "grooming": 2,
      "shedding_level": 2,
      "dog_friendly": 5,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Active",
      "Intelligent",
      "Playful",
      "Talkative"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/japanese-bobtail/",
      "section": "Personality and activity level",
      "summary": "TICA describes exploration, learning and a wide range of songlike chirps and meows."
    },
    "sources": [
      "https://tica.org/breed/japanese-bobtail/"
    ],
    "rationale": {
      "adaptability": "Outgoing companion character supports household flexibility.",
      "affection_level": "Loving participation supports above-moderate affection.",
      "energy_level": "Constant exploring and agility play support very high activity.",
      "intelligence": "Trick learning and interactive exploration support a high estimate.",
      "child_friendly": "Active family profile can suit respectful children.",
      "vocalisation": "Frequent chirps and meows support above-moderate vocalization.",
      "grooming": "Silky coat generally needs light routine combing.",
      "shedding_level": "Lower coat-hair burden is an editorial estimate.",
      "dog_friendly": "Profile explicitly describes getting along with dogs.",
      "social_needs": "People-oriented play suggests frequent interaction."
    },
    "evidenceBasis": "breed-profile"
  },
  "java": {
    "name": "Javanese",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 5,
      "intelligence": 5,
      "child_friendly": 4,
      "vocalisation": 4,
      "grooming": 2,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 5
    },
    "temperamentLabels": [
      "Affectionate",
      "Active",
      "Interactive",
      "Talkative"
    ],
    "temperamentEvidence": {
      "source": "https://cfa.org/breed/balinese/",
      "section": "Personality and activity level",
      "summary": "CFA's Balinese/Javanese account supports playful close involvement; the colour division is not a separate personality."
    },
    "sources": [
      "https://cfa.org/breed/balinese/",
      "https://tica.org/breed/balinese/"
    ],
    "rationale": {
      "adaptability": "Uses the interactive Balinese/Siamese-group companion estimate.",
      "affection_level": "Closely bonded companion background supports high affection.",
      "energy_level": "Athletic group profile supports very high activity.",
      "intelligence": "Inquisitive group character supports a high learning estimate.",
      "child_friendly": "Social group character can suit respectful children.",
      "vocalisation": "Use the related Balinese estimate: conversational but softer and less insistent than the Siamese.",
      "grooming": "Fine semi-long coat needs light routine combing.",
      "shedding_level": "Lower loose-hair estimate for fine semi-long coat.",
      "dog_friendly": "Social group character can support compatible dogs.",
      "social_needs": "Strong Siamese-group companionship needs."
    },
    "evidenceBasis": "related-breed",
    "notes": "Javanese is treated as the related longhaired colorpoint variety; colour does not imply a distinct temperament."
  },
  "kana": {
    "name": "Kanaani",
    "ratings": {
      "adaptability": null,
      "affection_level": null,
      "energy_level": null,
      "intelligence": null,
      "child_friendly": null,
      "vocalisation": null,
      "grooming": 2,
      "shedding_level": null,
      "dog_friendly": null,
      "social_needs": null
    },
    "temperamentLabels": [],
    "temperamentEvidence": {
      "source": "https://wcf.de/pdf-en/breed/KAN_en_2010-01-01.pdf",
      "section": "Evidence limit",
      "summary": "Temperament labels withheld; see the entry review notes for the evidence limit."
    },
    "sources": [
      "https://wcf.de/pdf-en/breed/KAN_en_2010-01-01.pdf",
      "https://www.cats.org.uk/help-and-advice/caring-for-your-cat/grooming"
    ],
    "rationale": {
      "adaptability": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "affection_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "energy_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "intelligence": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "child_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "vocalisation": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "grooming": "A documented short coat plus general short-coat care guidance supports light routine grooming; other traits remain unavailable.",
      "shedding_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "dog_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "social_needs": "Unavailable: corroborated evidence for this trait is insufficient; see review notes."
    },
    "evidenceBasis": "limited",
    "notes": "WCF documents conformation and a short coat. Its body type and ancestry do not establish behaviour, child/dog compatibility or shedding amount."
  },
  "khao": {
    "name": "Khao Manee",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 4,
      "intelligence": 5,
      "child_friendly": 4,
      "vocalisation": 4,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 5
    },
    "temperamentLabels": [
      "Affectionate",
      "Curious",
      "Playful",
      "Talkative"
    ],
    "temperamentEvidence": {
      "source": "https://cfa.org/breed/khao-manee/",
      "section": "Personality and activity level",
      "summary": "CFA supports an inquisitive, socially involved cat; calm and relaxed do not represent its usual activity level."
    },
    "sources": [
      "https://cfa.org/breed/khao-manee/"
    ],
    "rationale": {
      "adaptability": "Friendly, social confidence supports household flexibility.",
      "affection_level": "Lap and shoulder companionship support high affection.",
      "energy_level": "Athletic games and exploration support high activity.",
      "intelligence": "Inquisitive learning and fetching support a high estimate.",
      "child_friendly": "Playful sociability can suit respectful children.",
      "vocalisation": "Varied expressive communication supports above-moderate vocalization.",
      "grooming": "Short coat needs simple routine care.",
      "shedding_level": "Lower loose-hair burden is an editorial estimate.",
      "dog_friendly": "Social profile includes other household pets.",
      "social_needs": "Close involvement with people suggests substantial companionship."
    },
    "evidenceBasis": "breed-profile"
  },
  "kora": {
    "name": "Korat",
    "ratings": {
      "adaptability": 3,
      "affection_level": 5,
      "energy_level": 4,
      "intelligence": 5,
      "child_friendly": 3,
      "vocalisation": 3,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 3,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Sensitive",
      "Playful",
      "Intelligent"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/korat/",
      "section": "Personality and activity level",
      "summary": "TICA describes close bonds, awareness of household changes and learning; vocal behaviour varies between individuals."
    },
    "sources": [
      "https://tica.org/breed/korat/"
    ],
    "rationale": {
      "adaptability": "Preference for familiar people and routines suggests moderate flexibility.",
      "affection_level": "Strong loyalty and warm lap contact support high affection.",
      "energy_level": "Energetic fetching and exploration support high activity.",
      "intelligence": "Trick learning and inquisitiveness support a high estimate.",
      "child_friendly": "Moderate estimate for respectful handling rather than noisy rough play.",
      "vocalisation": "Expressive communication suggests moderate vocalization.",
      "grooming": "Short coat needs minimal routine care.",
      "shedding_level": "Lower loose-hair burden is an editorial estimate.",
      "dog_friendly": "Moderate estimate; individual introductions matter.",
      "social_needs": "Seeks attention and regular family participation."
    },
    "evidenceBasis": "breed-profile"
  },
  "kuri": {
    "name": "Kurilian Bobtail",
    "ratings": {
      "adaptability": 5,
      "affection_level": 4,
      "energy_level": 3,
      "intelligence": 5,
      "child_friendly": 5,
      "vocalisation": 3,
      "grooming": 2,
      "shedding_level": 3,
      "dog_friendly": 5,
      "social_needs": 3
    },
    "temperamentLabels": [
      "Adaptable",
      "Playful",
      "Gentle",
      "Intelligent"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/kurilian-bobtail/",
      "section": "Personality and activity level",
      "summary": "TICA describes moderate activity, social adaptability and learning, without requiring an independent or solitary label."
    },
    "sources": [
      "https://tica.org/breed/kurilian-bobtail/"
    ],
    "rationale": {
      "adaptability": "Profile explicitly describes adjustment to varied household companions.",
      "affection_level": "Affectionate lap and bedtime contact support closeness.",
      "energy_level": "Profile describes a moderate activity level.",
      "intelligence": "Quick learning and curiosity support a high estimate.",
      "child_friendly": "Gentle household profile supports a high estimate for respectful children.",
      "vocalisation": "Talkative but not assigned the most insistent category.",
      "grooming": "Coat is described as relatively resistant to tangles.",
      "shedding_level": "Moderate seasonal loose hair is an editorial estimate.",
      "dog_friendly": "Profile explicitly includes compatible dogs.",
      "social_needs": "Sociability balanced with an independent character."
    },
    "evidenceBasis": "breed-profile"
  },
  "lape": {
    "name": "LaPerm",
    "ratings": {
      "adaptability": 5,
      "affection_level": 5,
      "energy_level": 4,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 2,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Gentle",
      "Playful",
      "Quiet"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/laperm/",
      "section": "Personality and activity level",
      "summary": "TICA emphasises lap contact, gentle play and a voice that is not generally frequent."
    },
    "sources": [
      "https://tica.org/breed/laperm/"
    ],
    "rationale": {
      "adaptability": "Easygoing, companion-oriented temperament supports flexibility.",
      "affection_level": "Strong lap-oriented affection supports a high estimate.",
      "energy_level": "Active curiosity and sustained play support high activity.",
      "intelligence": "Alert, curious behaviour supports an above-moderate estimate.",
      "child_friendly": "Gentle social profile can suit respectful children.",
      "vocalisation": "Profile describes relatively little vocalization.",
      "grooming": "Curly coat is described as relatively low maintenance.",
      "shedding_level": "Lower loose-hair burden is an editorial coat estimate.",
      "dog_friendly": "Profile includes cat-friendly dogs as potential companions.",
      "social_needs": "Regular company is preferred over frequent long absences."
    },
    "evidenceBasis": "breed-profile"
  },
  "lyko": {
    "name": "Lykoi",
    "ratings": {
      "adaptability": 3,
      "affection_level": 4,
      "energy_level": 5,
      "intelligence": 4,
      "child_friendly": 3,
      "vocalisation": 2,
      "grooming": 3,
      "shedding_level": 4,
      "dog_friendly": 3,
      "social_needs": 3
    },
    "temperamentLabels": [
      "Active",
      "Curious",
      "Playful",
      "Reserved"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/lykoi/",
      "section": "Personality and activity level",
      "summary": "The profile supports investigation and hunting games with an initially cautious approach to unfamiliar people."
    },
    "sources": [
      "https://tica.org/breed/lykoi/"
    ],
    "rationale": {
      "adaptability": "Use a moderate estimate for a cautious, exploratory character.",
      "affection_level": "Loyal bonds and warm lap contact support affection.",
      "energy_level": "Sustained hunting-style play supports very high activity.",
      "intelligence": "Problem-solving play supports an above-moderate estimate.",
      "child_friendly": "Moderate estimate; individual socialization and gentle handling matter.",
      "vocalisation": "Lower vocal demand is an editorial estimate.",
      "grooming": "Partially hairless skin and changing coat require regular attention.",
      "shedding_level": "Coat cycling can cause substantial loose hair despite sparse coverage.",
      "dog_friendly": "Moderate estimate; dog-like play is not evidence of dog compatibility.",
      "social_needs": "Enjoys people while also entertaining itself."
    },
    "evidenceBasis": "breed-profile"
  },
  "mcoo": {
    "name": "Maine Coon",
    "ratings": {
      "adaptability": 4,
      "affection_level": 4,
      "energy_level": 3,
      "intelligence": 4,
      "child_friendly": 5,
      "vocalisation": 2,
      "grooming": 3,
      "shedding_level": 4,
      "dog_friendly": 5,
      "social_needs": 3
    },
    "temperamentLabels": [
      "Gentle",
      "Affectionate",
      "Playful",
      "Independent"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/maine-coon/",
      "section": "Personality and activity level",
      "summary": "TICA describes a friendly household companion that enjoys company without demanding constant attention."
    },
    "sources": [
      "https://tica.org/breed/maine-coon/",
      "https://cfa.org/breed/maine-coon/"
    ],
    "rationale": {
      "adaptability": "Sociable with family members and often comfortable with other household animals.",
      "affection_level": "Enjoys company while retaining some independence.",
      "energy_level": "A moderate estimate for a playful companion that also settles with the family.",
      "intelligence": "Problem-solving play and curiosity support an above-moderate estimate.",
      "child_friendly": "Generally described as getting along well with children, with supervised handling.",
      "vocalisation": "Often chirps or trills, but is not usually an insistent talker.",
      "grooming": "TICA describes weekly care for silky coats and daily combing for cottony coats; moderate overall effort represents this variation better than a uniformly high burden.",
      "shedding_level": "A substantial coat supports an above-moderate shedding estimate.",
      "dog_friendly": "Often suits households with compatible dogs and careful introductions.",
      "social_needs": "Values family interaction while retaining a degree of independence."
    },
    "evidenceBasis": "breed-profile"
  },
  "mala": {
    "name": "Malayan",
    "ratings": {
      "adaptability": null,
      "affection_level": null,
      "energy_level": null,
      "intelligence": null,
      "child_friendly": null,
      "vocalisation": null,
      "grooming": null,
      "shedding_level": null,
      "dog_friendly": null,
      "social_needs": null
    },
    "temperamentLabels": [],
    "temperamentEvidence": {
      "source": "https://www.zoetispetcare.com/breed-explorer/breed/asian",
      "section": "Evidence limit",
      "summary": "Temperament labels withheld; see the entry review notes for the evidence limit."
    },
    "sources": [
      "https://www.zoetispetcare.com/breed-explorer/breed/asian",
      "https://www.gccfcats.org/getting-a-cat/choosing/cat-breeds/asian/"
    ],
    "rationale": {
      "adaptability": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "affection_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "energy_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "intelligence": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "child_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "vocalisation": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "grooming": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "shedding_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "dog_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "social_needs": "Unavailable: corroborated evidence for this trait is insufficient; see review notes."
    },
    "evidenceBasis": "related-breed",
    "notes": "This label has inconsistent historical and modern usage. A veterinary breed guide uses it as an Asian nickname; a separate profile needs the API identity clarified before assigning facts or temperament."
  },
  "manx": {
    "name": "Manx",
    "ratings": {
      "adaptability": 4,
      "affection_level": 4,
      "energy_level": 3,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 3,
      "grooming": 2,
      "shedding_level": 4,
      "dog_friendly": 4,
      "social_needs": 3
    },
    "temperamentLabels": [
      "Affectionate",
      "Calm",
      "Playful",
      "Loyal"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/manx/",
      "section": "Personality and activity level",
      "summary": "The TICA Manx/Cymric group account supports calm family attachment and play; the short coat does not create a different personality."
    },
    "sources": [
      "https://tica.org/breed/manx/"
    ],
    "rationale": {
      "adaptability": "Gentle household character supports reasonable flexibility.",
      "affection_level": "Family loyalty supports above-moderate affection.",
      "energy_level": "Playful bursts balanced with mature calmness.",
      "intelligence": "Fetching and puzzle learning support an above-moderate estimate.",
      "child_friendly": "Gentle companion style can suit respectful children.",
      "vocalisation": "The shared Manx/Cymric profile describes soft voices that can still be conversational; frequency is not the same as volume.",
      "grooming": "Dense short coat needs routine brushing.",
      "shedding_level": "Dense double coat supports above-moderate seasonal loose hair.",
      "dog_friendly": "Social household character can support compatible dogs.",
      "social_needs": "Family involvement without exceptional dependence."
    },
    "evidenceBasis": "breed-profile"
  },
  "mins": {
    "name": "Minskin",
    "ratings": {
      "adaptability": null,
      "affection_level": null,
      "energy_level": null,
      "intelligence": null,
      "child_friendly": null,
      "vocalisation": null,
      "grooming": 3,
      "shedding_level": 1,
      "dog_friendly": null,
      "social_needs": null
    },
    "temperamentLabels": [],
    "temperamentEvidence": {
      "source": "https://tica.org/phocadownload/2007-annual.pdf",
      "section": "Evidence limit",
      "summary": "Temperament labels withheld; see the entry review notes for the evidence limit."
    },
    "sources": [
      "https://tica.org/phocadownload/2007-annual.pdf",
      "https://www.petmd.com/cat/breeds/sphynx"
    ],
    "rationale": {
      "adaptability": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "affection_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "energy_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "intelligence": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "child_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "vocalisation": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "grooming": "Related hairless-care guidance supports regular skin and ear care; adjust the routine to actual fur coverage with a vet.",
      "shedding_level": "Very sparse coat supports low hair shedding; this does not imply low allergens or low skin-care needs.",
      "dog_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "social_needs": "Unavailable: corroborated evidence for this trait is insufficient; see review notes."
    },
    "evidenceBasis": "related-breed",
    "groomingCare": "skin",
    "notes": "The historical standard documents sparse fur coverage. Coat/skin care is a related-care estimate; a desired standard temperament is insufficient for numerical personality or compatibility ratings."
  },
  "minu": {
    "name": "Minuet",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 3,
      "intelligence": 3,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 3,
      "shedding_level": 3,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Gentle",
      "Curious",
      "Playful"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/minuet/",
      "section": "Personality and activity level",
      "summary": "TICA describes a people-oriented companion with gentle manners and self-starting play."
    },
    "sources": [
      "https://tica.org/breed/minuet/"
    ],
    "rationale": {
      "adaptability": "Laid-back companion character supports household adjustment.",
      "affection_level": "Very people-oriented and lap-loving profile supports high affection.",
      "energy_level": "Playful but relatively settled character supports moderate activity.",
      "intelligence": "Moderate editorial estimate without comparative cognitive evidence.",
      "child_friendly": "Gentle companion profile can suit respectful children.",
      "vocalisation": "Lower vocal demand is an editorial Persian-group inference.",
      "grooming": "Middle estimate across the breed group coat lengths.",
      "shedding_level": "Moderate estimate across varied coat lengths.",
      "dog_friendly": "Gentle companion style may support compatible dogs.",
      "social_needs": "Strong human orientation suggests regular company."
    },
    "evidenceBasis": "breed-profile"
  },
  "munc": {
    "name": "Munchkin",
    "ratings": {
      "adaptability": 5,
      "affection_level": 4,
      "energy_level": 4,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 3,
      "grooming": 2,
      "shedding_level": 3,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Adaptable",
      "Curious",
      "Playful",
      "Affectionate"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/munchkin/",
      "section": "Personality and activity level",
      "summary": "The direct Munchkin profile supports exploration, outgoing interaction and play."
    },
    "sources": [
      "https://tica.org/breed/munchkin/"
    ],
    "rationale": {
      "adaptability": "Self-assured, sociable character supports household flexibility.",
      "affection_level": "Snuggling alongside active play supports above-moderate affection.",
      "energy_level": "Spirited running and chasing support high activity.",
      "intelligence": "Curiosity, fetching and route-finding support an above-moderate estimate.",
      "child_friendly": "Social profile can suit respectful children.",
      "vocalisation": "Moderate communication is an editorial estimate.",
      "grooming": "Routine coat-care estimate; coat length varies.",
      "shedding_level": "Moderate loose-hair estimate across coat types.",
      "dog_friendly": "Profile describes compatibility with household pets.",
      "social_needs": "Regular family interaction supports above-moderate social needs."
    },
    "evidenceBasis": "breed-profile"
  },
  "napo": {
    "name": "Napoleon Longhair",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 3,
      "intelligence": 3,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 4,
      "shedding_level": 3,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Gentle",
      "Curious",
      "Playful"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/minuet/",
      "section": "Personality and activity level",
      "summary": "Napoleon Longhair is the older longhair Minuet label; coat maintenance differs, not the supported temperament."
    },
    "sources": [
      "https://tica.org/breed/minuet/"
    ],
    "rationale": {
      "adaptability": "Uses the laid-back Minuet companion estimate.",
      "affection_level": "Uses the people-oriented Minuet affection estimate.",
      "energy_level": "Short legs do not remove the breed group interest in play.",
      "intelligence": "Uses the moderate Minuet learning estimate.",
      "child_friendly": "Uses the gentle Minuet estimate for respectful children.",
      "vocalisation": "Uses the lower Minuet vocal estimate.",
      "grooming": "TICA recommends regular daily or alternate-day combing for the Minuet coat, which is less massive than a Persian's; the explicit longhair needs substantial care.",
      "shedding_level": "Use the moderate Minuet estimate; a longer coat alone does not establish heavier shedding.",
      "dog_friendly": "Uses the Minuet companion estimate for compatible dogs.",
      "social_needs": "Uses the people-oriented Minuet company estimate."
    },
    "evidenceBasis": "related-breed",
    "notes": "Former Minuet name, explicit longhair variety. Behaviour uses the same Minuet assessment; substantial coat care does not imply heavier shedding automatically."
  },
  "nebe": {
    "name": "Nebelung",
    "ratings": {
      "adaptability": 2,
      "affection_level": 4,
      "energy_level": 3,
      "intelligence": 4,
      "child_friendly": 3,
      "vocalisation": 1,
      "grooming": 3,
      "shedding_level": 3,
      "dog_friendly": 3,
      "social_needs": 2
    },
    "temperamentLabels": [
      "Reserved",
      "Quiet",
      "Loyal",
      "Playful"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/nebelung/",
      "section": "Personality and activity level",
      "summary": "TICA describes strong familiar bonds, dislike of change and reserve with visitors, alongside retrieving and climbing play."
    },
    "sources": [
      "https://tica.org/breed/nebelung/"
    ],
    "rationale": {
      "adaptability": "Needs time to adjust and can be reserved around strangers.",
      "affection_level": "Strong family bonds support above-moderate affection.",
      "energy_level": "Enjoys retrieving and climbing alongside quiet downtime.",
      "intelligence": "Observant play supports an above-moderate estimate.",
      "child_friendly": "Moderate estimate for quiet, respectful children.",
      "vocalisation": "Quiet profile supports low vocalization.",
      "grooming": "Semi-long coat requires routine combing.",
      "shedding_level": "Moderate seasonal loose hair is an editorial estimate.",
      "dog_friendly": "Moderate estimate; calm introductions suit a reserved character.",
      "social_needs": "Can entertain itself and tolerate reasonable periods alone."
    },
    "evidenceBasis": "breed-profile"
  },
  "norw": {
    "name": "Norwegian Forest Cat",
    "ratings": {
      "adaptability": 4,
      "affection_level": 4,
      "energy_level": 4,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 3,
      "shedding_level": 5,
      "dog_friendly": 4,
      "social_needs": 3
    },
    "temperamentLabels": [
      "Affectionate",
      "Curious",
      "Playful",
      "Adaptable"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/norwegian-forest/",
      "section": "Personality and activity level",
      "summary": "TICA describes mild manners, environmental adaptability and interactive play rather than extreme vocal demand."
    },
    "sources": [
      "https://tica.org/breed/norwegian-forest/"
    ],
    "rationale": {
      "adaptability": "Friendly, composed household character supports flexibility.",
      "affection_level": "Loyal nearby companionship rather than constant carrying.",
      "energy_level": "Climbing and play support high activity.",
      "intelligence": "Alert exploration supports an above-moderate estimate.",
      "child_friendly": "Gentle profile can suit respectful children.",
      "vocalisation": "Usually communicates without excessive loud calling.",
      "grooming": "Semi-long double coat needs regular combing.",
      "shedding_level": "Pronounced seasonal coat change supports a high shedding estimate.",
      "dog_friendly": "Friendly household character can support compatible dogs.",
      "social_needs": "Enjoys family proximity while retaining independence."
    },
    "evidenceBasis": "breed-profile"
  },
  "ocic": {
    "name": "Ocicat",
    "ratings": {
      "adaptability": 5,
      "affection_level": 4,
      "energy_level": 4,
      "intelligence": 5,
      "child_friendly": 4,
      "vocalisation": 3,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 5,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Adaptable",
      "Curious",
      "Sociable",
      "Intelligent"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/ocicat/",
      "section": "Personality and activity level",
      "summary": "The profile describes an outgoing, social learner; the spotted coat does not establish wild ancestry."
    },
    "sources": [
      "https://tica.org/breed/ocicat/"
    ],
    "rationale": {
      "adaptability": "Sociable, domestic companion character supports flexibility.",
      "affection_level": "Attention-seeking involvement supports above-moderate affection.",
      "energy_level": "Athletic games and exploration support high activity.",
      "intelligence": "Fetching and responding to commands support a high estimate.",
      "child_friendly": "Gentle, social character can suit respectful children.",
      "vocalisation": "Moderate communication is an editorial estimate.",
      "grooming": "Short coat needs minimal routine brushing.",
      "shedding_level": "Lower coat-hair burden is an editorial estimate.",
      "dog_friendly": "Profile explicitly describes compatibility with dogs of suitable temperament.",
      "social_needs": "Can demand frequent interaction and attention."
    },
    "evidenceBasis": "breed-profile"
  },
  "ojos": {
    "name": "Ojos Azules",
    "ratings": {
      "adaptability": null,
      "affection_level": null,
      "energy_level": null,
      "intelligence": null,
      "child_friendly": null,
      "vocalisation": null,
      "grooming": null,
      "shedding_level": null,
      "dog_friendly": null,
      "social_needs": null
    },
    "temperamentLabels": [],
    "temperamentEvidence": {
      "source": "https://tica.org/phocadownload/2001-semi_2001.pdf",
      "section": "Evidence limit",
      "summary": "Temperament labels withheld; see the entry review notes for the evidence limit."
    },
    "sources": [
      "https://tica.org/phocadownload/2001-semi_2001.pdf"
    ],
    "rationale": {
      "adaptability": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "affection_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "energy_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "intelligence": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "child_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "vocalisation": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "grooming": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "shedding_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "dog_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "social_needs": "Unavailable: corroborated evidence for this trait is insufficient; see review notes."
    },
    "evidenceBasis": "limited",
    "notes": "Historical TICA documentation supports appearance and classification, but current population and care evidence is too sparse for a complete profile. Do not infer temperament from blue eyes or claim current recognition from an old standard."
  },
  "ori1": {
    "name": "Oriental Longhair",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 5,
      "intelligence": 5,
      "child_friendly": 4,
      "vocalisation": 5,
      "grooming": 2,
      "shedding_level": 3,
      "dog_friendly": 5,
      "social_needs": 5
    },
    "temperamentLabels": [
      "Active",
      "Affectionate",
      "Interactive",
      "Talkative"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/oriental-longhair/",
      "section": "Personality and activity level",
      "summary": "TICA's Siamese-group description supports high social and vocal involvement; coat length does not establish a separate temperament."
    },
    "sources": [
      "https://tica.org/breed/oriental-longhair/"
    ],
    "rationale": {
      "adaptability": "Outgoing companion style can adjust to active households.",
      "affection_level": "Close family attachment supports high affection.",
      "energy_level": "Athletic, lifelong play supports very high activity.",
      "intelligence": "Trick learning and agility support a high estimate.",
      "child_friendly": "Social profile can suit respectful children.",
      "vocalisation": "Talkative, attention-seeking communication supports high vocalization.",
      "grooming": "Fine semi-long coat needs routine light combing.",
      "shedding_level": "Moderate shedding is an editorial coat estimate.",
      "dog_friendly": "Profile explicitly includes compatible dogs.",
      "social_needs": "Poor fit for frequent long periods without companionship."
    },
    "evidenceBasis": "breed-profile"
  },
  "orie": {
    "name": "Oriental Shorthair",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 5,
      "intelligence": 5,
      "child_friendly": 4,
      "vocalisation": 5,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 5,
      "social_needs": 5
    },
    "temperamentLabels": [
      "Active",
      "Affectionate",
      "Interactive",
      "Talkative"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/oriental-shorthair/",
      "section": "Personality and activity level",
      "summary": "TICA describes high social and vocal involvement and a strong interest in household activity."
    },
    "sources": [
      "https://tica.org/breed/oriental-shorthair/"
    ],
    "rationale": {
      "adaptability": "Outgoing companion style can adjust to active households.",
      "affection_level": "Close family attachment supports high affection.",
      "energy_level": "Athletic, lifelong play supports very high activity.",
      "intelligence": "Trick learning and agility support a high estimate.",
      "child_friendly": "Social profile can suit respectful children.",
      "vocalisation": "Talkative, attention-seeking communication supports high vocalization.",
      "grooming": "Short sleek coat needs minimal routine grooming.",
      "shedding_level": "Lower loose-hair burden is an editorial estimate.",
      "dog_friendly": "Profile explicitly includes compatible dogs.",
      "social_needs": "Poor fit for frequent long periods without companionship."
    },
    "evidenceBasis": "breed-profile"
  },
  "pant": {
    "name": "Pantherette",
    "ratings": {
      "adaptability": null,
      "affection_level": null,
      "energy_level": null,
      "intelligence": null,
      "child_friendly": null,
      "vocalisation": null,
      "grooming": null,
      "shedding_level": null,
      "dog_friendly": null,
      "social_needs": null
    },
    "temperamentLabels": [],
    "temperamentEvidence": {
      "source": "https://www.catbreedexplorer.com/api/breeds?id=pant",
      "section": "Evidence limit",
      "summary": "Temperament labels withheld; see the entry review notes for the evidence limit."
    },
    "sources": [
      "https://www.catbreedexplorer.com/api/breeds?id=pant"
    ],
    "rationale": {
      "adaptability": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "affection_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "energy_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "intelligence": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "child_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "vocalisation": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "grooming": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "shedding_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "dog_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "social_needs": "Unavailable: corroborated evidence for this trait is insufficient; see review notes."
    },
    "evidenceBasis": "limited",
    "notes": "The API record contains shifted CSV values, no history and a grooming phrase in the temperament field. Independent contemporary lineage and behaviour evidence is insufficient."
  },
  "pers": {
    "name": "Persian",
    "ratings": {
      "adaptability": 3,
      "affection_level": 4,
      "energy_level": 1,
      "intelligence": 3,
      "child_friendly": 4,
      "vocalisation": 1,
      "grooming": 5,
      "shedding_level": 5,
      "dog_friendly": 3,
      "social_needs": 3
    },
    "temperamentLabels": [
      "Calm",
      "Quiet",
      "Gentle",
      "Affectionate"
    ],
    "temperamentEvidence": {
      "source": "https://cfa.org/breed/persian/",
      "section": "Personality and activity level",
      "summary": "CFA and TICA support quiet affection and low activity, with short play invitations still appropriate."
    },
    "sources": [
      "https://cfa.org/breed/persian/",
      "https://tica.org/breed/persian/"
    ],
    "rationale": {
      "adaptability": "A moderate estimate for a calm companion that benefits from a settled environment.",
      "affection_level": "Usually enjoys attention and quiet companionship.",
      "energy_level": "Generally placid and less inclined to climbing or sustained energetic play.",
      "intelligence": "Can learn routines and respond to training; moderate is an editorial estimate, not a cognitive test.",
      "child_friendly": "Even temperament can suit children who respect its quieter style.",
      "vocalisation": "Usually expresses itself quietly.",
      "grooming": "Dense long coat calls for frequent, often daily, maintenance.",
      "shedding_level": "Substantial coat care and household hair cleanup support a high estimate.",
      "dog_friendly": "Peaceful coexistence is possible with calm, carefully introduced dogs.",
      "social_needs": "Enjoys quiet company without the same intensity as highly demanding breeds."
    },
    "evidenceBasis": "breed-profile"
  },
  "pete": {
    "name": "Peterbald",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 5,
      "intelligence": 5,
      "child_friendly": 4,
      "vocalisation": 4,
      "grooming": 4,
      "shedding_level": 1,
      "dog_friendly": 4,
      "social_needs": 5
    },
    "temperamentLabels": [
      "Active",
      "Affectionate",
      "Sociable",
      "Talkative"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/peterbald/",
      "section": "Personality and activity level",
      "summary": "TICA describes close household participation and often vocal communication; skin care depends on the actual coat type."
    },
    "sources": [
      "https://tica.org/breed/peterbald/"
    ],
    "rationale": {
      "adaptability": "Friendly travelling and social adjustment support flexibility.",
      "affection_level": "Strong loyalty and physical closeness support high affection.",
      "energy_level": "Athletic fetching and rapid movement support very high activity.",
      "intelligence": "Interactive learning and problem-solving support a high estimate.",
      "child_friendly": "Social profile can suit respectfully supervised children.",
      "vocalisation": "Often vocal with its people.",
      "grooming": "Hairless or sparse-coat forms need skin and ear care.",
      "shedding_level": "Low estimate for common hairless forms; coated individuals can differ.",
      "dog_friendly": "Social profile includes other household animals.",
      "social_needs": "Strong company-seeking character supports high social needs."
    },
    "evidenceBasis": "breed-profile",
    "groomingCare": "skin"
  },
  "pixi": {
    "name": "Pixie-bob",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 3,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 2,
      "shedding_level": 3,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Loyal",
      "Playful",
      "Calm"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/pixiebob/",
      "section": "Personality and activity level",
      "summary": "The profile supports family attachment and interactive play with a balanced temperament."
    },
    "sources": [
      "https://tica.org/breed/pixiebob/"
    ],
    "rationale": {
      "adaptability": "Family-oriented domestic character supports household flexibility.",
      "affection_level": "Strong devotion to family supports high affection.",
      "energy_level": "Interactive play balanced with companionship suggests moderate activity.",
      "intelligence": "Leash learning and exploration support an above-moderate estimate.",
      "child_friendly": "Affectionate family style can suit respectful children.",
      "vocalisation": "Lower vocal demand is an editorial estimate.",
      "grooming": "Routine care estimate across short and longer coats.",
      "shedding_level": "Moderate seasonal loose hair is an editorial estimate.",
      "dog_friendly": "Social domestic character may support compatible dogs.",
      "social_needs": "Frequent family involvement is desirable."
    },
    "evidenceBasis": "breed-profile"
  },
  "poly": {
    "name": "Polydactyl",
    "ratings": {
      "adaptability": null,
      "affection_level": null,
      "energy_level": null,
      "intelligence": null,
      "child_friendly": null,
      "vocalisation": null,
      "grooming": null,
      "shedding_level": null,
      "dog_friendly": null,
      "social_needs": null
    },
    "temperamentLabels": [],
    "temperamentEvidence": {
      "source": "https://www.hemingwayhome.com/our-cats",
      "section": "Evidence limit",
      "summary": "Temperament labels withheld; see the entry review notes for the evidence limit."
    },
    "sources": [
      "https://www.hemingwayhome.com/our-cats",
      "https://www.cats.org.uk/help-and-advice/caring-for-your-cat/grooming"
    ],
    "rationale": {
      "adaptability": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "affection_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "energy_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "intelligence": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "child_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "vocalisation": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "grooming": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "shedding_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "dog_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "social_needs": "Unavailable: corroborated evidence for this trait is insufficient; see review notes."
    },
    "evidenceBasis": "mixed-population",
    "notes": "Extra toes do not establish coat, personality, intelligence or compatibility. Extra-claw checks belong in care tips, not a fabricated overall grooming score."
  },
  "raas": {
    "name": "Raas",
    "ratings": {
      "adaptability": null,
      "affection_level": null,
      "energy_level": null,
      "intelligence": null,
      "child_friendly": null,
      "vocalisation": null,
      "grooming": 2,
      "shedding_level": null,
      "dog_friendly": null,
      "social_needs": null
    },
    "temperamentLabels": [],
    "temperamentEvidence": {
      "source": "https://link.springer.com/article/10.1007/s00294-026-01340-5",
      "section": "Evidence limit",
      "summary": "Temperament labels withheld; see the entry review notes for the evidence limit."
    },
    "sources": [
      "https://link.springer.com/article/10.1007/s00294-026-01340-5",
      "https://www.cats.org.uk/help-and-advice/caring-for-your-cat/grooming"
    ],
    "rationale": {
      "adaptability": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "affection_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "energy_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "intelligence": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "child_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "vocalisation": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "grooming": "A documented short coat plus general short-coat care guidance supports light routine grooming; other traits remain unavailable.",
      "shedding_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "dog_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "social_needs": "Unavailable: corroborated evidence for this trait is insufficient; see review notes."
    },
    "evidenceBasis": "limited",
    "notes": "The Busok genetic study documents population and coat, not personality. Island origin does not establish independence, energy or household compatibility."
  },
  "raga": {
    "name": "Ragamuffin",
    "ratings": {
      "adaptability": 5,
      "affection_level": 5,
      "energy_level": 2,
      "intelligence": 3,
      "child_friendly": 5,
      "vocalisation": 2,
      "grooming": 2,
      "shedding_level": 3,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Gentle",
      "Calm",
      "Playful"
    ],
    "temperamentEvidence": {
      "source": "https://cfa.org/breed/ragamuffin/",
      "section": "Personality and activity level",
      "summary": "CFA describes a patient, people-oriented companion that can enjoy games despite generally low activity."
    },
    "sources": [
      "https://cfa.org/breed/ragamuffin/"
    ],
    "rationale": {
      "adaptability": "Easygoing companion character supports broad household adjustment.",
      "affection_level": "Strong lap-oriented affection supports a high estimate.",
      "energy_level": "Prefers cuddling despite enjoying some play.",
      "intelligence": "Moderate estimate balances responsiveness with no measured cognitive rank.",
      "child_friendly": "Agreeable family profile supports a high estimate for respectful children.",
      "vocalisation": "Lower vocal demand is an editorial estimate.",
      "grooming": "CFA recommends combing once or twice a week and says daily grooming is unnecessary because the coat resists tangles.",
      "shedding_level": "Moderate seasonal loose hair is an editorial estimate.",
      "dog_friendly": "Gentle companion character may support compatible dogs.",
      "social_needs": "Devoted people orientation suggests frequent company."
    },
    "evidenceBasis": "breed-profile"
  },
  "ragd": {
    "name": "Ragdoll",
    "ratings": {
      "adaptability": 5,
      "affection_level": 5,
      "energy_level": 2,
      "intelligence": 4,
      "child_friendly": 5,
      "vocalisation": 2,
      "grooming": 2,
      "shedding_level": 3,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Gentle",
      "Calm",
      "Quiet"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/ragdoll/",
      "section": "Personality and activity level",
      "summary": "TICA describes a laidback, quiet companion while acknowledging that individuals and younger cats still play."
    },
    "sources": [
      "https://cfa.org/breed/ragdoll/",
      "https://tica.org/breed/ragdoll/"
    ],
    "rationale": {
      "adaptability": "Described as readily adapting to environments and smaller living spaces.",
      "affection_level": "Typically stays close to its people and seeks companionship.",
      "energy_level": "Enjoys play but usually has a calm, undemanding activity level.",
      "intelligence": "Trainability and learning games support an above-moderate estimate.",
      "child_friendly": "Gentle temperament can suit respectful children, with supervised introductions.",
      "vocalisation": "Generally quiet, with occasional soft calls.",
      "grooming": "TICA describes little routine grooming with weekly combing and extra checks during shedding; a long coat alone does not imply intensive care.",
      "shedding_level": "Seasonal shedding merits a moderate estimate despite a lighter undercoat.",
      "dog_friendly": "Gentle introductions can support coexistence with cat-friendly dogs.",
      "social_needs": "Usually stays near people and seeks regular company."
    },
    "evidenceBasis": "breed-profile"
  },
  "rblu": {
    "name": "Russian Blue",
    "ratings": {
      "adaptability": 3,
      "affection_level": 4,
      "energy_level": 3,
      "intelligence": 4,
      "child_friendly": 3,
      "vocalisation": 2,
      "grooming": 1,
      "shedding_level": 3,
      "dog_friendly": 3,
      "social_needs": 2
    },
    "temperamentLabels": [
      "Reserved",
      "Quiet",
      "Loyal",
      "Playful"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/russian-blue/",
      "section": "Personality and activity level",
      "summary": "TICA supports selective familiar bonds, quiet surroundings and playful interaction; individuals may also converse."
    },
    "sources": [
      "https://tica.org/breed/russian-blue/",
      "https://www.catbreedexplorer.com/api/breeds?id=rblu"
    ],
    "rationale": {
      "adaptability": "Preference for routine and caution with strangers suggest moderate flexibility.",
      "affection_level": "Close family attachment supports above-moderate affection.",
      "energy_level": "Play and exploration balanced with private rest.",
      "intelligence": "Puzzle learning and opening doors support an above-moderate estimate.",
      "child_friendly": "Moderate estimate for quieter, respectful households.",
      "vocalisation": "Use a lower estimate from quiet API profile; some individuals are more vocal.",
      "grooming": "Short double coat needs simple routine brushing.",
      "shedding_level": "Moderate seasonal shedding is an editorial estimate.",
      "dog_friendly": "Moderate estimate given reserved temperament and introduction needs.",
      "social_needs": "Can enjoy reasonable periods alone and private resting places."
    },
    "evidenceBasis": "breed-profile",
    "notes": "Descriptions vary on vocalization; this estimate favours the quieter companion tendency and does not imply every Russian Blue is quiet."
  },
  "safa": {
    "name": "Safari",
    "ratings": {
      "adaptability": null,
      "affection_level": null,
      "energy_level": null,
      "intelligence": null,
      "child_friendly": null,
      "vocalisation": null,
      "grooming": null,
      "shedding_level": null,
      "dog_friendly": null,
      "social_needs": null
    },
    "temperamentLabels": [],
    "temperamentEvidence": {
      "source": "https://catvets.com/resource/2025-hybrid-cats-position-statement/",
      "section": "Evidence limit",
      "summary": "Temperament labels withheld; see the entry review notes for the evidence limit."
    },
    "sources": [
      "https://catvets.com/resource/2025-hybrid-cats-position-statement/"
    ],
    "rationale": {
      "adaptability": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "affection_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "energy_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "intelligence": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "child_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "vocalisation": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "grooming": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "shedding_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "dog_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "social_needs": "Unavailable: corroborated evidence for this trait is insufficient; see review notes."
    },
    "evidenceBasis": "limited",
    "notes": "The Geoffroy’s cat hybrid label does not establish generation, pedigree or suitability for ordinary pet interactions. Specialist evidence is required before publishing bonding activities."
  },
  "sava": {
    "name": "Savannah",
    "ratings": {
      "adaptability": 3,
      "affection_level": 4,
      "energy_level": 5,
      "intelligence": 5,
      "child_friendly": 3,
      "vocalisation": 4,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Active",
      "Curious",
      "Confident",
      "Interactive"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/savannah/",
      "section": "Personality and activity level",
      "summary": "TICA supports active exploration and human interaction in the established breed; no guarantee follows for an unknown early-generation hybrid."
    },
    "sources": [
      "https://tica.org/breed/savannah/"
    ],
    "rationale": {
      "adaptability": "Needs substantial enrichment; flexibility varies with generation and individual.",
      "affection_level": "Loyal nearby companionship supports above-moderate affection.",
      "energy_level": "Persistent jumping and exploration support very high activity.",
      "intelligence": "Opening doors and puzzle play support a high estimate.",
      "child_friendly": "Older children are a better fit than assuming universal young-child tolerance.",
      "vocalisation": "Expressive communication supports an above-moderate estimate.",
      "grooming": "Short coat needs simple routine care.",
      "shedding_level": "Lower coat-hair burden is an editorial estimate.",
      "dog_friendly": "Compatible dogs may provide companionship with careful introductions.",
      "social_needs": "Boredom and social involvement suggest frequent interaction."
    },
    "evidenceBasis": "breed-profile",
    "notes": "Companion estimates concern socialized domestic-generation animals; the API does not identify generation."
  },
  "sfol": {
    "name": "Scottish Fold",
    "ratings": {
      "adaptability": 5,
      "affection_level": 4,
      "energy_level": 2,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 2,
      "shedding_level": 3,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Gentle",
      "Playful",
      "Calm"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/scottish-fold/",
      "section": "Personality and activity level",
      "summary": "TICA describes a less active family companion; reduced activity or reluctance to jump must not be assumed to be harmless temperament."
    },
    "sources": [
      "https://tica.org/breed/scottish-fold/"
    ],
    "rationale": {
      "adaptability": "Sweet, social household character supports flexibility.",
      "affection_level": "Enjoys human attention and close companionship.",
      "energy_level": "Lower general activity estimate; pain must not be mistaken for temperament.",
      "intelligence": "Puzzle interaction supports an above-moderate estimate.",
      "child_friendly": "Social family profile can suit respectfully supervised children.",
      "vocalisation": "Lower vocal demand is an editorial estimate.",
      "grooming": "Routine coat care; longer-coated individuals need more combing.",
      "shedding_level": "Moderate coat-hair estimate across varieties.",
      "dog_friendly": "Profile explicitly includes cat-friendly dogs.",
      "social_needs": "Prefers company to frequent long periods alone."
    },
    "evidenceBasis": "breed-profile"
  },
  "srex": {
    "name": "Selkirk Rex",
    "ratings": {
      "adaptability": 5,
      "affection_level": 5,
      "energy_level": 3,
      "intelligence": 3,
      "child_friendly": 5,
      "vocalisation": 2,
      "grooming": 3,
      "shedding_level": 3,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Calm",
      "Gentle",
      "Playful"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/selkirk-rex/",
      "section": "Personality and activity level",
      "summary": "TICA describes a relaxed, patient cat with some playful moments, not a persistently high-energy breed."
    },
    "sources": [
      "https://tica.org/breed/selkirk-rex/"
    ],
    "rationale": {
      "adaptability": "Relaxed, easygoing character supports household flexibility.",
      "affection_level": "Cuddly companionship supports high affection.",
      "energy_level": "Playful but also placid; use a moderate activity estimate.",
      "intelligence": "Moderate editorial estimate without comparative cognitive evidence.",
      "child_friendly": "Patient social character supports a high estimate for respectful children.",
      "vocalisation": "Lower vocal demand is an editorial estimate.",
      "grooming": "Dense curls need regular gentle upkeep.",
      "shedding_level": "Moderate shedding estimate; curls do not establish no shedding.",
      "dog_friendly": "Profile explicitly includes cat-friendly dogs.",
      "social_needs": "Social character dislikes long periods alone."
    },
    "evidenceBasis": "breed-profile"
  },
  "sere": {
    "name": "Serengeti",
    "ratings": {
      "adaptability": 4,
      "affection_level": 4,
      "energy_level": 5,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 4,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Active",
      "Confident",
      "Curious",
      "Talkative"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/serengeti/",
      "section": "Personality and activity level",
      "summary": "TICA describes energetic exploration and willingness to converse; the serval-like appearance does not determine ancestry."
    },
    "sources": [
      "https://tica.org/breed/serengeti/"
    ],
    "rationale": {
      "adaptability": "Confident, outgoing domestic character supports household flexibility.",
      "affection_level": "Friendly companion background supports above-moderate affection.",
      "energy_level": "Athletic Bengal/Oriental background supports very high activity.",
      "intelligence": "Alert exploration supports an above-moderate estimate.",
      "child_friendly": "Gentle companion goal can suit respectful children.",
      "vocalisation": "Vocal API description supports above-moderate communication.",
      "grooming": "Short coat needs minimal routine grooming.",
      "shedding_level": "Lower coat-hair burden is an editorial estimate.",
      "dog_friendly": "Outgoing background may support compatible dogs.",
      "social_needs": "Social companion context suggests frequent interaction."
    },
    "evidenceBasis": "breed-profile",
    "notes": "Some behavioural values combine registry character description with the API temperament profile."
  },
  "siam": {
    "name": "Siamese",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 5,
      "intelligence": 5,
      "child_friendly": 4,
      "vocalisation": 5,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 5
    },
    "temperamentLabels": [
      "Active",
      "Affectionate",
      "Interactive",
      "Talkative"
    ],
    "temperamentEvidence": {
      "source": "https://cfa.org/breed/siamese/",
      "section": "Personality and activity level",
      "summary": "CFA and TICA support highly involved, energetic and insistent vocal companionship."
    },
    "sources": [
      "https://cfa.org/breed/siamese/",
      "https://tica.org/breed/siamese/"
    ],
    "rationale": {
      "adaptability": "An involved, interactive companion when its need for company and stimulation is met.",
      "affection_level": "Typically seeks frequent closeness and attention.",
      "energy_level": "Active and playful, with a strong need for engagement.",
      "intelligence": "Communication, curiosity and interactive behaviour support a high editorial estimate.",
      "child_friendly": "An interactive household can suit the breed with gentle handling.",
      "vocalisation": "Strongly vocal and persistent in communicating with people.",
      "grooming": "Short coat usually needs simple routine care.",
      "shedding_level": "Some shedding occurs, with a lower editorial estimate than dense longhaired coats.",
      "dog_friendly": "Social nature can support friendships with compatible, carefully introduced pets.",
      "social_needs": "Seeks frequent attention and involvement in household activity."
    },
    "evidenceBasis": "breed-profile"
  },
  "sibe": {
    "name": "Siberian",
    "ratings": {
      "adaptability": 5,
      "affection_level": 4,
      "energy_level": 4,
      "intelligence": 4,
      "child_friendly": 5,
      "vocalisation": 2,
      "grooming": 3,
      "shedding_level": 5,
      "dog_friendly": 4,
      "social_needs": 3
    },
    "temperamentLabels": [
      "Adaptable",
      "Affectionate",
      "Curious",
      "Playful"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/siberian/",
      "section": "Personality and activity level",
      "summary": "TICA supports flexible family interaction and athletic play; a thick coat alone does not establish very high grooming effort."
    },
    "sources": [
      "https://tica.org/breed/siberian/"
    ],
    "rationale": {
      "adaptability": "Calm, lively companion character supports household flexibility.",
      "affection_level": "Enjoys snuggling and following family members.",
      "energy_level": "Playful exploration supports high activity.",
      "intelligence": "Curiosity supports an above-moderate estimate.",
      "child_friendly": "Composed, family-oriented character supports a high estimate for respectful children.",
      "vocalisation": "Lower vocal demand is an editorial estimate.",
      "grooming": "Thick coat needs regular combing, especially during seasonal changes.",
      "shedding_level": "Substantial seasonal coat change supports high shedding.",
      "dog_friendly": "Social family character can support compatible dogs.",
      "social_needs": "Likes company but is not described as exceptionally needy."
    },
    "evidenceBasis": "breed-profile"
  },
  "sing": {
    "name": "Singapura",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 5,
      "intelligence": 5,
      "child_friendly": 4,
      "vocalisation": 3,
      "grooming": 1,
      "shedding_level": 1,
      "dog_friendly": 4,
      "social_needs": 5
    },
    "temperamentLabels": [
      "Active",
      "Curious",
      "Interactive",
      "Playful"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/singapura/",
      "section": "Personality and activity level",
      "summary": "TICA describes a busy, exploring and highly interactive cat that remains playful as an adult."
    },
    "sources": [
      "https://tica.org/breed/singapura/"
    ],
    "rationale": {
      "adaptability": "Outgoing household character supports reasonable flexibility.",
      "affection_level": "Close lap and shoulder companionship support high affection.",
      "energy_level": "Very busy exploration supports the highest activity category.",
      "intelligence": "Fast learning and inquisitiveness support a high estimate.",
      "child_friendly": "Social profile can suit gently supervised children.",
      "vocalisation": "Some are vocal; use a moderate communication estimate.",
      "grooming": "Very short fine coat needs little grooming.",
      "shedding_level": "Fine sparse coat supports a low loose-hair estimate.",
      "dog_friendly": "Extroverted profile can support compatible dogs.",
      "social_needs": "High interaction needs and preference for companionship."
    },
    "evidenceBasis": "breed-profile"
  },
  "sinp": {
    "name": "Singapura Tabby",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 5,
      "intelligence": 5,
      "child_friendly": 4,
      "vocalisation": 3,
      "grooming": 1,
      "shedding_level": 1,
      "dog_friendly": 4,
      "social_needs": 5
    },
    "temperamentLabels": [
      "Active",
      "Curious",
      "Interactive",
      "Playful"
    ],
    "temperamentEvidence": {
      "source": "https://cfa.org/breed/singapura/",
      "section": "Personality and activity level",
      "summary": "CFA recognises sepia agouti in Singapuras already; the API's tabby label does not establish a separate personality."
    },
    "sources": [
      "https://cfa.org/breed/singapura/",
      "https://tica.org/breed/singapura/",
      "https://www.catbreedexplorer.com/api/breeds?id=sinp"
    ],
    "rationale": {
      "adaptability": "Uses Singapura-group adaptability; tabby wording does not establish a new temperament.",
      "affection_level": "Uses the close-bonded Singapura affection estimate.",
      "energy_level": "Uses the active Singapura energy estimate.",
      "intelligence": "Uses the inquisitive Singapura learning estimate.",
      "child_friendly": "Uses the Singapura estimate for respectful children.",
      "vocalisation": "Uses the moderate Singapura vocal estimate.",
      "grooming": "Fine short coat needs minimal routine grooming.",
      "shedding_level": "Uses the low Singapura coat-hair estimate.",
      "dog_friendly": "Uses the social Singapura estimate for compatible dogs.",
      "social_needs": "Uses the strong Singapura companionship estimate."
    },
    "evidenceBasis": "related-breed",
    "notes": "The API labels this as a Singapura variation; no separate personality is inferred from the tabby label."
  },
  "skoo": {
    "name": "Skookum",
    "ratings": {
      "adaptability": null,
      "affection_level": null,
      "energy_level": null,
      "intelligence": null,
      "child_friendly": null,
      "vocalisation": null,
      "grooming": 2,
      "shedding_level": null,
      "dog_friendly": null,
      "social_needs": null
    },
    "temperamentLabels": [],
    "temperamentEvidence": {
      "source": "https://catzinc.org/wp-content/uploads/2018/09/skookum.pdf",
      "section": "Evidence limit",
      "summary": "Temperament labels withheld; see the entry review notes for the evidence limit."
    },
    "sources": [
      "https://catzinc.org/wp-content/uploads/2018/09/skookum.pdf",
      "https://tica.org/breed/laperm/"
    ],
    "rationale": {
      "adaptability": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "affection_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "energy_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "intelligence": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "child_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "vocalisation": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "grooming": "Related LaPerm guidance supports light, gentle coat care; adapt to curl, coat length and actual tangles.",
      "shedding_level": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "dog_friendly": "Unavailable: corroborated evidence for this trait is insufficient; see review notes.",
      "social_needs": "Unavailable: corroborated evidence for this trait is insufficient; see review notes."
    },
    "evidenceBasis": "related-breed",
    "notes": "The standard documents curls and coat lengths. Gentle coat care is a related LaPerm estimate; parent-breed personalities do not establish Skookum behaviour or shedding amount."
  },
  "snow": {
    "name": "Snowshoe",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 4,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 3,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 5
    },
    "temperamentLabels": [
      "Affectionate",
      "Loyal",
      "Interactive",
      "Playful"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/snowshoe/",
      "section": "Personality and activity level",
      "summary": "TICA describes a family-oriented companion that can be shy initially and uses soft, variable vocal communication."
    },
    "sources": [
      "https://tica.org/breed/snowshoe/"
    ],
    "rationale": {
      "adaptability": "Outgoing but sometimes initially shy; use above-moderate flexibility.",
      "affection_level": "Close family involvement supports high affection.",
      "energy_level": "Active play and agility support high activity.",
      "intelligence": "Trick learning and fetching support an above-moderate estimate.",
      "child_friendly": "Social family profile can suit respectful children.",
      "vocalisation": "Voices vary; use moderate frequency rather than assuming loud Siamese-level calls.",
      "grooming": "Short coat needs simple routine care.",
      "shedding_level": "Lower coat-hair burden is an editorial estimate.",
      "dog_friendly": "Social profile includes compatible household pets.",
      "social_needs": "Very social character dislikes long periods alone."
    },
    "evidenceBasis": "breed-profile"
  },
  "soko": {
    "name": "Sokoke",
    "ratings": {
      "adaptability": 4,
      "affection_level": 4,
      "energy_level": 4,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 3,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Active",
      "Curious",
      "Interactive",
      "Playful"
    ],
    "temperamentEvidence": {
      "source": "https://www.gccfcats.org/getting-a-cat/choosing/cat-breeds/sokoke/",
      "section": "Personality and activity level",
      "summary": "GCCF describes family-oriented play and lively interaction; its moderate-activity overview and energetic personality account support an above-moderate estimate."
    },
    "sources": [
      "https://www.gccfcats.org/getting-a-cat/choosing/cat-breeds/sokoke/"
    ],
    "rationale": {
      "adaptability": "GCCF describes ready adjustment and willingness to meet people; above-moderate flexibility is supported with individual introductions.",
      "affection_level": "Family-oriented character supports above-moderate affection.",
      "energy_level": "GCCF's moderate-activity overview and very playful personality account support above-moderate activity without an extreme claim.",
      "intelligence": "Keen awareness and interactive learning support an above-moderate estimate.",
      "child_friendly": "GCCF directly describes family suitability with children; the estimate assumes gentle supervised handling.",
      "vocalisation": "Moderate communication is an editorial estimate.",
      "grooming": "Close short coat is described as low maintenance.",
      "shedding_level": "Lower coat-hair burden is an editorial estimate.",
      "dog_friendly": "GCCF directly includes homes with dogs; compatibility still depends on individual introductions.",
      "social_needs": "Strong family bonds suggest frequent interaction."
    },
    "evidenceBasis": "breed-profile"
  },
  "soma": {
    "name": "Somali",
    "ratings": {
      "adaptability": 4,
      "affection_level": 4,
      "energy_level": 5,
      "intelligence": 5,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 2,
      "shedding_level": 3,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Active",
      "Curious",
      "Interactive",
      "Playful"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/somali/",
      "section": "Personality and activity level",
      "summary": "TICA describes energetic exploration, persistent curiosity and social interaction; its silky coat is relatively easy to maintain."
    },
    "sources": [
      "https://tica.org/breed/somali/"
    ],
    "rationale": {
      "adaptability": "Confident exploration supports flexibility when activity needs are met.",
      "affection_level": "Engaged companionship supports above-moderate affection.",
      "energy_level": "Athletic climbing and sustained play support very high activity.",
      "intelligence": "Interactive exploration supports a high editorial estimate.",
      "child_friendly": "Engaged families with respectful children can suit this active style.",
      "vocalisation": "Lower vocal demand is an editorial estimate.",
      "grooming": "TICA describes an easy-care silky coat that rarely mats; light routine care is appropriate despite semi-long hair.",
      "shedding_level": "Moderate seasonal loose hair is an editorial estimate.",
      "dog_friendly": "Social companion character may support compatible dogs.",
      "social_needs": "Happiest with frequent company and shared activity."
    },
    "evidenceBasis": "breed-profile"
  },
  "sphy": {
    "name": "Sphynx",
    "ratings": {
      "adaptability": 5,
      "affection_level": 5,
      "energy_level": 4,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 4,
      "grooming": 4,
      "shedding_level": 1,
      "dog_friendly": 5,
      "social_needs": 5
    },
    "temperamentLabels": [
      "Active",
      "Affectionate",
      "Sociable",
      "Curious"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/sphynx/",
      "section": "Personality and activity level",
      "summary": "TICA supports lively, affectionate family involvement; PetMD additionally describes conversation throughout the day."
    },
    "sources": [
      "https://tica.org/breed/sphynx/",
      "https://www.petmd.com/cat/breeds/sphynx"
    ],
    "rationale": {
      "adaptability": "Gregarious, visitor-friendly character supports household flexibility.",
      "affection_level": "Persistent closeness and physical cuddling support high affection.",
      "energy_level": "Agile, lively play supports high activity.",
      "intelligence": "Opening cupboards and interactive play support an above-moderate estimate.",
      "child_friendly": "Friendly family character can suit carefully supervised children.",
      "vocalisation": "PetMD describes chatting throughout the day; this supports an above-moderate communication estimate rather than the API's Quiet label.",
      "grooming": "Hairlessness requires skin and ear maintenance despite little brushing.",
      "shedding_level": "Little coat hair to shed; not an allergen claim.",
      "dog_friendly": "Profile explicitly includes compatibility with dogs.",
      "social_needs": "Strong desire for constant involvement supports high social needs."
    },
    "evidenceBasis": "breed-profile",
    "groomingCare": "skin"
  },
  "suph": {
    "name": "Suphalak",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 3,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 3,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Sociable",
      "Playful"
    ],
    "temperamentEvidence": {
      "source": "https://www.catster.com/cat-breeds/suphalak-cat/",
      "section": "Personality and activity level",
      "summary": "The companion profile supports social interaction and ordinary play; the WCF conformation standard does not itself establish temperament."
    },
    "sources": [
      "https://www.catster.com/cat-breeds/suphalak-cat/",
      "https://wcf.de/pdf-en/breed/SUP_en_2024-11-01.pdf"
    ],
    "rationale": {
      "adaptability": "Social companion profile supports reasonable flexibility.",
      "affection_level": "People-oriented attachment supports high affection.",
      "energy_level": "Playful interaction balanced with companionship supports moderate activity.",
      "intelligence": "Curiosity supports an above-moderate provisional estimate.",
      "child_friendly": "Social character may suit respectful children.",
      "vocalisation": "Moderate provisional communication estimate.",
      "grooming": "Short close coat needs minimal routine care.",
      "shedding_level": "Lower coat-hair burden is an editorial estimate.",
      "dog_friendly": "Social profile may support compatible dogs.",
      "social_needs": "Regular company is desirable."
    },
    "evidenceBasis": "limited",
    "notes": "Rare-breed personality evidence is limited; registry standard supplies physical context, not numerical behavioural validation."
  },
  "thai": {
    "name": "Thai",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 5,
      "intelligence": 5,
      "child_friendly": 4,
      "vocalisation": 5,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 5
    },
    "temperamentLabels": [
      "Active",
      "Affectionate",
      "Interactive",
      "Talkative"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/thai/",
      "section": "Personality and activity level",
      "summary": "TICA supports an energetic, socially involved and vocal companion."
    },
    "sources": [
      "https://tica.org/breed/thai/"
    ],
    "rationale": {
      "adaptability": "Outgoing, easygoing companion character supports engaged households.",
      "affection_level": "Close family bonds and lap contact support high affection.",
      "energy_level": "Athletic, mischievous exploration supports very high activity.",
      "intelligence": "Opening drawers and interactive play support a high estimate.",
      "child_friendly": "Playful families with respectful children can suit the breed.",
      "vocalisation": "Frequent conversation supports high vocalization.",
      "grooming": "Very short coat needs minimal routine grooming.",
      "shedding_level": "Lower coat-hair burden is an editorial estimate.",
      "dog_friendly": "Social character may support compatible dogs.",
      "social_needs": "Strong family attachment makes prolonged solitude a poor fit."
    },
    "evidenceBasis": "breed-profile"
  },
  "tonk": {
    "name": "Tonkinese",
    "ratings": {
      "adaptability": 5,
      "affection_level": 5,
      "energy_level": 4,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 4,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 5,
      "social_needs": 5
    },
    "temperamentLabels": [
      "Affectionate",
      "Sociable",
      "Playful",
      "Talkative"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/tonkinese/",
      "section": "Personality and activity level",
      "summary": "TICA describes conversational but less insistent vocal behaviour than the Siamese, with lap contact and games."
    },
    "sources": [
      "https://tica.org/breed/tonkinese/"
    ],
    "rationale": {
      "adaptability": "Friendly companion character supports household flexibility.",
      "affection_level": "Lap-oriented affection supports a high estimate.",
      "energy_level": "Active play without the most extreme intensity.",
      "intelligence": "Puzzle solving and trainability support an above-moderate estimate.",
      "child_friendly": "Friendly family profile can suit respectful children.",
      "vocalisation": "Talkative, but generally less continuously vocal than the highest category.",
      "grooming": "Short silky coat needs minimal routine grooming.",
      "shedding_level": "Lower coat-hair burden is an editorial estimate.",
      "dog_friendly": "Social household profile supports a high estimate for compatible dogs.",
      "social_needs": "Dislikes long periods alone and benefits from companionship."
    },
    "evidenceBasis": "breed-profile"
  },
  "toyb": {
    "name": "Toybob",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 3,
      "intelligence": 3,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 2,
      "shedding_level": 2,
      "dog_friendly": 3,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Playful"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/toybob/",
      "section": "Personality and activity level",
      "summary": "The short direct profile describes affectionate companionship and play; no extra label is added just to reach a count."
    },
    "sources": [
      "https://tica.org/breed/toybob/"
    ],
    "rationale": {
      "adaptability": "Pleasant companion character supports reasonable household flexibility.",
      "affection_level": "Affectionate human attachment supports a high estimate.",
      "energy_level": "Active play balanced with companionship suggests moderate activity.",
      "intelligence": "Moderate estimate avoids assigning a measured cognitive rank.",
      "child_friendly": "Gentle companion context can suit carefully supervised children.",
      "vocalisation": "Lower vocal demand is an editorial estimate.",
      "grooming": "Routine grooming estimate across coat lengths.",
      "shedding_level": "Lower loose-hair burden is an editorial estimate.",
      "dog_friendly": "Moderate estimate; direct dog-specific evidence is limited.",
      "social_needs": "Affectionate family style suggests regular company."
    },
    "evidenceBasis": "breed-profile"
  },
  "toyg": {
    "name": "Toyger",
    "ratings": {
      "adaptability": 5,
      "affection_level": 4,
      "energy_level": 3,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 1,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Adaptable",
      "Calm",
      "Interactive",
      "Playful"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/toyger/",
      "section": "Personality and activity level",
      "summary": "TICA describes a laidback, trainable companion with ordinary play; quiet temperament is not treated as proof of a silent voice."
    },
    "sources": [
      "https://tica.org/breed/toyger/",
      "https://www.petmd.com/cat/breeds/toyger"
    ],
    "rationale": {
      "adaptability": "Easygoing, calm companion character supports broad household flexibility.",
      "affection_level": "Willing interaction supports above-moderate affection.",
      "energy_level": "Active games without exceptionally intense energy.",
      "intelligence": "Trick learning and agility support an above-moderate estimate.",
      "child_friendly": "Companion profile can suit respectful children.",
      "vocalisation": "PetMD describes greetings but not exceptional chattiness, supporting a lower communication estimate independently of calm temperament.",
      "grooming": "Short coat needs minimal routine grooming.",
      "shedding_level": "Lower coat-hair burden is an editorial estimate.",
      "dog_friendly": "Easygoing sociability may support compatible dogs.",
      "social_needs": "Consistent human interaction is desirable."
    },
    "evidenceBasis": "breed-profile"
  },
  "tang": {
    "name": "Turkish Angora",
    "ratings": {
      "adaptability": 4,
      "affection_level": 4,
      "energy_level": 5,
      "intelligence": 5,
      "child_friendly": 3,
      "vocalisation": 3,
      "grooming": 2,
      "shedding_level": 3,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Active",
      "Curious",
      "Playful",
      "Intelligent"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/turkish-angora/",
      "section": "Personality and activity level",
      "summary": "TICA supports athletic exploration and learning; the silky semi-long coat has relatively light maintenance needs."
    },
    "sources": [
      "https://tica.org/breed/turkish-angora/"
    ],
    "rationale": {
      "adaptability": "Social, spirited character supports adjustment with enrichment.",
      "affection_level": "Following family and snuggling support affection.",
      "energy_level": "Sustained athletic play supports very high activity.",
      "intelligence": "Agility, fetching and learning commands support a high estimate.",
      "child_friendly": "Older respectful children better match its active, assertive style.",
      "vocalisation": "Moderate communication is an editorial estimate.",
      "grooming": "TICA recommends a weekly comb-through for a fine silky coat that rarely mats; light routine care reflects the source.",
      "shedding_level": "Moderate seasonal loose hair is an editorial estimate.",
      "dog_friendly": "Profile includes dogs as possible companions.",
      "social_needs": "Best suited to regular human or compatible-pet company."
    },
    "evidenceBasis": "breed-profile"
  },
  "tvan": {
    "name": "Turkish Van",
    "ratings": {
      "adaptability": 3,
      "affection_level": 4,
      "energy_level": 5,
      "intelligence": 5,
      "child_friendly": 3,
      "vocalisation": 3,
      "grooming": 2,
      "shedding_level": 2,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Active",
      "Curious",
      "Playful",
      "Loyal"
    ],
    "temperamentEvidence": {
      "source": "https://tica.org/breed/turkish-van/",
      "section": "Personality and activity level",
      "summary": "TICA describes vigorous activity and selective close bonds; a dislike of being carried is not lack of affection."
    },
    "sources": [
      "https://tica.org/breed/turkish-van/"
    ],
    "rationale": {
      "adaptability": "Energetic, assertive handling preferences suggest moderate flexibility.",
      "affection_level": "Family involvement supports above-moderate affection.",
      "energy_level": "Acrobatic jumping and running support very high activity.",
      "intelligence": "Interactive problem-solving supports a high estimate.",
      "child_friendly": "Respectful older children better suit its handling preferences.",
      "vocalisation": "Moderate communication is an editorial estimate.",
      "grooming": "TICA describes an easy-care single coat with weekly combing, increasing care when the winter coat is heavier.",
      "shedding_level": "TICA explicitly says the coat does not shed much; seasonal variation does not establish a high overall shedding burden.",
      "dog_friendly": "Social character may support compatible dogs.",
      "social_needs": "Requires frequent family attention and interaction."
    },
    "evidenceBasis": "breed-profile"
  },
  "ukra": {
    "name": "Ukrainian Levkoy",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 4,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 3,
      "grooming": 4,
      "shedding_level": 1,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Curious",
      "Sociable",
      "Playful"
    ],
    "temperamentEvidence": {
      "source": "https://www.catster.com/cat-breeds/ukrainian-levkoy-cat/",
      "section": "Personality and activity level",
      "summary": "The profile describes active exploration and company; the folded-ear or bare-skin appearance does not establish docility."
    },
    "sources": [
      "https://www.catster.com/cat-breeds/ukrainian-levkoy-cat/"
    ],
    "rationale": {
      "adaptability": "Social companion character suggests reasonable household flexibility.",
      "affection_level": "Affectionate interaction supports high closeness.",
      "energy_level": "Energetic exploration and play support high activity.",
      "intelligence": "Curiosity and interactive play support an above-moderate estimate.",
      "child_friendly": "Social companion context can suit gentle children.",
      "vocalisation": "Moderate communication is an editorial estimate.",
      "grooming": "Hairless skin and ears require regular care.",
      "shedding_level": "Little coat hair to shed; not an allergen claim.",
      "dog_friendly": "Social disposition may support compatible dogs.",
      "social_needs": "Frequent family interaction is desirable."
    },
    "evidenceBasis": "breed-profile",
    "groomingCare": "skin"
  },
  "ycho": {
    "name": "York Chocolate",
    "ratings": {
      "adaptability": 4,
      "affection_level": 5,
      "energy_level": 4,
      "intelligence": 4,
      "child_friendly": 4,
      "vocalisation": 2,
      "grooming": 3,
      "shedding_level": 3,
      "dog_friendly": 4,
      "social_needs": 4
    },
    "temperamentLabels": [
      "Affectionate",
      "Curious",
      "Playful",
      "Loyal"
    ],
    "temperamentEvidence": {
      "source": "https://www.petmd.com/cat/breeds/c_ct_york_chocolate",
      "section": "Personality and activity level",
      "summary": "PetMD describes household participation, close familiar bonds and hunting-style play."
    },
    "sources": [
      "https://www.petmd.com/cat/breeds/c_ct_york_chocolate"
    ],
    "rationale": {
      "adaptability": "Friendly but sometimes reserved character suggests gradual household adjustment.",
      "affection_level": "Devoted family contact supports high affection.",
      "energy_level": "Playful working-cat background supports high activity.",
      "intelligence": "Curiosity supports an above-moderate estimate.",
      "child_friendly": "Gentle companion character can suit respectful children.",
      "vocalisation": "Lower vocal demand is an editorial estimate.",
      "grooming": "Semi-long coat needs routine combing.",
      "shedding_level": "Moderate seasonal loose hair is an editorial estimate.",
      "dog_friendly": "Friendly social character may support compatible dogs.",
      "social_needs": "Does best with regular company and family involvement."
    },
    "evidenceBasis": "breed-profile"
  }
};

export function withLocalBreedTraits<T extends Breed>(breed: T): T {
  const entry = Object.prototype.hasOwnProperty.call(breedRatings, breed.id)
    ? breedRatings[breed.id] : undefined;
  const unavailable = Object.fromEntries(ratingAttributes.map(({ key }) => [key, null]));
  // Apply the same reviewed data to list, search, detail and quiz inputs.
  // Raw API temperament can contain care instructions or malformed CSV fields.
  return {
    ...breed,
    ...(entry?.ratings ?? unavailable),
    temperament: entry?.temperamentLabels.join(', ') ?? '',
  };
}
