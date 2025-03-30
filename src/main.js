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
let page = 1,
  per_page = 20,
  request = '';

async function handleSubmitClick(event) {
  event.preventDefault();
  refs.request.setAttribute('readonly', true); // Установить readonly для input
  refs.submitBtn.disabled = true; // Отключить кнопку "Submit"
  refs.loader.classList.remove('hidden'); // Показать загрузчик

  request = refs.request.value.trim();

  try {
    const images = await searchImage(request, page, per_page);

    refs.request.removeAttribute('readonly'); // Восстановить элементы
    refs.submitBtn.disabled = false; // Включить кнопку "Submit"
    refs.loader.classList.add('hidden'); // Скрыть загрузчик

    // Проверка на пустой массив
    if (!images || !images.urls || images.urls.length === 0) {
      refs.gallery.innerHTML = ''; // Очищаем галерею
      refs.moreImgBtn.classList.add('hidden'); // Скрываем кнопку "More"
      iziToast.info({
        position: 'topRight',
        message: 'No images found. Please try a different search.',
      });
      return;
    }

    refs.gallery.innerHTML = '';
    refs.request.value = '';
    renderGallary(images.urls, refs.gallery);
    needMoreBtnCheck(images); // Показать/скрыть кнопку "More"
  } catch (error) {
    console.error('Error fetching images:', error);
    refs.request.removeAttribute('readonly'); // Восстановить элементы
    refs.submitBtn.disabled = false; // Включить кнопку "Submit"
    refs.loader.classList.add('hidden'); // Скрыть загрузчик
    iziToast.error({
      position: 'topRight',
      message: 'An error occurred while fetching images. Please try again.',
    });
  }
}

async function handleMoreClick(event) {
  refs.loader.classList.remove('hidden'); // Показать текст загрузки
  try {
    const images = await searchImage(request, ++page, per_page);

    // Проверка на пустой массив
    if (!images || !images.urls || images.urls.length === 0) {
      refs.loader.classList.add('hidden'); // Скрыть текст загрузки
      refs.moreImgBtn.classList.add('hidden'); // Скрыть кнопку "More"
      iziToast.info({
        position: 'topRight',
        message: 'No more images found.',
      });
      return;
    }

    const lastGalleryCard = refs.gallery.lastElementChild; // Запомнить последний элемент перед добавлением новых
    renderGallary(images.urls, refs.gallery);
    refs.loader.classList.add('hidden'); // Скрыть текст загрузки
    needMoreBtnCheck(images); // Показать/скрыть кнопку "More"

    const { top: lastCardPos } = lastGalleryCard.getBoundingClientRect();
    window.scrollBy({ top: lastCardPos - 24, behavior: 'smooth' }); // Прокрутить к верхней границе последней карточки
  } catch (error) {
    console.error('Error fetching more images:', error);
    refs.loader.classList.add('hidden'); // Скрыть текст загрузки
    iziToast.error({
      position: 'topRight',
      message:
        'An error occurred while fetching more images. Please try again.',
    });
  }
}

function needMoreBtnCheck(images) {
  if (
    !images ||
    !images.urls ||
    images.urls.length < per_page ||
    images.total === page * per_page
  ) {
    refs.moreImgBtn.classList.add('hidden'); // Скрыть кнопку "More"
    refs.moreImgBtn.removeEventListener('click', handleMoreClick);
    iziToast.info({
      position: 'topRight',
      message: "We're sorry, but you've reached the end of search results.",
    });
  } else {
    refs.moreImgBtn.classList.remove('hidden'); // Показать кнопку "More"
    refs.moreImgBtn.addEventListener('click', handleMoreClick);
  }
}
