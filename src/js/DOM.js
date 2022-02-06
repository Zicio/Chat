export default class DOM {
  constructor(element) {
    this.element = element;
  }

  static showUsers(users) {
    const chatList = document.querySelector('.chat__list');
    let yourId = null;
    if (chatList.childNodes.length) {
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
    yourTicket.lastChild.classList.add('you');
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

  static showMessages(messages) {
    const chatTape = document.querySelector('.chat__tape');
    for (const msg of messages) {
      const newMessage = document.createElement('div');
      newMessage.classList.add('chat__message');
      chatTape.appendChild(newMessage);
      const messageInfo = document.createElement('span');
      messageInfo.classList.add('message__info');
      messageInfo.textContent = msg.name;
      const you = document.querySelector('.you');
      if (msg.name.includes(you.dataset.myName, 0)) {
        newMessage.classList.add('your-message');
        messageInfo.textContent = messageInfo.textContent.replace(you.dataset.myName, 'You');
      }
      const messageText = document.createElement('span');
      messageText.classList.add('message__text');
      messageText.textContent = msg.text;
      newMessage.appendChild(messageInfo);
      newMessage.appendChild(messageText);
    }
  }

  static deleteUserOffline(user) {
    const userEl = document.getElementById(user.id);
    userEl.remove();
  }
}
