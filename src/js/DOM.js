export default class DOM {
  constructor(element) {
    this.element = element;
  }

  static showUsers(users) {
    const chatList = document.querySelector('.chat__list');
    for (const user of users) {
      const newUser = `<li class="user" id="${user.id}"><span class="user__name">${user.name}</span></li>`;
      chatList.insertAdjacentHTML('beforeend', newUser);
      // if (ticket.status) {
      //   const lastTicketCheck = document.getElementById(ticket.id);
      //   lastTicketCheck.setAttribute('checked', true);
      // }
    }
    const you = chatList.lastChild;
    you.textContent = 'YOU';
    const popup = document.querySelector('.chat__popup');
    popup.classList.add('unactive');
  }
  


  static showPopup(type, response, e) {
    const popUp = document.querySelector('.popup');
    const form = popUp.querySelector('.popup__form');
    const text = popUp.querySelector('.popup__text');
    const activeEl = popUp.querySelector('.active');
    for (const field of form.elements) {
      field.value = null;
    }
    if (activeEl) {
      activeEl.classList.remove('active');
    }
    if (type) {
      const titleOfPopUp = popUp.querySelector('.popup__title');
      titleOfPopUp.textContent = type;
    }
    if (type === 'Добавить тикет') {
      form.classList.add('active');
    }
    if (type === 'Удалить тикет') {
      text.classList.add('active');
      const submit = popUp.querySelector('.ok-button');
      const { id } = e.target.closest('.ticket').querySelector('.ticket__check');
      submit.dataset.ticketId = id;
    }
    if (response) {
      form.classList.add('active');
      const shortDescriptionField = form.querySelector('.short-description');
      const detailedDescriptionField = form.querySelector('.detailed-description');
      shortDescriptionField.value = `${response.name}`;
      detailedDescriptionField.value = `${response.description}`;
      const submit = popUp.querySelector('.ok-button');
      const { id } = e.target.closest('.ticket').querySelector('.ticket__check');
      submit.dataset.ticketId = id;
    }
    popUp.classList.toggle('active');
  }

  static showDescription(e, response) {
    const description = document.createElement('p');
    description.classList.add('ticket__description');
    description.textContent = response.description;
    e.target.appendChild(description);
  }
}
