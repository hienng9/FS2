interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface RatingResult {
  rating: number
  explanation: string
}

// interface HoursTarget {
//   exerciseHours: number[]
//   target: number
// }

// const parseArguments = (args: string[]): HoursTarget => {
//   if (args.length < 4) throw new Error("Not enough values");

//   const target = Number(args[2]);
//   const exerciseHours = args.slice(3).map((n) => Number(n));
//   const existsNaNs = exerciseHours.reduce(
//     (acc, curr) => isNaN(curr) || acc,
//     false
//   );

//   if (!isNaN(target) && !existsNaNs) {
//     return { exerciseHours, target };
//   } else {
//     throw new Error("Provided values are not all numbers");
//   }
// };
export const calculateExercises = (
  exercisesHours: number[],
  target: number
): ExerciseResult => {
  const periodLength = exercisesHours.length
  const trainingDays = exercisesHours.reduce(
    (acc, currentValue) => (currentValue > 0 ? acc + 1 : acc),
    0
  )
  const average =
    exercisesHours.reduce((acc, curr) => acc + curr, 0) / periodLength
  const success = average > target
  const result = average / target
  const rating = (result: number): RatingResult => {
    switch (true) {
      case result >= 1:
        return { rating: 3, explanation: "wonderful. You did great" }
      case result > 0.5 && result < 1:
        return { rating: 2, explanation: "Not too bad but can be better" }
      default:
        return { rating: 1, explanation: "you need to try harder" }
    }
  }
  const showRatingResult = rating(result)
  return {
    periodLength,
    trainingDays,
    success,
    rating: showRatingResult.rating,
    ratingDescription: showRatingResult.explanation,
    target,
    average,
  }
}

// try {
//   const { exerciseHours, target } = parseArguments(process.argv);
//   console.log(calculateExercises(exerciseHours, target));
// } catch (error: unknown) {
//   let errorMessage = "Something is wrong: ";
//   if (error instanceof Error) {
//     errorMessage += error.message;
//   }
//   console.log(errorMessage);
// }
