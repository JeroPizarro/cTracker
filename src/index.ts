//Styles
import './styles/main.scss';
import './styles/bootstrap.scss';

//Icons
import '@fortawesome/fontawesome-free/js/all';

//Bootstrap components
import { Modal, Collapse } from 'bootstrap';

import { TrackerInt } from './ts/interfaces';
import { Meal, Workout } from './ts/Item';
import Tracker from './ts/Tracker';

class App {
  #tracker: TrackerInt = null;

  constructor() {
    this.#tracker = new Tracker();
    this.#initEvtListeners();
    //this.#tracker.loadItems();
  }

  #initEvtListeners() {
    document
      .querySelector('#meal-form')
      .addEventListener('submit', this.#newItem.bind(this, 'meal'));
    document
      .querySelector('#workout-form')
      .addEventListener('submit', this.#newItem.bind(this, 'workout'));
    //   document
    //     .querySelector('#meal-items')
    //     .addEventListener('click', this.#clickHandler.bind(this, 'meal'));
    //   document
    //     .querySelector('#workout-items')
    //     .addEventListener('click', this.#clickHandler.bind(this, 'workout'));
    //   document
    //     .querySelector('#filter-meals')
    //     .addEventListener('keyup', this.#filterItems.bind(this, 'meal'));
    //   document
    //     .querySelector('#filter-workouts')
    //     .addEventListener('keyup', this.#filterItems.bind(this, 'workout'));
    //   document
    //     .querySelector('#reset')
    //     .addEventListener('click', this.#reset.bind(this));
    //   document
    //     .querySelector('#limit-form')
    //     .addEventListener('submit', this.#setLimit.bind(this));
  }

  #newItem(type: string, e: Event) {
    e.preventDefault();

    const name: HTMLInputElement = document.querySelector(`#${type}-name`);
    const calories: HTMLInputElement = document.querySelector(
      `#${type}-calories`
    );

    if (name.value === '' || calories.value === '') {
      alert('Please fill all fields');
      return;
    }

    if (type === 'meal') {
      this.#tracker.addMeal(new Meal(name.value, +calories.value));
      this.#toggleEnabledFilter(type);
    } else {
      this.#tracker.addWorkout(new Workout(name.value, +calories.value));
      this.#toggleEnabledFilter(type);
    }

    name.value = '';
    calories.value = '';

    new Collapse(document.querySelector(`#collapse-${type}`), {
      toggle: true,
    });
  }

  #toggleEnabledFilter(type: string): void {
    const filter: HTMLInputElement = document.querySelector(`#filter-${type}s`);
    filter.toggleAttribute('disabled');
  }

  // #clickHandler(type, e) {
  //   if (
  //     e.target.classList.contains('delete') ||
  //     e.target.classList.contains('fa-xmark')
  //   ) {
  //     const cardToRemove = e.target.closest('.card');
  //     const id = cardToRemove.dataset.id;

  //     type === 'meal'
  //       ? this.#tracker.removeMeal(id)
  //       : this.#tracker.removeWorkout(id);

  //     cardToRemove.remove();

  //     //Filter validation
  //     if (document.querySelectorAll(`#${type}-items .card`).length === 0) {
  //       this.#toggleEnabledFilter(type);
  //     }
  //   }
  // }

  // #disableAllFilters() {
  //   //using Substring matching attribute selectors
  //   const filters = document.querySelectorAll(`input[id^=filter]`);
  //   filters.forEach((filter) => {
  //     filter.value = '';
  //     filter.disabled = true;
  //   });
  // }

  // #filterItems(type, e) {
  //   const text = e.target.value.toLowerCase();
  //   document.querySelectorAll(`#${type}-items .card`).forEach((card) => {
  //     const name =
  //       card.firstElementChild.firstElementChild.textContent.toLowerCase();
  //     if (name.indexOf(text) !== -1) {
  //       card.style.display = 'block';
  //     } else {
  //       card.style.display = 'none';
  //     }
  //   });
  // }

  // #reset() {
  //   this.#tracker.reset();
  //   document.querySelector('#meal-items').innerHTML = '';
  //   document.querySelector('#workout-items').innerHTML = '';
  //   this.#disableAllFilters();
  // }

  // #setLimit(e) {
  //   e.preventDefault();
  //   const limit = document.querySelector('#limit');
  //   if (limit === '') {
  //     alert('Please add a correct value.');
  //     return;
  //   }
  //   this.#tracker.setCalorieLimit(+limit.value);
  //   limit.value = '';

  //   //close modal
  //   Modal.getInstance(document.querySelector('#limit-modal')).hide();
  // }
}

const app = new App();
