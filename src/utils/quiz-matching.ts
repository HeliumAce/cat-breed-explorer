
import { QuizAnswer, BreedMatch } from '@/types/quiz';
import { BreedWithImage } from '@/types/breeds';
import { quizQuestions, mockBreedMatches } from '@/data/quizData';

// Helper function to calculate breed matches
export function calculateBreedMatches(answers: QuizAnswer[], breeds: BreedWithImage[]): BreedMatch[] {
  if (!answers.length || !breeds.length) {
    console.log("No answers or breeds to match");
    return mockBreedMatches;
  }

  console.log("Calculating matches with:", { answersCount: answers.length, breedsCount: breeds.length });
  
  // Create a scoring map for each breed
  const breedScores = breeds.map(breed => {
    let score = 0;
    let maxScore = 0;
    const matchReasons: string[] = [];

    // Score each answer
    answers.forEach(answer => {
      const question = quizQuestions.find(q => q.id === answer.questionId);
      if (!question) return;
      
      const questionWeight = question.weight;
      maxScore += 5 * questionWeight; // Maximum score of 5 per question
      
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

        case 3: // Chatty companions/vocalization
          const talkValue = typeof answer.answer === 'number' ? answer.answer : 3;
          
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

        case 6: // Other pets/children
          const homeMembers = Array.isArray(answer.answer) ? answer.answer : [answer.answer];
          
          if (homeMembers.includes("dogs") && breed.dog_friendly >= 4) {
            score += 4 * questionWeight;
            matchReasons.push(`Great with dogs`);
          }
          
          if (homeMembers.includes("small-pets") && breed.energy_level <= 3) {
            score += 3 * questionWeight;
            matchReasons.push(`Generally good with small pets`);
          }
          
          if (homeMembers.includes("children") && breed.child_friendly >= 4) {
            score += 4 * questionWeight;
            matchReasons.push(`Excellent with children`);
          }
          
          if (homeMembers.includes("none")) {
            score += 3 * questionWeight; // All cats can do well as the only pet
          }
          break;

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
    let matchPercentage = Math.round((score / maxScore) * 100);
    
    // Add a small random factor for variety (±5%)
    const randomFactor = Math.floor(Math.random() * 11) - 5;
    matchPercentage = Math.min(100, Math.max(30, matchPercentage + randomFactor));
    
    // Create a valid BreedMatch object
    return {
      id: breed.id,
      name: breed.name,
      matchPercentage: matchPercentage,
      imageUrl: breed.image?.url,
      description: breed.description || `A ${breed.name} cat that matches your lifestyle preferences.`,
      matchReasons: matchReasons.slice(0, 3) // Limit to top 3 reasons
    };
  });

  // Ensure we never return an empty array
  if (breedScores.length === 0) {
    console.log("No breed scores generated, using mock data");
    return mockBreedMatches.map(match => ({
      ...match,
      description: match.description || `The ${match.name} is a wonderful breed.`,
    }));
  }

  // Sort by match percentage (descending)
  const sortedMatches = breedScores.sort((a, b) => b.matchPercentage - a.matchPercentage);
  
  // Log match results for debugging
  console.log(`Generated ${sortedMatches.length} matches. Top match: ${sortedMatches[0]?.name} (${sortedMatches[0]?.matchPercentage}%)`);
  
  return sortedMatches;
}
