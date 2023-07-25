// interface HeightWeightValues {
//   height: number
//   weight: number
// }

// const parsedArguments = (args: string[]): HeightWeightValues => {
//   if (args.length < 4) throw new Error("Not enough values")
//   if (args.length > 4) throw new Error("too many values")

//   const height = Number(args[2])
//   const weight = Number(args[3])

//   if (!isNaN(height) && !isNaN(weight)) {
//     return {
//       height,
//       weight,
//     }
//   } else {
//     throw new Error("Provided values are not numbers")
//   }
// }

export const calculateBmi = (height: number, weight: number): string => {
  const heightInMeters = height / 100;
  const bmi = weight / Math.pow(heightInMeters, 2);
  switch (true) {
    case bmi < 18.5:
      return "Underweight (Unhealthy)";
    case bmi > 18.5 && bmi < 22.9:
      return "Normal range (Healthy)";
    case bmi > 23 && bmi < 24.9:
      return "Overweight I (At risk)";
    case bmi > 25 && bmi < 29.9:
      return "Overweight II (Moderately obese)";
    default:
      return "Overweight I (Serverely obese)";
  }
};

// const { height, weight } = parsedArguments(process.argv)

// console.log(calculateBmi(height, weight))
