
import { QuizAnswer, BreedMatch } from '@/types/quiz';
import { Breed } from '@/types/breeds';
import { quizQuestions } from '@/data/quizData';
import { breedRatingAliases, isQuizEligible } from '@/data/breed-ratings';
import { hasBreedImage } from '@/utils/breed-images';

// Helper function to calculate breed matches
export function calculateBreedMatches(answers: QuizAnswer[], breeds: Breed[]): BreedMatch[] {
  if (!answers.length || !breeds.length) {
    return [];
  }

  // A catalogue alias must not occupy two recommendation slots.
  const eligibleBreeds = breeds.filter(hasBreedImage).filter(isQuizEligible);
  const eligibleIds = new Set(eligibleBreeds.map(breed => breed.id));
  const uniqueBreeds = eligibleBreeds.filter(breed => {
    const canonicalId = breedRatingAliases[breed.id];
    return !canonicalId || !eligibleIds.has(canonicalId);
  });

  // Create a scoring map for each breed
  const breedScores = uniqueBreeds.map(breed => {
    let score = 0;
    let maxScore = 0;
    const matchReasons: string[] = [];

    // Score each answer
    answers.forEach(answer => {
      const question = quizQuestions.find(q => q.id === answer.questionId);
      if (!question) return;
      
      const questionWeight = question.weight;
      // Dealbreakers apply a penalty, rather than contributing positive points.
      if (answer.questionId !== 7) maxScore += 5 * questionWeight;
      
      // Scoring logic for different questions
      switch (answer.questionId) {
        case 1: // Activity level/Saturday preference
          if ((answer.answer === "homebody" && breed.energy_level <= 2) ||
              (answer.answer === "moderate" && breed.energy_level === 3) ||
              (answer.answer === "active" && breed.energy_level >= 4) ||
              (answer.answer === "social" && breed.social_needs >= 4)) {
            score += 5 * questionWeight;
            matchReasons.push(`Personality and energy level align perfectly with your lifestyle`);
          } else if ((answer.answer === "homebody" && breed.energy_level === 3) ||
                     (answer.answer === "moderate" && (breed.energy_level === 2 || breed.energy_level === 4)) ||
                     (answer.answer === "active" && breed.energy_level === 3) ||
                     (answer.answer === "social" && breed.social_needs === 3)) {
            score += 3 * questionWeight;
            matchReasons.push(`Lifestyle compatibility is good`);
          } else {
            score += 1 * questionWeight;
          }
          break;

        case 2: // Exercise/Energy
          if ((answer.answer === "low" && breed.energy_level <= 2) ||
              (answer.answer === "moderate-low" && breed.energy_level === 3) ||
              (answer.answer === "moderate-high" && breed.energy_level === 4) ||
              (answer.answer === "high" && breed.energy_level === 5)) {
            score += 5 * questionWeight;
            matchReasons.push(`Energy level is a perfect match for you`);
          } else if ((answer.answer === "low" && breed.energy_level === 3) ||
                     (answer.answer === "moderate-low" && (breed.energy_level === 2 || breed.energy_level === 4)) ||
                     (answer.answer === "moderate-high" && (breed.energy_level === 3 || breed.energy_level === 5)) ||
                     (answer.answer === "high" && breed.energy_level === 4)) {
            score += 3 * questionWeight;
            matchReasons.push(`Activity level is a good fit`);
          } else {
            score += 1 * questionWeight;
          }
          break;

        case 3: { // Chatty companions/vocalization
          // Convert 0-100 slider value to 1-5 scale for matching algorithm
          const rawTalkValue = typeof answer.answer === 'number' ? answer.answer : 50;
          const talkValue = Math.round((rawTalkValue / 100) * 4) + 1; // Maps 0-100 to 1-5
          
          if ((talkValue >= 4 && breed.vocalisation >= 4) ||
              (talkValue === 3 && breed.vocalisation === 3) ||
              (talkValue <= 2 && breed.vocalisation <= 2)) {
            score += 5 * questionWeight;
            matchReasons.push(`Vocalization level perfectly matches your chatty preference`);
          } else if ((talkValue >= 4 && breed.vocalisation === 3) ||
                     (talkValue === 3 && (breed.vocalisation === 2 || breed.vocalisation === 4)) ||
                     (talkValue <= 2 && breed.vocalisation === 3)) {
            score += 3 * questionWeight;
            matchReasons.push(`Vocalization level is a good match`);
          } else {
            score += 1 * questionWeight;
          }
          break;
        }

        case 4: // Cuddle buddy/Affection
          if ((answer.answer === "low" && breed.affection_level <= 2) ||
              (answer.answer === "moderate" && breed.affection_level === 3) ||
              (answer.answer === "high" && breed.affection_level === 4) ||
              (answer.answer === "very-high" && breed.affection_level === 5)) {
            score += 5 * questionWeight;
            matchReasons.push(`Affection level is exactly what you're looking for`);
          } else if ((answer.answer === "low" && breed.affection_level === 3) ||
                     (answer.answer === "moderate" && (breed.affection_level === 2 || breed.affection_level === 4)) ||
                     (answer.answer === "high" && (breed.affection_level === 3 || breed.affection_level === 5)) ||
                     (answer.answer === "very-high" && breed.affection_level === 4)) {
            score += 3 * questionWeight;
            matchReasons.push(`Cuddle compatibility is good`);
          } else {
            score += 1 * questionWeight;
          }
          break;

        case 5: // Living space
          if ((answer.answer === "small" && breed.adaptability >= 4) ||
              (answer.answer === "medium" && breed.adaptability >= 3) ||
              (answer.answer === "large" && true) || // All cats can adapt to large spaces
              (answer.answer === "outdoor" && breed.energy_level >= 4)) {
            score += 5 * questionWeight;
            matchReasons.push(`Well-suited for your living space`);
          } else if (answer.answer === "small" && breed.adaptability === 3) {
            score += 3 * questionWeight;
            matchReasons.push(`Can adapt to your living space with some adjustments`);
          } else {
            score += 1 * questionWeight;
          }
          break;

        case 6: { // Other pets/children
          const homeMembers = Array.isArray(answer.answer) ? answer.answer : [answer.answer];
          const householdScores: number[] = [];
          
          if (homeMembers.includes("dogs")) {
            householdScores.push(breed.dog_friendly);
            if (breed.dog_friendly >= 4) matchReasons.push(`Gets along well with carefully introduced, cat-friendly dogs`);
          }
          
          if (homeMembers.includes("small-pets")) {
            // Energy does not establish whether a cat is safe around small animals.
            matchReasons.push(`Small pets need secure separation from cats`);
          }
          
          if (homeMembers.includes("children")) {
            householdScores.push(breed.child_friendly);
            if (breed.child_friendly >= 4) matchReasons.push(`Suited to children who handle cats gently`);
          }
          
          if (homeMembers.includes("none") && homeMembers.length === 1) {
            householdScores.push(5);
          }
          if (householdScores.length) {
            score += (householdScores.reduce((sum, value) => sum + value, 0) / householdScores.length) * questionWeight;
          } else {
            maxScore -= 5 * questionWeight;
          }
          break;
        }

        case 7: // Deal breakers
          // No adjustment to score here, we'll handle dealbreakers separately
          break;
      }
    });

    // Check for dealbreakers (question 7)
    const dealbreakers = answers.find(a => a.questionId === 7)?.answer as string[] || [];
    let hasDealbreaker = false;
    
    if (dealbreakers.includes("shedding") && breed.shedding_level > 3) {
      hasDealbreaker = true;
    }
    if (dealbreakers.includes("noise") && breed.vocalisation > 3) {
      hasDealbreaker = true;
    }
    if (dealbreakers.includes("energy") && breed.energy_level > 4) {
      hasDealbreaker = true;
    }
    if (dealbreakers.includes("grooming") && breed.grooming > 3) {
      hasDealbreaker = true;
    }
    if (dealbreakers.includes("independence") && breed.social_needs < 3) {
      hasDealbreaker = true;
    }
    if (dealbreakers.includes("clinginess") && breed.affection_level > 4) {
      hasDealbreaker = true;
    }
    
    // Significantly reduce score for dealbreakers
    if (hasDealbreaker) {
      score = score * 0.4;
    }
    
    // Add breed-specific traits as reasons if we don't have enough
    if (matchReasons.length < 2) {
      if (breed.child_friendly >= 4) {
        matchReasons.push(`Great with children and families`);
      }
      if (breed.dog_friendly >= 4) {
        matchReasons.push(`Gets along well with dogs`);
      }
      if (breed.intelligence >= 4) {
        matchReasons.push(`Intelligent and can learn tricks`);
      }
      if (breed.adaptability >= 4) {
        matchReasons.push(`Highly adaptable to different environments`);
      }
      if (breed.grooming <= 2) {
        matchReasons.push(`Low maintenance grooming needs`);
      }
    }

    // Ensure we have at least one reason
    if (matchReasons.length === 0) {
      matchReasons.push(`Has qualities that match your preferences`);
    }

    // Calculate match percentage (0-100)
    if (maxScore === 0) return null;
    const matchPercentage = Math.min(100, Math.max(0, Math.round((score / maxScore) * 100)));
    
    // Create a valid BreedMatch object
    return {
      id: breed.id,
      name: breed.name,
      matchPercentage: matchPercentage,
      imageUrl: breed.image?.url,
      referenceImageId: breed.reference_image_id,
      description: breed.description || `A ${breed.name} cat that matches your lifestyle preferences.`,
      matchReasons: matchReasons.slice(0, 3) // Limit to top 3 reasons
    };
  });

  // Stable ordering makes the same answers repeatable and keeps missing data out.
  return breedScores.filter(match => match !== null).sort(
    (a, b) => b.matchPercentage - a.matchPercentage || a.name.localeCompare(b.name),
  );
}
