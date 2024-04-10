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
  removeMeal(id: string): void;
  removeWorkout(id: string): void;
  loadItems(): void;
  reset(): void;
  setCalorieLimit(newCalorieLimit: number): void;
}

export { ItemInt, TrackerInt };
