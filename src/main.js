import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { searchImage } from './js/pixabay-api';
import { renderGallary } from './js/render-functions';

const refs = {
  form: document.querySelector('.form'),
  gallery: document.querySelector('.gallery'),
  loader: document.querySelector('.loading'),
  moreImgBtn: document.getElementById('moreImgBtn'),
  request: document.querySelector('.form input'),
  submitBtn: document.querySelector('.form button'),
};

refs.form.addEventListener('submit', handleSubmitClick);
let page,
  per_page = 15,
  request;

async function handleSubmitClick(event) {
  event.preventDefault();
  refs.request.setAttribute('readonly', true); //readonly for input
  refs.submitBtn.disabled = true; // disable "Submit" button
  refs.loader.classList.remove('hidden'); // show loader

  page = 1;
  request = refs.request.value.trim();

  try {
    const images = await searchImage(request, page, per_page);
    console.log(images); // Отладочное сообщение

    refs.request.removeAttribute('readonly'); // Restore elements
    refs.submitBtn.disabled = false; //               state
    refs.loader.classList.add('hidden'); // hide loader

    if (!images || !images.urls || images.urls.length === 0) {
      // Проверяем на пустой массив
      refs.gallery.innerHTML = ''; // Очищаем галерею при отсутствии изображений
      refs.moreImgBtn.classList.add('hidden'); // Скрываем кнопку "More"
      return;
    }

    refs.gallery.innerHTML = '';
    refs.request.value = '';

    renderGallary(images.urls, refs.gallery);

    needMoreBtnCheck(images); //   Show/hide "More" button
  } catch (error) {
    console.error('Error fetching images:', error); // Логируем ошибку
    iziToast.error({
      position: 'topRight',
      message: 'An error occurred while fetching images.',
    });

    refs.loader.classList.add('hidden'); // hide loader in case of error
    refs.request.removeAttribute('readonly');
    refs.submitBtn.disabled = false;
  }
}

async function handleMoreClick(event) {
  refs.loader.classList.remove('hidden'); //show loader text

  try {
    const images = await searchImage(request, ++page, per_page);

    if (!images || !images.urls || images.urls.length === 0) {
      // Проверяем на пустой массив
      refs.loader.classList.add('hidden'); // скрываем загрузчик
      return;
    }

    const lastGalleryCard = refs.gallery.lastElementChild; //remember last element before new will add

    renderGallary(images.urls, refs.gallery);

    refs.loader.classList.add('hidden'); // hide loader text

    needMoreBtnCheck(images); //   Show/hide "More" button

    const { top: lastCardPos } = lastGalleryCard.getBoundingClientRect();

    window.scrollBy({ top: lastCardPos - 24, behavior: 'smooth' }); //scroll to top border of the last card
  } catch (error) {
    console.error('Error fetching more images:', error); // Логируем ошибку
    iziToast.error({
      position: 'topRight',
      message: 'An error occurred while fetching more images.',
    });

    refs.loader.classList.add('hidden'); // hide loader in case of error
  }
}

function needMoreBtnCheck(images) {
  if (images.urls.length < per_page || images.total === page * per_page) {
    refs.moreImgBtn.classList.add('hidden'); //hide "More" button
    iziToast.info({
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    refs.moreImgBtn.classList.remove('hidden'); //show "More" button
    refs.moreImgBtn.addEventListener('click', handleMoreClick);
  }
}
