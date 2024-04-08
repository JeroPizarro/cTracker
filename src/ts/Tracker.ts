import { TrackerInt, ItemInt } from './interfaces';
import Storage from './Storage';
import { Meal, Workout } from './Item.js';

class Tracker implements TrackerInt {
  calorieLimit: number;
  totalCalories: number;
  meals: ItemInt[];
  workouts: ItemInt[];

  constructor() {
    this.calorieLimit = Storage.getCalorieLimit();
    this.totalCalories = Storage.getTotalCalories();
    this.meals = Storage.getMeals();
    this.workouts = Storage.getWorkouts();

    this.#displayCaloriesLimit();
    this.#displayCaloriesTotal();
    this.#displayCaloriesConsumed();
    this.#displayCaloriesBurned();
    this.#displayCaloriesRemainig();
    this.#displayCaloriesProgress();
  }

  //Public Methods

  // loadItems() {
  //   this.#meals.forEach((meal) => this.#displayNewMeal(meal));

  //   this.#workouts.forEach((workout) => this.#displayNewWorkout(workout));
  // }

  addMeal(meal: ItemInt): void {
    this.meals.push(meal);
    this.totalCalories += meal.calories;
    Storage.saveMeal(meal);
    Storage.setTotalCalories(this.totalCalories);
    this.#render();
    this.#displayNewMeal(meal);
  }

  addWorkout(workout: ItemInt): void {
    this.workouts.push(workout);
    this.totalCalories -= workout.calories;
    Storage.saveWorkout(workout);
    Storage.setTotalCalories(this.totalCalories);
    this.#render();
    this.#displayNewWorkout(workout);
  }

  // removeMeal(mealId) {
  //   const index = this.#meals.findIndex((meal) => meal.id === mealId);

  //   if (index !== -1) {
  //     const mealToRemove = this.#meals[index];
  //     this.#totalCalories -= mealToRemove.calories;
  //     Storage.setTotalCalories(this.#totalCalories);
  //     Storage.removeMeal(mealId);
  //     this.#meals.splice(index, 1);
  //     this.#render();
  //   }
  // }

  // removeWorkout(workoutId) {
  //   const index = this.#workouts.findIndex(
  //     (workout) => workout.id === workoutId
  //   );

  //   if (index !== -1) {
  //     const workoutToRemove = this.#workouts[index];
  //     this.#totalCalories += workoutToRemove.calories;
  //     Storage.setTotalCalories(this.#totalCalories);
  //     Storage.removeWorkout(workoutId);
  //     this.#workouts.splice(index, 1);
  //     this.#render();
  //   }
  // }

  // reset() {
  //   this.totalCalories = 0;
  //   this.#meals = [];
  //   this.#workouts = [];
  //   Storage.clearAll();
  //   this.#render();
  // }

  // setCalorieLimit(newCalorieLimit) {
  //   this.calorieLimit = newCalorieLimit;
  //   Storage.setCalorieLimit(newCalorieLimit);
  //   this.#displayCaloriesLimit();
  //   this.#render();
  // }

  //Private Methods
  #render() {
    this.#displayCaloriesTotal();
    this.#displayCaloriesConsumed();
    this.#displayCaloriesBurned();
    this.#displayCaloriesRemainig();
    this.#displayCaloriesProgress();
  }

  #displayCaloriesLimit(): void {
    const calorieLimitEl: HTMLElement =
      document.querySelector('#calories-limit');
    calorieLimitEl.innerHTML = this.calorieLimit.toString();
  }

  #displayCaloriesTotal(): void {
    const totalCaloriesEl: HTMLElement =
      document.querySelector('#calories-total');
    totalCaloriesEl.innerHTML = this.totalCalories.toString();
  }

  #displayCaloriesConsumed(): void {
    const caloriesConsumedEl: HTMLElement =
      document.querySelector('#calories-consumed');

    const calories: number = this.meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );

    caloriesConsumedEl.innerHTML = calories.toString();
  }

  #displayCaloriesBurned(): void {
    const caloriesBuernedEl: HTMLElement =
      document.querySelector('#calories-burned');

    const calories: number = this.workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );

    caloriesBuernedEl.innerHTML = calories.toString();
  }

  //TODO fix remaining calories calculation
  #displayCaloriesRemainig(): void {
    const caloriesRemainigEl: HTMLElement = document.querySelector(
      '#calories-remaining'
    );
    const progressEl: HTMLElement = document.querySelector('#calorie-progress');

    const remaining: number = this.calorieLimit - this.totalCalories;
    caloriesRemainigEl.innerHTML = remaining.toString();

    if (remaining <= 0) {
      caloriesRemainigEl.parentElement.parentElement.classList.remove(
        'bg-light'
      );
      caloriesRemainigEl.parentElement.parentElement.classList.add('bg-danger');
      progressEl.classList.remove('bg-success');
      progressEl.classList.add('bg-danger');
    } else {
      caloriesRemainigEl.parentElement.parentElement.classList.remove(
        'bg-danger'
      );
      caloriesRemainigEl.parentElement.parentElement.classList.add('bg-light');
      progressEl.classList.remove('bg-danger');
      progressEl.classList.add('bg-success');
    }
  }

  #displayCaloriesProgress(): void {
    const progressEl: HTMLElement = document.querySelector('#calorie-progress');
    const percentage: number = (this.totalCalories / this.calorieLimit) * 100;
    const width: number = Math.min(percentage, 100);
    progressEl.style.width = `${width}%`;
  }

  #displayNewMeal(meal: ItemInt): void {
    const mealsEl: HTMLElement = document.querySelector('#meal-items');
    mealsEl.appendChild(this.#createNewCard(meal, 'meal'));
  }

  #displayNewWorkout(workout: ItemInt): void {
    const workoutsEl: HTMLElement = document.querySelector('#workout-items');
    workoutsEl.appendChild(this.#createNewCard(workout, 'workout'));
  }

  #createNewCard(dataEl: ItemInt, type: string): Node {
    const card: HTMLElement = document.createElement('div');
    const cardTemplate: string = `
      <div class="card-body">
        <div class="d-flex align-items-center justify-content-between">
          <h4 class="mx-1">${dataEl.name}</h4>
          <div
            class="fs-1  text-white text-center rounded-2 px-2 px-sm-5 ${
              type === 'meal' ? 'bg-primary' : 'bg-secondary'
            }"
          >
            ${dataEl.calories}
          </div>
          <button class="delete btn btn-danger btn-sm mx-2">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    `;
    card.classList.add('card', 'my-2');
    card.setAttribute('data-id', dataEl.id);
    card.innerHTML = cardTemplate;
    return card;
  }
}

export default Tracker;
