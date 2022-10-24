class DatePicker {
  monthData = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  #calendarDate = {
    data: '',
    date: 0,
    month: 0,
    year: 0,
  }

  selectedDate = {
    data: '',
    date: 0,
    month: 0,
    year: 0, 
  }

  datePickerEl;
  dateInputEl;
  monthEl;
  monthContentEl;
  monthNextEl;
  monthPrevEl;
  daysEl;
  datesEl;

  constructor () {
    this.initCalendarDate();
    this.initSelectedDate();
    this.assingElement();
    this.setDateInput();
    this.addEvent();
  }

  initSelectedDate() {
    this.selectedDate = { ...this.#calendarDate };
  }

  setDateInput () {
    this.dateInputEl.textContent = this.formatDate(this.selectedDate.data);
    this.dateInputEl.dataset.value = this.selectedDate.data;
  }

  initCalendarDate () {
    const data = new Date();
    const date = data.getDate();
    const month = data.getMonth();
    const year = data.getFullYear();
    this.#calendarDate = {
      data,
      date,
      month,
      year,
    };
  }

  assingElement() {
    this.datePickerEl = document.getElementById("date-picker");
    this.dateInputEl = this.datePickerEl.querySelector("#date-input");
    this.calendarEl = this.datePickerEl.querySelector("#calendar");
    this.monthEl = this.calendarEl.querySelector("#month");
    this.monthContentEl = this.monthEl.querySelector("#content");
    this.monthPrevEl = this.monthEl.querySelector("#prev");
    this.monthNextEl = this.monthEl.querySelector("#next");
    this.daysEl = this.calendarEl.querySelector("#days");
    this.datesEl = this.calendarEl.querySelector("#dates");
  }

  addEvent() {
    this.dateInputEl.addEventListener("click", this.toggleCalendar.bind(this));
    this.monthNextEl.addEventListener("click", this.moveToNextMonth.bind(this));
    this.monthPrevEl.addEventListener("click", this.moveToPrevMonth.bind(this));
    this.datesEl.addEventListener("click", this.onClickSelectDate.bind(this));
  }

  onClickSelectDate (event) {
    const eventTarget = event.target;
    if (eventTarget.dataset.date) {
      this.datesEl.querySelector(".selected")
      ?.classList.remove('selected');
      eventTarget.classList.add('selected');
      this.selectedDate = {
        data: new Date(
          this.#calendarDate.year,
          this.#calendarDate.month,
          eventTarget.dataset.date
          ),
        year: this.#calendarDate.year,
        month: this.#calendarDate.month,
        date: eventTarget.dataset.date
      }
      this.setDateInput();
      this.calendarEl.classList.remove('active');
    }
  }

  formatDate (dateData) {
    let date = dateData.getDate();
    if (date < 10) {
      date = `0${date}`;
    }

    let month = dateData.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }

    let year = dateData.getFullYear();
    return `${year}/${month}/${date}`;
  }

  moveToNextMonth () {
    this.#calendarDate.month += 1;
    if (this.#calendarDate.month > 11) {
      this.#calendarDate.month = 0;
      this.#calendarDate.year += 1;
    }
    this.updateMonth();
    this.updateDates();
  }

  moveToPrevMonth () {
    this.#calendarDate.month -= 1;
    if (this.#calendarDate.month < 0) {
      this.#calendarDate.month = 11;
      this.#calendarDate.year -= 1;
    }
    this.updateMonth();
    this.updateDates();
  }

  toggleCalendar () {
    if (this.calendarEl.classList.contains('active')) {
      this.#calendarDate = {...this.selectedDate};
      }
    this.calendarEl.classList.toggle("active");
    this.updateMonth();
    this.updateDates();
  }

  updateMonth () {
    this.monthContentEl.textContent = `${this.#calendarDate.year} ${this.monthData[this.#calendarDate.month]}`
  }

  updateDates () {
    this.datesEl.innerHTML = '';
    const numberOfDates = new Date(
      this.#calendarDate.year,
      this.#calendarDate.month + 1,
      0
    ).getDate();

    const fragment = new DocumentFragment();

    for (let i = 0; i < numberOfDates; i += 1) {
      const dateEl = document.createElement('div');
      dateEl.classList.add('date');
      dateEl.textContent = i +1 ;
      dateEl.dataset.date = i +1;
      fragment.appendChild(dateEl);
    }
    fragment.firstChild.style.gridColumnStart = new Date(
      this.#calendarDate.year,
      this.#calendarDate.month,
      1
      ).getDay() +1;
    this.datesEl.appendChild(fragment);
    this.colorSat();
    this.colorSun();
    this.markToday();
    this.markSelectedDate();
  }

  markSelectedDate () {
    if (this.selectedDate.year === this.#calendarDate.year &&
      this.selectedDate.month === this.#calendarDate.month) {
        this.datesEl.querySelector(`[data-date='${this.selectedDate.date}']`).classList.add('selected')
      }
  }
  
  markToday () {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const currentYear = currentDate.getFullYear();
    const today = currentDate.getDate();
    if (currentYear === this.#calendarDate.year && currentMonth === this.#calendarDate.month) {
      this.datesEl.querySelector(`[data-date='${today}']`)
      .classList.add('today');
    }
  }

  colorSat() {
    const saturdayEls = this.datesEl.querySelectorAll(
      `.date:nth-child(7n +${7 - new Date(
        this.#calendarDate.year,
        this.#calendarDate.month,
        1
        ).getDay()})`
      )
      for(let i = 0; i < saturdayEls.length; i += 1) {
        saturdayEls[i].style.color = 'blue';
      }
  }

  colorSun() {
    const sundayEls = this.datesEl.querySelectorAll(
      `.date:nth-child(7n + ${7 - new Date(
        this.#calendarDate.year,
        this.#calendarDate.month,
        0
      ).getDay()})`
    )
    for(let i = 0; i < sundayEls.length; i += 1) {
      sundayEls[i].style.color = 'red';
    }
  }

}

new DatePicker();