import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formEl = document.querySelector('.form');
formEl.addEventListener('submit', createPromise);

function createPromise(event) {
  event.preventDefault();

  const promiseState = event.target.elements.state.value;
  const delay = event.target.elements.delay.value;

  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (promiseState === 'fulfilled') {
        resolve(delay);
      }
      reject(delay);
    }, delay);
  });

  promise
    .then(delay => {
      iziToast.show({
        message: `✅ Fulfilled promise in ${delay} ms`,
        position: 'topRight',
        backgroundColor: '#59a10d',
        progressBar: false,
        close: false,
        messageColor: '#fff',
      });
    })
    .catch(delay => {
      iziToast.show({
        message: `❌ Rejected promise in ${delay} ms`,
        position: 'topRight',
        backgroundColor: '#ef4040',
        progressBar: false,
        close: false,
        messageColor: '#fff',
      });
    });
  formEl.reset();
}
