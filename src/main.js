import { searchImage } from './js/pixabay-api';
import { renderGallary } from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

iziToast.settings({
  position: 'topRight',
  iconColor: '#fff',
  messageColor: '#fff',
});

const galleryHTML = document.querySelector('.gallery');
const form = document.querySelector('.form');

form.addEventListener('submit', handleClick);

function handleClick(event) {
  event.preventDefault();
  const request = form.elements.request.value.trim();
  if (request == '') {
    return;
  }
  galleryHTML.innerHTML = '';
  form.elements.request.setAttribute('readonly', true);
  form.elements.button.disabled = true;
  form.lastElementChild.classList.remove('hidden');

  searchImage(request)
    .then(images => {
      // console.log('response', images);
      if (images.length !== 0) {
        form.elements.request.value = '';
        renderGallary(images, galleryHTML);
      } else {
        throw new Error(
          'Sorry, there are no images matching your search query. Please, try again!'
        );
      }
    })
    .catch(error => {
      iziToast.error({
        iconUrl: 'img/error.svg',
        message: error.message,
      });
    })
    .finally(() => {
      form.request.removeAttribute('readonly');
      form.elements.button.disabled = false;
      form.lastElementChild.classList.add('hidden');
    });
}
