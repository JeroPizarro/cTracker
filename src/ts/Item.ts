import { ItemInt } from './interfaces';

class Meal implements ItemInt {
  id: string;
  name: string;
  calories: number;

  constructor(name: string, calories: number) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout implements ItemInt {
  id: string;
  name: string;
  calories: number;

  constructor(name: string, calories: number) {
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

export { Meal, Workout };
