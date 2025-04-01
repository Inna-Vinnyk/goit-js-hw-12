import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallery = new SimpleLightbox('.gallery a');

export function renderGallary(images, galleryHTML) {
  if (!images || images.length === 0) {
    galleryHTML.innerHTML = ''; // Очищаем галерею, если массив пустой
    return; // Выходим из функции, чтобы не продолжать выполнение
  }

  let markup = images
    .map(
      image => `
      <li>
        <a href="${image.largeImageURL}"><img src="${image.webformatURL}" alt="${image.tags}" width="360" height="200" /></a>
        <table class="caption">
          <thead>
            <tr>
              <th>Likes</th>
              <th>Views</th>
              <th>Comments</th>
              <th>Downloads</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>${image.likes}</td>
              <td>${image.views}</td>
              <td>${image.comments}</td>
              <td>${image.downloads}</td>
            </tr>
          </tbody>
        </table>
      </li>`
    )
    .join('');

  galleryHTML.insertAdjacentHTML('beforeend', markup);
  gallery.refresh();
}
