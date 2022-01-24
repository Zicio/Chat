export default class DOM {
  constructor(element) {
    this.element = element;
  }

  static showUsers(users) {
    const chatList = document.querySelector('.chat__list');
    if (chatList.firstChild) {
      while (chatList.firstChild) {
        chatList.removeChild(chatList.firstChild);
      }
    }
    for (const user of users) {
      const newUser = `<li class="user" id="${user.id}"><span class="user__name">${user.name}</span></li>`;
      chatList.insertAdjacentHTML('beforeend', newUser);
    }
    const you = chatList.lastChild;
    you.textContent = 'YOU';
    you.style.color = 'orange';
    const popup = document.querySelector('.chat__popup');
    popup.classList.remove('active');
    const chatContainer = document.querySelector('.chat__container');
    chatContainer.classList.add('active');
  }

  static showHint(field, text) {
    const form = field.closest('.popup__form');
    const hint = form.querySelector('.form__hint');
    // При успешном никнейме
    if (!text) {
      hint.classList.remove('active');
    }
    // При первой ошибке валидации
    if (!hint.classList.contains('active')) {
      hint.textContent = text;
      hint.classList.add('active');
    }
    // При изменении текста ошибки
    if (hint.textContent !== text) {
      hint.textContent = text;
    }
  }
}
