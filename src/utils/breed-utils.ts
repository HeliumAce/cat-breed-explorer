
import { BreedWithImage } from '@/types/breeds';

// Generate fun facts based on breed characteristics
export function generateFunFacts(breed: BreedWithImage): string[] {
  const facts: string[] = [];
  
  if (breed.intelligence >= 4) {
    facts.push(`${breed.name}s are known for their exceptional intelligence, making them quick learners and problem solvers.`);
  }
  
  if (breed.affection_level >= 4) {
    facts.push(`The ${breed.name} is one of the most affectionate cat breeds, often forming strong bonds with their owners.`);
  }
  
  if (breed.energy_level >= 4) {
    facts.push(`With their high energy levels, ${breed.name}s remain playful well into adulthood.`);
  }
  
  if (breed.dog_friendly >= 4) {
    facts.push(`Unlike many cat breeds, the ${breed.name} tends to get along very well with dogs.`);
  }
  
  if (breed.vocalisation >= 4) {
    facts.push(`${breed.name}s are quite talkative and will often "chat" with their owners throughout the day.`);
  }
  
  if (breed.social_needs >= 4) {
    facts.push(`${breed.name}s thrive on social interaction and don't do well when left alone for long periods.`);
  }
  
  if (breed.grooming >= 4) {
    facts.push(`The ${breed.name}'s coat requires regular grooming to keep it in top condition.`);
  }
  
  if (breed.hypoallergenic === 1) {
    facts.push(`Good news for allergy sufferers: the ${breed.name} is considered hypoallergenic!`);
  }
  
  if (breed.rare === 1) {
    facts.push(`The ${breed.name} is considered a rare breed and may be difficult to find.`);
  }
  
  // Add origin fact
  if (breed.origin) {
    facts.push(`The ${breed.name} originated in ${breed.origin}, where it was ${breed.natural ? 'naturally developed' : 'specifically bred'} for its unique characteristics.`);
  }
  
  // Fill with generic facts if we don't have enough
  const genericFacts = [
    `The ${breed.name}'s average lifespan is ${breed.life_span} years when properly cared for.`,
    `${breed.name}s are recognized by major cat associations worldwide.`,
    `Each ${breed.name} has its own unique personality, despite sharing breed traits.`,
    `${breed.name}s have been beloved companions to humans for many generations.`
  ];
  
  // Add generic facts until we have at least 5
  while (facts.length < 5 && genericFacts.length > 0) {
    facts.push(genericFacts.shift()!);
  }
  
  return facts.slice(0, 5); // Return at most 5 facts
}

// Generate bonding tips based on breed characteristics
export function generateBondingTips(breed: BreedWithImage): string[] {
  const tips: string[] = [];
  
  if (breed.intelligence >= 4) {
    tips.push(`Engage your ${breed.name}'s sharp mind with puzzle toys and training sessions to prevent boredom.`);
  }
  
  if (breed.energy_level >= 4) {
    tips.push(`Schedule regular play sessions with interactive toys to help your energetic ${breed.name} burn off excess energy.`);
  } else if (breed.energy_level <= 2) {
    tips.push(`Your laid-back ${breed.name} will appreciate quiet bonding time - try gentle grooming sessions or reading together.`);
  }
  
  if (breed.affection_level >= 4) {
    tips.push(`Take advantage of your ${breed.name}'s affectionate nature with daily cuddle sessions to strengthen your bond.`);
  }
  
  if (breed.grooming >= 4) {
    tips.push(`Turn grooming into a bonding ritual - most ${breed.name}s learn to enjoy brushing when it's paired with treats and affection.`);
  }
  
  if (breed.social_needs >= 4) {
    tips.push(`Consider adopting a companion for your ${breed.name} if you're away from home frequently, as they crave social interaction.`);
  }
  
  if (breed.child_friendly >= 4) {
    tips.push(`Involve your children in caring for your ${breed.name} with supervised feeding and gentle play to foster a family bond.`);
  }
  
  if (breed.vocalisation >= 4) {
    tips.push(`Respond to your ${breed.name}'s vocalizations to encourage "conversation" - this builds trust and communication.`);
  }
  
  if (breed.stranger_friendly <= 2) {
    tips.push(`Respect your ${breed.name}'s cautious nature around strangers by providing safe hiding spots and never forcing interactions.`);
  }
  
  // Generic tips to fill out if needed
  const genericTips = [
    `Create a consistent daily routine to help your ${breed.name} feel secure and build trust.`,
    `Discover your ${breed.name}'s favorite treats and use them as rewards for positive behavior.`,
    `Set up comfortable viewing perches near windows to entertain your ${breed.name} when you're busy.`,
    `Learn to read your ${breed.name}'s body language to better understand their needs and preferences.`,
    `Respect your ${breed.name}'s boundaries - let them initiate contact sometimes to build a relationship based on mutual trust.`
  ];
  
  // Add generic tips until we have at least 5
  while (tips.length < 5 && genericTips.length > 0) {
    tips.push(genericTips.shift()!);
  }
  
  return tips.slice(0, 5); // Return at most 5 tips
}
