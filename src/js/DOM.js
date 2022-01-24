export default class DOM {
  constructor(element) {
    this.element = element;
  }

  static showUsers(users) {
    const chatList = document.querySelector('.chat__list');
    let yourId = null;
    if (chatList.childNodes.length > 1) {
      const usersTickets = chatList.getElementsByClassName('user');
      yourId = ([...usersTickets].find((el) => el.firstChild.textContent === 'YOU')).id;
      while (chatList.firstChild) {
        chatList.removeChild(chatList.firstChild);
      }
    }
    for (const user of users) {
      const newUser = `<li class="user" id="${user.id}"><span class="user__name">${user.name}</span></li>`;
      chatList.insertAdjacentHTML('beforeend', newUser);
    }
    if (!yourId) {
      yourId = chatList.lastChild.id;
    }
    const yourTicket = document.getElementById(yourId);
    yourTicket.lastChild.dataset.myName = yourTicket.lastChild.textContent;
    yourTicket.lastChild.textContent = 'YOU';
    yourTicket.lastChild.style.color = 'orange';
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
