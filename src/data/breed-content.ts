import { breedRatingAliases, type TraitRatings } from './breed-ratings';

export const breedContentSources = {
  hairlessCare: { label: 'PetMD', title: 'PetMD Sphynx skin and environmental care', url: 'https://www.petmd.com/cat/breeds/sphynx' },
  catPlay: { label: 'Cat Friendly Homes', title: 'Cat Friendly Homes: playing with your cat', url: 'https://catfriendly.com/be-a-cat-friendly-caregiver/playing-with-your-cat/' },
  catNeeds: { label: 'AAFP/ISFM', title: 'AAFP and ISFM feline environmental needs guidelines', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11383066/' },
  catEnvironment: { label: 'FelineVMA', title: 'FelineVMA: setting up the environment for success', url: 'https://catvets.com/resource/setting-up-for-success/' },
  catTraining: { label: 'FelineVMA', title: 'FelineVMA cat training techniques for caregivers', url: 'https://catfriendly.com/wp-content/uploads/2025/12/FelineVMA_Cat_Training_Techniques_for_Caregivers_Handout.pdf' },
  catGrooming: { label: 'Cats Protection', title: 'Cats Protection: grooming your cat', url: 'https://www.cats.org.uk/help-and-advice/caring-for-your-cat/grooming' },
  polydactylCare: { label: 'PetMD', title: 'PetMD: caring for polydactyl cats', url: 'https://www.petmd.com/cat/general-health/polydactyl-cats' },
  coatLengthCare: { label: 'Cats Protection', title: 'Cats Protection: choosing a cat and coat care', url: 'https://www.cats.org.uk/help-and-advice/getting-a-cat/choosing-a-cat' },
  suphalakCare: { label: 'Catster', title: 'Catster Suphalak profile', url: 'https://www.catster.com/cat-breeds/suphalak-cat/' },
  foldCartilage: { label: 'Merck Veterinary Manual', title: 'Merck Veterinary Manual: Scottish Fold osteochondrodysplasia', url: 'https://www.merckvetmanual.com/musculoskeletal-system/osteopathies-in-small-animals/developmental-osteopathies-in-dogs-and-cats' },
  cfaBirman: { label: 'CFA', title: 'CFA Birman breed profile', url: 'https://cfa.org/breed/birman/' },
  ticaBirman: { label: 'TICA', title: 'TICA Birman breed profile', url: 'https://tica.org/breed/birman/' },
  ticaBengal: { label: 'TICA', title: 'TICA Bengal breed profile', url: 'https://tica.org/breed/bengal/' },
  cfaPersian: { label: 'CFA', title: 'CFA Persian breed profile', url: 'https://cfa.org/breed/persian/' },
  ticaPersian: { label: 'TICA', title: 'TICA Persian breed profile', url: 'https://tica.org/breed/persian/' },
  cfaSiamese: { label: 'CFA', title: 'CFA Siamese breed profile', url: 'https://cfa.org/breed/siamese/' },
  ticaSiamese: { label: 'TICA', title: 'TICA Siamese breed profile', url: 'https://tica.org/breed/siamese/' },
  cfaAbyssinian: { label: 'CFA', title: 'CFA Abyssinian breed profile', url: 'https://cfa.org/breed/abyssinian/' },
  "profile_abob": {"label": "TICA", "title": "TICA American Bobtail breed profile", "url": "https://tica.org/breed/american-bobtail/"},
  "profile_acur": {"label": "TICA", "title": "TICA American Curl breed profile", "url": "https://tica.org/breed/american-curl/"},
  "profile_asho": {"label": "TICA", "title": "TICA American Shorthair breed profile", "url": "https://tica.org/breed/american-shorthair/"},
  "profile_awir": {"label": "TICA", "title": "TICA American Wirehair breed profile", "url": "https://tica.org/breed/american-wirehair/"},
  "profile_amis": {"label": "TICA", "title": "TICA Australian Mist breed profile", "url": "https://tica.org/breed/australian-mist/"},
  "profile_bali": {"label": "TICA", "title": "TICA Balinese breed profile", "url": "https://tica.org/breed/balinese/"},
  "profile_bomb": {"label": "TICA", "title": "TICA Bombay breed profile", "url": "https://tica.org/breed/bombay/"},
  "profile_bslo": {"label": "TICA", "title": "TICA British Longhair breed profile", "url": "https://tica.org/breed/british-longhair/"},
  "profile_bsho": {"label": "TICA", "title": "TICA British Shorthair breed profile", "url": "https://tica.org/breed/british-shorthair/"},
  "profile_bure": {"label": "TICA", "title": "TICA Burmese breed profile", "url": "https://tica.org/breed/burmese/"},
  "profile_buri": {"label": "TICA", "title": "TICA Burmilla breed profile", "url": "https://tica.org/breed/burmilla/"},
  "profile_char": {"label": "TICA", "title": "TICA Chartreux breed profile", "url": "https://tica.org/breed/chartreux/"},
  "profile_chau": {"label": "TICA", "title": "TICA Chausie breed profile", "url": "https://tica.org/breed/chausie/"},
  "profile_crex": {"label": "TICA", "title": "TICA Cornish Rex breed profile", "url": "https://tica.org/breed/cornish-rex/"},
  "profile_cymr": {"label": "TICA", "title": "TICA Cymric breed profile", "url": "https://tica.org/breed/cymric/"},
  "profile_drex": {"label": "TICA", "title": "TICA Devon Rex breed profile", "url": "https://tica.org/breed/devon-rex/"},
  "profile_dons": {"label": "TICA", "title": "TICA Donskoy breed profile", "url": "https://tica.org/breed/donskoy/"},
  "profile_emau": {"label": "TICA", "title": "TICA Egyptian Mau breed profile", "url": "https://tica.org/breed/egyptian-mau/"},
  "profile_esho": {"label": "TICA", "title": "TICA Exotic Shorthair breed profile", "url": "https://tica.org/breed/exotic-shorthair/"},
  "profile_hbro": {"label": "TICA", "title": "TICA Havana breed profile", "url": "https://tica.org/breed/havana/"},
  "profile_high": {"label": "TICA", "title": "TICA Highlander breed profile", "url": "https://tica.org/breed/highlander/"},
  "profile_hima": {"label": "TICA", "title": "TICA Himalayan breed profile", "url": "https://tica.org/breed/himalayan/"},
  "profile_jbob": {"label": "TICA", "title": "TICA Japanese Bobtail breed profile", "url": "https://tica.org/breed/japanese-bobtail/"},
  "profile_kora": {"label": "TICA", "title": "TICA Korat breed profile", "url": "https://tica.org/breed/korat/"},
  "profile_kuri": {"label": "TICA", "title": "TICA Kurilian Bobtail breed profile", "url": "https://tica.org/breed/kurilian-bobtail/"},
  "profile_lape": {"label": "TICA", "title": "TICA LaPerm breed profile", "url": "https://tica.org/breed/laperm/"},
  "profile_lyko": {"label": "TICA", "title": "TICA Lykoi breed profile", "url": "https://tica.org/breed/lykoi/"},
  "profile_mcoo": {"label": "TICA", "title": "TICA Maine Coon breed profile", "url": "https://tica.org/breed/maine-coon/"},
  "profile_manx": {"label": "TICA", "title": "TICA Manx breed profile", "url": "https://tica.org/breed/manx/"},
  "profile_minu": {"label": "TICA", "title": "TICA Minuet breed profile", "url": "https://tica.org/breed/minuet/"},
  "profile_munc": {"label": "TICA", "title": "TICA Munchkin breed profile", "url": "https://tica.org/breed/munchkin/"},
  "profile_nebe": {"label": "TICA", "title": "TICA Nebelung breed profile", "url": "https://tica.org/breed/nebelung/"},
  "profile_norw": {"label": "TICA", "title": "TICA Norwegian Forest Cat breed profile", "url": "https://tica.org/breed/norwegian-forest/"},
  "profile_ocic": {"label": "TICA", "title": "TICA Ocicat breed profile", "url": "https://tica.org/breed/ocicat/"},
  "profile_ori1": {"label": "TICA", "title": "TICA Oriental Longhair breed profile", "url": "https://tica.org/breed/oriental-longhair/"},
  "profile_orie": {"label": "TICA", "title": "TICA Oriental Shorthair breed profile", "url": "https://tica.org/breed/oriental-shorthair/"},
  "profile_pete": {"label": "TICA", "title": "TICA Peterbald breed profile", "url": "https://tica.org/breed/peterbald/"},
  "profile_pixi": {"label": "TICA", "title": "TICA Pixiebob breed profile", "url": "https://tica.org/breed/pixiebob/"},
  "profile_ragd": {"label": "TICA", "title": "TICA Ragdoll breed profile", "url": "https://tica.org/breed/ragdoll/"},
  "profile_rblu": {"label": "TICA", "title": "TICA Russian Blue breed profile", "url": "https://tica.org/breed/russian-blue/"},
  "profile_sava": {"label": "TICA", "title": "TICA Savannah breed profile", "url": "https://tica.org/breed/savannah/"},
  "profile_sfol": {"label": "TICA", "title": "TICA Scottish Fold breed profile", "url": "https://tica.org/breed/scottish-fold/"},
  "profile_srex": {"label": "TICA", "title": "TICA Selkirk Rex breed profile", "url": "https://tica.org/breed/selkirk-rex/"},
  "profile_sere": {"label": "TICA", "title": "TICA Serengeti breed profile", "url": "https://tica.org/breed/serengeti/"},
  "profile_sibe": {"label": "TICA", "title": "TICA Siberian breed profile", "url": "https://tica.org/breed/siberian/"},
  "profile_sing": {"label": "TICA", "title": "TICA Singapura breed profile", "url": "https://tica.org/breed/singapura/"},
  "profile_snow": {"label": "TICA", "title": "TICA Snowshoe breed profile", "url": "https://tica.org/breed/snowshoe/"},
  "profile_soma": {"label": "TICA", "title": "TICA Somali breed profile", "url": "https://tica.org/breed/somali/"},
  "profile_sphy": {"label": "TICA", "title": "TICA Sphynx breed profile", "url": "https://tica.org/breed/sphynx/"},
  "profile_thai": {"label": "TICA", "title": "TICA Thai breed profile", "url": "https://tica.org/breed/thai/"},
  "profile_tonk": {"label": "TICA", "title": "TICA Tonkinese breed profile", "url": "https://tica.org/breed/tonkinese/"},
  "profile_toyb": {"label": "TICA", "title": "TICA Toybob breed profile", "url": "https://tica.org/breed/toybob/"},
  "profile_toyg": {"label": "TICA", "title": "TICA Toyger breed profile", "url": "https://tica.org/breed/toyger/"},
  "profile_tang": {"label": "TICA", "title": "TICA Turkish Angora breed profile", "url": "https://tica.org/breed/turkish-angora/"},
  "profile_tvan": {"label": "TICA", "title": "TICA Turkish Van breed profile", "url": "https://tica.org/breed/turkish-van/"},
  "profile_csho": {"label": "CFA", "title": "CFA Colorpoint Shorthair breed profile", "url": "https://cfa.org/breed/colorpoint-shorthair/"},
  "profile_ebur": {"label": "CFA", "title": "CFA European Burmese breed profile", "url": "https://cfa.org/breed/european-burmese/"},
  "profile_khao": {"label": "CFA", "title": "CFA Khao Manee breed profile", "url": "https://cfa.org/breed/khao-manee/"},
  "profile_raga": {"label": "CFA", "title": "CFA RagaMuffin breed profile", "url": "https://cfa.org/breed/ragamuffin/"},
  "profile_aege": {"label": "Catster", "title": "Catster Aegean cat profile", "url": "https://www.catster.com/cat-breeds/aegean-cat/"},
  "profile_amer": {"label": "Catster", "title": "Catster American Ringtail profile", "url": "https://www.catster.com/cat-breeds/american-ringtail-cat/"},
  "profile_amau": {"label": "Catster", "title": "Catster Arabian Mau profile", "url": "https://www.catster.com/cat-breeds/arabian-mau/"},
  "profile_braz": {"label": "Catster", "title": "Catster Brazilian Shorthair profile", "url": "https://www.catster.com/cat-breeds/brazilian-shorthair-cat/"},
  "profile_ctif": {"label": "Hill’s Pet", "title": "Hill’s Pet Chantilly profile", "url": "https://www.hillspet.com/cat-care/cat-breeds/chantilly"},
  "profile_lihu": {"label": "Catster", "title": "Catster Chinese Dragon Li profile", "url": "https://www.catster.com/cat-breeds/chinese-dragon-li-cat/"},
  "profile_soko": {"label": "GCCF", "title": "GCCF Sokoke breed profile", "url": "https://www.gccfcats.org/getting-a-cat/choosing/cat-breeds/sokoke/"},
  "profile_java": {"label": "CFA", "title": "CFA Balinese profile and Javanese history", "url": "https://cfa.org/breed/balinese/"},
  "profile_chee": {"label": "CATZ Inc", "title": "CATZ Inc Cheetoh standard", "url": "https://catzinc.org/wp-content/uploads/2018/09/cheetoh.pdf"},
  "profile_germ": {"label": "PetMD", "title": "PetMD German Rex profile", "url": "https://www.petmd.com/cat/breeds/c_ct_german_rex_cat"},
  "profile_ycho": {"label": "PetMD", "title": "PetMD York Chocolate profile", "url": "https://www.petmd.com/cat/breeds/c_ct_york_chocolate"},
  "profile_cspa": {"label": "PetMD", "title": "PetMD California Spangled profile", "url": "https://www.petmd.com/cat/breeds/c_ct_california_spangled_cat"},
  "profile_fold": {"label": "Catster", "title": "Catster Foldex profile", "url": "https://www.catster.com/cat-breeds/foldex-cat-exotic-fold/"},
  "profile_ukra": {"label": "Catster", "title": "Catster Ukrainian Levkoy profile", "url": "https://www.catster.com/cat-breeds/ukrainian-levkoy-cat/"},
  "profile_skoo": {"label": "CATZ Inc", "title": "CATZ Inc Skookum standard", "url": "https://catzinc.org/wp-content/uploads/2018/09/skookum.pdf"},
  "profile_suph": {"label": "WCF", "title": "WCF Suphalak standard", "url": "https://wcf.de/pdf-en/breed/SUP_en_2024-11-01.pdf"},
  "profile_asia": {"label": "GCCF", "title": "GCCF Asian group and Tiffanie profile", "url": "https://www.gccfcats.org/getting-a-cat/choosing/cat-breeds/asian/"},
  "profile_brit": {"label": "GCCF", "title": "GCCF British Shorthair tipped colour standard", "url": "https://www.gccfcats.org/wp-content/uploads/2025/05/SOP.final_.May2025.pdf"},
  "profile_exlh": {"label": "CFA", "title": "CFA Exotic profile and longhair classification", "url": "https://cfa.org/breed/exotic/"},
  "profile_napo": {"label": "TICA", "title": "TICA Minuet profile and former Napoleon name", "url": "https://tica.org/breed/minuet/"},
  "profile_sinp": {"label": "CFA", "title": "CFA Singapura profile and sepia agouti standard", "url": "https://cfa.org/breed/singapura/"},
  "profile_eshr": {"label": "FIFe", "title": "FIFe European breed profile", "url": "https://fifeweb.org/wp-content/uploads/2026/05/Breed-Profile-EUR.pdf"},
  "profile_aphr": {"label": "WOC", "title": "WOC preliminary Aphrodite’s Giant longhair standard", "url": "https://en.woc.center/articles/standards-apl/"},
  "profile_kana": {"label": "WCF", "title": "WCF Kanaani standard", "url": "https://wcf.de/pdf-en/breed/KAN_en_2010-01-01.pdf"},
  "profile_raas": {"label": "Discover Genetics and Evolution", "title": "Busok cat mitochondrial DNA study, 2026", "url": "https://link.springer.com/article/10.1007/s00294-026-01340-5"},
  "profile_doms": {"label": "PDSA", "title": "PDSA domestic shorthair, mediumhair and longhair guide", "url": "https://www.pdsa.org.uk/pet-help-and-advice/looking-after-your-pet/kittens-cats/domestic-breeds"},
  "profile_domm": {"label": "PDSA", "title": "PDSA domestic mediumhair guide", "url": "https://www.pdsa.org.uk/pet-help-and-advice/looking-after-your-pet/kittens-cats/domestic-breeds"},
  "profile_doml": {"label": "PDSA", "title": "PDSA domestic longhair guide", "url": "https://www.pdsa.org.uk/pet-help-and-advice/looking-after-your-pet/kittens-cats/domestic-breeds"},
  "profile_poly": {"label": "Hemingway Home & Museum", "title": "Hemingway Home & Museum: our cats", "url": "https://www.hemingwayhome.com/our-cats"},
  "profile_bamb": {"label": "Wrinklebottoms Cattery", "title": "Wrinklebottoms: Bambino and other hairless crosses", "url": "https://www.wrinklebottom.com/elf-bambino-dwelf-minskin-hairless-hybrids/"},
  "profile_dwel": {"label": "Wrinklebottoms Cattery", "title": "Wrinklebottoms: Dwelf and other hairless crosses", "url": "https://www.wrinklebottom.com/elf-bambino-dwelf-minskin-hairless-hybrids/"},
  "profile_elfc": {"label": "Wrinklebottoms Cattery", "title": "Wrinklebottoms: Elf and other hairless crosses", "url": "https://www.wrinklebottom.com/elf-bambino-dwelf-minskin-hairless-hybrids/"},
  "profile_mins": {"label": "TICA", "title": "TICA historical Minskin standard in 2007 annual meeting papers", "url": "https://tica.org/phocadownload/2007-annual.pdf"},
} as const;

export interface ContentCitation {
  source: keyof typeof breedContentSources;
  section: string;
}

export interface BreedContentItem {
  id: string;
  text: string;
  citations: ContentCitation[];
}

export interface BreedFact extends BreedContentItem {
  category: 'appearance' | 'history' | 'naming' | 'classification' | 'health';
}

export interface BreedBondingTip extends BreedContentItem {
  basis: 'editorial';
  relatedTraits: (keyof TraitRatings)[];
}

export interface BreedContentEntry {
  name: string;
  reviewedOn: string;
  facts: BreedFact[];
  bondingTips: BreedBondingTip[];
  // Internal editorial reasons for selecting fewer than five in either section.
  coverageNotes?: Partial<Record<'facts' | 'bondingTips', string>>;
  evidenceBasis?: 'breed-profile' | 'related-breed' | 'api-profile' | 'mixed-population';
}

// Aim for five distinct facts and five useful tips per breed, independently.
// Select four or three when evidence or substance is limited; record why in
// coverageNotes rather than splitting a claim or repeating an activity to pad.
// Facts are paraphrased from the cited sections; bonding
// activities are our editorial applications of those profiles, not quotations
// or instructions endorsed by the registries. reviewedOn applies to every item.
// relatedTraits records what a later ratings-consistency review should inspect;
// scores never generate or select this copy. Missing content is not padded.
export const breedContent: Partial<Record<string, BreedContentEntry>> = {
  birm: {
    name: 'Birman',
    reviewedOn: '2026-11-07',
    facts: [
      {
        id: 'white-gloves',
        category: 'appearance',
        text: 'A Birman’s white paws are called gloves; the white markings extending up the backs of the hind legs are called laces.',
        citations: [{ source: 'cfaBirman', section: 'Physical attributes' }],
      },
      {
        id: 'kitten-names',
        category: 'naming',
        text: 'Many Birman breeders follow a French naming tradition: kittens born in the same year receive names beginning with the same letter.',
        citations: [{ source: 'cfaBirman', section: 'Breed history' }],
      },
      {
        id: 'cfa-recognition',
        category: 'history',
        text: 'The Cat Fanciers’ Association accepted the Birman for registration in 1967.',
        citations: [{ source: 'cfaBirman', section: 'Breed history' }],
      },
      {
        id: 'single-coat',
        category: 'appearance',
        text: 'The Birman’s silky coat has no undercoat, which helps explain why it tangles less readily than many longhaired coats.',
        citations: [{ source: 'cfaBirman', section: 'Grooming' }],
      },
      {
        id: 'postwar-rebuilding',
        category: 'history',
        text: 'After World War II nearly wiped out Birmans in Europe, French breeders rebuilt the population with Persian and Siamese outcrosses.',
        citations: [{ source: 'cfaBirman', section: 'Breed future' }],
      },
    ],
    bondingTips: [
      {
        id: 'weekly-combing',
        basis: 'editorial',
        relatedTraits: ['grooming'],
        text: 'Make gentle weekly combing part of your time together. Keep it comfortable and pause if your Birman wants a break.',
        citations: [{ source: 'cfaBirman', section: 'Grooming' }],
      },
      {
        id: 'ball-play',
        basis: 'editorial',
        relatedTraits: ['energy_level', 'intelligence'],
        text: 'Roll a small ball across the floor and invite your Birman to chase or bring it back; let their interest set the pace.',
        citations: [{ source: 'ticaBirman', section: 'Activity level' }],
      },
      {
        id: 'nearby-company',
        basis: 'editorial',
        relatedTraits: ['affection_level', 'social_needs'],
        text: 'Offer a place beside you while you read or work, and let your Birman choose when to settle close.',
        citations: [{ source: 'ticaBirman', section: 'About the breed' }],
      },
      {
        id: 'learning-together',
        basis: 'editorial',
        relatedTraits: ['intelligence'],
        text: 'Try teaching your Birman to come to a familiar cue, rewarding voluntary responses and keeping each practice brief.',
        citations: [{ source: 'cfaBirman', section: 'Traits' }],
      },
      {
        id: 'soft-replies',
        basis: 'editorial',
        relatedTraits: ['vocalisation', 'social_needs'],
        text: 'Notice your Birman’s soft chirps and answer gently, watching whether they are inviting play, company, or a little space.',
        citations: [{ source: 'cfaBirman', section: 'Traits' }],
      },
    ],
  },
  beng: {
    name: 'Bengal',
    reviewedOn: '2026-11-07',
    facts: [
      {
        id: 'coat-patterns',
        category: 'appearance',
        text: 'Bengal coats can have rosettes or flowing marbled patterns, giving the breed more than one distinctive wild-looking coat.',
        citations: [{ source: 'ticaBengal', section: 'General description' }],
      },
      {
        id: 'coat-glitter',
        category: 'appearance',
        text: 'Some Bengals have a shimmering coat effect called glitter. TICA’s standard accepts coats with or without it.',
        citations: [{ source: 'ticaBengal', section: 'The breed standard' }],
      },
      {
        id: 'breed-name',
        category: 'naming',
        text: 'The name Bengal refers to Prionailurus bengalensis, the scientific name of the Asian leopard cat in the breed’s ancestry.',
        citations: [{ source: 'ticaBengal', section: 'History' }],
      },
      {
        id: 'tica-championship',
        category: 'history',
        text: 'TICA accepted Bengals as a new breed in 1986 and granted championship status in 1991.',
        citations: [{ source: 'ticaBengal', section: 'History' }],
      },
      {
        id: 'modern-pairings',
        category: 'history',
        text: 'Modern Bengal breeding uses Bengal-to-Bengal pairings; the wildcat crosses belong to the breed’s foundation history.',
        citations: [{ source: 'ticaBengal', section: 'About the breed' }],
      },
    ],
    bondingTips: [
      {
        id: 'climbing-game',
        basis: 'editorial',
        relatedTraits: ['energy_level'],
        text: 'Build a climbing game around a stable cat tree, moving a toy between levels and letting your Bengal choose each jump.',
        citations: [{ source: 'ticaBengal', section: 'Activity level' }],
      },
      {
        id: 'reward-training',
        basis: 'editorial',
        relatedTraits: ['intelligence', 'social_needs'],
        text: 'Teach a simple cue such as sit with small rewards for each successful step. Keep sessions short and finish while your Bengal is interested.',
        citations: [{ source: 'ticaBengal', section: 'Activity level' }],
      },
      {
        id: 'shared-puzzle',
        basis: 'editorial',
        relatedTraits: ['intelligence', 'energy_level'],
        text: 'Explore a puzzle feeder together: start with an easy puzzle and help when needed, making problem-solving part of your shared time.',
        citations: [{ source: 'ticaBengal', section: 'Activity level' }],
      },
      {
        id: 'optional-water-play',
        basis: 'editorial',
        relatedTraits: ['energy_level', 'intelligence'],
        text: 'If your Bengal investigates water, try supervised play with a floating toy in a shallow tray, letting them approach and leave freely.',
        citations: [{ source: 'ticaBengal', section: 'Did you know?' }],
      },
      {
        id: 'coat-check-in',
        basis: 'editorial',
        relatedTraits: ['grooming', 'affection_level'],
        text: 'Offer a brief, gentle brushing as a quiet check-in between play sessions, especially when loose seasonal hair needs attention.',
        citations: [{ source: 'ticaBengal', section: 'Grooming' }],
      },
    ],
  },
  pers: {
    name: 'Persian',
    reviewedOn: '2026-11-07',
    facts: [
      {
        id: 'foundation-breed',
        category: 'history',
        text: 'Persians were among the six foundation breeds of the Cat Fanciers’ Association when it began in 1906.',
        citations: [{ source: 'cfaPersian', section: 'Breed history' }],
      },
      {
        id: 'colour-divisions',
        category: 'appearance',
        text: 'CFA divides Persians into seven colour divisions for competition, including tabby, silver and golden, and Himalayan.',
        citations: [{ source: 'cfaPersian', section: 'Physical attributes' }],
      },
      {
        id: 'cobby-build',
        category: 'appearance',
        text: 'The Persian’s compact, broad-chested build is called cobby; short, sturdy legs sit beneath that long coat.',
        citations: [{ source: 'cfaPersian', section: 'Physical attributes' }],
      },
      {
        id: 'american-imports',
        category: 'history',
        text: 'CFA traces the first Persian imports into the United States to the late 1880s.',
        citations: [{ source: 'cfaPersian', section: 'Breed history' }],
      },
      {
        id: 'coat-textures',
        category: 'appearance',
        text: 'Persian coats vary in texture: some are silky and resilient, while softer, cottony coats tend to mat more easily.',
        citations: [{ source: 'ticaPersian', section: 'General description' }],
      },
    ],
    bondingTips: [
      {
        id: 'daily-combing',
        basis: 'editorial',
        relatedTraits: ['grooming'],
        text: 'Build daily combing into a calm routine together. Use gentle strokes, take breaks, and avoid pulling on tangles.',
        citations: [{ source: 'ticaPersian', section: 'Grooming' }],
      },
      {
        id: 'floor-play',
        basis: 'editorial',
        relatedTraits: ['energy_level'],
        text: 'Invite your Persian to a short floor-level game with a rolling ball or teaser toy, offering pauses instead of expecting a long chase.',
        citations: [{ source: 'ticaPersian', section: 'Activity level' }, { source: 'cfaPersian', section: 'Traits' }],
      },
      {
        id: 'quiet-companionship',
        basis: 'editorial',
        relatedTraits: ['affection_level', 'social_needs'],
        text: 'Settle together in a quiet spot and offer gentle attention when your Persian approaches; let them choose a lap or a nearby seat.',
        citations: [{ source: 'ticaPersian', section: 'About the breed and activity level' }],
      },
      {
        id: 'name-practice',
        basis: 'editorial',
        relatedTraits: ['intelligence'],
        text: 'Practise your Persian’s name in a quiet room, rewarding a glance or approach with something they enjoy and ending after a few responses.',
        citations: [{ source: 'cfaPersian', section: 'Traits' }],
      },
      {
        id: 'gentle-family-time',
        basis: 'editorial',
        relatedTraits: ['child_friendly', 'affection_level'],
        text: 'If children join in, have them sit quietly and offer gentle strokes when your Persian approaches, keeping boisterous games for another space.',
        citations: [{ source: 'ticaPersian', section: 'Personality' }],
      },
    ],
  },
  siam: {
    name: 'Siamese',
    reviewedOn: '2026-11-07',
    facts: [
      {
        id: 'thai-poems',
        category: 'history',
        text: 'Siamese cats appear in historic Thai cat poems from the Ayutthaya period, centuries before modern breed registries.',
        citations: [{ source: 'cfaSiamese', section: 'Breed history' }],
      },
      {
        id: 'cfa-point-colours',
        category: 'appearance',
        text: 'CFA recognises four Siamese point colours: seal, blue, chocolate, and lilac. Other registries use broader colour definitions.',
        citations: [{ source: 'cfaSiamese', section: 'Breed history and characteristics' }, { source: 'ticaSiamese', section: 'Colors' }],
      },
      {
        id: 'breed-group',
        category: 'history',
        text: 'TICA’s Siamese breed group also includes the Balinese, Oriental Shorthair, and Oriental Longhair, which share the Siamese body type.',
        citations: [{ source: 'ticaSiamese', section: 'General description' }],
      },
      {
        id: 'wedge-and-eyes',
        category: 'appearance',
        text: 'The Siamese show profile combines a wedge-shaped head, large ears, and blue almond-shaped eyes.',
        citations: [{ source: 'cfaSiamese', section: 'Physical attributes' }],
      },
      {
        id: 'early-show-success',
        category: 'history',
        text: 'Siamese were recognised when CFA began in 1906, and a Siamese won Best-in-Show the following year.',
        citations: [{ source: 'cfaSiamese', section: 'Breed history' }],
      },
    ],
    bondingTips: [
      {
        id: 'attentive-conversation',
        basis: 'editorial',
        relatedTraits: ['vocalisation', 'social_needs'],
        text: 'When your Siamese chats, give them your attention and watch their body language too; use the exchange to learn what they are asking for.',
        citations: [{ source: 'cfaSiamese', section: 'Traits' }],
      },
      {
        id: 'fetch-together',
        basis: 'editorial',
        relatedTraits: ['energy_level', 'intelligence'],
        text: 'Try a gentle game of fetch with a lightweight toy. Reward interest in bringing it back, and switch games if fetching does not appeal.',
        citations: [{ source: 'ticaSiamese', section: 'Activity level' }],
      },
      {
        id: 'shared-daily-time',
        basis: 'editorial',
        relatedTraits: ['affection_level', 'social_needs'],
        text: 'Make room for your Siamese in everyday activities with a nearby perch, and plan regular time when they have your undivided attention.',
        citations: [{ source: 'ticaSiamese', section: 'About the breed and activity level' }],
      },
      {
        id: 'indoor-agility',
        basis: 'editorial',
        relatedTraits: ['energy_level', 'intelligence'],
        text: 'Create a simple indoor agility route with low obstacles and stable perches, guiding your Siamese with a toy and rewarding each willing attempt.',
        citations: [{ source: 'ticaSiamese', section: 'Activity level' }],
      },
      {
        id: 'gentle-coat-time',
        basis: 'editorial',
        relatedTraits: ['grooming', 'affection_level'],
        text: 'Use gentle strokes with a rubber brush for a little coat care together, pausing whenever your Siamese has had enough.',
        citations: [{ source: 'cfaSiamese', section: 'Grooming' }],
      },
    ],
  },
  abys: {
    name: 'Abyssinian',
    reviewedOn: '2026-11-07',
    facts: [
      {
        id: 'ticked-coat',
        category: 'appearance',
        text: 'The Abyssinian’s ticked coat gets its effect from bands of colour on individual hairs.',
        citations: [{ source: 'cfaAbyssinian', section: 'Physical attributes' }],
      },
      {
        id: 'zula-at-crystal-palace',
        category: 'history',
        text: 'An Abyssinian named Zula appeared at London’s Crystal Palace cat show in 1871.',
        citations: [{ source: 'cfaAbyssinian', section: 'Breed history' }],
      },
      {
        id: 'abyssinia-name',
        category: 'naming',
        text: 'The name refers to Abyssinia, now Ethiopia, from which early show cats were imported to England; it does not establish the breed’s ancestral origin.',
        citations: [{ source: 'cfaAbyssinian', section: 'Breed history' }],
      },
      {
        id: 'four-cfa-colours',
        category: 'appearance',
        text: 'CFA’s Abyssinian colours are ruddy, cinnamon, blue, and fawn; ruddy is a warm red-brown.',
        citations: [{ source: 'cfaAbyssinian', section: 'Physical attributes' }],
      },
      {
        id: 'original-cfa-breed',
        category: 'history',
        text: 'Abyssinians reached the United States in the early 1900s and were among CFA’s original registered breeds in 1906.',
        citations: [{ source: 'cfaAbyssinian', section: 'Breed history' }],
      },
    ],
    bondingTips: [
      {
        id: 'high-perch-play',
        basis: 'editorial',
        relatedTraits: ['energy_level'],
        text: 'Give your Abyssinian a stable high perch and join their exploring with a toy-led route between safe climbing spots.',
        citations: [{ source: 'cfaAbyssinian', section: 'Traits' }],
      },
      {
        id: 'hunting-games',
        basis: 'editorial',
        relatedTraits: ['energy_level', 'intelligence'],
        text: 'Play a hunting game by moving a toy behind cover and letting your Abyssinian investigate, stalk, and catch it.',
        citations: [{ source: 'cfaAbyssinian', section: 'Traits' }],
      },
      {
        id: 'active-affection',
        basis: 'editorial',
        relatedTraits: ['affection_level', 'social_needs'],
        text: 'Meet your Abyssinian’s bids for attention with shared play or a brief stroke, letting them move on when they choose.',
        citations: [{ source: 'cfaAbyssinian', section: 'About the breed and traits' }],
      },
      {
        id: 'harness-exploration',
        basis: 'editorial',
        relatedTraits: ['adaptability', 'energy_level'],
        text: 'If your Abyssinian enjoys exploring new places, introduce a harness indoors at their pace before considering a quiet outing together.',
        citations: [{ source: 'cfaAbyssinian', section: 'Traits' }],
      },
      {
        id: 'light-grooming',
        basis: 'editorial',
        relatedTraits: ['grooming', 'affection_level'],
        text: 'Offer a brief brushing a few times a month as a calmer shared activity, letting your Abyssinian step away between strokes.',
        citations: [{ source: 'cfaAbyssinian', section: 'Grooming' }],
      },
    ],
  },
  "abob": {
    "name": "American Bobtail",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "individual-tail",
        "text": "No two American Bobtail tails are identical; the short tail is naturally occurring.",
        "citations": [
          {
            "source": "profile_abob",
            "section": "About the breed"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "yodi",
        "text": "The modern breeding programme began with Yodi, a short-tailed kitten found in Arizona in the 1960s.",
        "citations": [
          {
            "source": "profile_abob",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "recognition",
        "text": "TICA recognised the American Bobtail as a naturally occurring breed in 1989.",
        "citations": [
          {
            "source": "profile_abob",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "coat-lengths",
        "text": "American Bobtails come in short and medium-long coats, with a wide range of colours and patterns.",
        "citations": [
          {
            "source": "profile_abob",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "maturity",
        "text": "Their substantial, muscular build develops slowly; full maturity can take about three years.",
        "citations": [
          {
            "source": "profile_abob",
            "section": "General description"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "fetch",
        "text": "Toss a soft toy a short distance and reward your Bobtail’s interest in bringing it back.",
        "citations": [
          {
            "source": "profile_abob",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "puzzles",
        "text": "Work through an easy food puzzle together, helping before frustration replaces curiosity.",
        "citations": [
          {
            "source": "profile_abob",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "harness",
        "text": "Introduce a harness indoors if your Bobtail enjoys exploring, building confidence before any outing.",
        "citations": [
          {
            "source": "profile_abob",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "adaptability"
        ]
      },
      {
        "id": "family-time",
        "text": "Invite different family members to take turns playing, giving this family-oriented cat time with everyone.",
        "citations": [
          {
            "source": "profile_abob",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs",
          "affection_level"
        ]
      },
      {
        "id": "combing",
        "text": "Make gentle combing a shared routine, adjusting attention to the coat during seasonal shedding.",
        "citations": [
          {
            "source": "profile_abob",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "acur": {
    "name": "American Curl",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "shulamith",
        "text": "American Curls trace their ancestry to Shulamith, a stray found in Lakewood, California, in 1981.",
        "citations": [
          {
            "source": "profile_acur",
            "section": "Origin"
          }
        ],
        "category": "history"
      },
      {
        "id": "straight-at-birth",
        "text": "Curl kittens are born with straight ears; the ears develop their final curvature over roughly four months.",
        "citations": [
          {
            "source": "profile_acur",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "dominant-trait",
        "text": "The curled-ear trait is inherited through a dominant gene affecting the ear cartilage.",
        "citations": [
          {
            "source": "profile_acur",
            "section": "Genetic research"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "coat-lengths",
        "text": "The breed has both shorthaired and longhaired varieties, with little undercoat.",
        "citations": [
          {
            "source": "profile_acur",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "peter-pan",
        "text": "The nickname Peter Pan reflects the Curl’s tendency to retain kitten-like playfulness as an adult.",
        "citations": [
          {
            "source": "profile_acur",
            "section": "Activity level"
          }
        ],
        "category": "naming"
      }
    ],
    "bondingTips": [
      {
        "id": "fetch",
        "text": "Try retrieving a small toy, rewarding each voluntary return instead of insisting on a finished trick.",
        "citations": [
          {
            "source": "profile_acur",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "perches",
        "text": "Offer a stable climbing perch and move a teaser nearby so exploration becomes a game together.",
        "citations": [
          {
            "source": "profile_acur",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "quiet-greetings",
        "text": "Respond to gentle head bumps or quiet coos with attention, letting your Curl set the contact level.",
        "citations": [
          {
            "source": "profile_acur",
            "section": "About the breed"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level",
          "vocalisation"
        ]
      },
      {
        "id": "join-in",
        "text": "Give your Curl a safe spot beside household activities so they can participate without getting underfoot.",
        "citations": [
          {
            "source": "profile_acur",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs"
        ]
      },
      {
        "id": "gentle-coat-care",
        "text": "Offer light coat care appropriate to their hair length; keep hands gentle and never bend the curled ears.",
        "citations": [
          {
            "source": "profile_acur",
            "section": "Traits and grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "asho": {
    "name": "American Shorthair",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "working-cats",
        "text": "The breed developed from working cats brought by early settlers to protect ships’ stores from rodents.",
        "citations": [
          {
            "source": "profile_asho",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "former-name",
        "text": "Early show cats were called Domestic Shorthairs before the pedigree breed acquired the name American Shorthair.",
        "citations": [
          {
            "source": "profile_asho",
            "section": "History"
          }
        ],
        "category": "naming"
      },
      {
        "id": "dense-coat",
        "text": "Its short, dense coat has a firm texture rather than a soft, fluffy finish.",
        "citations": [
          {
            "source": "profile_asho",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "tabby-patterns",
        "text": "Classic tabby and tabby-with-white patterns have been particularly popular in the show ring.",
        "citations": [
          {
            "source": "profile_asho",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "slow-maturity",
        "text": "American Shorthairs can take three to four years to reach their mature appearance.",
        "citations": [
          {
            "source": "profile_asho",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "hunting-play",
        "text": "Move a toy along the floor for stalking and catching, giving their hunting interest a shared outlet.",
        "citations": [
          {
            "source": "profile_asho",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "window-time",
        "text": "Sit beside a secure window perch and share a quiet watch of outdoor activity.",
        "citations": [
          {
            "source": "profile_asho",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "fetch",
        "text": "Offer a short game of fetch and praise attempts, switching activities if returning toys does not appeal.",
        "citations": [
          {
            "source": "profile_asho",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "company-choice",
        "text": "Provide both a nearby resting place and the option of your lap, respecting their independent moments.",
        "citations": [
          {
            "source": "profile_asho",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level",
          "social_needs"
        ]
      },
      {
        "id": "weekly-comb",
        "text": "Use weekly combing as relaxed one-to-one time, stopping before your cat becomes restless.",
        "citations": [
          {
            "source": "profile_asho",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "awir": {
    "name": "American Wirehair",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "new-york",
        "text": "The first American Wirehair appeared in a farm litter in Verona, New York.",
        "citations": [
          {
            "source": "profile_awir",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "adam",
        "text": "The founding red-and-white male was named Council Rock Farm Adam of Hi-Fi.",
        "citations": [
          {
            "source": "profile_awir",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "hooked-hairs",
        "text": "The coat’s distinctive texture comes from hairs that are crimped, bent, or hooked, including the whiskers.",
        "citations": [
          {
            "source": "profile_awir",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "shorthair-relation",
        "text": "American Shorthairs helped develop the Wirehair, which shares their general body type.",
        "citations": [
          {
            "source": "profile_awir",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "springy-coat",
        "text": "The wiry coat springs back after a stroke, and the degree of wiriness varies between cats.",
        "citations": [
          {
            "source": "profile_awir",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "toy-chase",
        "text": "Invite stalking and pouncing with a ground-level toy, allowing a satisfying catch at the end.",
        "citations": [
          {
            "source": "profile_awir",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "fetch",
        "text": "Introduce an easy retrieving game with a soft toy and reward your Wirehair’s voluntary attempts.",
        "citations": [
          {
            "source": "profile_awir",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "watch-together",
        "text": "Share time by a secure window where your Wirehair can watch birds and passing activity.",
        "citations": [
          {
            "source": "profile_awir",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "lap-or-nearby",
        "text": "Let your Wirehair choose between sitting nearby and joining your lap during a quiet break.",
        "citations": [
          {
            "source": "profile_awir",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level",
          "social_needs"
        ]
      },
      {
        "id": "protect-the-coat",
        "text": "Choose gentle stroking for quiet contact; routine vigorous brushing can damage the wiry coat.",
        "citations": [
          {
            "source": "profile_awir",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "amis": {
    "name": "Australian Mist",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "founder",
        "text": "Truda Straede developed the Australian Mist in Australia during the 1970s.",
        "citations": [
          {
            "source": "profile_amis",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "ancestry",
        "text": "The foundation combined Burmese, Abyssinian, and domestic shorthair cats.",
        "citations": [
          {
            "source": "profile_amis",
            "section": "The breed standard"
          }
        ],
        "category": "history"
      },
      {
        "id": "name-change",
        "text": "Originally Spotted Mist, the name changed to Australian Mist in 1998 as marbled coats joined the breed.",
        "citations": [
          {
            "source": "profile_amis",
            "section": "Did you know?"
          }
        ],
        "category": "naming"
      },
      {
        "id": "mist-effect",
        "text": "Ticking over the coat pattern creates the misted-veil effect that gives the breed its name.",
        "citations": [
          {
            "source": "profile_amis",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "colour-development",
        "text": "Full adult colour can take about two years to develop.",
        "citations": [
          {
            "source": "profile_amis",
            "section": "Did you know?"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "lap-invitation",
        "text": "Settle with a warm, comfortable lap available and let your Mist choose whether to join.",
        "citations": [
          {
            "source": "profile_amis",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "fetch",
        "text": "Try a brief retrieving game, keeping it light as adult Mists may prefer cuddling to prolonged chasing.",
        "citations": [
          {
            "source": "profile_amis",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "family-play",
        "text": "Include children in calm, supervised toy play and show them when to give the cat a break.",
        "citations": [
          {
            "source": "profile_amis",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "child_friendly"
        ]
      },
      {
        "id": "daily-company",
        "text": "Make your Mist part of daily home routines, adding regular periods of undivided attention.",
        "citations": [
          {
            "source": "profile_amis",
            "section": "About the breed"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs"
        ]
      },
      {
        "id": "weekly-brush",
        "text": "Offer a quick weekly brushing as relaxed contact, following your Mist’s comfort rather than holding them in place.",
        "citations": [
          {
            "source": "profile_amis",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "bali": {
    "name": "Balinese",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "dancer-name",
        "text": "Helen Smith named the breed after Balinese dancers, whose grace reminded her of the cats.",
        "citations": [
          {
            "source": "profile_bali",
            "section": "History"
          }
        ],
        "category": "naming"
      },
      {
        "id": "american-development",
        "text": "The modern breed developed in the United States from longhaired kittens appearing in Siamese litters.",
        "citations": [
          {
            "source": "profile_bali",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "single-coat",
        "text": "Its silky single coat lacks an undercoat and follows the body’s slender lines.",
        "citations": [
          {
            "source": "profile_bali",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "plumed-tail",
        "text": "The tail carries a plume of longer hair even though the body coat lies relatively close.",
        "citations": [
          {
            "source": "profile_bali",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "pointed-pattern",
        "text": "Balinese have blue eyes and a pointed pattern, with darker colour on the face, ears, legs, and tail.",
        "citations": [
          {
            "source": "profile_bali",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "agility",
        "text": "Guide your Balinese through an easy indoor obstacle route, rewarding each willing step.",
        "citations": [
          {
            "source": "profile_bali",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "retrieving",
        "text": "Offer a toy to chase and retrieve, building a short back-and-forth game together.",
        "citations": [
          {
            "source": "profile_bali",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "conversation",
        "text": "Answer your Balinese’s calls and watch their body language to learn which interactions they enjoy.",
        "citations": [
          {
            "source": "profile_bali",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "vocalisation"
        ]
      },
      {
        "id": "shared-tasks",
        "text": "Provide a safe nearby spot while you work or fold laundry so your Balinese can join the activity.",
        "citations": [
          {
            "source": "profile_bali",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs",
          "affection_level"
        ]
      },
      {
        "id": "coat-and-tail",
        "text": "Use a gentle weekly brush or comb to enjoy quiet time together and care for the plumed tail.",
        "citations": [
          {
            "source": "profile_bali",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "bomb": {
    "name": "Bombay",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "nikki-horner",
        "text": "Nikki Horner developed the Bombay to resemble a miniature black panther.",
        "citations": [
          {
            "source": "profile_bomb",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "parent-breeds",
        "text": "The foundation paired black American Shorthairs with sable Burmese.",
        "citations": [
          {
            "source": "profile_bomb",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "indian-name",
        "text": "The breed’s name refers to the Indian city of Bombay, although the breeding programme was American.",
        "citations": [
          {
            "source": "profile_bomb",
            "section": "History"
          }
        ],
        "category": "naming"
      },
      {
        "id": "black-coat",
        "text": "The show coat is glossy jet black, with eyes ranging from rich gold to copper.",
        "citations": [
          {
            "source": "profile_bomb",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "championship",
        "text": "TICA accepted the Bombay for championship competition in June 1979.",
        "citations": [
          {
            "source": "profile_bomb",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "homecoming",
        "text": "Make your return home an unhurried greeting, giving your Bombay a chance to seek attention.",
        "citations": [
          {
            "source": "profile_bomb",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs"
        ]
      },
      {
        "id": "tricks",
        "text": "Practise one easy trick with small rewards, keeping the session playful and brief.",
        "citations": [
          {
            "source": "profile_bomb",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "puzzle",
        "text": "Explore an interactive puzzle together, helping before your Bombay loses interest.",
        "citations": [
          {
            "source": "profile_bomb",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "family-play",
        "text": "Let family members take turns with a teaser toy, supervising children and allowing the cat to withdraw.",
        "citations": [
          {
            "source": "profile_bomb",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "child_friendly"
        ]
      },
      {
        "id": "coat-strokes",
        "text": "Offer gentle strokes or a light rubber brushing as quiet contact when your Bombay settles beside you.",
        "citations": [
          {
            "source": "profile_bomb",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming",
          "affection_level"
        ]
      }
    ]
  },
  "bslo": {
    "name": "British Longhair",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "companion-breed",
        "text": "The British Longhair shares the British Shorthair’s substantial body type with a longer coat.",
        "citations": [
          {
            "source": "profile_bslo",
            "section": "General description"
          }
        ],
        "category": "history"
      },
      {
        "id": "persian-crosses",
        "text": "Persian crosses during the early twentieth century introduced longhair into British breeding lines.",
        "citations": [
          {
            "source": "profile_bslo",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "championship",
        "text": "British Longhairs gained TICA championship status in May 2009.",
        "citations": [
          {
            "source": "profile_bslo",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "standing-coat",
        "text": "The dense long coat stands away from the body, emphasising the breed’s rounded outline.",
        "citations": [
          {
            "source": "profile_bslo",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "colour-range",
        "text": "Blue is familiar, but British Longhairs also come in many other colours and patterns.",
        "citations": [
          {
            "source": "profile_bslo",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "sofa-company",
        "text": "Offer a place beside you on the sofa, letting your British Longhair choose closeness without being lifted.",
        "citations": [
          {
            "source": "profile_bslo",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "floor-games",
        "text": "Roll a toy mouse along the floor for a short hunting game with pauses.",
        "citations": [
          {
            "source": "profile_bslo",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "daily-combing",
        "text": "Build gentle daily combing into shared quiet time, paying attention to tangles beneath the longer coat.",
        "citations": [
          {
            "source": "profile_bslo",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "retrieving",
        "text": "Try retrieving a soft toy over a short distance, rewarding interest rather than expecting a long chase.",
        "citations": [
          {
            "source": "profile_bslo",
            "section": "Grooming and activity"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "gentle-handling",
        "text": "Show visitors and children how to greet at floor level, allowing your cat to approach on their own.",
        "citations": [
          {
            "source": "profile_bslo",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "child_friendly",
          "adaptability"
        ]
      }
    ]
  },
  "bsho": {
    "name": "British Shorthair",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "dense-short-coat",
        "text": "The British Shorthair’s plush coat is extremely dense and has a crisp texture.",
        "citations": [
          {
            "source": "profile_bsho",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "rounded-outline",
        "text": "Round cheeks, a broad chest, and short strong legs contribute to its familiar teddy-bear outline.",
        "citations": [
          {
            "source": "profile_bsho",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "beyond-blue",
        "text": "Blue is especially familiar, but the breed includes a broad range of colours and patterns.",
        "citations": [
          {
            "source": "profile_bsho",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "postwar-rebuilding",
        "text": "After the world wars, breeders used other lines, including Persians, to rebuild British Shorthair populations.",
        "citations": [
          {
            "source": "profile_bsho",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "tica-championship",
        "text": "The British Shorthair gained TICA championship status in June 1979.",
        "citations": [
          {
            "source": "profile_bsho",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "beside-you",
        "text": "Let your British Shorthair settle alongside you instead of repeatedly placing them on your lap.",
        "citations": [
          {
            "source": "profile_bsho",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "gentle-teaser",
        "text": "Invite a short teaser-toy game at floor level, stopping for a rest when enthusiasm fades.",
        "citations": [
          {
            "source": "profile_bsho",
            "section": "Activity level and grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "fetch-practice",
        "text": "Offer a soft toy to retrieve and praise small attempts, keeping the distance manageable.",
        "citations": [
          {
            "source": "profile_bsho",
            "section": "Grooming and activity"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "weekly-comb",
        "text": "Share a gentle weekly combing session, adding attention when the dense coat sheds seasonally.",
        "citations": [
          {
            "source": "profile_bsho",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "respectful-greetings",
        "text": "Coach children to sit and invite contact; this grounded breed often prefers greetings without being carried.",
        "citations": [
          {
            "source": "profile_bsho",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "child_friendly",
          "adaptability"
        ]
      }
    ]
  },
  "bure": {
    "name": "Burmese",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "wong-mau",
        "text": "The modern Burmese breeding programme began with Wong Mau, brought to San Francisco in 1930.",
        "citations": [
          {
            "source": "profile_bure",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "original-sable",
        "text": "Sable was the original Burmese colour; other colours were developed later.",
        "citations": [
          {
            "source": "profile_bure",
            "section": "History"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "blue-surprise",
        "text": "A blue kitten named Sealcoat Blue Surprise was born in England in 1955.",
        "citations": [
          {
            "source": "profile_bure",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "compact-build",
        "text": "A compact, muscular body makes the Burmese surprisingly substantial for its medium size.",
        "citations": [
          {
            "source": "profile_bure",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "maturing-colour",
        "text": "Body colour deepens as Burmese mature, reducing the contrast with their darker extremities.",
        "citations": [
          {
            "source": "profile_bure",
            "section": "Colors"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "lap-choice",
        "text": "Make a comfortable lap available during a quiet break and let your Burmese initiate the cuddle.",
        "citations": [
          {
            "source": "profile_bure",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "gentle-chat",
        "text": "Answer their soft voice while watching posture and attention, learning which exchanges they enjoy.",
        "citations": [
          {
            "source": "profile_bure",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "vocalisation"
        ]
      },
      {
        "id": "learning-game",
        "text": "Teach a simple cue with small rewards, making learning a short daily game together.",
        "citations": [
          {
            "source": "profile_bure",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "interactive-play",
        "text": "Set aside time for interactive toys, giving your Burmese your attention rather than only leaving toys out.",
        "citations": [
          {
            "source": "profile_bure",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level",
          "social_needs"
        ]
      },
      {
        "id": "rubber-brush",
        "text": "Use a gentle weekly rubber brushing as relaxed contact, following the smooth coat without pressing hard.",
        "citations": [
          {
            "source": "profile_bure",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "buri": {
    "name": "Burmilla",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "first-litter",
        "text": "The first Burmilla litter was born in 1981 from a Chinchilla Persian and a lilac Burmese.",
        "citations": [
          {
            "source": "profile_buri",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "four-kittens",
        "text": "That founding litter contained four female kittens, all black shaded silver shorthairs.",
        "citations": [
          {
            "source": "profile_buri",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "silver-base",
        "text": "Coloured tipping or shading contrasts with a silver-white base coat.",
        "citations": [
          {
            "source": "profile_buri",
            "section": "Colors"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "makeup-lines",
        "text": "Dark outlines around the eyes, nose, and lips create the Burmilla’s distinctive made-up expression.",
        "citations": [
          {
            "source": "profile_buri",
            "section": "General description"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "coat-lengths",
        "text": "Burmillas occur in shorthaired and semi-longhaired varieties.",
        "citations": [
          {
            "source": "profile_buri",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "climbing-route",
        "text": "Use a secure cat tree for a shared climbing game, allowing your Burmilla to choose the pace.",
        "citations": [
          {
            "source": "profile_buri",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "reward-puzzle",
        "text": "Explore an easy treat puzzle together, offering help before the challenge becomes frustrating.",
        "citations": [
          {
            "source": "profile_buri",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "trick-time",
        "text": "Practise a small trick in brief sessions, rewarding voluntary attempts and finishing on a comfortable success.",
        "citations": [
          {
            "source": "profile_buri",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "rest-nearby",
        "text": "Alternate play with relaxed nearby company, leaving room for your Burmilla’s independent moments.",
        "citations": [
          {
            "source": "profile_buri",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level",
          "social_needs"
        ]
      },
      {
        "id": "weekly-coat-care",
        "text": "Offer gentle weekly brushing or combing, adjusting the session to your cat’s coat length and tolerance.",
        "citations": [
          {
            "source": "profile_buri",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "char": {
    "name": "Chartreux",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "blue-only",
        "text": "The Chartreux comes in blue-grey shades, from ash to slate, rather than a full rainbow of colours.",
        "citations": [
          {
            "source": "profile_char",
            "section": "Colors"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "double-coat",
        "text": "A firmer, water-repellent outer coat covers a soft, dense undercoat.",
        "citations": [
          {
            "source": "profile_char",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "smiling-muzzle",
        "text": "The rounded head narrows to a tapered muzzle that creates a smiling expression.",
        "citations": [
          {
            "source": "profile_char",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "french-records",
        "text": "References to Chartreux cats appear in French literature centuries before modern breed registries.",
        "citations": [
          {
            "source": "profile_char",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "uncertain-name",
        "text": "Stories connect the name with Carthusian monks or a wool fabric, but the monastery story lacks documentary confirmation.",
        "citations": [
          {
            "source": "profile_char",
            "section": "History"
          }
        ],
        "category": "naming"
      }
    ],
    "bondingTips": [
      {
        "id": "stalking-game",
        "text": "Offer a fishing-pole toy for stalking and catching, letting your Chartreux choose whether to climb or stay grounded.",
        "citations": [
          {
            "source": "profile_char",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "puzzle-time",
        "text": "Introduce a manageable puzzle toy and share the discovery rather than leaving the whole challenge to your cat.",
        "citations": [
          {
            "source": "profile_char",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "small-tricks",
        "text": "Try a simple rewarded cue, keeping practice quiet and brief.",
        "citations": [
          {
            "source": "profile_char",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "quiet-attention",
        "text": "Notice quiet chirps and approaches, offering company without requiring a noisy request.",
        "citations": [
          {
            "source": "profile_char",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level",
          "vocalisation"
        ]
      },
      {
        "id": "seasonal-combing",
        "text": "Make regular combing comfortable shared time, with extra attention when the woolly undercoat sheds.",
        "citations": [
          {
            "source": "profile_char",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming",
          "shedding_level"
        ]
      }
    ]
  },
  "chau": {
    "name": "Chausie",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "name",
        "text": "Chausie takes its name from Felis chaus, the jungle cat in its foundation ancestry.",
        "citations": [
          {
            "source": "profile_chau",
            "section": "General description"
          }
        ],
        "category": "naming"
      },
      {
        "id": "recognition",
        "text": "TICA granted foundation registration in 1995 and championship status in May 2013.",
        "citations": [
          {
            "source": "profile_chau",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "athletic-build",
        "text": "Long legs, a deep chest, and a long rectangular torso give the Chausie its athletic outline.",
        "citations": [
          {
            "source": "profile_chau",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "colours",
        "text": "TICA’s profile describes brown ticked tabby, solid black, and grizzled tabby coats.",
        "citations": [
          {
            "source": "profile_chau",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "ear-tufts",
        "text": "Large upright ears may carry tufts, adding to the breed’s wild-looking silhouette.",
        "citations": [
          {
            "source": "profile_chau",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "active-partnership",
        "text": "Plan substantial interactive play together, varying running, chasing, and climbing opportunities throughout the day.",
        "citations": [
          {
            "source": "profile_chau",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level",
          "social_needs"
        ]
      },
      {
        "id": "fetch",
        "text": "Build a retrieving game in small steps, rewarding your Chausie for approaching and returning a toy.",
        "citations": [
          {
            "source": "profile_chau",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "harness",
        "text": "If your Chausie welcomes it, practise a harness indoors before considering a controlled outing together.",
        "citations": [
          {
            "source": "profile_chau",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "adaptability"
        ]
      },
      {
        "id": "secure-exploring",
        "text": "Explore safe climbing spaces together while keeping tempting cupboards securely closed outside supervised play.",
        "citations": [
          {
            "source": "profile_chau",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "quiet-grooming",
        "text": "Use occasional gentle combing as a quiet break between active sessions, respecting when your cat moves away.",
        "citations": [
          {
            "source": "profile_chau",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming",
          "affection_level"
        ]
      }
    ]
  },
  "crex": {
    "name": "Cornish Rex",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "kallibunker",
        "text": "Kallibunker, a curly kitten born in Cornwall in 1950, founded the Cornish Rex breed.",
        "citations": [
          {
            "source": "profile_crex",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "guard-hairs",
        "text": "The distinctive wavy coat lacks the usual guard hairs found in many other cats.",
        "citations": [
          {
            "source": "profile_crex",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "curled-whiskers",
        "text": "The curls extend to short, curled whiskers and eyebrows.",
        "citations": [
          {
            "source": "profile_crex",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "arched-outline",
        "text": "A naturally arched back and tucked-up waist contribute to the Cornish Rex’s racy outline.",
        "citations": [
          {
            "source": "profile_crex",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "north-america",
        "text": "Lamorna Cove’s arrival in California in 1957 helped establish the breed in North America.",
        "citations": [
          {
            "source": "profile_crex",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "retrieving",
        "text": "Offer a light toy to retrieve and make each return the start of another shared turn.",
        "citations": [
          {
            "source": "profile_crex",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "climbing",
        "text": "Provide stable climbing furniture and join your Cornish Rex’s acrobatics with a toy at a comfortable height.",
        "citations": [
          {
            "source": "profile_crex",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "family-games",
        "text": "Let family members alternate gentle toy play, giving your cat breaks and the option to leave.",
        "citations": [
          {
            "source": "profile_crex",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "child_friendly",
          "social_needs"
        ]
      },
      {
        "id": "warm-company",
        "text": "Offer a comfortable warm resting place beside you for quiet contact after play.",
        "citations": [
          {
            "source": "profile_crex",
            "section": "Traits"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "attention-signals",
        "text": "Notice a gentle paw or approach as an invitation, responding without requiring louder attention-seeking.",
        "citations": [
          {
            "source": "profile_crex",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "vocalisation",
          "affection_level"
        ]
      }
    ]
  },
  "cymr": {
    "name": "Cymric",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "longhair-manx",
        "text": "The Cymric is the longhaired member of the Manx breed group, associated with the Isle of Man.",
        "citations": [
          {
            "source": "profile_cymr",
            "section": "General description"
          }
        ],
        "category": "history"
      },
      {
        "id": "tail-variety",
        "text": "Not every Cymric is tailless; kittens can have short tails or full-length tails.",
        "citations": [
          {
            "source": "profile_cymr",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "hind-legs",
        "text": "Longer hind legs give the rounded body a raised rump and powerful jumping ability.",
        "citations": [
          {
            "source": "profile_cymr",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "ruff-and-breeches",
        "text": "Its plush semi-long coat forms a neck ruff and fluffy breeches.",
        "citations": [
          {
            "source": "profile_cymr",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "recognition",
        "text": "TICA recognised both Cymric and Manx for championship competition in June 1979.",
        "citations": [
          {
            "source": "profile_cymr",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "retrieving",
        "text": "Teach a short retrieving game with a soft toy, rewarding any willing return.",
        "citations": [
          {
            "source": "profile_cymr",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "daily-chase",
        "text": "Offer daily teaser-toy play with satisfying catches, using stable surfaces for any jumping.",
        "citations": [
          {
            "source": "profile_cymr",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "gentle-support",
        "text": "Keep handling gentle and support the hindquarters when lifting; show children to avoid poking the tail area.",
        "citations": [
          {
            "source": "profile_cymr",
            "section": "Traits"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level",
          "child_friendly"
        ]
      },
      {
        "id": "answer-trills",
        "text": "Respond to quiet trills with company or a little play, noticing your Cymric’s individual preferences.",
        "citations": [
          {
            "source": "profile_cymr",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "vocalisation",
          "social_needs"
        ]
      },
      {
        "id": "plush-coat",
        "text": "Make regular gentle combing part of shared quiet time, working patiently through the longer coat.",
        "citations": [
          {
            "source": "profile_cymr",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "drex": {
    "name": "Devon Rex",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "kirlee",
        "text": "Devon Rex ancestry traces to Kirlee, a curly kitten born near Buckfastleigh, Devon, in 1960.",
        "citations": [
          {
            "source": "profile_drex",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "different-curl",
        "text": "The Devon’s curl mutation differs from the mutation responsible for the Cornish Rex coat.",
        "citations": [
          {
            "source": "profile_drex",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "pixie-head",
        "text": "Large, low-set ears, high cheekbones, and a short muzzle create the breed’s pixie-like face.",
        "citations": [
          {
            "source": "profile_drex",
            "section": "General description"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "changing-coat",
        "text": "A Devon’s short, rippled coat can change in density over its life and during moulting.",
        "citations": [
          {
            "source": "profile_drex",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "whiskers",
        "text": "Whiskers and eyebrows are often short and crinkled, matching the texture of the coat.",
        "citations": [
          {
            "source": "profile_drex",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "fetch",
        "text": "Try retrieving a favourite toy, building a back-and-forth game from small voluntary attempts.",
        "citations": [
          {
            "source": "profile_drex",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "perch-games",
        "text": "Offer secure climbing perches and guide play toward them instead of unstable high furniture.",
        "citations": [
          {
            "source": "profile_drex",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "shared-investigation",
        "text": "Introduce a safe new box or toy together, giving your Devon a companion for their investigation.",
        "citations": [
          {
            "source": "profile_drex",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "social_needs"
        ]
      },
      {
        "id": "puzzle-time",
        "text": "Work through an easy puzzle toy and adjust the challenge before your Devon becomes frustrated.",
        "citations": [
          {
            "source": "profile_drex",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "warm-rest",
        "text": "Keep a cosy resting spot beside you available after play, letting your Devon choose when to snuggle.",
        "citations": [
          {
            "source": "profile_drex",
            "section": "Traits"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      }
    ]
  },
  "dons": {
    "name": "Donskoy",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "varvara",
        "text": "The breed began with Varvara, a cat found in Rostov-on-Don, Russia, in 1987.",
        "citations": [
          {
            "source": "profile_dons",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "don-name",
        "text": "The earlier name Don Sphynx referred to the Don River; TICA uses Donskoy.",
        "citations": [
          {
            "source": "profile_dons",
            "section": "History"
          }
        ],
        "category": "naming"
      },
      {
        "id": "dominant-hair-loss",
        "text": "The Donskoy’s inherited hair-loss trait is dominant and can cause a kitten’s birth coat to fall out.",
        "citations": [
          {
            "source": "profile_dons",
            "section": "The breed standard"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "coat-types",
        "text": "Its four described coat types are Rubber Bald, Flocked, Velour, and Brush.",
        "citations": [
          {
            "source": "profile_dons",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "changing-hair",
        "text": "Some Donskoys lose much of their birth coat, while Brush-coated cats retain more hair.",
        "citations": [
          {
            "source": "profile_dons",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "voice-cues",
        "text": "Practise a simple voice cue with a small reward, letting your Donskoy volunteer each response.",
        "citations": [
          {
            "source": "profile_dons",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "interactive-play",
        "text": "Use interactive toys for regular shared play, combining movement with manageable problem-solving.",
        "citations": [
          {
            "source": "profile_dons",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "safe-exploring",
        "text": "Explore a safe new climbing or hiding space together, staying available while your Donskoy investigates.",
        "citations": [
          {
            "source": "profile_dons",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs",
          "intelligence"
        ]
      },
      {
        "id": "skin-care",
        "text": "Make skin care calm shared time, following your vet’s guidance on suitable products and frequency.",
        "citations": [
          {
            "source": "profile_dons",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "comfortable-company",
        "text": "Offer a warm, sheltered place beside you and keep shared activities within comfortable indoor temperatures.",
        "citations": [
          {
            "source": "profile_dons",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      }
    ]
  },
  "emau": {
    "name": "Egyptian Mau",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "natural-spots",
        "text": "The Egyptian Mau’s spotted pattern occurs naturally, with individually shaped spots rather than uniform rosettes.",
        "citations": [
          {
            "source": "profile_emau",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "green-eyes",
        "text": "The breed’s characteristic eye colour is described as gooseberry green.",
        "citations": [
          {
            "source": "profile_emau",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "tiptoe-stance",
        "text": "Longer hind legs give the Mau a distinctive tiptoe stance.",
        "citations": [
          {
            "source": "profile_emau",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "american-arrival",
        "text": "Nathalie Troubetskoy brought three Maus from Italy to the United States in 1956.",
        "citations": [
          {
            "source": "profile_emau",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "scarab-mark",
        "text": "The forehead’s M marking is sometimes called the mark of the scarab.",
        "citations": [
          {
            "source": "profile_emau",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "secure-height",
        "text": "Use a stable cat tree for shared climbing play, keeping jumps appropriate to your Mau’s confidence.",
        "citations": [
          {
            "source": "profile_emau",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "quiet-start",
        "text": "Begin new games in a quiet room, giving a noise-sensitive Mau time to assess the activity.",
        "citations": [
          {
            "source": "profile_emau",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "adaptability"
        ]
      },
      {
        "id": "optional-water",
        "text": "If your Mau is interested in water, offer supervised shallow-tray play and let them leave freely.",
        "citations": [
          {
            "source": "profile_emau",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "chosen-contact",
        "text": "Answer approaches for attention with company or gentle contact, allowing your Mau to choose the interaction.",
        "citations": [
          {
            "source": "profile_emau",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level",
          "social_needs"
        ]
      },
      {
        "id": "weekly-brushing",
        "text": "Offer a gentle weekly brushing, adjusting touch to the texture of your Mau’s coat.",
        "citations": [
          {
            "source": "profile_emau",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "esho": {
    "name": "Exotic Shorthair",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "silver-start",
        "text": "The breed’s development began with American Shorthair breeders using Persians to introduce silver colouring and green eyes.",
        "citations": [
          {
            "source": "profile_esho",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "sterling-name",
        "text": "Sterling was an early proposed name, reflecting those original silver-coloured cats.",
        "citations": [
          {
            "source": "profile_esho",
            "section": "History"
          }
        ],
        "category": "naming"
      },
      {
        "id": "persian-standard",
        "text": "Its standard follows the Persian body type, with a short dense coat replacing the flowing long coat.",
        "citations": [
          {
            "source": "profile_esho",
            "section": "History"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "rounded-build",
        "text": "A broad round head, short sturdy legs, and a square body create its rounded outline.",
        "citations": [
          {
            "source": "profile_esho",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "tica-recognition",
        "text": "Exotic Shorthairs have held TICA championship recognition since June 1979.",
        "citations": [
          {
            "source": "profile_esho",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "paper-ball",
        "text": "Roll a lightweight ball across the floor and invite a short chase, with time to catch and rest.",
        "citations": [
          {
            "source": "profile_esho",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "toy-problem",
        "text": "Let your Exotic work out how to reach a partly hidden toy, offering help before they become frustrated.",
        "citations": [
          {
            "source": "profile_esho",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "nearby-seat",
        "text": "Keep a comfortable nearby seat available as you move between quiet household activities.",
        "citations": [
          {
            "source": "profile_esho",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level",
          "social_needs"
        ]
      },
      {
        "id": "quiet-chirps",
        "text": "Answer soft chirps with attention, noticing whether your cat is asking for play or company.",
        "citations": [
          {
            "source": "profile_esho",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "vocalisation"
        ]
      },
      {
        "id": "simple-combing",
        "text": "Offer gentle combing as relaxed one-to-one time, working through the dense short coat without pulling.",
        "citations": [
          {
            "source": "profile_esho",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "hbro": {
    "name": "Havana Brown",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "british-programme",
        "text": "British breeders developed the modern breed in the 1950s using Siamese and solid-black domestic shorthairs.",
        "citations": [
          {
            "source": "profile_hbro",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "name-stories",
        "text": "TICA describes two proposed name sources: the colour of Havana cigars or the Havana rabbit.",
        "citations": [
          {
            "source": "profile_hbro",
            "section": "General description"
          }
        ],
        "category": "naming"
      },
      {
        "id": "green-eyes",
        "text": "The rich brown coat contrasts with vivid green oval eyes.",
        "citations": [
          {
            "source": "profile_hbro",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "tica-lilac",
        "text": "TICA accepted lilac in 1983 and uses Havana for its broader breed category.",
        "citations": [
          {
            "source": "profile_hbro",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "distinct-muzzle",
        "text": "A pinched muzzle and full whisker pads create the breed’s distinctive rounded, cigar-shaped muzzle.",
        "citations": [
          {
            "source": "profile_hbro",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "paw-invitations",
        "text": "Notice a gentle paw reaching for you and respond with attention when your Havana invites contact.",
        "citations": [
          {
            "source": "profile_hbro",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "new-objects",
        "text": "Inspect a safe new toy or box together, giving your curious cat time to investigate with their paws.",
        "citations": [
          {
            "source": "profile_hbro",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "trick-practice",
        "text": "Teach an easy rewarded cue in short sessions, finishing while your Havana still wants to participate.",
        "citations": [
          {
            "source": "profile_hbro",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "shared-play",
        "text": "Choose an interactive toy that keeps your attention on your cat, making play a shared event.",
        "citations": [
          {
            "source": "profile_hbro",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level",
          "social_needs"
        ]
      },
      {
        "id": "weekly-coat-care",
        "text": "Use gentle weekly brushing or combing as quiet company, following the smooth coat without pressure.",
        "citations": [
          {
            "source": "profile_hbro",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "high": {
    "name": "Highlander",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "development",
        "text": "TICA’s account dates the Highlander breeding programme to 2004, with the name settled in 2005.",
        "citations": [
          {
            "source": "profile_high",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "domestic-foundation",
        "text": "The programme selected its foundation cats from domestic stock to create a powerful big-cat look.",
        "citations": [
          {
            "source": "profile_high",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "curled-ears",
        "text": "The top third of the Highlander’s ears curls loosely backward.",
        "citations": [
          {
            "source": "profile_high",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "short-tail",
        "text": "Its naturally short tail can have kinks or curves, with length varying between cats.",
        "citations": [
          {
            "source": "profile_high",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "coat-lengths",
        "text": "Highlanders have both shorthaired and longhaired varieties.",
        "citations": [
          {
            "source": "profile_high",
            "section": "General description"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "chase-time",
        "text": "Make time for energetic chase games with an interactive toy, including chances to catch it and pause.",
        "citations": [
          {
            "source": "profile_high",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "homecoming",
        "text": "Offer an unrushed greeting when you return, letting your Highlander choose play or close contact.",
        "citations": [
          {
            "source": "profile_high",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level",
          "social_needs"
        ]
      },
      {
        "id": "visitor-play",
        "text": "Invite willing visitors into a gentle toy game while leaving your Highlander free to approach or retreat.",
        "citations": [
          {
            "source": "profile_high",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "adaptability",
          "social_needs"
        ]
      }
    ],
    "coverageNotes": {
      "bondingTips": "The registry profile supports chase play, human company, and visitor interaction, but does not give enough distinct enrichment or coat-care guidance to justify two further activities."
    }
  },
  "hima": {
    "name": "Himalayan",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "persian-points",
        "text": "The Himalayan combines Persian body and coat characteristics with the Siamese pointed pattern.",
        "citations": [
          {
            "source": "profile_hima",
            "section": "General description"
          }
        ],
        "category": "history"
      },
      {
        "id": "newtons-debutante",
        "text": "A 1931 experimental programme produced a kitten named Newton’s Debutante.",
        "citations": [
          {
            "source": "profile_hima",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "pattern-name",
        "text": "The name Himalayan refers to the pointed colour pattern, rather than a mountain-region origin.",
        "citations": [
          {
            "source": "profile_hima",
            "section": "General description"
          }
        ],
        "category": "naming"
      },
      {
        "id": "blue-eyes",
        "text": "Large round blue eyes contrast with the darker face mask and pale body.",
        "citations": [
          {
            "source": "profile_hima",
            "section": "General description and traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "dense-undercoat",
        "text": "The long flowing coat includes an undercoat that readily tangles without regular care.",
        "citations": [
          {
            "source": "profile_hima",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "daily-combing",
        "text": "Build gentle daily combing into a calm routine, pausing rather than pulling through a tangle.",
        "citations": [
          {
            "source": "profile_hima",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "short-games",
        "text": "Offer a short game with a ball or toy mouse, leaving room for bursts of play followed by rest.",
        "citations": [
          {
            "source": "profile_hima",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "quiet-company",
        "text": "Settle beside your Himalayan and let them choose a nearby place or your lap for gentle attention.",
        "citations": [
          {
            "source": "profile_hima",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "rewarded-learning",
        "text": "Practise a familiar cue in a quiet room and reward a willing response with something your cat enjoys.",
        "citations": [
          {
            "source": "profile_hima",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      }
    ],
    "coverageNotes": {
      "bondingTips": "Four distinct activities cover the profile’s coat care, short play, quiet companionship, and learning; further tips would repeat these themes."
    }
  },
  "jbob": {
    "name": "Japanese Bobtail",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "pom-pom-tail",
        "text": "Curves and kinks create each Japanese Bobtail’s individual pom-pom tail; no two are identical.",
        "citations": [
          {
            "source": "profile_jbob",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "old-records",
        "text": "Japanese records and artwork document bobtailed cats for at least a thousand years.",
        "citations": [
          {
            "source": "profile_jbob",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "mi-ke",
        "text": "The traditional tricolour is called mi-ke and combines red, black, and white.",
        "citations": [
          {
            "source": "profile_jbob",
            "section": "Traits"
          }
        ],
        "category": "naming"
      },
      {
        "id": "two-coats",
        "text": "Both shorthaired and longhaired Japanese Bobtails exist, with little undercoat in either variety.",
        "citations": [
          {
            "source": "profile_jbob",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "american-arrival",
        "text": "The breed reached North America in 1968 through cats sent by Judy Crawford to Elizabeth Freret.",
        "citations": [
          {
            "source": "profile_jbob",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "fetch",
        "text": "Turn a favourite toy into a retrieving game, praising voluntary returns rather than insisting on them.",
        "citations": [
          {
            "source": "profile_jbob",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "agility",
        "text": "Guide your Bobtail through a small indoor agility route with stable landing places and easy starting obstacles.",
        "citations": [
          {
            "source": "profile_jbob",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "water-choice",
        "text": "If your Bobtail enjoys splashing, offer supervised shallow-tray play with a floating toy.",
        "citations": [
          {
            "source": "profile_jbob",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "soft-conversations",
        "text": "Respond to soft chirps and meows, pairing conversation with the attention or game your cat seeks.",
        "citations": [
          {
            "source": "profile_jbob",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "vocalisation",
          "social_needs"
        ]
      },
      {
        "id": "silky-coat",
        "text": "Offer light regular combing for quiet contact, handling the distinctive tail gently rather than straightening it.",
        "citations": [
          {
            "source": "profile_jbob",
            "section": "Traits and grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "kora": {
    "name": "Korat",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "si-sawat",
        "text": "In Thailand the Korat is also known as the Si-Sawat cat.",
        "citations": [
          {
            "source": "profile_kora",
            "section": "General description"
          }
        ],
        "category": "naming"
      },
      {
        "id": "cat-poems",
        "text": "The Korat appears among the good-fortune cats described in Thailand’s historic Cat-Book Poems.",
        "citations": [
          {
            "source": "profile_kora",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "nara-darra",
        "text": "Nara and Darra, imported in 1959, were the first known pair of Korats in the United States.",
        "citations": [
          {
            "source": "profile_kora",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "single-coat",
        "text": "The silver-blue coat is short and close-lying, without an undercoat.",
        "citations": [
          {
            "source": "profile_kora",
            "section": "Traits and grooming"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "green-eyes",
        "text": "Adult peridot-green eye colour can take two to four years to develop.",
        "citations": [
          {
            "source": "profile_kora",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "retrieving",
        "text": "Offer a short retrieving game and let your Korat’s interest determine how many turns to play.",
        "citations": [
          {
            "source": "profile_kora",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "puzzle-partner",
        "text": "Work through an easy reward puzzle together, increasing the challenge only when your cat is comfortable.",
        "citations": [
          {
            "source": "profile_kora",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "quiet-room",
        "text": "Start unfamiliar games or greetings in a quiet room, avoiding sudden loud interruptions.",
        "citations": [
          {
            "source": "profile_kora",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "adaptability"
        ]
      },
      {
        "id": "secure-perch",
        "text": "Use a stable elevated perch for shared exploring and toy play, with a safe route back down.",
        "citations": [
          {
            "source": "profile_kora",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "chosen-cuddles",
        "text": "Offer regular undivided attention and let your Korat choose a close resting place beside you.",
        "citations": [
          {
            "source": "profile_kora",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level",
          "social_needs"
        ]
      }
    ]
  },
  "kuri": {
    "name": "Kurilian Bobtail",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "island-origins",
        "text": "The breed is associated with Sakhalin and the Kuril Islands between Russia and Japan.",
        "citations": [
          {
            "source": "profile_kuri",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "individual-tail",
        "text": "Each short pom-pom tail has its own arrangement of bends, kinks, and curves.",
        "citations": [
          {
            "source": "profile_kuri",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "two-lengths",
        "text": "Kurilian Bobtails come in shorthaired and semi-longhaired varieties.",
        "citations": [
          {
            "source": "profile_kuri",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "substantial-build",
        "text": "A compact semi-cobby body and substantial bone make the cat heavier than it may first appear.",
        "citations": [
          {
            "source": "profile_kuri",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "championship",
        "text": "TICA accepted the Kurilian Bobtail for championship competition in 2012.",
        "citations": [
          {
            "source": "profile_kuri",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "safe-lookout",
        "text": "Offer a stable elevated lookout and join your Kurilian in a toy game around its safe climbing route.",
        "citations": [
          {
            "source": "profile_kuri",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "small-cues",
        "text": "Practise a simple rewarded cue, allowing your cat to decide when they want another turn.",
        "citations": [
          {
            "source": "profile_kuri",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "shared-play",
        "text": "Make room for daily interactive play, alternating energetic moments with quieter attention.",
        "citations": [
          {
            "source": "profile_kuri",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs"
        ]
      },
      {
        "id": "chosen-contact",
        "text": "Let your Kurilian invite stroking or lap time instead of assuming their sturdy build means they enjoy restraint.",
        "citations": [
          {
            "source": "profile_kuri",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "weekly-brush",
        "text": "Use a gentle weekly brushing as relaxed contact, handling the short tail without bending or pulling it.",
        "citations": [
          {
            "source": "profile_kuri",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "lape": {
    "name": "LaPerm",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "curly-founder",
        "text": "A kitten named Curly, born in Linda Koehl’s Oregon farm litter in 1982, founded the breed.",
        "citations": [
          {
            "source": "profile_lape",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "name",
        "text": "Koehl chose LaPerm because the loose curls reminded her of a perm.",
        "citations": [
          {
            "source": "profile_lape",
            "section": "General description"
          }
        ],
        "category": "naming"
      },
      {
        "id": "all-hair-types",
        "text": "The curly coat retains guard, awn, and down hairs, with a light, springy texture.",
        "citations": [
          {
            "source": "profile_lape",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "two-tails",
        "text": "Longhaired LaPerms have plumed tails, while shorthairs have more of a bottlebrush tail.",
        "citations": [
          {
            "source": "profile_lape",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "curly-details",
        "text": "Curled whiskers, kinked eyebrows, and curly ear furnishings extend the coat’s distinctive look.",
        "citations": [
          {
            "source": "profile_lape",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "floor-toys",
        "text": "Offer a rolling ball or toy mouse and join the chase, letting your LaPerm finish with a catch.",
        "citations": [
          {
            "source": "profile_lape",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "climbing",
        "text": "Provide a tall, stable cat tree and use a toy to invite safe exploration together.",
        "citations": [
          {
            "source": "profile_lape",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "problem-solving",
        "text": "Partly hide a toy within easy reach and let your LaPerm work out how to retrieve it.",
        "citations": [
          {
            "source": "profile_lape",
            "section": "General description"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "paw-signals",
        "text": "Respond to a gentle paw or following behaviour with company, play, or a comfortable place beside you.",
        "citations": [
          {
            "source": "profile_lape",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level",
          "social_needs"
        ]
      },
      {
        "id": "light-combing",
        "text": "Keep coat care light and gentle with a suitable wide-toothed comb, preserving the airy curls.",
        "citations": [
          {
            "source": "profile_lape",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "lyko": {
    "name": "Lykoi",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "wolf-name",
        "text": "Lykoi takes its name from the Greek word for wolf, reflecting its unusual face and coat.",
        "citations": [
          {
            "source": "profile_lyko",
            "section": "General description"
          }
        ],
        "category": "naming"
      },
      {
        "id": "founders",
        "text": "Johnny and Brittney Gobble and Patti Thomas established the breed in 2011 from naturally occurring cats.",
        "citations": [
          {
            "source": "profile_lyko",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "roan-mix",
        "text": "The roan coat mixes solid black hairs with unpigmented hairs, creating a silvery effect.",
        "citations": [
          {
            "source": "profile_lyko",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "changing-coat",
        "text": "The degree of hairlessness changes as the coat moults; some cats become nearly bare temporarily.",
        "citations": [
          {
            "source": "profile_lyko",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "face-mask",
        "text": "Sparse facial hair around the eyes and muzzle contributes to the Lykoi’s werewolf-like appearance.",
        "citations": [
          {
            "source": "profile_lyko",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "stalk-and-catch",
        "text": "Let your Lykoi stalk a moving toy before pouncing, ending each round with an achievable catch.",
        "citations": [
          {
            "source": "profile_lyko",
            "section": "General description"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "fetch",
        "text": "Try retrieving a light toy, rewarding interest and adapting the game to your cat’s choices.",
        "citations": [
          {
            "source": "profile_lyko",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "puzzle",
        "text": "Explore an easy puzzle together, offering a little help when a new challenge is unfamiliar.",
        "citations": [
          {
            "source": "profile_lyko",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "new-people",
        "text": "Let your Lykoi watch a new visitor from a comfortable distance before inviting closer contact.",
        "citations": [
          {
            "source": "profile_lyko",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "adaptability"
        ]
      },
      {
        "id": "warm-rest",
        "text": "Offer a cosy resting spot beside you after play, particularly while the coat is sparse.",
        "citations": [
          {
            "source": "profile_lyko",
            "section": "Activity level and traits"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      }
    ]
  },
  "mcoo": {
    "name": "Maine Coon",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "maine-state-cat",
        "text": "The Maine Coon is the official state cat of Maine.",
        "citations": [
          {
            "source": "profile_mcoo",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "cosie",
        "text": "A brown tabby named Cosie won Best Cat at the 1895 Madison Square Garden show.",
        "citations": [
          {
            "source": "profile_mcoo",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "slow-growth",
        "text": "Maine Coons develop slowly and may take three to five years to reach full size.",
        "citations": [
          {
            "source": "profile_mcoo",
            "section": "Personality"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "uneven-coat",
        "text": "The shaggy coat is shorter at the shoulders and longer around the belly, breeches, and ruff.",
        "citations": [
          {
            "source": "profile_mcoo",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "raccoon-myth",
        "text": "The raccoon-cross story behind one explanation of the name is a myth, not the breed’s biological ancestry.",
        "citations": [
          {
            "source": "profile_mcoo",
            "section": "History"
          }
        ],
        "category": "naming"
      }
    ],
    "bondingTips": [
      {
        "id": "floor-fetch",
        "text": "Invite retrieving or chase games along the floor, following your Maine Coon’s preference for grounded play.",
        "citations": [
          {
            "source": "profile_mcoo",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level",
          "intelligence"
        ]
      },
      {
        "id": "simple-cues",
        "text": "Teach a familiar cue with a small reward, keeping learning sessions short and cooperative.",
        "citations": [
          {
            "source": "profile_mcoo",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "helping-place",
        "text": "Create a safe nearby place during household tasks so your Maine Coon can keep you company.",
        "citations": [
          {
            "source": "profile_mcoo",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs"
        ]
      },
      {
        "id": "coat-routine",
        "text": "Build gentle combing into shared time, adjusting frequency to your cat’s individual coat texture and tangles.",
        "citations": [
          {
            "source": "profile_mcoo",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "trill-response",
        "text": "Notice soft chirps and trills as invitations for attention, without expecting a large cat to communicate loudly.",
        "citations": [
          {
            "source": "profile_mcoo",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "vocalisation",
          "affection_level"
        ]
      }
    ]
  },
  "manx": {
    "name": "Manx",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "island-history",
        "text": "The Manx is associated with the Isle of Man, where its short-tail mutation became common in an isolated population.",
        "citations": [
          {
            "source": "profile_manx",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "tail-range",
        "text": "Manx kittens are not all tailless; some have short tails and others full-length tails.",
        "citations": [
          {
            "source": "profile_manx",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "rounded-shape",
        "text": "Rounded contours, a deep flank, and powerful hindquarters define the breed beyond its tail.",
        "citations": [
          {
            "source": "profile_manx",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "longhair-relative",
        "text": "The longhaired member of the same breed group is called the Cymric.",
        "citations": [
          {
            "source": "profile_manx",
            "section": "Traits"
          }
        ],
        "category": "classification"
      },
      {
        "id": "championship",
        "text": "TICA recognised Manx and Cymric for championship competition in June 1979.",
        "citations": [
          {
            "source": "profile_manx",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "retrieving",
        "text": "Offer a retrieving game with a soft toy, making voluntary returns rewarding.",
        "citations": [
          {
            "source": "profile_manx",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "safe-jumping",
        "text": "Use a teaser around secure, accessible surfaces so your Manx can choose comfortable jumps.",
        "citations": [
          {
            "source": "profile_manx",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "puzzle-time",
        "text": "Introduce a simple puzzle and work through the first attempts together.",
        "citations": [
          {
            "source": "profile_manx",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "supported-contact",
        "text": "Handle gently and support the hindquarters when lifting; show children to leave the tail area alone.",
        "citations": [
          {
            "source": "profile_manx",
            "section": "Traits"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level",
          "child_friendly"
        ]
      },
      {
        "id": "quiet-trills",
        "text": "Answer quiet trills with a chance for contact or play, learning your Manx’s individual signals.",
        "citations": [
          {
            "source": "profile_manx",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "vocalisation",
          "social_needs"
        ]
      }
    ]
  },
  "minu": {
    "name": "Minuet",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "parent-groups",
        "text": "The Minuet was developed from Munchkins and cats from the Persian breed group.",
        "citations": [
          {
            "source": "profile_minu",
            "section": "General description"
          }
        ],
        "category": "history"
      },
      {
        "id": "name-change",
        "text": "Originally called Napoleon, the breed was renamed Minuet by TICA in 2015.",
        "citations": [
          {
            "source": "profile_minu",
            "section": "History"
          }
        ],
        "category": "naming"
      },
      {
        "id": "leg-varieties",
        "text": "Both short-legged and longer-legged Minuets occur; short legs do not define every kitten.",
        "citations": [
          {
            "source": "profile_minu",
            "section": "General description"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "coat-lengths",
        "text": "Minuets come in both shorthaired and longhaired varieties with dense coats.",
        "citations": [
          {
            "source": "profile_minu",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "championship",
        "text": "TICA voted to grant the Minuet full championship status in January 2016.",
        "citations": [
          {
            "source": "profile_minu",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "floor-chase",
        "text": "Roll a ball along a clear floor for an easy chase, letting your Minuet choose the distance and pace.",
        "citations": [
          {
            "source": "profile_minu",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "accessible-play",
        "text": "Place a partly hidden toy within comfortable reach, avoiding a game that depends on high jumps.",
        "citations": [
          {
            "source": "profile_minu",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level",
          "intelligence"
        ]
      },
      {
        "id": "gentle-combing",
        "text": "Use regular gentle combing as shared quiet time, adjusting care to coat length and tangling.",
        "citations": [
          {
            "source": "profile_minu",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "chosen-company",
        "text": "Offer a low, comfortable place beside you and let your Minuet decide when to come closer.",
        "citations": [
          {
            "source": "profile_minu",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level",
          "social_needs"
        ]
      }
    ],
    "coverageNotes": {
      "bondingTips": "Four distinct activities reflect the profile’s play, curiosity, coat care, and companionship; additional suggestions would repeat these themes."
    }
  },
  "munc": {
    "name": "Munchkin",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "blackberry",
        "text": "The modern breeding programme began with Blackberry, a short-legged cat found in Louisiana in 1983.",
        "citations": [
          {
            "source": "profile_munc",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "toulouse",
        "text": "Blackberry and her son Toulouse were important foundation cats in the breed’s development.",
        "citations": [
          {
            "source": "profile_munc",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "short-legs",
        "text": "The defining trait is shortened leg bones; coat colour and pattern are not limited to one look.",
        "citations": [
          {
            "source": "profile_munc",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "two-coats",
        "text": "Shorthaired and longhaired Munchkins both occur, with different coat-care needs.",
        "citations": [
          {
            "source": "profile_munc",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "recognition",
        "text": "TICA granted Munchkin championship status in May 2003.",
        "citations": [
          {
            "source": "profile_munc",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "ground-chase",
        "text": "Invite fast floor-level chase games with a toy large enough for safe play.",
        "citations": [
          {
            "source": "profile_munc",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "stepped-access",
        "text": "Provide stable intermediate steps for exploring raised places, letting your Munchkin choose comfortable routes.",
        "citations": [
          {
            "source": "profile_munc",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level",
          "intelligence"
        ]
      },
      {
        "id": "retrieving",
        "text": "Try retrieving a soft toy over a short distance, rewarding each willing return.",
        "citations": [
          {
            "source": "profile_munc",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "safe-investigating",
        "text": "Explore a safe box or tunnel together, keeping small swallowable objects out of the game.",
        "citations": [
          {
            "source": "profile_munc",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "coat-care",
        "text": "Share gentle combing appropriate to coat length, giving longer fur extra attention where tangles develop.",
        "citations": [
          {
            "source": "profile_munc",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "nebe": {
    "name": "Nebelung",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "mist-name",
        "text": "The name combines associations with Nebel, German for mist, and the Nibelungenlied saga.",
        "citations": [
          {
            "source": "profile_nebe",
            "section": "General description"
          }
        ],
        "category": "naming"
      },
      {
        "id": "cora-cobb",
        "text": "Cora Cobb developed the modern breed during the 1980s.",
        "citations": [
          {
            "source": "profile_nebe",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "founding-pair",
        "text": "The first registered Nebelungs were Siegfried, born in 1984, and Brunhilde, born in 1985.",
        "citations": [
          {
            "source": "profile_nebe",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "silver-blue",
        "text": "Silver-tipped blue fur and a full plumed tail create the breed’s misty appearance.",
        "citations": [
          {
            "source": "profile_nebe",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "championship",
        "text": "TICA recognised the Nebelung for championship competition in 1997.",
        "citations": [
          {
            "source": "profile_nebe",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "gentle-arrival",
        "text": "Let a newly arrived Nebelung approach you at their own pace, beginning in a quiet familiar space.",
        "citations": [
          {
            "source": "profile_nebe",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "adaptability"
        ]
      },
      {
        "id": "retrieving",
        "text": "Offer a soft toy for a gentle retrieving game, keeping early sessions short.",
        "citations": [
          {
            "source": "profile_nebe",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "watchful-perch",
        "text": "Provide a stable elevated lookout where your Nebelung can watch before deciding to join the activity.",
        "citations": [
          {
            "source": "profile_nebe",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "family-company",
        "text": "Keep regular quiet time with familiar family members, allowing your cat to follow or settle nearby.",
        "citations": [
          {
            "source": "profile_nebe",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level",
          "social_needs"
        ]
      },
      {
        "id": "regular-combing",
        "text": "Use gentle regular combing as one-to-one contact, working patiently through the dense medium-length coat.",
        "citations": [
          {
            "source": "profile_nebe",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "norw": {
    "name": "Norwegian Forest Cat",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "skogkatt",
        "text": "In Norway the breed is known as Skogkatt; English-speaking admirers often shorten its name to Wegie.",
        "citations": [
          {
            "source": "profile_norw",
            "section": "General description and history"
          }
        ],
        "category": "naming"
      },
      {
        "id": "weather-coat",
        "text": "A water-resistant outer coat covers a dense woolly undercoat adapted to a Scandinavian climate.",
        "citations": [
          {
            "source": "profile_norw",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "seasonal-ruff",
        "text": "The ruff and undercoat become fuller in cooler months and lighten for summer.",
        "citations": [
          {
            "source": "profile_norw",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "triangle-head",
        "text": "An equilateral-triangle head shape and long straight profile distinguish its outline.",
        "citations": [
          {
            "source": "profile_norw",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "tica-championship",
        "text": "TICA granted the Norwegian Forest Cat championship status in 1984.",
        "citations": [
          {
            "source": "profile_norw",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "stable-climbing",
        "text": "Offer secure climbing furniture with broad landing places, joining exploration with a teaser toy.",
        "citations": [
          {
            "source": "profile_norw",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "scratching-station",
        "text": "Place a sturdy sisal scratching post near shared activity and reward your cat’s voluntary use.",
        "citations": [
          {
            "source": "profile_norw",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "catching-games",
        "text": "Play stalking and catching games with a suitable toy, giving a satisfying catch before a rest.",
        "citations": [
          {
            "source": "profile_norw",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "family-participation",
        "text": "Let family members take turns with gentle play, keeping every interaction voluntary.",
        "citations": [
          {
            "source": "profile_norw",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs",
          "child_friendly"
        ]
      },
      {
        "id": "seasonal-comb",
        "text": "Make regular combing relaxed shared time, adding attention during the heavy seasonal coat change.",
        "citations": [
          {
            "source": "profile_norw",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming",
          "shedding_level"
        ]
      }
    ]
  },
  "ocic": {
    "name": "Ocicat",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "domestic-ancestry",
        "text": "The Ocicat’s ancestry combines Abyssinian, Siamese, and American Shorthair lines, without an ocelot cross.",
        "citations": [
          {
            "source": "profile_ocic",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "tonga",
        "text": "A spotted kitten named Tonga appeared in Virginia Daly’s breeding programme in 1964.",
        "citations": [
          {
            "source": "profile_ocic",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "ocelot-name",
        "text": "Daly’s daughter suggested Ocicat because Tonga reminded her of an ocelot.",
        "citations": [
          {
            "source": "profile_ocic",
            "section": "History"
          }
        ],
        "category": "naming"
      },
      {
        "id": "spotted-palette",
        "text": "The spotted show coat occurs in six base colours and their silver versions.",
        "citations": [
          {
            "source": "profile_ocic",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "championship",
        "text": "TICA granted the Ocicat championship status in August 1986.",
        "citations": [
          {
            "source": "profile_ocic",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "fetch",
        "text": "Offer a favourite toy for retrieving, rewarding a return without tugging it away from your cat.",
        "citations": [
          {
            "source": "profile_ocic",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "voice-cues",
        "text": "Practise a simple verbal cue with a small reward and a clear stopping point.",
        "citations": [
          {
            "source": "profile_ocic",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "high-perches",
        "text": "Invite play around stable perches with safe landing space for this athletic cat.",
        "citations": [
          {
            "source": "profile_ocic",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "daily-attention",
        "text": "Reserve daily interactive time, giving your Ocicat a chance for company as well as physical play.",
        "citations": [
          {
            "source": "profile_ocic",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs",
          "affection_level"
        ]
      },
      {
        "id": "light-brushing",
        "text": "Offer a brief gentle rubber brushing as quiet contact, stopping when your cat has had enough.",
        "citations": [
          {
            "source": "profile_ocic",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "ori1": {
    "name": "Oriental Longhair",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "english-development",
        "text": "Modern Oriental breeding developed in England during the 1950s using Siamese and other domestic lines.",
        "citations": [
          {
            "source": "profile_ori1",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "breed-group",
        "text": "The Oriental Longhair belongs to the Siamese breed group alongside Siamese, Balinese, and Oriental Shorthair.",
        "citations": [
          {
            "source": "profile_ori1",
            "section": "General description"
          }
        ],
        "category": "classification"
      },
      {
        "id": "draping-coat",
        "text": "A silky semi-long coat drapes the long slender body rather than creating a heavy rounded silhouette.",
        "citations": [
          {
            "source": "profile_ori1",
            "section": "General description"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "colour-range",
        "text": "The breed’s colour range extends well beyond the pointed patterns associated with Siamese.",
        "citations": [
          {
            "source": "profile_ori1",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "american-arrival",
        "text": "Orientals were imported into the United States during the 1970s.",
        "citations": [
          {
            "source": "profile_ori1",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "retrieving",
        "text": "Use a favourite fetch toy for short retrieving games, letting your Oriental choose when to stop.",
        "citations": [
          {
            "source": "profile_ori1",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "box-adventure",
        "text": "Explore an empty safe cardboard box together, adding a toy for hiding and discovery.",
        "citations": [
          {
            "source": "profile_ori1",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "climbing",
        "text": "Offer stable climbing furniture and guide active play toward safe perches instead of fragile shelves.",
        "citations": [
          {
            "source": "profile_ori1",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "conversation",
        "text": "Answer your cat’s conversation with attention, making room for regular interaction throughout the day.",
        "citations": [
          {
            "source": "profile_ori1",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "vocalisation",
          "social_needs"
        ]
      },
      {
        "id": "weekly-brush",
        "text": "Use gentle weekly brushing as calm shared contact, checking the longer coat without pulling.",
        "citations": [
          {
            "source": "profile_ori1",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "orie": {
    "name": "Oriental Shorthair",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "english-development",
        "text": "The modern Oriental developed in England in the 1950s from Siamese and other domestic lines.",
        "citations": [
          {
            "source": "profile_orie",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "sleek-colours",
        "text": "The short glossy coat occurs in a wide range of solids, tabbies, tortoiseshells, silvers, and white-marked patterns.",
        "citations": [
          {
            "source": "profile_orie",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "triangular-outline",
        "text": "A wedge-shaped head and very large ears emphasise the Oriental’s long triangular outline.",
        "citations": [
          {
            "source": "profile_orie",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "breed-group",
        "text": "It shares the Siamese group’s general body standard, with differences in colour and coat length between members.",
        "citations": [
          {
            "source": "profile_orie",
            "section": "General description"
          }
        ],
        "category": "classification"
      },
      {
        "id": "havana-distinction",
        "text": "A solid chocolate Oriental is distinct from the North American Havana Brown, which developed a different breed type.",
        "citations": [
          {
            "source": "profile_orie",
            "section": "History"
          }
        ],
        "category": "classification"
      }
    ],
    "bondingTips": [
      {
        "id": "favourite-fetch",
        "text": "Find which toy your Oriental likes to retrieve and use it for a shared back-and-forth game.",
        "citations": [
          {
            "source": "profile_orie",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "agility",
        "text": "Teach a simple indoor agility sequence with low obstacles and rewards for willing attempts.",
        "citations": [
          {
            "source": "profile_orie",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "safe-height",
        "text": "Provide stable perches and a safe climbing route for exploring alongside an interactive toy.",
        "citations": [
          {
            "source": "profile_orie",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "answering-chat",
        "text": "Answer calls with calm attention while watching body language to learn the request behind the sound.",
        "citations": [
          {
            "source": "profile_orie",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "vocalisation"
        ]
      },
      {
        "id": "shared-routines",
        "text": "Give your Oriental a nearby place in everyday activities and regular periods of undivided company.",
        "citations": [
          {
            "source": "profile_orie",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs",
          "affection_level"
        ]
      }
    ]
  },
  "pete": {
    "name": "Peterbald",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "russian-development",
        "text": "Peterbald breeding developed in St. Petersburg in the early 1990s from Oriental Shorthair and Don Sphynx lines.",
        "citations": [
          {
            "source": "profile_pete",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "not-always-bald",
        "text": "Peterbald coats range from completely hairless to peach-like, downy, bristly, or ordinary straight coats.",
        "citations": [
          {
            "source": "profile_pete",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "coat-changes",
        "text": "A Peterbald born with hair may change coat type as it matures.",
        "citations": [
          {
            "source": "profile_pete",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "altered-whiskers",
        "text": "Whiskers may be curled, crinkled, or very short, echoing the coat’s altered texture.",
        "citations": [
          {
            "source": "profile_pete",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "championship",
        "text": "TICA accepted the Peterbald for championship competition in 2005.",
        "citations": [
          {
            "source": "profile_pete",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "fetch",
        "text": "Use a favourite lightweight toy for retrieving games, allowing breaks whenever your Peterbald chooses.",
        "citations": [
          {
            "source": "profile_pete",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "new-challenge",
        "text": "Introduce a simple rewarded cue or easy puzzle, keeping learning cooperative and brief.",
        "citations": [
          {
            "source": "profile_pete",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "replying",
        "text": "Answer your Peterbald’s calls with attention, watching whether they invite play, company, or rest.",
        "citations": [
          {
            "source": "profile_pete",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "vocalisation",
          "social_needs"
        ]
      },
      {
        "id": "warm-company",
        "text": "Offer a comfortable warm spot beside you after active play, letting your cat choose when to settle close.",
        "citations": [
          {
            "source": "profile_pete",
            "section": "Personality and grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "coat-specific-care",
        "text": "Adapt calm care sessions to the actual coat type, using your vet’s guidance for hairless skin rather than assuming every Peterbald needs brushing.",
        "citations": [
          {
            "source": "profile_pete",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "pixi": {
    "name": "Pixie-bob",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "pixie",
        "text": "The breed takes its name from Pixie, a female born in Carol Ann Brewer’s early breeding programme in 1986.",
        "citations": [
          {
            "source": "profile_pixi",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "extra-toes",
        "text": "TICA’s Pixiebob standard permits polydactyl feet, with up to seven toes on a foot.",
        "citations": [
          {
            "source": "profile_pixi",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "coat-lengths",
        "text": "Pixiebobs have shorthaired and longhaired varieties with a thick double coat.",
        "citations": [
          {
            "source": "profile_pixi",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "facial-features",
        "text": "Downward-growing facial fur creates sideburns beneath a heavy brow and inverted-pear-shaped face.",
        "citations": [
          {
            "source": "profile_pixi",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "championship",
        "text": "TICA championship competition began for the breed with the 1998 show season.",
        "citations": [
          {
            "source": "profile_pixi",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "fetch",
        "text": "Try a retrieving game with a soft toy, praising each willing return.",
        "citations": [
          {
            "source": "profile_pixi",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "harness",
        "text": "Introduce a harness indoors if your Pixiebob enjoys exploring, building confidence before a controlled outing.",
        "citations": [
          {
            "source": "profile_pixi",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "adaptability"
        ]
      },
      {
        "id": "family-partnership",
        "text": "Include family members in supervised toy play while keeping contact voluntary for your cat.",
        "citations": [
          {
            "source": "profile_pixi",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs",
          "child_friendly"
        ]
      },
      {
        "id": "chirps",
        "text": "Respond to chirps and chitters with attention, watching the rest of your cat’s body language too.",
        "citations": [
          {
            "source": "profile_pixi",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "vocalisation"
        ]
      },
      {
        "id": "double-coat-care",
        "text": "Offer regular gentle brushing to manage the woolly double coat, adding patient attention where longer fur tangles.",
        "citations": [
          {
            "source": "profile_pixi",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "ragd": {
    "name": "Ragdoll",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "californian-development",
        "text": "Ann Baker developed the Ragdoll in Riverside, California, during the early 1960s.",
        "citations": [
          {
            "source": "profile_ragd",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "three-patterns",
        "text": "Traditional pointed Ragdolls have blue eyes and colourpoint, mitted, or bicolour patterns.",
        "citations": [
          {
            "source": "profile_ragd",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "inverted-v",
        "text": "Bicolour Ragdolls have an inverted white V on the face and more white than mitted cats.",
        "citations": [
          {
            "source": "profile_ragd",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "slow-maturity",
        "text": "This substantial breed can take up to four years to reach full maturity.",
        "citations": [
          {
            "source": "profile_ragd",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "championship",
        "text": "TICA accepted the Ragdoll for championship competition when the association began in June 1979.",
        "citations": [
          {
            "source": "profile_ragd",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "interactive-wand",
        "text": "Invite daily wand-toy play, offering catches and pauses rather than expecting a continuous chase.",
        "citations": [
          {
            "source": "profile_ragd",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "fetch",
        "text": "Try retrieving a soft toy and reward interest without insisting that every Ragdoll should fetch.",
        "citations": [
          {
            "source": "profile_ragd",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "weekly-comb",
        "text": "Build gentle regular combing into shared quiet time, checking carefully where the silky coat tangles.",
        "citations": [
          {
            "source": "profile_ragd",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "resting-together",
        "text": "Offer a comfortable place nearby for quiet company, letting your Ragdoll initiate closer contact.",
        "citations": [
          {
            "source": "profile_ragd",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level",
          "social_needs"
        ]
      },
      {
        "id": "gentle-family-contact",
        "text": "Have children invite strokes at floor level and allow the cat to leave, rather than relying on a tolerant reputation.",
        "citations": [
          {
            "source": "profile_ragd",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "child_friendly"
        ]
      }
    ]
  },
  "rblu": {
    "name": "Russian Blue",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "archangel-name",
        "text": "The alternative name Archangel cat refers to Arkhangelsk, the Russian port associated with the breed’s early history.",
        "citations": [
          {
            "source": "profile_rblu",
            "section": "History"
          }
        ],
        "category": "naming"
      },
      {
        "id": "silver-tips",
        "text": "Silver-tipped blue hairs give the short dense coat its shimmering appearance.",
        "citations": [
          {
            "source": "profile_rblu",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "green-eyes",
        "text": "Vivid green eyes are a defining adult feature of the Russian Blue.",
        "citations": [
          {
            "source": "profile_rblu",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "angular-head",
        "text": "The breed’s head is described through seven angular planes that help create its characteristic expression.",
        "citations": [
          {
            "source": "profile_rblu",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "foreign-blue",
        "text": "Russian cats received their own Foreign Blue show class in England in 1912.",
        "citations": [
          {
            "source": "profile_rblu",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "watch-first",
        "text": "Let your Russian Blue watch unfamiliar people or games from a comfortable distance before joining.",
        "citations": [
          {
            "source": "profile_rblu",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "adaptability"
        ]
      },
      {
        "id": "fetch",
        "text": "Offer a favourite toy for retrieving and follow your cat’s interest rather than imposing a long session.",
        "citations": [
          {
            "source": "profile_rblu",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "puzzles",
        "text": "Work on an easy reward puzzle together, increasing the challenge as your cat becomes confident.",
        "citations": [
          {
            "source": "profile_rblu",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "private-space",
        "text": "Balance undivided attention with access to a quiet private nook for uninterrupted rest.",
        "citations": [
          {
            "source": "profile_rblu",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs",
          "affection_level"
        ]
      },
      {
        "id": "light-brush",
        "text": "Use gentle regular brushing as quiet contact, keeping the dense coat comfortable without restraint.",
        "citations": [
          {
            "source": "profile_rblu",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "sava": {
    "name": "Savannah",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "foundation-cross",
        "text": "The first recorded Savannah was born in 1986 from a domestic cat and an African serval.",
        "citations": [
          {
            "source": "profile_sava",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "recognition",
        "text": "TICA accepted the Savannah for registration in 2001 and championship competition in 2012.",
        "citations": [
          {
            "source": "profile_sava",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "tall-ears",
        "text": "Large tall ears and hooded-looking eyes contribute to the breed’s distinctive face.",
        "citations": [
          {
            "source": "profile_sava",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "long-outline",
        "text": "Long legs and a long neck create a tall outline without necessarily making the cat exceptionally heavy.",
        "citations": [
          {
            "source": "profile_sava",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "light-undercoat",
        "text": "The short coat has little heavy undercoat and generally needs modest coat maintenance.",
        "citations": [
          {
            "source": "profile_sava",
            "section": "Grooming"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "interactive-routine",
        "text": "Plan regular active play together, giving your Savannah substantial interaction rather than relying on toys left out.",
        "citations": [
          {
            "source": "profile_sava",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level",
          "social_needs"
        ]
      },
      {
        "id": "fetch",
        "text": "Practise retrieving with a favourite toy and reward willing returns in short sessions.",
        "citations": [
          {
            "source": "profile_sava",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "harness",
        "text": "Introduce a harness indoors only if your Savannah welcomes it, keeping any later exploration controlled and supervised.",
        "citations": [
          {
            "source": "profile_sava",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "adaptability"
        ]
      },
      {
        "id": "optional-water",
        "text": "If your cat enjoys water, offer supervised play with a floating toy in a shallow tray.",
        "citations": [
          {
            "source": "profile_sava",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "chosen-affection",
        "text": "Respond to greetings and head bumps with attention, allowing affection without expecting prolonged lap time.",
        "citations": [
          {
            "source": "profile_sava",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      }
    ]
  },
  "sfol": {
    "name": "Scottish Fold",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "susie",
        "text": "Scottish Fold ancestry traces to Susie, a white barn cat found in Scotland in 1961.",
        "citations": [
          {
            "source": "profile_sfol",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "straight-at-birth",
        "text": "Kittens are born with straight ears; those carrying the fold trait develop the fold later.",
        "citations": [
          {
            "source": "profile_sfol",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "two-coats",
        "text": "Scottish Folds occur in both longhaired and shorthaired varieties across many colours and patterns.",
        "citations": [
          {
            "source": "profile_sfol",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "round-outline",
        "text": "Round eyes, a round face, and a rounded body are part of the breed’s overall type.",
        "citations": [
          {
            "source": "profile_sfol",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "cartilage-gene",
        "text": "The folded-ear gene affects cartilage and bone development and is linked to Scottish Fold osteochondrodysplasia.",
        "citations": [
          {
            "source": "foldCartilage",
            "section": "Scottish Fold osteochondrodysplasia"
          }
        ],
        "category": "health"
      }
    ],
    "bondingTips": [
      {
        "id": "comfortable-play",
        "text": "Keep games low and optional, and ask your vet about reluctance to jump or signs of discomfort.",
        "citations": [
          {
            "source": "foldCartilage",
            "section": "Scottish Fold osteochondrodysplasia"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "easy-puzzles",
        "text": "Offer an easy puzzle within comfortable reach so shared enrichment does not depend on jumping.",
        "citations": [
          {
            "source": "profile_sfol",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "chosen-company",
        "text": "Invite quiet company beside you and let your Scottish Fold choose the amount of physical contact.",
        "citations": [
          {
            "source": "profile_sfol",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level",
          "social_needs"
        ]
      },
      {
        "id": "coat-care",
        "text": "Use gentle coat care suited to hair length, checking comfort and pausing rather than holding your cat still.",
        "citations": [
          {
            "source": "profile_sfol",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ],
    "coverageNotes": {
      "bondingTips": "Four useful activities combine the profile’s social nature and coat care with comfort-aware enrichment; further tips would repeat these themes."
    }
  },
  "srex": {
    "name": "Selkirk Rex",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "miss-depesto",
        "text": "The founding curly kitten, Miss DePesto, was born in Montana in 1987 and adopted by breeder Jeri Newman.",
        "citations": [
          {
            "source": "profile_srex",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "dominant-curls",
        "text": "The Selkirk’s curl trait follows dominant inheritance, unlike the original Cornish and Devon Rex mutations.",
        "citations": [
          {
            "source": "profile_srex",
            "section": "History"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "two-lengths",
        "text": "Selkirk Rex cats have both shorthaired and longhaired coats.",
        "citations": [
          {
            "source": "profile_srex",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "curl-placement",
        "text": "Loose curls are especially prominent along the neck, flanks, and underside.",
        "citations": [
          {
            "source": "profile_srex",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "championship",
        "text": "TICA recognised the Selkirk Rex for championship competition in February 1994.",
        "citations": [
          {
            "source": "profile_srex",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "pole-play",
        "text": "Offer a fishing-pole toy for shared play, giving your Selkirk an achievable catch and time to rest.",
        "citations": [
          {
            "source": "profile_srex",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "curl-care",
        "text": "Use gentle regular combing to prevent tangles, keeping the dense curls comfortable rather than pulling them straight.",
        "citations": [
          {
            "source": "profile_srex",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "chosen-cuddles",
        "text": "Invite quiet contact and let your Selkirk choose whether to settle beside you or on your lap.",
        "citations": [
          {
            "source": "profile_srex",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "gentle-family-time",
        "text": "Show children how to invite a stroke and recognise when the cat wants a break, despite the breed’s patient reputation.",
        "citations": [
          {
            "source": "profile_srex",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "child_friendly",
          "social_needs"
        ]
      }
    ],
    "coverageNotes": {
      "bondingTips": "The profile supports play, coat care, chosen contact, and gentle family interaction; a fifth tip would repeat those activities or introduce unsupported training claims."
    }
  },
  "sere": {
    "name": "Serengeti",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "domestic-cross",
        "text": "The Serengeti was developed from Bengals and Oriental Shorthairs, without directly crossing in a serval.",
        "citations": [
          {
            "source": "profile_sere",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "founder",
        "text": "Conservation biologist Karen Sausman began the Californian breeding project in the 1990s.",
        "citations": [
          {
            "source": "profile_sere",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "large-ears",
        "text": "Very large, round-tipped ears set high on the head are a defining feature.",
        "citations": [
          {
            "source": "profile_sere",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "upright-outline",
        "text": "Long legs and neck give the breed a markedly upright, statuesque outline.",
        "citations": [
          {
            "source": "profile_sere",
            "section": "The breed standard"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "coat-patterns",
        "text": "Short silky coats include spotted golden, grey, and silver examples as well as solid black.",
        "citations": [
          {
            "source": "profile_sere",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "settling-time",
        "text": "Give your Serengeti a quiet start in unfamiliar surroundings and let them decide when to investigate.",
        "citations": [
          {
            "source": "profile_sere",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "adaptability"
        ]
      },
      {
        "id": "active-play",
        "text": "Offer energetic chase play and stable high perches, joining in rather than leaving all enrichment to your cat.",
        "citations": [
          {
            "source": "profile_sere",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "daily-company",
        "text": "Include your Serengeti in daily activities with a safe nearby place and regular undivided attention.",
        "citations": [
          {
            "source": "profile_sere",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs",
          "affection_level"
        ]
      },
      {
        "id": "conversation",
        "text": "Answer their conversation while watching posture, learning whether they want play, company, or space.",
        "citations": [
          {
            "source": "profile_sere",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "vocalisation"
        ]
      }
    ],
    "coverageNotes": {
      "bondingTips": "Four distinct activities are supported by the registry profile; it does not provide enough specific grooming or training guidance for a substantive fifth tip."
    }
  },
  "sibe": {
    "name": "Siberian",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "triple-coat",
        "text": "The Siberian’s winter coat has three layers and becomes shorter and less dense in summer.",
        "citations": [
          {
            "source": "profile_sibe",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "barrel-body",
        "text": "Heavy bone and rounded body contours give this muscular cat a barrel-like outline.",
        "citations": [
          {
            "source": "profile_sibe",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "slow-maturity",
        "text": "Full physical maturity can take about five years.",
        "citations": [
          {
            "source": "profile_sibe",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "american-imports",
        "text": "Elizabeth Terrell imported Ofelia, Naina, and Kaliostro to the United States in 1990.",
        "citations": [
          {
            "source": "profile_sibe",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "championship",
        "text": "TICA granted the Siberian championship status in 1996.",
        "citations": [
          {
            "source": "profile_sibe",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "climbing-play",
        "text": "Use sturdy climbing furniture and a toy to invite comfortable jumps with clear landing space.",
        "citations": [
          {
            "source": "profile_sibe",
            "section": "General description"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "family-games",
        "text": "Let family members take turns in interactive play, respecting your Siberian’s requests for a pause.",
        "citations": [
          {
            "source": "profile_sibe",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "child_friendly",
          "social_needs"
        ]
      },
      {
        "id": "chirped-greetings",
        "text": "Return a chirped greeting with a little attention, noticing which interactions your cat seeks.",
        "citations": [
          {
            "source": "profile_sibe",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "vocalisation",
          "affection_level"
        ]
      },
      {
        "id": "seasonal-combing",
        "text": "Make regular gentle combing a shared routine, with extra attention as the thick winter coat sheds.",
        "citations": [
          {
            "source": "profile_sibe",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming",
          "shedding_level"
        ]
      },
      {
        "id": "quiet-company",
        "text": "Leave a comfortable resting place beside you after play, allowing closeness on your cat’s terms.",
        "citations": [
          {
            "source": "profile_sibe",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      }
    ]
  },
  "sing": {
    "name": "Singapura",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "name",
        "text": "The name Singapura refers to Singapore, the place associated with the breed’s development story.",
        "citations": [
          {
            "source": "profile_sing",
            "section": "History"
          }
        ],
        "category": "naming"
      },
      {
        "id": "sepia-ticking",
        "text": "The recognised coat combines warm sable-brown ticking with an ivory background, giving a sepia effect.",
        "citations": [
          {
            "source": "profile_sing",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "large-features",
        "text": "Large eyes and ears stand out on the Singapura’s small rounded head.",
        "citations": [
          {
            "source": "profile_sing",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "adult-size",
        "text": "This small breed takes almost two years to reach its full adult size.",
        "citations": [
          {
            "source": "profile_sing",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "tica-recognition",
        "text": "TICA accepted the Singapura for championship competition in 1979.",
        "citations": [
          {
            "source": "profile_sing",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "exploring",
        "text": "Explore a safe box or tunnel together, checking that drawers and cupboards cannot close around your curious cat.",
        "citations": [
          {
            "source": "profile_sing",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "high-view",
        "text": "Offer a stable raised perch and join your Singapura’s climbing play with a suitable toy.",
        "citations": [
          {
            "source": "profile_sing",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "learning",
        "text": "Practise one small rewarded cue in short sessions, allowing your cat to volunteer the next attempt.",
        "citations": [
          {
            "source": "profile_sing",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "close-company",
        "text": "Make regular time for shared play and a nearby resting place, following your Singapura’s bids for contact.",
        "citations": [
          {
            "source": "profile_sing",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level",
          "social_needs"
        ]
      },
      {
        "id": "light-brush",
        "text": "Offer a light brushing as quiet attention when your Singapura enjoys it; the short coat needs little maintenance.",
        "citations": [
          {
            "source": "profile_sing",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "snow": {
    "name": "Snowshoe",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "philadelphia",
        "text": "Dorothy Hinds Daugherty developed the Snowshoe in Philadelphia after finding white-footed Siamese kittens in the 1960s.",
        "citations": [
          {
            "source": "profile_snow",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "white-feet",
        "text": "White feet, blue eyes, and darker points combine to create the Snowshoe’s distinctive colouring.",
        "citations": [
          {
            "source": "profile_snow",
            "section": "General description"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "face-v",
        "text": "Many Snowshoes have an inverted white V on the face, although individual white markings vary.",
        "citations": [
          {
            "source": "profile_snow",
            "section": "History and traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "white-kittens",
        "text": "Kittens are born white, with darker point colouring beginning to develop over the following weeks.",
        "citations": [
          {
            "source": "profile_snow",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "championship",
        "text": "TICA accepted the Snowshoe as a championship breed in 1994.",
        "citations": [
          {
            "source": "profile_snow",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "fetch",
        "text": "Try retrieving a favourite toy and reward each willing return without insisting on another turn.",
        "citations": [
          {
            "source": "profile_snow",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "agility",
        "text": "Guide your Snowshoe through a simple indoor agility route, starting with easy, stable obstacles.",
        "citations": [
          {
            "source": "profile_snow",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "water-choice",
        "text": "If your Snowshoe welcomes water, offer supervised shallow-tray play with an easy exit.",
        "citations": [
          {
            "source": "profile_snow",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "gentle-chat",
        "text": "Answer soft calls with attention, adjusting the interaction to your Snowshoe’s individual social preferences.",
        "citations": [
          {
            "source": "profile_snow",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "vocalisation",
          "social_needs"
        ]
      },
      {
        "id": "weekly-brush",
        "text": "Use a gentle weekly brushing for quiet shared time and removal of loose coat.",
        "citations": [
          {
            "source": "profile_snow",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "soma": {
    "name": "Somali",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "longhaired-relative",
        "text": "The Somali is the semi-longhaired relative of the Abyssinian, sharing its general body type and ticked colouring.",
        "citations": [
          {
            "source": "profile_soma",
            "section": "General description"
          }
        ],
        "category": "classification"
      },
      {
        "id": "neighbour-name",
        "text": "The name refers to Somalia’s position beside Ethiopia, formerly Abyssinia, reflecting the breeds’ connection.",
        "citations": [
          {
            "source": "profile_soma",
            "section": "History"
          }
        ],
        "category": "naming"
      },
      {
        "id": "banded-hairs",
        "text": "Alternating bands of colour along each hair create the coat’s ticked effect.",
        "citations": [
          {
            "source": "profile_soma",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "fox-like-tail",
        "text": "A full fox-like tail and ear tufts distinguish the Somali’s longer-coated silhouette.",
        "citations": [
          {
            "source": "profile_soma",
            "section": "General description"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "expressive-eyes",
        "text": "Large almond-shaped eyes can be gold, amber, or green, with darker surrounding markings.",
        "citations": [
          {
            "source": "profile_soma",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "high-lookout",
        "text": "Give your Somali a stable high lookout and invite exploration along safe climbing routes.",
        "citations": [
          {
            "source": "profile_soma",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "hidden-toy",
        "text": "Partly hide a toy within easy reach and let your Somali investigate while you share the discovery.",
        "citations": [
          {
            "source": "profile_soma",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "hunting-game",
        "text": "Use a moving toy for stalking and pouncing, giving a real catch before a rest.",
        "citations": [
          {
            "source": "profile_soma",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "shared-tasks",
        "text": "Provide a safe place beside household activities so your Somali can join in without getting underfoot.",
        "citations": [
          {
            "source": "profile_soma",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs"
        ]
      },
      {
        "id": "attention-choice",
        "text": "Answer bids for attention with play or gentle contact, allowing your Somali to move on when they choose.",
        "citations": [
          {
            "source": "profile_soma",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      }
    ]
  },
  "sphy": {
    "name": "Sphynx",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "prune",
        "text": "A hairless kitten named Prune, born in Ontario in 1966, inspired early Sphynx breeding attempts.",
        "citations": [
          {
            "source": "profile_sphy",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "later-foundations",
        "text": "Later hairless cats from Minnesota and Toronto, crossed with Devon Rex, contributed to modern Sphynx lines.",
        "citations": [
          {
            "source": "profile_sphy",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "fine-down",
        "text": "Most Sphynx are not entirely hairless: fine down gives the skin a suede-like feel.",
        "citations": [
          {
            "source": "profile_sphy",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "visible-colours",
        "text": "Colours and patterns show through skin pigment and the small amount of remaining hair.",
        "citations": [
          {
            "source": "profile_sphy",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "lemon-eyes",
        "text": "Large ears and broad lemon-shaped eyes contribute to the breed’s distinctive expression.",
        "citations": [
          {
            "source": "profile_sphy",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "fetch",
        "text": "Offer a lightweight toy for chase and retrieval, rewarding your Sphynx’s willing participation.",
        "citations": [
          {
            "source": "profile_sphy",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "safe-exploring",
        "text": "Explore a safe box or climbing station together while keeping cupboards secure outside supervised play.",
        "citations": [
          {
            "source": "profile_sphy",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "warm-rest",
        "text": "Provide a cosy resting place beside you after play, allowing your Sphynx to choose closer contact.",
        "citations": [
          {
            "source": "profile_sphy",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "skin-care",
        "text": "Make skin care gentle shared time, following your vet’s product and frequency advice rather than automatically bathing weekly.",
        "citations": [
          {
            "source": "profile_sphy",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "family-turns",
        "text": "Give family members turns at gentle interactive play, always leaving the cat free to pause or leave.",
        "citations": [
          {
            "source": "profile_sphy",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs",
          "child_friendly"
        ]
      }
    ]
  },
  "thai": {
    "name": "Thai",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "wichienmaat",
        "text": "In Thailand the native pointed cat is known as Wichienmaat; Thai is the official name used by TICA.",
        "citations": [
          {
            "source": "profile_thai",
            "section": "General description"
          }
        ],
        "category": "naming"
      },
      {
        "id": "old-style",
        "text": "The Thai preserves a moderate type resembling early Siamese, rather than the more elongated modern show Siamese.",
        "citations": [
          {
            "source": "profile_thai",
            "section": "General description"
          }
        ],
        "category": "classification"
      },
      {
        "id": "pointed-coat",
        "text": "A short soft coat, blue eyes, pale body, and darker extremities form the breed’s pointed colouring.",
        "citations": [
          {
            "source": "profile_thai",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "head-shape",
        "text": "A rounded cheek area transitions into a wedge-shaped muzzle with a gently tapered end.",
        "citations": [
          {
            "source": "profile_thai",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "thai-name",
        "text": "The World Cat Federation adopted Thai as the breed name in 1990 to distinguish this older type.",
        "citations": [
          {
            "source": "profile_thai",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "daily-wand",
        "text": "Offer daily wand-toy play with safe catches and pauses, giving your Thai a shared outlet for activity.",
        "citations": [
          {
            "source": "profile_thai",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "safe-perches",
        "text": "Provide stable high perches and a secure route down, guiding exploration toward suitable furniture.",
        "citations": [
          {
            "source": "profile_thai",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level",
          "intelligence"
        ]
      },
      {
        "id": "learning",
        "text": "Teach a small rewarded cue in short sessions, keeping cupboard-opening curiosity directed into an allowed game.",
        "citations": [
          {
            "source": "profile_thai",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "chat",
        "text": "Answer your Thai’s chatter with attention and watch for a paw tap or change in posture too.",
        "citations": [
          {
            "source": "profile_thai",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "vocalisation"
        ]
      },
      {
        "id": "participation",
        "text": "Include your Thai in everyday activities with a safe nearby place and regular undivided company.",
        "citations": [
          {
            "source": "profile_thai",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs",
          "affection_level"
        ]
      }
    ]
  },
  "tonk": {
    "name": "Tonkinese",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "ancestry",
        "text": "The Tonkinese combines Siamese and Burmese ancestry in a moderate body type.",
        "citations": [
          {
            "source": "profile_tonk",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "modern-breeders",
        "text": "Jane Barletta in the United States and Margaret Conroy in Canada helped develop the modern breed in the 1960s.",
        "citations": [
          {
            "source": "profile_tonk",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "patterns",
        "text": "The coat patterns are pointed, mink, and solid, representing different levels of colour contrast.",
        "citations": [
          {
            "source": "profile_tonk",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "eyes",
        "text": "Mink-patterned Tonkinese have aqua eyes; pointed cats have blue eyes and solid-patterned cats green-gold tones.",
        "citations": [
          {
            "source": "profile_tonk",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "silky-coat",
        "text": "The short close-lying coat has a silky texture often compared with mink.",
        "citations": [
          {
            "source": "profile_tonk",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "puzzles",
        "text": "Work through an easy puzzle toy together, helping your Tonkinese discover the first successful move.",
        "citations": [
          {
            "source": "profile_tonk",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "consistent-cues",
        "text": "Practise a clear, consistent cue with small rewards, keeping sessions brief and cooperative.",
        "citations": [
          {
            "source": "profile_tonk",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "fetch",
        "text": "Offer a favourite toy for retrieving, treating each voluntary return as another shared turn.",
        "citations": [
          {
            "source": "profile_tonk",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "lap-and-company",
        "text": "Reserve unhurried time for company or lap contact, allowing your Tonkinese to choose how close to settle.",
        "citations": [
          {
            "source": "profile_tonk",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level",
          "social_needs"
        ]
      },
      {
        "id": "rubber-brush",
        "text": "Use a gentle weekly rubber brushing as quiet contact and simple care for the short coat.",
        "citations": [
          {
            "source": "profile_tonk",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "toyb": {
    "name": "Toybob",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "russian-regions",
        "text": "The naturally small Toybob was developed primarily in Russia’s Rostov and Ural regions.",
        "citations": [
          {
            "source": "profile_toyb",
            "section": "General description"
          }
        ],
        "category": "history"
      },
      {
        "id": "name",
        "text": "Toy refers to a playful small cat, while bob refers to the shortened tail.",
        "citations": [
          {
            "source": "profile_toyb",
            "section": "General description"
          }
        ],
        "category": "naming"
      },
      {
        "id": "sturdy-body",
        "text": "A compact muscular body and kinked bobtail distinguish the Toybob; small size does not mean a delicate frame.",
        "citations": [
          {
            "source": "profile_toyb",
            "section": "General description"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "small-cat-play",
        "text": "Offer a lightweight toy for short chase games, matching the pace to your Toybob’s interest.",
        "citations": [
          {
            "source": "profile_toyb",
            "section": "General description"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "safe-agility",
        "text": "Use stable, accessible play surfaces and let your agile Toybob choose comfortable jumps.",
        "citations": [
          {
            "source": "profile_toyb",
            "section": "General description"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "chosen-contact",
        "text": "Offer gentle nearby company after play, letting your Toybob initiate strokes or closer contact.",
        "citations": [
          {
            "source": "profile_toyb",
            "section": "General description"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level",
          "social_needs"
        ]
      }
    ],
    "coverageNotes": {
      "facts": "The short registry introduction supports three distinct facts; extra claims about precise ancestry or recognition would exceed this source.",
      "bondingTips": "The introduction supports active play, accessible exploration, and affectionate company, without detailed training or grooming guidance."
    }
  },
  "toyg": {
    "name": "Toyger",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "domestic-tiger-look",
        "text": "Judy Sugden developed the Toyger to resemble a tiger using domestic cat lines, without a tiger cross.",
        "citations": [
          {
            "source": "profile_toyg",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "foundation-cats",
        "text": "A striped domestic shorthair called Scrapmetal and a Bengal called Millwood Rumpled Spotskin were important foundation cats.",
        "citations": [
          {
            "source": "profile_toyg",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "branching-stripes",
        "text": "Bold broken or branching vertical stripes distinguish the coat from a simple mackerel tabby pattern.",
        "citations": [
          {
            "source": "profile_toyg",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "rectangular-body",
        "text": "A long muscular rectangular body and prominent shoulders contribute to its rolling gait.",
        "citations": [
          {
            "source": "profile_toyg",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "championship",
        "text": "TICA granted the Toyger championship recognition in February 2007.",
        "citations": [
          {
            "source": "profile_toyg",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "retrieving",
        "text": "Teach a retrieving game with a favourite toy, rewarding willing returns without insisting on another round.",
        "citations": [
          {
            "source": "profile_toyg",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "agility",
        "text": "Guide your Toyger through an easy indoor agility sequence with stable, low starting obstacles.",
        "citations": [
          {
            "source": "profile_toyg",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "puzzles",
        "text": "Introduce a manageable reward puzzle and share the first discoveries with your cat.",
        "citations": [
          {
            "source": "profile_toyg",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "dependable-time",
        "text": "Make interactive time consistent and dependable, giving your Toyger your attention rather than only leaving toys out.",
        "citations": [
          {
            "source": "profile_toyg",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs",
          "affection_level"
        ]
      },
      {
        "id": "light-coat-care",
        "text": "Use gentle occasional brushing as quiet contact, adding attention when the coat sheds seasonally.",
        "citations": [
          {
            "source": "profile_toyg",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "tang": {
    "name": "Turkish Angora",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "ankara-name",
        "text": "Angora is the former name of Ankara, the Turkish city associated with the breed.",
        "citations": [
          {
            "source": "profile_tang",
            "section": "History"
          }
        ],
        "category": "naming"
      },
      {
        "id": "zoo-preservation",
        "text": "Ankara Zoo maintained a preservation programme; cats exported in the 1960s helped establish North American breeding lines.",
        "citations": [
          {
            "source": "profile_tang",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "many-colours",
        "text": "White is the traditional association, but Turkish Angoras occur in many colours and patterns.",
        "citations": [
          {
            "source": "profile_tang",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "silky-coat",
        "text": "The semi-long silky coat has little undercoat and usually tangles less readily than a dense woolly coat.",
        "citations": [
          {
            "source": "profile_tang",
            "section": "Grooming"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "winter-outline",
        "text": "The adult winter coat develops a fuller mane, breeches, and plumed tail.",
        "citations": [
          {
            "source": "profile_tang",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "agility",
        "text": "Offer a small indoor agility route with stable obstacles and rewards for willing attempts.",
        "citations": [
          {
            "source": "profile_tang",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "fetch",
        "text": "Try fetching a favourite toy, building a short back-and-forth game from voluntary returns.",
        "citations": [
          {
            "source": "profile_tang",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "hunting-games",
        "text": "Invite stalking and chasing with a suitable toy, redirecting climbing toward safe furniture.",
        "citations": [
          {
            "source": "profile_tang",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "shared-projects",
        "text": "Provide a safe nearby perch while you work, giving your curious Angora a place to join in.",
        "citations": [
          {
            "source": "profile_tang",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs"
        ]
      },
      {
        "id": "silky-coat-care",
        "text": "Make gentle regular combing relaxed shared time, adapting the session to the seasonal coat.",
        "citations": [
          {
            "source": "profile_tang",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming",
          "affection_level"
        ]
      }
    ]
  },
  "tvan": {
    "name": "Turkish Van",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "lake-name",
        "text": "The name refers to Lake Van in eastern Turkey, the region associated with the breed.",
        "citations": [
          {
            "source": "profile_tvan",
            "section": "General description"
          }
        ],
        "category": "naming"
      },
      {
        "id": "van-pattern",
        "text": "The traditional Van pattern places colour mainly on the head and tail against a largely white body.",
        "citations": [
          {
            "source": "profile_tvan",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "english-foundation",
        "text": "Laura Lushington and Sonia Halliday brought foundation kittens from Turkey to England in 1955.",
        "citations": [
          {
            "source": "profile_tvan",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "cashmere-coat",
        "text": "The semi-long single coat has a cashmere-like texture and little undercoat.",
        "citations": [
          {
            "source": "profile_tvan",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "slow-maturity",
        "text": "Turkish Vans can take three to five years to reach full physical maturity.",
        "citations": [
          {
            "source": "profile_tvan",
            "section": "Traits"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "fetch",
        "text": "Use a robust toy for retrieving games and check it regularly for damage from enthusiastic play.",
        "citations": [
          {
            "source": "profile_tvan",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "water-choice",
        "text": "If your Van enjoys water, offer supervised shallow-tray play rather than assuming every cat wants to swim.",
        "citations": [
          {
            "source": "profile_tvan",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "stable-height",
        "text": "Provide a stable high lookout and invite play along a safe climbing route.",
        "citations": [
          {
            "source": "profile_tvan",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "problem-solving",
        "text": "Explore a manageable puzzle together, offering help before the challenge becomes frustrating.",
        "citations": [
          {
            "source": "profile_tvan",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "chosen-strokes",
        "text": "Let your Van choose to settle for strokes, respecting that closeness need not mean being picked up or held.",
        "citations": [
          {
            "source": "profile_tvan",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level",
          "social_needs"
        ]
      }
    ]
  },
  "csho": {
    "name": "Colorpoint Shorthair",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "siamese-colours",
        "text": "The breed developed by introducing additional colours into Siamese lines, including red and cream points.",
        "citations": [
          {
            "source": "profile_csho",
            "section": "About the breed"
          }
        ],
        "category": "history"
      },
      {
        "id": "cfa-palette",
        "text": "CFA describes sixteen colours and colour combinations for the Colorpoint Shorthair.",
        "citations": [
          {
            "source": "profile_csho",
            "section": "About the breed"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "lynx-name",
        "text": "Tabby points brought from England became known as lynx points in North America.",
        "citations": [
          {
            "source": "profile_csho",
            "section": "Breed history"
          }
        ],
        "category": "naming"
      },
      {
        "id": "cooler-points",
        "text": "Temperature-sensitive point colour is stronger on cooler body areas such as the ears, face, feet, and tail.",
        "citations": [
          {
            "source": "profile_csho",
            "section": "Physical attributes"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "championship",
        "text": "Colorpoint Shorthairs achieved CFA championship status in 1964.",
        "citations": [
          {
            "source": "profile_csho",
            "section": "Breed history"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "paper-ball",
        "text": "Roll a safe lightweight ball along the floor and join your Colorpoint’s chase.",
        "citations": [
          {
            "source": "profile_csho",
            "section": "Traits"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "inventive-play",
        "text": "Partly hide a toy in an accessible box and let your cat invent a way to reach it.",
        "citations": [
          {
            "source": "profile_csho",
            "section": "Traits"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "conversation",
        "text": "Respond to your Colorpoint’s calls and watch posture too, learning the requests behind their conversation.",
        "citations": [
          {
            "source": "profile_csho",
            "section": "Traits"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "vocalisation"
        ]
      },
      {
        "id": "shared-tasks",
        "text": "Offer a safe nearby place during everyday tasks and regular periods of undivided attention.",
        "citations": [
          {
            "source": "profile_csho",
            "section": "Traits"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs",
          "affection_level"
        ]
      },
      {
        "id": "rubber-brush",
        "text": "Make occasional gentle rubber brushing a calm shared activity for the short silky coat.",
        "citations": [
          {
            "source": "profile_csho",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "ebur": {
    "name": "European Burmese",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "shared-ancestor",
        "text": "European Burmese and Burmese share ancestry with Wong Mau, introduced to the West in 1930.",
        "citations": [
          {
            "source": "profile_ebur",
            "section": "Breed history"
          }
        ],
        "category": "history"
      },
      {
        "id": "english-development",
        "text": "American-bred Burmese exported to England from 1949 helped establish the European line.",
        "citations": [
          {
            "source": "profile_ebur",
            "section": "Breed history"
          }
        ],
        "category": "history"
      },
      {
        "id": "ten-colours",
        "text": "CFA recognises a ten-colour palette for European Burmese, including tortoiseshell combinations.",
        "citations": [
          {
            "source": "profile_ebur",
            "section": "About the breed"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "moderate-body",
        "text": "A moderate muscular body and short blunt-wedge head distinguish its type from the rounder American Burmese.",
        "citations": [
          {
            "source": "profile_ebur",
            "section": "Physical attributes"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "cfa-championship",
        "text": "CFA accepted the breed for registration in 1993 and championship competition in 2002.",
        "citations": [
          {
            "source": "profile_ebur",
            "section": "Breed history"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "daily-participation",
        "text": "Invite your European Burmese into daily activities with a safe nearby spot and time for direct attention.",
        "citations": [
          {
            "source": "profile_ebur",
            "section": "Traits"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs"
        ]
      },
      {
        "id": "chosen-lap",
        "text": "Offer a comfortable lap during quiet breaks, letting your cat decide when to snuggle.",
        "citations": [
          {
            "source": "profile_ebur",
            "section": "Traits"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "quiet-requests",
        "text": "Notice a look or purr as a request for company instead of waiting for a loud meow.",
        "citations": [
          {
            "source": "profile_ebur",
            "section": "Traits"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "vocalisation"
        ]
      },
      {
        "id": "interactive-play",
        "text": "Share a short toy game and let curiosity determine the next move, offering rests between turns.",
        "citations": [
          {
            "source": "profile_ebur",
            "section": "Traits"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level",
          "intelligence"
        ]
      },
      {
        "id": "light-brushing",
        "text": "Use occasional gentle rubber brushing as calm contact, keeping care light for the close-lying coat.",
        "citations": [
          {
            "source": "profile_ebur",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "khao": {
    "name": "Khao Manee",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "white-gem",
        "text": "Khao Manee means White Gem in Thai.",
        "citations": [
          {
            "source": "profile_khao",
            "section": "About the breed"
          }
        ],
        "category": "naming"
      },
      {
        "id": "eye-colours",
        "text": "The white coat can accompany blue, green, yellow, or differently coloured eyes; odd eyes are not universal.",
        "citations": [
          {
            "source": "profile_khao",
            "section": "About the breed"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "thai-poems",
        "text": "The breed is associated with the good-fortune cats in Thailand’s historic Tamra Maeo cat poems.",
        "citations": [
          {
            "source": "profile_khao",
            "section": "Breed history"
          }
        ],
        "category": "history"
      },
      {
        "id": "american-programme",
        "text": "Colleen Freymouth brought Khao Manee to the United States in 1999 to start a conservation breeding programme.",
        "citations": [
          {
            "source": "profile_khao",
            "section": "Breed history"
          }
        ],
        "category": "history"
      },
      {
        "id": "triangular-head",
        "text": "The nose and ear tips form a triangular outline around a modified-wedge head with high cheekbones.",
        "citations": [
          {
            "source": "profile_khao",
            "section": "Physical attributes"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "fetch",
        "text": "Offer a soft toy for retrieving and reward your Khao Manee’s willing attempts to bring it back.",
        "citations": [
          {
            "source": "profile_khao",
            "section": "Traits"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence",
          "energy_level"
        ]
      },
      {
        "id": "investigate",
        "text": "Introduce a safe new box or toy together, allowing your curious cat to inspect it at their own pace.",
        "citations": [
          {
            "source": "profile_khao",
            "section": "Traits"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "family-play",
        "text": "Let family members take turns with gentle interactive games, leaving your cat free to rest.",
        "citations": [
          {
            "source": "profile_khao",
            "section": "Traits"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "child_friendly",
          "social_needs"
        ]
      },
      {
        "id": "body-language",
        "text": "Respond to vocal and body-language invitations with company, learning which kinds of contact your cat enjoys.",
        "citations": [
          {
            "source": "profile_khao",
            "section": "Traits"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "vocalisation",
          "affection_level"
        ]
      },
      {
        "id": "coat-care",
        "text": "Offer regular gentle rubber brushing as quiet shared time and simple care for the short white coat.",
        "citations": [
          {
            "source": "profile_khao",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "raga": {
    "name": "Ragamuffin",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "ragdoll-connection",
        "text": "The Ragamuffin developed in the early 1990s from breeders formerly working within Ann Baker’s Ragdoll registry.",
        "citations": [
          {
            "source": "profile_raga",
            "section": "Breed history"
          }
        ],
        "category": "history"
      },
      {
        "id": "colour-range",
        "text": "Its broad colour and pattern range distinguishes it from the traditional pointed Ragdoll image.",
        "citations": [
          {
            "source": "profile_raga",
            "section": "Breed history"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "silky-coat",
        "text": "The full silky coat is often compared with rabbit fur and tends to resist tangles.",
        "citations": [
          {
            "source": "profile_raga",
            "section": "Physical attributes and grooming"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "slow-growth",
        "text": "Full growth can take about four years in this substantial breed.",
        "citations": [
          {
            "source": "profile_raga",
            "section": "Physical attributes"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "cfa-recognition",
        "text": "CFA granted registration in 2003 and championship status in 2011.",
        "citations": [
          {
            "source": "profile_raga",
            "section": "Breed history"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "lap-invitation",
        "text": "Offer quiet lap time and let your Ragamuffin choose when to settle or move away.",
        "citations": [
          {
            "source": "profile_raga",
            "section": "Traits"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "harness",
        "text": "If your cat welcomes a harness, introduce it indoors through short, rewarded sessions before any outing.",
        "citations": [
          {
            "source": "profile_raga",
            "section": "Traits"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "adaptability",
          "intelligence"
        ]
      },
      {
        "id": "fetch",
        "text": "Try retrieving a soft toy and praise interest, adapting the game if fetching does not appeal.",
        "citations": [
          {
            "source": "profile_raga",
            "section": "Traits"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "gentle-combing",
        "text": "Use gentle regular combing as relaxed contact, checking patiently for anything caught in the long coat.",
        "citations": [
          {
            "source": "profile_raga",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "pet-introductions",
        "text": "Keep introductions to other pets gradual and give your Ragamuffin a comfortable retreat from unwanted attention.",
        "citations": [
          {
            "source": "profile_raga",
            "section": "Traits"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs",
          "dog_friendly"
        ]
      }
    ]
  },
  "aege": {
    "name": "Aegean",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "island-home",
        "text": "The Aegean is associated with the Cycladic islands of Greece.",
        "citations": [
          {
            "source": "profile_aege",
            "section": "Breed overview"
          }
        ],
        "category": "history"
      },
      {
        "id": "natural-population",
        "text": "Aegeans developed as a local cat population rather than a planned cross between pedigree breeds.",
        "citations": [
          {
            "source": "profile_aege",
            "section": "Breed history"
          }
        ],
        "category": "classification"
      },
      {
        "id": "white-and-colour",
        "text": "Their coats commonly combine white with one or two other colours, sometimes with tabby markings.",
        "citations": [
          {
            "source": "profile_aege",
            "section": "Breed overview"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "green-eyes",
        "text": "Almond-shaped green eyes are a characteristic feature of the Aegean.",
        "citations": [
          {
            "source": "profile_aege",
            "section": "Appearance"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "fishing-game",
        "text": "Try a toy that skims along the floor to give this island hunter a chase and a catch.",
        "citations": [
          {
            "source": "profile_aege",
            "section": "Exercise"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "water-choice",
        "text": "If your Aegean investigates water, offer a shallow supervised play tray and let them choose whether to approach.",
        "citations": [
          {
            "source": "profile_aege",
            "section": "Temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "puzzle-turn",
        "text": "Introduce an easy food puzzle, then help with the first few discoveries before increasing the challenge.",
        "citations": [
          {
            "source": "profile_aege",
            "section": "Training"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "social-seat",
        "text": "Make room beside you during everyday activities; reward an invitation to interact without insisting on a lap visit.",
        "citations": [
          {
            "source": "profile_aege",
            "section": "Temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "weekly-brush",
        "text": "Use a short weekly brushing session as quiet time together, stopping while your cat is still comfortable.",
        "citations": [
          {
            "source": "profile_aege",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ],
    "coverageNotes": {
      "facts": "Four distinct well-supported details; no speculative antiquity or universal love-of-water claim."
    }
  },
  "amer": {
    "name": "American Ringtail",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "solomon",
        "text": "The breeding project began with Solomon, a rescued kitten adopted by Susan Manley in 1998.",
        "citations": [
          {
            "source": "profile_amer",
            "section": "Little-known facts"
          }
        ],
        "category": "history"
      },
      {
        "id": "tail-position",
        "text": "The signature tail can curl over the back; it is not permanently fixed into a ring.",
        "citations": [
          {
            "source": "profile_amer",
            "section": "Little-known facts"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "kitten-tail",
        "text": "Kittens can begin with straight tails and develop the characteristic curl as they grow.",
        "citations": [
          {
            "source": "profile_amer",
            "section": "Little-known facts"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "coat-palette",
        "text": "American Ringtails occur in a broad range of colours and patterns.",
        "citations": [
          {
            "source": "profile_amer",
            "section": "Little-known facts"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "coat-length",
        "text": "Their coats may be short or medium in length.",
        "citations": [
          {
            "source": "profile_amer",
            "section": "Grooming"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "climbing-route",
        "text": "Invite your Ringtail onto a sturdy climbing tree with a toy, leaving an easy route back down.",
        "citations": [
          {
            "source": "profile_amer",
            "section": "Exercise"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "explore-box",
        "text": "Put an open box or paper tunnel in a familiar room for a shared exploration session.",
        "citations": [
          {
            "source": "profile_amer",
            "section": "Temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "brief-learning",
        "text": "Keep reward-based lessons brief and finish before your cat loses interest.",
        "citations": [
          {
            "source": "profile_amer",
            "section": "Training"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "guest-choice",
        "text": "Give visitors a toy to offer from a distance, with no pressure for your cat to greet them.",
        "citations": [
          {
            "source": "profile_amer",
            "section": "Temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "adaptability"
        ]
      },
      {
        "id": "coat-time",
        "text": "Offer gentle brushing a couple of times a week, rewarding relaxed participation.",
        "citations": [
          {
            "source": "profile_amer",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "amau": {
    "name": "Arabian Mau",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "desert-roots",
        "text": "The Arabian Mau developed from cats living on the Arabian Peninsula.",
        "citations": [
          {
            "source": "profile_amau",
            "section": "Breed overview"
          }
        ],
        "category": "history"
      },
      {
        "id": "natural-breed",
        "text": "It is described as a natural breed, rather than a deliberately designed pedigree cross.",
        "citations": [
          {
            "source": "profile_amau",
            "section": "Little-known facts"
          }
        ],
        "category": "classification"
      },
      {
        "id": "large-ears",
        "text": "Large, pointed ears are a conspicuous feature of its outline.",
        "citations": [
          {
            "source": "profile_amau",
            "section": "Little-known facts"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "single-coat",
        "text": "The Arabian Mau has a short coat without a dense insulating undercoat.",
        "citations": [
          {
            "source": "profile_amau",
            "section": "Grooming"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "moving-company",
        "text": "Spend time together through play and household company; affection need not mean staying on your lap.",
        "citations": [
          {
            "source": "profile_amau",
            "section": "Temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level",
          "energy_level"
        ]
      },
      {
        "id": "working-puzzle",
        "text": "Offer a simple treat puzzle and let your Mau work out how to release the reward.",
        "citations": [
          {
            "source": "profile_amau",
            "section": "Temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "name-game",
        "text": "Practise responding to their name with a reward, keeping lessons short and upbeat.",
        "citations": [
          {
            "source": "profile_amau",
            "section": "Training"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "shared-attention",
        "text": "Let each family member offer a gentle play session, while keeping handling calm and giving your cat an exit.",
        "citations": [
          {
            "source": "profile_amau",
            "section": "Family suitability"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "child_friendly"
        ]
      },
      {
        "id": "light-groom",
        "text": "Make light brushing part of your routine together rather than treating the short coat as a reason to skip all grooming.",
        "citations": [
          {
            "source": "profile_amau",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ],
    "coverageNotes": {
      "facts": "Four independent origin and appearance details; excluded unsubstantiated health guarantees and heat-adaptation claims."
    }
  },
  "braz": {
    "name": "Brazilian Shorthair",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "street-foundation",
        "text": "Brazilian Shorthairs were developed from cats living in Brazilian street populations.",
        "citations": [
          {
            "source": "profile_braz",
            "section": "Breed history"
          }
        ],
        "category": "history"
      },
      {
        "id": "ruschi-project",
        "text": "Paulo Samuel Ruschi helped establish the breeding project that brought these cats into the pedigree world.",
        "citations": [
          {
            "source": "profile_braz",
            "section": "Breed history"
          }
        ],
        "category": "history"
      },
      {
        "id": "wcf-recognition",
        "text": "The World Cat Federation recognised the Brazilian Shorthair in 1998.",
        "citations": [
          {
            "source": "profile_braz",
            "section": "Breed history"
          }
        ],
        "category": "classification"
      },
      {
        "id": "athletic-outline",
        "text": "The breed has a lean, muscular build rather than the stockier outline of a British Shorthair.",
        "citations": [
          {
            "source": "profile_braz",
            "section": "Breed overview"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "colour-variety",
        "text": "Brazilian Shorthairs come in many coat colours and patterns.",
        "citations": [
          {
            "source": "profile_braz",
            "section": "Breed overview"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "fetch-invitation",
        "text": "Try tossing a small soft toy and reward any interest in bringing it back.",
        "citations": [
          {
            "source": "profile_braz",
            "section": "Exercise"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "learning-session",
        "text": "Teach a simple cue using small rewards and patient repetition.",
        "citations": [
          {
            "source": "profile_braz",
            "section": "Training"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "harness-choice",
        "text": "If your cat enjoys exploring, introduce a harness indoors in small rewarded steps before considering a quiet outing.",
        "citations": [
          {
            "source": "profile_braz",
            "section": "Training"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "family-company",
        "text": "Include your Brazilian Shorthair in everyday family time and respond when they invite a game or some attention.",
        "citations": [
          {
            "source": "profile_braz",
            "section": "Temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "weekly-groom",
        "text": "A gentle weekly brush can become a predictable one-to-one ritual.",
        "citations": [
          {
            "source": "profile_braz",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "ctif": {
    "name": "Chantilly-Tiffany",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "new-york-litter",
        "text": "The first recorded Chantilly litter was born in New York in 1969.",
        "citations": [
          {
            "source": "profile_ctif",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "name-changes",
        "text": "The breed was first called Foreign Longhair and then Tiffany before the Chantilly name helped distinguish it from Britain's Tiffanie.",
        "citations": [
          {
            "source": "profile_ctif",
            "section": "History"
          }
        ],
        "category": "naming"
      },
      {
        "id": "separate-tiffanie",
        "text": "Chantilly-Tiffany and the Burmese-derived British Tiffanie have different breed histories.",
        "citations": [
          {
            "source": "profile_ctif",
            "section": "History"
          }
        ],
        "category": "classification"
      },
      {
        "id": "silky-coat",
        "text": "Its soft, semi-long coat has little or no undercoat.",
        "citations": [
          {
            "source": "profile_ctif",
            "section": "About"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "gold-eyes",
        "text": "The oval, angled eyes are gold, with colour that can deepen as the cat matures.",
        "citations": [
          {
            "source": "profile_ctif",
            "section": "About"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "daily-comb",
        "text": "Offer gentle daily grooming to keep the semi-long coat comfortable, rewarding cooperation before tangles develop.",
        "citations": [
          {
            "source": "profile_ctif",
            "section": "What to expect"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "quiet-conversation",
        "text": "Answer a chirp softly and pause for a response to make a small daily conversation.",
        "citations": [
          {
            "source": "profile_ctif",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "vocalisation"
        ]
      },
      {
        "id": "reliable-company",
        "text": "Build dependable time together into your day; this people-oriented cat may prefer company to long solitary stretches.",
        "citations": [
          {
            "source": "profile_ctif",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "interactive-routine",
        "text": "Set aside an interactive toy session each day, letting your cat catch the toy at the end.",
        "citations": [
          {
            "source": "profile_ctif",
            "section": "What to expect"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "play-space",
        "text": "Keep a clear route for running and chasing so your shared games have room to unfold.",
        "citations": [
          {
            "source": "profile_ctif",
            "section": "What to expect"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      }
    ]
  },
  "lihu": {
    "name": "Dragon Li",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "chinese-home",
        "text": "The Dragon Li is native to China and remains uncommon outside its home country.",
        "citations": [
          {
            "source": "profile_lihu",
            "section": "Breed overview"
          }
        ],
        "category": "history"
      },
      {
        "id": "natural-origin",
        "text": "It is described as a naturally developed cat population rather than a newly designed cross.",
        "citations": [
          {
            "source": "profile_lihu",
            "section": "Little-known facts"
          }
        ],
        "category": "classification"
      },
      {
        "id": "tabby-coat",
        "text": "Brown tabby markings are central to the familiar Dragon Li appearance.",
        "citations": [
          {
            "source": "profile_lihu",
            "section": "Breed overview"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "hunting-outlet",
        "text": "Offer stalking and pouncing games with a wand toy, finishing with a successful catch.",
        "citations": [
          {
            "source": "profile_lihu",
            "section": "Temperament and exercise"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "teach-a-cue",
        "text": "Try a short reward-based lesson such as touching a target, then stop while your cat is engaged.",
        "citations": [
          {
            "source": "profile_lihu",
            "section": "Training"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "rotating-toys",
        "text": "Rotate a few toys rather than leaving every toy out, making each shared play session feel new.",
        "citations": [
          {
            "source": "profile_lihu",
            "section": "Exercise"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "gentle-affection",
        "text": "Follow an active game with the chance to sit near you, letting your cat choose whether to make contact.",
        "citations": [
          {
            "source": "profile_lihu",
            "section": "Family suitability"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "coat-check",
        "text": "Use brief, gentle brushing to collect loose coat and learn which kinds of touch your cat enjoys.",
        "citations": [
          {
            "source": "profile_lihu",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ],
    "coverageNotes": {
      "facts": "Only three distinct robust details retained; excluded speculative wild ancestry and sweeping rarity claims."
    }
  },
  "soko": {
    "name": "Sokoke",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "kenyan-origin",
        "text": "The Sokoke comes from the coastal Arabuko-Sokoke area of Kenya.",
        "citations": [
          {
            "source": "profile_soko",
            "section": "Profile"
          }
        ],
        "category": "history"
      },
      {
        "id": "tree-bark-name",
        "text": "The local name khadzonzo refers to the coat's resemblance to tree bark.",
        "citations": [
          {
            "source": "profile_soko",
            "section": "History"
          }
        ],
        "category": "naming"
      },
      {
        "id": "ticked-pattern",
        "text": "Ticking occurs within both the ground colour and the modified classic tabby pattern.",
        "citations": [
          {
            "source": "profile_soko",
            "section": "Profile"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "tiptoe-gait",
        "text": "Its rear-leg stance can give the Sokoke a distinctive tiptoe gait.",
        "citations": [
          {
            "source": "profile_soko",
            "section": "Appearance and colours"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "short-coat",
        "text": "The close, glossy coat is very short, with little or no undercoat.",
        "citations": [
          {
            "source": "profile_soko",
            "section": "Appearance and colours"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "play-invitations",
        "text": "Keep a toy nearby for short play invitations throughout the day.",
        "citations": [
          {
            "source": "profile_soko",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "puzzle-partner",
        "text": "Work on an easy puzzle together and increase the difficulty only after your cat succeeds.",
        "citations": [
          {
            "source": "profile_soko",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "nearby-perch",
        "text": "Place a comfortable perch near where you spend time so your Sokoke can share your company.",
        "citations": [
          {
            "source": "profile_soko",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "visitor-game",
        "text": "Let guests offer a gentle toy game if your cat approaches to greet them.",
        "citations": [
          {
            "source": "profile_soko",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "adaptability"
        ]
      },
      {
        "id": "family-play",
        "text": "Build calm, supervised routines around children or other pets, keeping play enjoyable and providing retreat space.",
        "citations": [
          {
            "source": "profile_soko",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "child_friendly",
          "dog_friendly"
        ]
      }
    ]
  },
  "java": {
    "name": "Javanese",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "colour-name",
        "text": "CFA used Javanese for Balinese-type cats in colours beyond the four traditional Siamese points.",
        "citations": [
          {
            "source": "profile_java",
            "section": "History"
          }
        ],
        "category": "naming"
      },
      {
        "id": "recognition-year",
        "text": "Those additional colours were accepted under the Javanese name in 1979.",
        "citations": [
          {
            "source": "profile_java",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "cfa-merger",
        "text": "In 2008, CFA brought the Javanese and Balinese together as divisions of one breed.",
        "citations": [
          {
            "source": "profile_java",
            "section": "History"
          }
        ],
        "category": "classification"
      },
      {
        "id": "point-variety",
        "text": "Javanese colour varieties include lynx and tortie points.",
        "citations": [
          {
            "source": "profile_java",
            "section": "Physical attributes"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "plumed-tail",
        "text": "The fine, close-lying coat is set off by a long, plumed tail.",
        "citations": [
          {
            "source": "profile_java",
            "section": "Physical attributes"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "fetch-reply",
        "text": "Offer a lightweight toy for a fetch game, rewarding a return instead of expecting one immediately.",
        "citations": [
          {
            "source": "profile_java",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "household-helper",
        "text": "Give your cat a safe nearby spot while you work so they can take part in household activity.",
        "citations": [
          {
            "source": "profile_java",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "reward-practice",
        "text": "Use a short reward-based game to practise a cue and give this playful cat a mental task.",
        "citations": [
          {
            "source": "profile_java",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "lap-invitation",
        "text": "After play, settle somewhere comfortable and let your cat decide whether to join your lap.",
        "citations": [
          {
            "source": "profile_java",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "silky-coat",
        "text": "Comb the silky single coat gently several times a month, making each session a calm interaction.",
        "citations": [
          {
            "source": "profile_java",
            "section": "Care"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ],
    "evidenceBasis": "related-breed"
  },
  "chee": {
    "name": "Cheetoh",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "parent-breeds",
        "text": "The Cheetoh breeding programme combines Bengal and Ocicat lines.",
        "citations": [
          {
            "source": "profile_chee",
            "section": "General description"
          }
        ],
        "category": "history"
      },
      {
        "id": "low-walk",
        "text": "The standard describes an athletic body and a low-shouldered, stalking walk.",
        "citations": [
          {
            "source": "profile_chee",
            "section": "General description"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "spot-rosette",
        "text": "Spots and rosettes help create the intended wild-cat appearance.",
        "citations": [
          {
            "source": "profile_chee",
            "section": "General description"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "velvety-coat",
        "text": "The coat is described as very short, thick and velvety to the touch.",
        "citations": [
          {
            "source": "profile_chee",
            "section": "General description"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "glitter-optional",
        "text": "The standard allows coats with or without glitter, the reflective effect seen on some individual hairs.",
        "citations": [
          {
            "source": "profile_chee",
            "section": "General description"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "athletic-play",
        "text": "Offer room for chasing a wand toy, adjusting the pace to your cat's enthusiasm.",
        "citations": [
          {
            "source": "profile_chee",
            "section": "General description"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "curious-task",
        "text": "Introduce a small puzzle or target game for a curious cat to solve with you.",
        "citations": [
          {
            "source": "profile_chee",
            "section": "General description"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "shared-routine",
        "text": "Build regular company into the day and notice whether your cat asks for play or quiet contact.",
        "citations": [
          {
            "source": "profile_chee",
            "section": "General description"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs"
        ]
      },
      {
        "id": "gentle-touch",
        "text": "Invite a brief stroke and pause, letting your cat ask for more rather than assuming every Cheetoh welcomes handling.",
        "citations": [
          {
            "source": "profile_chee",
            "section": "General description"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      }
    ],
    "coverageNotes": {
      "bondingTips": "Four distinct activities supported by the standard; its absolute temperament promises are deliberately not repeated."
    }
  },
  "germ": {
    "name": "German Rex",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "berlin-founder",
        "text": "A wavy-coated cat called Lämmchen, found near a Berlin hospital, became a foundation cat for the German Rex.",
        "citations": [
          {
            "source": "profile_germ",
            "section": "History and background"
          }
        ],
        "category": "history"
      },
      {
        "id": "rex-texture",
        "text": "Its short coat can look woollier than a Cornish Rex coat because of differences in the guard-like awn hairs.",
        "citations": [
          {
            "source": "profile_germ",
            "section": "Physical characteristics"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "curled-whiskers",
        "text": "The whiskers can have a slight curl as well as the coat.",
        "citations": [
          {
            "source": "profile_germ",
            "section": "Physical characteristics"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "round-face",
        "text": "A round face and developed cheeks accompany its large ears and long, slender legs.",
        "citations": [
          {
            "source": "profile_germ",
            "section": "Physical characteristics"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "atlantic-journey",
        "text": "German Rex cats Marigold and Jet were taken to the United States in 1960.",
        "citations": [
          {
            "source": "profile_germ",
            "section": "History and background"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "fetch-game",
        "text": "Try a soft toy for fetch, rewarding any return and allowing the game to develop at your cat's pace.",
        "citations": [
          {
            "source": "profile_germ",
            "section": "Personality and temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "cue-game",
        "text": "Teach a small trick with rewards to give this lively cat a task to share with you.",
        "citations": [
          {
            "source": "profile_germ",
            "section": "Personality and temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "rest-after-play",
        "text": "After an active game, offer a quiet place beside you for petting if your cat seeks it.",
        "citations": [
          {
            "source": "profile_germ",
            "section": "Personality and temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "gentle-brush",
        "text": "Keep weekly grooming light and gentle to suit the fine, wavy coat.",
        "citations": [
          {
            "source": "profile_germ",
            "section": "Care"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "family-turns",
        "text": "Let children take turns with a wand toy under supervision, keeping hands out of the chase.",
        "citations": [
          {
            "source": "profile_germ",
            "section": "Personality and temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "child_friendly"
        ]
      }
    ]
  },
  "ycho": {
    "name": "York Chocolate",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "farm-founder",
        "text": "The York Chocolate line began on Janet Chiefari's New York goat farm in 1983 with a kitten called Brownie.",
        "citations": [
          {
            "source": "profile_ycho",
            "section": "History and background"
          }
        ],
        "category": "history"
      },
      {
        "id": "state-name",
        "text": "The name combines the chocolate coat colour with the breed's home state of New York.",
        "citations": [
          {
            "source": "profile_ycho",
            "section": "History and background"
          }
        ],
        "category": "naming"
      },
      {
        "id": "coat-colours",
        "text": "The described colours include chocolate, lavender and combinations of the two.",
        "citations": [
          {
            "source": "profile_ycho",
            "section": "Physical characteristics"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "maturing-colour",
        "text": "A kitten's lighter coat can deepen in colour as it matures.",
        "citations": [
          {
            "source": "profile_ycho",
            "section": "Physical characteristics"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "ruff-tail",
        "text": "The semi-long coat is fuller around the neck and upper legs, with a plumed tail.",
        "citations": [
          {
            "source": "profile_ycho",
            "section": "Physical characteristics"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "moving-prey",
        "text": "Move a wand toy like small prey, giving your York Chocolate opportunities to stalk, chase and catch.",
        "citations": [
          {
            "source": "profile_ycho",
            "section": "Personality and temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "play-partner",
        "text": "Join the game yourself rather than relying entirely on toys left out alone.",
        "citations": [
          {
            "source": "profile_ycho",
            "section": "Personality and temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs"
        ]
      },
      {
        "id": "desk-companion",
        "text": "Provide a nearby resting spot while you read or work so your cat can take part without crowding your workspace.",
        "citations": [
          {
            "source": "profile_ycho",
            "section": "Personality and temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "greeting-time",
        "text": "Leave a little time for a calm greeting when you come home and let your cat choose the contact.",
        "citations": [
          {
            "source": "profile_ycho",
            "section": "Personality and temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      }
    ],
    "coverageNotes": {
      "bondingTips": "Four distinct relationship activities supported; the source does not provide a detailed coat-care routine."
    }
  },
  "cspa": {
    "name": "California Spangled",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "casey-project",
        "text": "Paul Casey developed the California Spangled with the aim of creating a domestic cat with a leopard-like look.",
        "citations": [
          {
            "source": "profile_cspa",
            "section": "History and background"
          }
        ],
        "category": "history"
      },
      {
        "id": "conservation-idea",
        "text": "Casey's project was inspired by a conversation with Louis Leakey about conserving wild cats.",
        "citations": [
          {
            "source": "profile_cspa",
            "section": "History and background"
          }
        ],
        "category": "history"
      },
      {
        "id": "catalogue-launch",
        "text": "The breed was introduced to a wide audience in the 1986 Neiman Marcus Christmas catalogue.",
        "citations": [
          {
            "source": "profile_cspa",
            "section": "History and background"
          }
        ],
        "category": "history"
      },
      {
        "id": "block-spots",
        "text": "Its contrasting spots can have a block-like shape.",
        "citations": [
          {
            "source": "profile_cspa",
            "section": "Physical characteristics"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "long-body",
        "text": "A long, cylindrical body contributes to the breed's stalking silhouette.",
        "citations": [
          {
            "source": "profile_cspa",
            "section": "Physical characteristics"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "stalking-game",
        "text": "Let a toy disappear behind a box and reappear, giving your Spangled cat a chance to stalk it.",
        "citations": [
          {
            "source": "profile_cspa",
            "section": "Personality and temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "safe-height",
        "text": "Offer a stable climbing route with clear landing space for a cat that enjoys jumping.",
        "citations": [
          {
            "source": "profile_cspa",
            "section": "Personality and temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "reward-task",
        "text": "Try a small reward-based puzzle together to channel curiosity into a shared task.",
        "citations": [
          {
            "source": "profile_cspa",
            "section": "Personality and temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "attention-choice",
        "text": "Offer attention between games and follow your cat's signals about when to continue.",
        "citations": [
          {
            "source": "profile_cspa",
            "section": "Personality and temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      }
    ],
    "coverageNotes": {
      "bondingTips": "Four distinct activities supported by the profile; no additional breed-specific care claim added."
    }
  },
  "fold": {
    "name": "Foldex",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "other-name",
        "text": "Foldex is also known as the Exotic Fold.",
        "citations": [
          {
            "source": "profile_fold",
            "section": "Breed overview"
          }
        ],
        "category": "naming"
      },
      {
        "id": "parent-lines",
        "text": "The breed was developed using Scottish Fold and Exotic Shorthair cats.",
        "citations": [
          {
            "source": "profile_fold",
            "section": "Breed overview"
          }
        ],
        "category": "history"
      },
      {
        "id": "quebec-show",
        "text": "Foldex cats were presented at a Quebec cat show in 1995.",
        "citations": [
          {
            "source": "profile_fold",
            "section": "Breed overview"
          }
        ],
        "category": "history"
      },
      {
        "id": "rounded-look",
        "text": "Wide eyes and folded ears contribute to the breed's rounded appearance.",
        "citations": [
          {
            "source": "profile_fold",
            "section": "Breed overview"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "short-coat",
        "text": "The profile describes a short coat that still benefits from regular combing.",
        "citations": [
          {
            "source": "profile_fold",
            "section": "Grooming"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "low-chase",
        "text": "Offer a gentle floor-level toy game and let your cat set the pace and duration.",
        "citations": [
          {
            "source": "profile_fold",
            "section": "Exercise"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "reward-name",
        "text": "Pair your cat's name with a small reward to practise a useful, low-pressure recall.",
        "citations": [
          {
            "source": "profile_fold",
            "section": "Training"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "calm-company",
        "text": "Make time for calm company, letting your Foldex approach for attention.",
        "citations": [
          {
            "source": "profile_fold",
            "section": "Temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "soft-combing",
        "text": "Introduce short combing sessions once or twice a week, pausing if your cat becomes uncomfortable.",
        "citations": [
          {
            "source": "profile_fold",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ],
    "coverageNotes": {
      "bondingTips": "Four distinct activities retained; avoided jumping demands and the source's unsafe claims about tolerating rough handling."
    }
  },
  "ukra": {
    "name": "Ukrainian Levkoy",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "ukrainian-project",
        "text": "Elena Biriukova developed the Ukrainian Levkoy in Ukraine in the early 2000s.",
        "citations": [
          {
            "source": "profile_ukra",
            "section": "Little-known facts"
          }
        ],
        "category": "history"
      },
      {
        "id": "parent-breeds",
        "text": "Donskoy and Scottish Fold lines contributed the hairless and folded-ear traits.",
        "citations": [
          {
            "source": "profile_ukra",
            "section": "Breed overview"
          }
        ],
        "category": "history"
      },
      {
        "id": "plant-name",
        "text": "The Levkoy name refers to a plant whose folded leaves suggested the shape of the ears.",
        "citations": [
          {
            "source": "profile_ukra",
            "section": "Little-known facts"
          }
        ],
        "category": "naming"
      },
      {
        "id": "ear-variation",
        "text": "Some Ukrainian Levkoys have straight ears rather than folded ears.",
        "citations": [
          {
            "source": "profile_ukra",
            "section": "Little-known facts"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "skin-care",
        "text": "The nearly bare skin needs attention even though there is little coat to brush.",
        "citations": [
          {
            "source": "profile_ukra",
            "section": "Grooming"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "learning-together",
        "text": "Use short, positive-reinforcement lessons as a shared mental activity.",
        "citations": [
          {
            "source": "profile_ukra",
            "section": "Training"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "puzzle-company",
        "text": "Offer a food puzzle alongside your company, starting with an easy challenge.",
        "citations": [
          {
            "source": "profile_ukra",
            "section": "Exercise"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "safe-exploration",
        "text": "Set up a stable indoor exploration route and remove fragile objects before inviting a game.",
        "citations": [
          {
            "source": "profile_ukra",
            "section": "Temperament and exercise"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "company-routine",
        "text": "Plan dependable time together rather than expecting this social cat to entertain itself all day.",
        "citations": [
          {
            "source": "profile_ukra",
            "section": "Family suitability"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs"
        ]
      },
      {
        "id": "skin-cooperation",
        "text": "Reward calm participation in a gentle skin-care routine agreed with your vet; little fur does not mean no grooming.",
        "citations": [
          {
            "source": "profile_ukra",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "skoo": {
    "name": "Skookum",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "parent-breeds",
        "text": "The Skookum originated from a Munchkin and LaPerm cross.",
        "citations": [
          {
            "source": "profile_skoo",
            "section": "General description"
          }
        ],
        "category": "history"
      },
      {
        "id": "two-traits",
        "text": "Its short legs and curly coat come from two separate inherited traits.",
        "citations": [
          {
            "source": "profile_skoo",
            "section": "General description"
          }
        ],
        "category": "classification"
      },
      {
        "id": "coat-lengths",
        "text": "The standard describes both shorthaired and longhaired Skookums.",
        "citations": [
          {
            "source": "profile_skoo",
            "section": "Coat"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "curly-details",
        "text": "Curl can extend to the whiskers, ear furnishings and tail.",
        "citations": [
          {
            "source": "profile_skoo",
            "section": "Coat"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "eye-colour",
        "text": "The standard does not require eye colour to match coat colour.",
        "citations": [
          {
            "source": "profile_skoo",
            "section": "Eyes"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "handling-choice",
        "text": "Introduce gentle handling in brief steps and reward relaxed participation, letting your cat move away.",
        "citations": [
          {
            "source": "profile_skoo",
            "section": "General description"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "accessible-game",
        "text": "Keep a shared toy game within easy reach, adapting the route to your cat's short stature.",
        "citations": [
          {
            "source": "profile_skoo",
            "section": "Legs and general description"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "curl-check",
        "text": "Make checking the curls for tangles a calm routine, adjusting care to the individual coat's length and fullness.",
        "citations": [
          {
            "source": "profile_skoo",
            "section": "Coat"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ],
    "coverageNotes": {
      "bondingTips": "The standard supports handling, accessible activities and coat care; three tips avoid speculative temperament claims."
    }
  },
  "suph": {
    "name": "Suphalak",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "warm-chocolate",
        "text": "The WCF standard calls for a glossy, warm chocolate coat, preferably with a reddish-copper tone.",
        "citations": [
          {
            "source": "profile_suph",
            "section": "Colour"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "no-undercoat",
        "text": "The coat is very short and fine, lies close to the body and has no undercoat.",
        "citations": [
          {
            "source": "profile_suph",
            "section": "Coat"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "eye-range",
        "text": "Eye colour can range from light yellow to rich gold, with a slight green shade also permitted.",
        "citations": [
          {
            "source": "profile_suph",
            "section": "Eyes"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "young-markings",
        "text": "Faint ghost markings are allowed, particularly in young cats or with seasonal coat changes.",
        "citations": [
          {
            "source": "profile_suph",
            "section": "Colour"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "standard-date",
        "text": "WCF published this Suphalak standard in November 2024.",
        "citations": [
          {
            "source": "profile_suph",
            "section": "Standard heading"
          }
        ],
        "category": "classification"
      }
    ],
    "bondingTips": [
      {
        "id": "daily-company",
        "text": "Make time for company during ordinary activities, giving your Suphalak a nearby place to join you.",
        "citations": [
          {
            "source": "suphalakCare",
            "section": "Temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs"
        ]
      },
      {
        "id": "reward-cue",
        "text": "Practise a simple cue with small rewards and patient, short sessions.",
        "citations": [
          {
            "source": "suphalakCare",
            "section": "Training"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "daily-play",
        "text": "Offer a daily interactive chase game and follow your cat's preferred pace.",
        "citations": [
          {
            "source": "suphalakCare",
            "section": "Exercise"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "family-respect",
        "text": "Let family members share gentle play while teaching children to leave a resting cat alone.",
        "citations": [
          {
            "source": "suphalakCare",
            "section": "Family suitability"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "child_friendly"
        ]
      },
      {
        "id": "light-brushing",
        "text": "Use light brushing a couple of times a week as quiet time together.",
        "citations": [
          {
            "source": "suphalakCare",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ]
  },
  "asia": {
    "name": "Asian Semi-longhair",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "tiffanie-name",
        "text": "The Asian Semi-longhair is called the Tiffanie in GCCF's Asian group.",
        "citations": [
          {
            "source": "profile_asia",
            "section": "Profile"
          }
        ],
        "category": "naming"
      },
      {
        "id": "five-varieties",
        "text": "Tiffanie is one of five varieties in the Asian group, alongside self, smoke, shaded and tabby cats.",
        "citations": [
          {
            "source": "profile_asia",
            "section": "Profile"
          }
        ],
        "category": "classification"
      },
      {
        "id": "silky-coat",
        "text": "The semi-long coat is fine and silky, without a woolly undercoat.",
        "citations": [
          {
            "source": "profile_asia",
            "section": "Appearance and colours"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "frills-plume",
        "text": "Longer fur forms fringes along the body and a plume-like tail.",
        "citations": [
          {
            "source": "profile_asia",
            "section": "Appearance and colours"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "burmese-type",
        "text": "The group developed from Burmese and Chinchilla Persian ancestry while retaining Burmese head and body type.",
        "citations": [
          {
            "source": "profile_asia",
            "section": "History"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "comb-company",
        "text": "Make gentle combing regular time together; the Tiffanie coat needs more attention than its shorthaired relatives.",
        "citations": [
          {
            "source": "profile_asia",
            "section": "Care"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "investigate-box",
        "text": "Offer a new open box or simple puzzle to investigate with you.",
        "citations": [
          {
            "source": "profile_asia",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "conversation",
        "text": "Answer a chatty greeting softly and pause for your cat's response.",
        "citations": [
          {
            "source": "profile_asia",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "vocalisation"
        ]
      },
      {
        "id": "family-time",
        "text": "Keep dependable time for play and company in your daily routine.",
        "citations": [
          {
            "source": "profile_asia",
            "section": "Care"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs"
        ]
      },
      {
        "id": "active-play",
        "text": "Invite a lively toy game and let your cat decide when to finish.",
        "citations": [
          {
            "source": "profile_asia",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      }
    ]
  },
  "brit": {
    "name": "British Tipped",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "colour-variety",
        "text": "Tipped is a colour variety within the British Shorthair standard.",
        "citations": [
          {
            "source": "profile_brit",
            "section": "British Shorthair: tipped group"
          }
        ],
        "category": "classification"
      },
      {
        "id": "hair-tips",
        "text": "In silver tipped cats, colour is concentrated at the hair tips above a very pale silver undercoat.",
        "citations": [
          {
            "source": "profile_brit",
            "section": "British Shorthair: tipped group"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "sparkling-effect",
        "text": "Evenly distributed tipping gives the coat its sparkling effect.",
        "citations": [
          {
            "source": "profile_brit",
            "section": "British Shorthair: tipped group"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "pale-underside",
        "text": "The silver tipped standard calls for no tipping on the chin, chest, stomach or underside of the tail.",
        "citations": [
          {
            "source": "profile_brit",
            "section": "British Shorthair: tipped group"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "nearby-rest",
        "text": "Offer a comfortable place beside you; a British-type cat may enjoy company without wanting to be carried.",
        "citations": [
          {
            "source": "profile_bsho",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "short-game",
        "text": "Try a short toy game on the floor and follow your cat's own energy level.",
        "citations": [
          {
            "source": "profile_bsho",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "coat-ritual",
        "text": "Keep gentle coat care a predictable routine, rewarding relaxed participation.",
        "citations": [
          {
            "source": "profile_bsho",
            "section": "Grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ],
    "coverageNotes": {
      "facts": "Four distinct details about the variety; no separate temperament inferred from tipping.",
      "bondingTips": "Three related-breed activities; coat colour does not establish a different personality."
    },
    "evidenceBasis": "related-breed"
  },
  "exlh": {
    "name": "Exotic Longhair",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "exotic-longhair",
        "text": "CFA explicitly provides for longhaired Exotics in its show-class information.",
        "citations": [
          {
            "source": "profile_exlh",
            "section": "Exotic colour class numbers"
          }
        ],
        "category": "classification"
      },
      {
        "id": "persian-classes",
        "text": "Longhaired Exotics meeting Persian colour descriptions may compete in Persian colour classes, with separate Exotic scoring.",
        "citations": [
          {
            "source": "profile_exlh",
            "section": "Exotic colour class numbers"
          }
        ],
        "category": "classification"
      },
      {
        "id": "persian-outcross",
        "text": "Persian is the permitted outcross breed listed in CFA's Exotic standard.",
        "citations": [
          {
            "source": "profile_exlh",
            "section": "Exotic allowable outcross breeds"
          }
        ],
        "category": "history"
      },
      {
        "id": "rounded-type",
        "text": "The Exotic type emphasises substantial bone, a round head and large, widely spaced round eyes.",
        "citations": [
          {
            "source": "profile_exlh",
            "section": "Standard: general"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "quiet-companion",
        "text": "Invite your cat to settle near you for calm company and let them request touch.",
        "citations": [
          {
            "source": "profile_exlh",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "soft-play",
        "text": "Offer a gentle moving-toy game, pausing when your cat loses interest.",
        "citations": [
          {
            "source": "profile_exlh",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "watch-signals",
        "text": "Notice small invitations such as eye contact or moving closer rather than waiting for a loud demand.",
        "citations": [
          {
            "source": "profile_exlh",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "long-coat-care",
        "text": "Build gentle daily grooming into your time together to keep the long coat free of tangles.",
        "citations": [
          {
            "source": "coatLengthCare",
            "section": "Long-haired or short-haired cats"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ],
    "coverageNotes": {
      "facts": "Four classification and type facts; no unsupported separate history added for the longhair label.",
      "bondingTips": "Three Exotic-profile activities plus coat-appropriate care; no distinct longhair personality inferred."
    },
    "evidenceBasis": "related-breed"
  },
  "napo": {
    "name": "Napoleon Longhair",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "former-name",
        "text": "TICA renamed the Napoleon to Minuet in 2015.",
        "citations": [
          {
            "source": "profile_napo",
            "section": "History"
          }
        ],
        "category": "naming"
      },
      {
        "id": "longhair-variety",
        "text": "The Minuet comes in both longhaired and shorthaired varieties.",
        "citations": [
          {
            "source": "profile_napo",
            "section": "Colours and patterns"
          }
        ],
        "category": "classification"
      },
      {
        "id": "family-lines",
        "text": "The breed combines Munchkin and Persian-group ancestry.",
        "citations": [
          {
            "source": "profile_napo",
            "section": "General description"
          }
        ],
        "category": "history"
      },
      {
        "id": "leg-lengths",
        "text": "Minuet lines include both short-legged and long-legged cats.",
        "citations": [
          {
            "source": "profile_napo",
            "section": "History"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "daily-comb",
        "text": "Share a gentle daily comb-through to keep the long coat comfortable.",
        "citations": [
          {
            "source": "profile_napo",
            "section": "At a glance"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "hallway-ball",
        "text": "Roll a soft ball along a clear floor route and let your cat choose whether to chase.",
        "citations": [
          {
            "source": "profile_napo",
            "section": "Activity level"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "quiet-lap",
        "text": "After play, offer a comfortable lap or a nearby resting place.",
        "citations": [
          {
            "source": "profile_napo",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      }
    ],
    "coverageNotes": {
      "facts": "Four distinct facts applying to the older longhair label; avoids duplicating the canonical Minuet profile in full.",
      "bondingTips": "Three well-supported activities kept; no assumptions from the API's malformed temperament field."
    },
    "evidenceBasis": "related-breed"
  },
  "sinp": {
    "name": "Singapura Tabby",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "ticked-standard",
        "text": "The Singapura's recognised CFA colour is already a ticked tabby pattern called sepia agouti.",
        "citations": [
          {
            "source": "profile_sinp",
            "section": "Physical attributes"
          }
        ],
        "category": "classification"
      },
      {
        "id": "ivory-ground",
        "text": "Dark brown ticking sits against a warm ivory ground colour.",
        "citations": [
          {
            "source": "profile_sinp",
            "section": "Standard: sepia agouti"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "banded-hairs",
        "text": "Individual hairs have alternating light and dark bands ending in a dark tip.",
        "citations": [
          {
            "source": "profile_sinp",
            "section": "Standard: sepia agouti"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "face-lines",
        "text": "Dark lines beside the nose bridge are among the desired facial markings.",
        "citations": [
          {
            "source": "profile_sinp",
            "section": "Standard: sepia agouti"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "city-name",
        "text": "Singapura is the Malay name for Singapore.",
        "citations": [
          {
            "source": "profile_sinp",
            "section": "History"
          }
        ],
        "category": "naming"
      }
    ],
    "bondingTips": [
      {
        "id": "investigate-together",
        "text": "Offer a small puzzle near you so your curious cat can investigate while sharing your company.",
        "citations": [
          {
            "source": "profile_sinp",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "safe-helper",
        "text": "Give your cat a safe nearby station while you work; this people-oriented breed often wants to join in.",
        "citations": [
          {
            "source": "profile_sinp",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs"
        ]
      },
      {
        "id": "quiet-routine",
        "text": "Introduce changes gradually and preserve a familiar retreat and daily routine.",
        "citations": [
          {
            "source": "profile_sinp",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "adaptability"
        ]
      },
      {
        "id": "play-through-life",
        "text": "Keep offering interactive games in adulthood, adjusting the pace to your individual cat.",
        "citations": [
          {
            "source": "profile_sinp",
            "section": "Personality"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "weekly-comb",
        "text": "Use a gentle weekly comb-through as a quiet bonding ritual.",
        "citations": [
          {
            "source": "profile_sinp",
            "section": "Care"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ],
    "evidenceBasis": "related-breed"
  },
  "eshr": {
    "name": "European Shorthair",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "preservation-aim",
        "text": "The pedigree European developed from an effort to preserve the original Nordic type of shorthaired cat.",
        "citations": [
          {
            "source": "profile_eshr",
            "section": "History"
          }
        ],
        "category": "history"
      },
      {
        "id": "established-breed",
        "text": "FIFe describes an established pedigree breed, with descriptions appearing in cat books from the 1930s.",
        "citations": [
          {
            "source": "profile_eshr",
            "section": "History"
          }
        ],
        "category": "classification"
      },
      {
        "id": "springy-coat",
        "text": "The short coat is glossy, dense and springy in texture.",
        "citations": [
          {
            "source": "profile_eshr",
            "section": "Appearance"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "robust-body",
        "text": "The European has a robust, well-muscled body with a large head and developed cheeks.",
        "citations": [
          {
            "source": "profile_eshr",
            "section": "Appearance"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "tabby-options",
        "text": "Classic, mackerel and spotted tabby patterns are among its recognised varieties.",
        "citations": [
          {
            "source": "profile_eshr",
            "section": "Appearance"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "toy-chase",
        "text": "Offer a toy that darts along the floor to give your European a hunting-style game.",
        "citations": [
          {
            "source": "profile_eshr",
            "section": "Temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "safe-garden",
        "text": "If secure outdoor space is available, share supervised exploration with places to watch and retreat.",
        "citations": [
          {
            "source": "profile_eshr",
            "section": "Temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "curious-task",
        "text": "Try an easy puzzle and let your cat investigate it at their own pace.",
        "citations": [
          {
            "source": "profile_eshr",
            "section": "Temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "family-play",
        "text": "Give children supervised turns with a toy, keeping the game calm and letting your cat leave.",
        "citations": [
          {
            "source": "profile_eshr",
            "section": "Temperament"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "child_friendly"
        ]
      }
    ],
    "coverageNotes": {
      "bondingTips": "Four distinct activities grounded in the profile; no invented grooming frequency or universal pet compatibility."
    }
  },
  "aphr": {
    "name": "Aphrodite Giant",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "cyprus-mountains",
        "text": "The Aphrodite's Giant is a natural breed associated with the mountain regions of Cyprus.",
        "citations": [
          {
            "source": "profile_aphr",
            "section": "General"
          }
        ],
        "category": "history"
      },
      {
        "id": "large-elegant",
        "text": "Its large, muscular body is intended to look long and elegant rather than compact and cobby.",
        "citations": [
          {
            "source": "profile_aphr",
            "section": "Body"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "olive-eyes",
        "text": "The eyes are described as olive-shaped and set at an angle, with all eye colours allowed.",
        "citations": [
          {
            "source": "profile_aphr",
            "section": "Eyes"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "seasonal-coat",
        "text": "The longhaired variety's soft coat has more undercoat in winter and much less in summer.",
        "citations": [
          {
            "source": "profile_aphr",
            "section": "Coat"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "long-triangle",
        "text": "Viewed from the front, the head forms a long triangle with relatively straight cheek lines.",
        "citations": [
          {
            "source": "profile_aphr",
            "section": "Head"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "room-to-play",
        "text": "Give this large cat a clear play route and stable resting spots sized for their body.",
        "citations": [
          {
            "source": "catNeeds",
            "section": "Pillars 1 and 3"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "seasonal-groom",
        "text": "Adjust gentle coat care to your cat's coat length and seasonal fullness, rewarding relaxed participation.",
        "citations": [
          {
            "source": "profile_aphr",
            "section": "Coat"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "contact-choice",
        "text": "Let your cat initiate contact, and pause after a few strokes to check whether they want more.",
        "citations": [
          {
            "source": "catNeeds",
            "section": "Pillar 4"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      }
    ],
    "coverageNotes": {
      "bondingTips": "Three activities based on body/coat needs and general feline guidance; the standard does not establish a detailed breed temperament."
    }
  },
  "kana": {
    "name": "Kanaani",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "athletic-frame",
        "text": "The Kanaani standard describes a slender, muscular body with long legs and oval paws.",
        "citations": [
          {
            "source": "profile_kana",
            "section": "Body"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "green-eyes",
        "text": "Adult eye colour is green, with yellow-green also tolerated.",
        "citations": [
          {
            "source": "profile_kana",
            "section": "Eyes"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "ticked-spots",
        "text": "Ticking softens the spotted or marbled pattern without obscuring it.",
        "citations": [
          {
            "source": "profile_kana",
            "section": "Coat and colour varieties"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "coarse-coat",
        "text": "The short, close coat has little undercoat and a relatively coarse texture.",
        "citations": [
          {
            "source": "profile_kana",
            "section": "Coat"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "closed-parentage",
        "text": "The WCF standard requires cats born after January 2008 to have Kanaani parents.",
        "citations": [
          {
            "source": "profile_kana",
            "section": "Remarks"
          }
        ],
        "category": "classification"
      }
    ],
    "bondingTips": [
      {
        "id": "hunt-game",
        "text": "Offer stalking and chasing play with a toy your cat can catch.",
        "citations": [
          {
            "source": "catNeeds",
            "section": "Pillar 3"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "safe-outlook",
        "text": "Provide a stable lookout and a private retreat so shared time remains a choice.",
        "citations": [
          {
            "source": "catNeeds",
            "section": "Pillar 1"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "adaptability"
        ]
      },
      {
        "id": "individual-touch",
        "text": "Learn this cat's preferred touch; end contact when they move away.",
        "citations": [
          {
            "source": "catNeeds",
            "section": "Pillar 4"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      }
    ],
    "coverageNotes": {
      "bondingTips": "Three general feline activities; a conformation standard cannot establish individual sociability or trainability."
    }
  },
  "raas": {
    "name": "Raas",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "island-names",
        "text": "Raas cats are also called Busok or Madura cats and come from Ra'as Island in East Java, Indonesia.",
        "citations": [
          {
            "source": "profile_raas",
            "section": "Introduction"
          }
        ],
        "category": "naming"
      },
      {
        "id": "coat-colours",
        "text": "The documented population includes blue-grey, black, chocolate and lilac coats.",
        "citations": [
          {
            "source": "profile_raas",
            "section": "Introduction"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "tail-variation",
        "text": "Tail length varies, and some cats have a kink near the tip.",
        "citations": [
          {
            "source": "profile_raas",
            "section": "Introduction and Figure 1"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "wcf-record",
        "text": "A 2026 genetic study records WCF recognition of the Busok in November 2022.",
        "citations": [
          {
            "source": "profile_raas",
            "section": "Introduction"
          }
        ],
        "category": "classification"
      },
      {
        "id": "small-dna-study",
        "text": "The study's three Busok cats carried two maternal DNA types also found in other domestic cats; that small sample cannot establish the whole population's ancestry.",
        "citations": [
          {
            "source": "profile_raas",
            "section": "Abstract"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "patient-approach",
        "text": "Begin with quiet, predictable visits and allow your Raas cat to approach.",
        "citations": [
          {
            "source": "catNeeds",
            "section": "Pillar 4"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "adaptability"
        ]
      },
      {
        "id": "prey-play",
        "text": "Offer a short hunting-style game and let your cat make the final catch.",
        "citations": [
          {
            "source": "catNeeds",
            "section": "Pillar 3"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "preferred-reward",
        "text": "Find whether your individual cat prefers a toy, attention or food as a reward.",
        "citations": [
          {
            "source": "catEnvironment",
            "section": "Individual preferences"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      }
    ],
    "coverageNotes": {
      "bondingTips": "Three general feline activities; the genetic study does not support breed-wide temperament claims."
    },
    "evidenceBasis": "mixed-population"
  },
  "doms": {
    "name": "Domestic Shorthair",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "population-label",
        "text": "Domestic Shorthair describes cats of varied ancestry rather than one recognised pedigree breed.",
        "citations": [
          {
            "source": "profile_doms",
            "section": "Domestic breeds"
          }
        ],
        "category": "classification"
      },
      {
        "id": "short-coat",
        "text": "The label refers to a short coat, not a single body shape or personality.",
        "citations": [
          {
            "source": "profile_doms",
            "section": "Domestic breeds"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "colour-range",
        "text": "Coats can be solid, tabby, tortoiseshell, calico and many other combinations.",
        "citations": [
          {
            "source": "profile_doms",
            "section": "Domestic breeds"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "choose-the-game",
        "text": "Try a toy mouse, a rolling ball and a wand on different days to learn your cat's favourite game.",
        "citations": [
          {
            "source": "catPlay",
            "section": "Play and predatory behaviour"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "reward-target",
        "text": "Teach a nose touch to a target with an immediate reward, increasing the distance gradually.",
        "citations": [
          {
            "source": "catTraining",
            "section": "Targeting"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "weekly-brush",
        "text": "Offer a gentle weekly brush, adjusting during shedding or to your cat's needs.",
        "citations": [
          {
            "source": "catGrooming",
            "section": "Grooming frequency"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "shared-outlook",
        "text": "Place a stable perch near your usual seat so your cat can watch the room with you.",
        "citations": [
          {
            "source": "catEnvironment",
            "section": "Climbing and vertical space"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "adaptability"
        ]
      },
      {
        "id": "let-them-finish",
        "text": "End the interaction when your cat walks away; learning their preferences matters more than the coat label.",
        "citations": [
          {
            "source": "catPlay",
            "section": "Play and social choice"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      }
    ],
    "coverageNotes": {
      "facts": "A diverse coat-length population supports three classification/appearance facts, not five invented breed traits."
    },
    "evidenceBasis": "mixed-population"
  },
  "domm": {
    "name": "Domestic Mediumhair",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "coat-label",
        "text": "Domestic Mediumhair is a coat-length label for cats of varied ancestry.",
        "citations": [
          {
            "source": "profile_domm",
            "section": "Domestic breeds"
          }
        ],
        "category": "classification"
      },
      {
        "id": "middle-length",
        "text": "The coat is longer than a typical domestic shorthair's, without defining a pedigree breed.",
        "citations": [
          {
            "source": "profile_domm",
            "section": "Domestic breeds"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "varied-builds",
        "text": "Mediumhaired domestic cats can have very different colours, body shapes and builds.",
        "citations": [
          {
            "source": "profile_domm",
            "section": "Domestic breeds"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "coat-check",
        "text": "Build gentle coat checks into quiet time and adjust brushing to the actual coat, rather than relying on the mediumhair label.",
        "citations": [
          {
            "source": "catGrooming",
            "section": "Grooming frequency"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "play-test",
        "text": "Test slow stalking play and faster chase games to learn which pace your cat enjoys.",
        "citations": [
          {
            "source": "catPlay",
            "section": "Play and predatory behaviour"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "natural-sit",
        "text": "Reward a sit your cat offers naturally, then practise in brief sessions before adding a cue.",
        "citations": [
          {
            "source": "catTraining",
            "section": "Capturing and putting behaviours on cue"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "private-retreat",
        "text": "Keep a private resting place available near shared space so company and solitude are both possible.",
        "citations": [
          {
            "source": "catEnvironment",
            "section": "Climbing and hiding"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "adaptability"
        ]
      },
      {
        "id": "one-to-one",
        "text": "In a multi-cat home, give this cat individual play time without another cat taking over.",
        "citations": [
          {
            "source": "catPlay",
            "section": "Playing with multiple cats"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "social_needs"
        ]
      }
    ],
    "coverageNotes": {
      "facts": "Three supported population details; coat length does not predict pedigree ancestry or personality."
    },
    "evidenceBasis": "mixed-population"
  },
  "doml": {
    "name": "Domestic Longhair",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "longhair-label",
        "text": "Domestic Longhair describes a longhaired cat of varied ancestry, not one pedigree breed.",
        "citations": [
          {
            "source": "profile_doml",
            "section": "Domestic breeds"
          }
        ],
        "category": "classification"
      },
      {
        "id": "coat-care",
        "text": "The long coat needs regular grooming to stay comfortable.",
        "citations": [
          {
            "source": "profile_doml",
            "section": "Domestic breeds"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "varied-patterns",
        "text": "Longhaired domestic cats occur in a wide range of colours and patterns.",
        "citations": [
          {
            "source": "profile_doml",
            "section": "Domestic breeds"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "daily-coat-time",
        "text": "Make gentle daily brushing a predictable shared ritual, keeping sessions short enough for your cat to remain relaxed.",
        "citations": [
          {
            "source": "catGrooming",
            "section": "Grooming frequency"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "grooming-choice",
        "text": "Try the brush gradually and reward cooperation; your cat's comfort should guide the session.",
        "citations": [
          {
            "source": "catGrooming",
            "section": "Getting a cat used to grooming"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "catch-the-toy",
        "text": "Offer a stalking game with a toy to catch; a long coat does not mean a low-energy cat.",
        "citations": [
          {
            "source": "catPlay",
            "section": "Play and predatory behaviour"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "small-lessons",
        "text": "Practise a simple target touch with immediate rewards and patient repetition.",
        "citations": [
          {
            "source": "catTraining",
            "section": "Targeting"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "own-reward",
        "text": "Notice whether your cat prefers play, a treat or attention as a reward, and use that preference in your time together.",
        "citations": [
          {
            "source": "catEnvironment",
            "section": "Individual preferences"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      }
    ],
    "coverageNotes": {
      "facts": "Three supported details about a coat-length population; no pedigree or temperament inferred from appearance."
    },
    "evidenceBasis": "mixed-population"
  },
  "poly": {
    "name": "Polydactyl",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "trait-not-breed",
        "text": "Polydactyl describes extra toes and can occur across different cat breeds and populations.",
        "citations": [
          {
            "source": "profile_poly",
            "section": "Our cats"
          }
        ],
        "category": "classification"
      },
      {
        "id": "usual-toes",
        "text": "Most cats have five toes on each front paw and four on each back paw; polydactyl cats have extra digits.",
        "citations": [
          {
            "source": "profile_poly",
            "section": "Our cats"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "front-and-back",
        "text": "Extra toes often appear on the front paws, but can also occur on the back paws.",
        "citations": [
          {
            "source": "profile_poly",
            "section": "Our cats"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "snow-white",
        "text": "Hemingway received a white six-toed cat called Snow White from a ship's captain.",
        "citations": [
          {
            "source": "profile_poly",
            "section": "Our cats"
          }
        ],
        "category": "history"
      },
      {
        "id": "museum-tradition",
        "text": "The Hemingway Home continues his tradition of naming its cats after famous people.",
        "citations": [
          {
            "source": "profile_poly",
            "section": "Our cats"
          }
        ],
        "category": "history"
      }
    ],
    "bondingTips": [
      {
        "id": "paw-cooperation",
        "text": "Reward calm paw handling and check every claw, including extra claws that may not wear down naturally.",
        "citations": [
          {
            "source": "polydactylCare",
            "section": "Nail care"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "individual-games",
        "text": "Learn your cat's favourite game; extra toes do not establish a shared personality or play style.",
        "citations": [
          {
            "source": "catPlay",
            "section": "Play preferences"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "name-practice",
        "text": "Pair a chosen name with positive attention and a small reward, keeping practice relaxed.",
        "citations": [
          {
            "source": "profile_poly",
            "section": "Our cats"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      },
      {
        "id": "reward-choice",
        "text": "Use the reward this individual cat prefers, whether that is a toy, food or attention.",
        "citations": [
          {
            "source": "catEnvironment",
            "section": "Individual preferences"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "coat-fit",
        "text": "Choose a grooming routine for the actual coat length; polydactyl cats can have many different coats.",
        "citations": [
          {
            "source": "catGrooming",
            "section": "Grooming frequency"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ],
    "evidenceBasis": "mixed-population"
  },
  "bamb": {
    "name": "Bambino",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "parent-lines",
        "text": "The Bambino combines Sphynx and Munchkin lines.",
        "citations": [
          {
            "source": "profile_bamb",
            "section": "Bambino"
          }
        ],
        "category": "history"
      },
      {
        "id": "short-stature",
        "text": "Its short-legged stature comes from the Munchkin side of that cross.",
        "citations": [
          {
            "source": "profile_bamb",
            "section": "Bambino"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "nearly-bare",
        "text": "The Bambino combines short legs with a nearly hairless coat.",
        "citations": [
          {
            "source": "profile_bamb",
            "section": "Bambino"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "gentle-care",
        "text": "Reward calm participation in skin care, with products and bathing frequency agreed with your vet.",
        "citations": [
          {
            "source": "hairlessCare",
            "section": "Skin care"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "warm-company",
        "text": "Place a cosy bed beside you at floor level so warmth and company are easy to reach.",
        "citations": [
          {
            "source": "profile_bamb",
            "section": "Hairless care and accessible warmth"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "reachable-play",
        "text": "Offer floor-level games and easy access to resting places, adapting to your cat's own mobility.",
        "citations": [
          {
            "source": "profile_bamb",
            "section": "Care for short-legged crosses"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      }
    ],
    "coverageNotes": {
      "facts": "Three basic lineage and appearance details; independent breed documentation is limited.",
      "bondingTips": "Three care-based activities; no personality inferred automatically from either parent breed."
    },
    "evidenceBasis": "related-breed"
  },
  "dwel": {
    "name": "Dwelf",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "three-lines",
        "text": "Dwelf development combines Sphynx, Munchkin and American Curl lines.",
        "citations": [
          {
            "source": "profile_dwel",
            "section": "Dwelf"
          }
        ],
        "category": "history"
      },
      {
        "id": "curled-ears",
        "text": "Backward-curled ears distinguish the Dwelf from the Bambino type.",
        "citations": [
          {
            "source": "profile_dwel",
            "section": "Dwelf and Bambino comparison"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "short-and-bare",
        "text": "The intended appearance combines short legs with a nearly hairless body.",
        "citations": [
          {
            "source": "profile_dwel",
            "section": "Dwelf"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "accessible-nest",
        "text": "Put a comfortable resting nest within easy reach, with no high jump needed to join you.",
        "citations": [
          {
            "source": "profile_dwel",
            "section": "Care for short-legged crosses"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "adaptability"
        ]
      },
      {
        "id": "skin-routine",
        "text": "Build gentle skin-care cooperation with small rewards and a routine tailored by your vet.",
        "citations": [
          {
            "source": "hairlessCare",
            "section": "Skin care"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "cosy-contact",
        "text": "Offer a warm, draught-free spot beside you and let your cat choose whether to make contact.",
        "citations": [
          {
            "source": "hairlessCare",
            "section": "Skin and environmental care"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      }
    ],
    "coverageNotes": {
      "facts": "Three distinct lineage and type details; no unsupported recognition or health guarantees.",
      "bondingTips": "Three practical care activities; the evidence does not establish a separate Dwelf personality."
    },
    "evidenceBasis": "related-breed"
  },
  "elfc": {
    "name": "Elf Cat",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "parent-cross",
        "text": "The Elf Cat combines Sphynx and American Curl lines.",
        "citations": [
          {
            "source": "profile_elfc",
            "section": "Elf cat"
          }
        ],
        "category": "history"
      },
      {
        "id": "ear-direction",
        "text": "Its characteristic ear tips curl backwards.",
        "citations": [
          {
            "source": "profile_elfc",
            "section": "Elf cat"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "bare-type",
        "text": "The Elf type combines curled ears with a nearly hairless body.",
        "citations": [
          {
            "source": "profile_elfc",
            "section": "Elf cat"
          }
        ],
        "category": "appearance"
      }
    ],
    "bondingTips": [
      {
        "id": "care-cooperation",
        "text": "Reward relaxed participation in a vet-guided skin-care routine rather than treating little fur as low maintenance.",
        "citations": [
          {
            "source": "hairlessCare",
            "section": "Skin care"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      },
      {
        "id": "comfortable-company",
        "text": "Offer a cosy place beside you away from cold draughts, allowing your cat to choose contact.",
        "citations": [
          {
            "source": "hairlessCare",
            "section": "Skin and environmental care"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "small-learning",
        "text": "Try a gentle target-touch lesson with immediate rewards, stopping while your cat is comfortable.",
        "citations": [
          {
            "source": "catTraining",
            "section": "Targeting"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "intelligence"
        ]
      }
    ],
    "coverageNotes": {
      "facts": "Three basic, supported type details; independent breed history is sparse.",
      "bondingTips": "Three care and general training activities; parental breed personality is not a guarantee."
    },
    "evidenceBasis": "related-breed"
  },
  "mins": {
    "name": "Minskin",
    "reviewedOn": "2026-11-07",
    "facts": [
      {
        "id": "fur-points",
        "text": "The Minskin has denser fur on the face, ears, legs and tail than on the body.",
        "citations": [
          {
            "source": "profile_mins",
            "section": "Minskin standard: fur-points"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "fine-down",
        "text": "Areas that look bare can carry a very fine covering of down.",
        "citations": [
          {
            "source": "profile_mins",
            "section": "Minskin standard: coat"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "short-stocky",
        "text": "The historical standard describes a small, short-statured cat with a stocky body and rounded head.",
        "citations": [
          {
            "source": "profile_mins",
            "section": "Minskin standard: general"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "variable-whiskers",
        "text": "Whiskers may be full, sparse, broken or absent.",
        "citations": [
          {
            "source": "profile_mins",
            "section": "Minskin standard: coat"
          }
        ],
        "category": "appearance"
      },
      {
        "id": "historical-standard",
        "text": "A proposed Minskin standard appears in TICA's 2007 annual meeting papers; that document alone does not establish current championship recognition.",
        "citations": [
          {
            "source": "profile_mins",
            "section": "Minskin standard heading"
          }
        ],
        "category": "classification"
      }
    ],
    "bondingTips": [
      {
        "id": "gentle-handling",
        "text": "Introduce gentle handling in brief rewarded steps, giving your cat the choice to leave.",
        "citations": [
          {
            "source": "profile_mins",
            "section": "Minskin standard: general"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "affection_level"
        ]
      },
      {
        "id": "low-play-route",
        "text": "Keep a shared game and resting place easily accessible for your individual cat's short stature.",
        "citations": [
          {
            "source": "profile_mins",
            "section": "Minskin standard: general"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "energy_level"
        ]
      },
      {
        "id": "skin-and-fur",
        "text": "Plan skin care around the actual fur coverage with your vet, rewarding calm participation.",
        "citations": [
          {
            "source": "hairlessCare",
            "section": "Skin care"
          }
        ],
        "basis": "editorial",
        "relatedTraits": [
          "grooming"
        ]
      }
    ],
    "coverageNotes": {
      "bondingTips": "Three handling and care activities; historical descriptions do not justify broad current temperament guarantees."
    },
    "evidenceBasis": "related-breed"
  },
};

// These catalogue IDs were researched, but do not yet support a publishable
// 3–5-item profile. Keep the evidence gap explicit instead of adding padding.
// This is internal review metadata; it does not add notices to the detail page.
export const breedContentReviewGaps: Record<string, {
  name: string;
  reviewedOn: string;
  reason: string;
  sources: string[];
}> = {
  burm: {
    name: 'Burmoir', reviewedOn: '2026-11-07',
    reason: 'Could not corroborate this API label independently. Asian/Burmilla documentation does not establish Burmoir as a distinct breed or a safe alias.',
    sources: ['https://www.gccfcats.org/getting-a-cat/choosing/cat-breeds/asian/'],
  },
  cara: {
    name: 'Caracat', reviewedOn: '2026-11-07',
    reason: 'The API gives no generation or verified pedigree. FelineVMA identifies specialist husbandry needs for early wild-domestic hybrids; routine pet bonding tips would be inappropriate without stronger evidence.',
    sources: ['https://catvets.com/resource/2025-hybrid-cats-position-statement/'],
  },
  cypr: {
    name: 'Cyprus', reviewedOn: '2026-11-07',
    reason: 'Archaeology supports an ancient cat–human association on Cyprus, but not a uniform modern breed temperament or an automatic alias to the pedigree Aphrodite. A population-specific profile is still needed.',
    sources: ['https://pubmed.ncbi.nlm.nih.gov/15073370/', 'https://en.woc.center/articles/standards-apl/'],
  },
  gene: {
    name: 'Genetta', reviewedOn: '2026-11-07',
    reason: 'Available accounts describe an experimental project, but an independent standard and substantive care/behaviour evidence could not be corroborated. Parent-breed traits alone are insufficient.',
    sources: ['https://www.munchkincatguide.com/the-munchkin-cat-bengal-mix-the-genetta/'],
  },
  mala: {
    name: 'Malayan', reviewedOn: '2026-11-07',
    reason: 'This label has inconsistent historical and modern usage. A veterinary breed guide uses it as an Asian nickname; a separate profile needs the API identity clarified before assigning facts or temperament.',
    sources: ['https://www.zoetispetcare.com/breed-explorer/breed/asian', 'https://www.gccfcats.org/getting-a-cat/choosing/cat-breeds/asian/'],
  },
  ojos: {
    name: 'Ojos Azules', reviewedOn: '2026-11-07',
    reason: 'Historical TICA documentation supports appearance and classification, but current population and care evidence is too sparse for a complete profile. Do not infer temperament from blue eyes or claim current recognition from an old standard.',
    sources: ['https://tica.org/phocadownload/2001-semi_2001.pdf'],
  },
  pant: {
    name: 'Pantherette', reviewedOn: '2026-11-07',
    reason: 'The API record contains shifted CSV values, no history and a grooming phrase in the temperament field. Independent contemporary lineage and behaviour evidence is insufficient.',
    sources: ['https://www.catbreedexplorer.com/api/breeds?id=pant'],
  },
  safa: {
    name: 'Safari', reviewedOn: '2026-11-07',
    reason: 'The Geoffroy’s cat hybrid label does not establish generation, pedigree or suitability for ordinary pet interactions. Specialist evidence is required before publishing bonding activities.',
    sources: ['https://catvets.com/resource/2025-hybrid-cats-position-statement/'],
  },
};

export function getBreedContent(breedId: string): BreedContentEntry | undefined {
  if (Object.prototype.hasOwnProperty.call(breedContent, breedId)) return breedContent[breedId];
  const canonicalId = Object.prototype.hasOwnProperty.call(breedRatingAliases, breedId)
    ? breedRatingAliases[breedId] : undefined;
  return canonicalId && Object.prototype.hasOwnProperty.call(breedContent, canonicalId)
    ? breedContent[canonicalId] : undefined;
}
