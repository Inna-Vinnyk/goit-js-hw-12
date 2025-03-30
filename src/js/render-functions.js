import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let gallery = new SimpleLightbox('.gallery a');

export function renderGallary(images, galleryHTML) {
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
  // const imgLd = galleryHTML.querySelectorAll('img');
  // console.log(' renderGallary imgLd:', imgLd);

  // const imgLdP = [...imgLd].map(img => {
  //   return new Promise((resolve, reject) => {
  //     img.onload = () => resolve(img);
  //     if (0) {
  //       reject();
  //     }
  //   });
  // });
  // console.log(' renderGallary imgLdP:', imgLdP);

  // Promise.all(imgLdP).then();

  gallery.refresh();

  //   gallery.on('show.simplelightbox', function () {
  //     // Do something…
  //   });

  // gallery.on('error.simplelightbox', function (e) {
  //   console.log(e); // Some usefull information
  // });
}
