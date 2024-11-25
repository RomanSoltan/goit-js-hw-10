import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector("button[data-start]");
const inputPicker = document.querySelector("#datetime-picker");
const dataDays = document.querySelector("span[data-days]");
const dataHours = document.querySelector("span[data-hours]");
const dataMins = document.querySelector("span[data-minutes]");
const dataSecs = document.querySelector("span[data-seconds]");

startBtn.addEventListener("click", timerStart);
inputPicker.addEventListener("change", choiceDate);

startBtn.disabled = true;

function addLeadingZero(value) {
  return String(value).padStart(2, "0");
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const mins = Math.floor(((ms % day) % hour) / minute);
  const secs = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, mins, secs };
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();

    if(selectedDate <= currentDate) {
      iziToast.error({
        message: "Please choose a date in the future",
        position: "topRight",
        closeOnClick: true,
        progressBar: false,
      });
      startBtn.disabled = true;
    }
    else {
      startBtn.disabled = false;
    }
  },
};

flatpickr("input#datetime-picker", options);

let userSelectedDate = null;
let intervalId;

function timerStart() {

  startBtn.disabled = true;
  inputPicker.disabled = true;

  intervalId = setInterval(() => {
    const currentDate = new Date();
    const timer = userSelectedDate - currentDate;

    if(timer <= 0) {
      clearInterval(intervalId);
      updateTimer(0, 0, 0, 0);
      inputPicker.disabled = false;
      return;
    } 

    const { days, hours, mins, secs } = convertMs(timer);
    updateTimer(days, hours, mins, secs);
  }, 1000);
};

function updateTimer(days, hours, mins, secs) {
  dataDays.textContent = addLeadingZero(days);
  dataHours.textContent = addLeadingZero(hours);
  dataMins.textContent = addLeadingZero(mins);
  dataSecs.textContent = addLeadingZero(secs);
}

function choiceDate(event) {
  userSelectedDate = new Date(event.target.value);
  
  if(userSelectedDate > new Date()) {
    startBtn.disabled = false;
  } else {
    startBtn.disabled = true
  }
};



