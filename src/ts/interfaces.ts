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
}

export { ItemInt, TrackerInt };
