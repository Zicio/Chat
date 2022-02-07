import Request from './Request';
import DOM from './DOM';

export default class Logic {
  constructor(element) {
    this.element = element;
    this.request = new Request();

    this.clickListener();
    this.keyListener();
  }

  clickListener() {
    this.element.addEventListener('click', (e) => this.clickHandler(e));
  }

  clickHandler(e) {
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
    if (response.ok) {
      DOM.showHint(field, null);
      this.request.getWS();
      this.request.firstSendWS('');
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

  keyListener() {
    this.element.addEventListener('submit', (e) => {
      e.preventDefault();
      this.keyHandler();
    });
  }

  keyHandler() {
    // Отправить сообщение
    const field = document.querySelector('.chat__field');
    const obj = {};
    const date = Logic.getDate();
    obj.name = `${document.querySelector('.you').dataset.myName}, ${date.hour}:${date.minute} ${date.day}.${date.month}.${date.year}`;
    obj.text = field.value;
    if (document.activeElement === field) {
      this.request.sendWS(obj);
      field.value = '';
    }
  }

  static getDate() {
    const date = new Date();
    const month = Logic.format(date.getMonth() + 1);
    const day = Logic.format(date.getDate());
    let hour = Logic.format(date.getHours());
    if (hour === 24) {
      hour = 0;
    }
    const minute = Logic.format(date.getMinutes());
    const year = +date.getFullYear().toString().slice(2);
    return {
      month,
      day,
      hour,
      minute,
      year,
    };
  }

  static format(date) {
    if (date < 10) {
      date = `0${date}`;
    }
    return date;
  }
}
