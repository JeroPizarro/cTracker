interface Item {
  id: string;
  name: string;
  calories: number;
}

interface Tracker {
  calorieLimit: number;
  totalCalories: number;
  meals: Item[];
  workouts: Item[];
}

export { Item, Tracker };
