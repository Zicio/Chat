export default class DOM {
  constructor(element) {
    this.element = element;
  }

  static showTickets(tickets) {
    const ticketBox = document.querySelector('.tickets');
    const ticketsList = ticketBox.getElementsByClassName('ticket');
    if (ticketsList.length) {
      for (const ticket of [...ticketsList]) {
        ticket.remove();
      }
    }
    for (const ticket of tickets) {
      const newTicket = `<div class="ticket"><input type="checkbox" class="ticket__check" id="${ticket.id}"><span class="ticket__name">${ticket.name}</span><span class="ticket__date">${ticket.created}</span><input type="button" class="ticket__change ticket__button" value="&#9998"><input type="button" class="ticket__delete ticket__button" value="X">`;
      ticketBox.insertAdjacentHTML('beforeend', newTicket);
      if (ticket.status) {
        const lastTicketCheck = document.getElementById(ticket.id);
        lastTicketCheck.setAttribute('checked', true);
      }
    }
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
