import Request from './Request';
import DOM from './DOM';

export default class Logic {
  constructor(element) {
    this.element = element;
    this.request = new Request();

    this.listener();
  }

  listener() {
    this.element.addEventListener('click', (e) => this.eventHandler(e));
  }

  eventHandler(e) {
    // Кнопка "Продолжить"
    if (e.target.classList.contains('form__submit')) {
      this.checkName(e);
    }
  }

  async checkName(e) {
    e.preventDefault();
    const form = e.target.closest('.popup__form');
    const name = new FormData(form).get('name');
    const field = form.querySelector('.form__field');
    if (!field.validity.valid) {
      Logic.createHint(field);
      return;
    }
    const response = await this.request.checkName(name);
    let users;
    if (response.ok) {
      users = await response.json();
      console.log(users);
      DOM.showUsers(users, name);
      DOM.showHint(field, null);
      return;
    }
    const error = await response.text();
    console.log(error);
    DOM.showHint(field, error);
  }

  static createHint(field) {
    if (field.validity.valueMissing) {
      const textOfHint = 'Напишите псевдоним!';
      DOM.showHint(field, textOfHint);
    }
  }
}
