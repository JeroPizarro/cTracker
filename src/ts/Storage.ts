import { Item } from './interfaces';

class Storage {
  static getCalorieLimit(defaultLimit: number = 2000): number {
    let calorieLimit: number;

    if (localStorage.getItem('calorieLimit') === null) {
      calorieLimit = defaultLimit;
    } else {
      calorieLimit = +localStorage.getItem('calorieLimit');
    }

    console.log('test');
    return calorieLimit;
  }

  static setCalorieLimit(calorieLimit: number) {
    localStorage.setItem('calorieLimit', JSON.stringify(calorieLimit));
  }

  static getTotalCalories(defaultLimit: number = 0): number {
    let totalCalories: number;

    if (localStorage.getItem('totalCalories') === null) {
      totalCalories = defaultLimit;
    } else {
      totalCalories = +localStorage.getItem('totalCalories');
    }

    return totalCalories;
  }

  static setTotalCalories(totalCalories: number) {
    localStorage.setItem('totalCalories', JSON.stringify(totalCalories));
  }

  static getMeals(): Item[] {
    let meals: Item[];

    if (localStorage.getItem('meals') === null) {
      meals = [];
    } else {
      meals = JSON.parse(localStorage.getItem('meals'));
    }

    return meals;
  }

  static saveMeal(meal: Item): void {
    const meals: Item[] = Storage.getMeals();
    meals.push(meal);
    localStorage.setItem('meals', JSON.stringify(meals));
  }

  static removeMeal(id: string): void {
    const meals: Item[] = Storage.getMeals();

    meals.forEach((meal, index) => {
      if (meal.id === id) {
        meals.splice(index, 1);
      }
    });

    localStorage.setItem('meals', JSON.stringify(meals));
  }

  static getWorkouts(): Item[] {
    let workouts: Item[];

    if (localStorage.getItem('workouts') === null) {
      workouts = [];
    } else {
      workouts = JSON.parse(localStorage.getItem('workouts'));
    }

    return workouts;
  }

  static saveWorkout(workout: Item): void {
    const workouts: Item[] = Storage.getWorkouts();
    workouts.push(workout);
    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  static removeWorkout(id: string): void {
    const workouts: Item[] = Storage.getWorkouts();

    workouts.forEach((workout, index) => {
      if (workout.id === id) {
        workouts.splice(index, 1);
      }
    });

    localStorage.setItem('workouts', JSON.stringify(workouts));
  }

  static clearAll(): void {
    localStorage.removeItem('totalCalories');
    localStorage.removeItem('meals');
    localStorage.removeItem('workouts');
  }
}

export default Storage;