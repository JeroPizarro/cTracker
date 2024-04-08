interface ItemInt {
  id: string;
  name: string;
  calories: number;
}

interface TrackerInt {
  calorieLimit: number;
  totalCalories: number;
  meals: ItemInt[];
  workouts: ItemInt[];
  addMeal(meal: ItemInt): void;
  addWorkout(workout: ItemInt): void;
}

export { ItemInt, TrackerInt };
