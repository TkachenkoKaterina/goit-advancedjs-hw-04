import axios from 'axios';
import iziToast from 'izitoast';
import '../node_modules/izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { servicePixabay } from '/api';

const elements = {
  form: document.querySelector('#search-form'),
  btnSearch: document.querySelector('button[type = submit]'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};

elements.form.addEventListener('submit', onSubmit);
elements.btnLoadMore.addEventListener('click', onLoadMore);
elements.btnLoadMore.style.display = 'none';

let page = 1;
const per_page = 40;

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// onLoadMore
async function onLoadMore() {
  page += 1;
  const searchQuery = elements.form.elements.searchQuery.value;

  try {
    const { data } = await servicePixabay(searchQuery, page);
    elements.gallery.insertAdjacentHTML('beforeend', createGallery(data.hits));
    let currentTotalPages = data.totalHits - per_page * (page - 1);

    if (currentTotalPages > per_page) {
      let totalPages = currentTotalPages / per_page;
      iziToast.info({
        title: 'Go-on🤩',
        message: `${Math.ceil(totalPages)} pages left`,
        position: 'topRight',
        timeout: 5000,
        closeOnClick: true,
      });
    } else if (currentTotalPages <= per_page) {
      elements.btnLoadMore.style.display = 'none';
      console.log('This is the last page of Gallery');
      iziToast.warning({
        title: 'Coool 😸',
        message: 'This is the last page of Gallery',
        position: 'topRight',
        timeout: 5000,
        closeOnClick: true,
      });
    }

    gallery.refresh();
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

// onSubmit
async function onSubmit(event) {
  event.preventDefault();
  elements.gallery.innerHTML = '';

  page = 1;
  const formData = new FormData(event.currentTarget);
  const searchQuery = formData.get('searchQuery').trim();

  try {
    const { data } = await servicePixabay(searchQuery, page);

    if (data.totalHits === 0) {
      iziToast.error({
        title: 'Ooooops',
        message:
          'Sorry, there are no images matching your search query. Please try again.',
        position: 'topRight',
        timeout: 5000,
        closeOnClick: true,
      });
    } else if (data.totalHits > per_page) {
      elements.gallery.insertAdjacentHTML(
        'beforeend',
        createGallery(data.hits)
      );

      let totalPages = data.totalHits / per_page;

      iziToast.info({
        title: 'Go-on🤩',
        message: `Hooray! We found ${data.totalHits} images (${Math.ceil(
          totalPages
        )} pages)`,
        position: 'topRight',
        timeout: 5000,
        closeOnClick: true,
      });

      elements.btnLoadMore.style.display = 'block';
    } else if (data.totalHits < per_page) {
      elements.gallery.insertAdjacentHTML(
        'beforeend',
        createGallery(data.hits)
      );

      iziToast.warning({
        title: 'Cool 😸',
        message: 'This is the last page of Gallery',
        position: 'topRight',
        timeout: 5000,
        closeOnClick: true,
      });

      elements.btnLoadMore.style.display = 'none';
    }

    gallery.refresh();
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

// createGallery
function createGallery(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => `<div class="photo-card">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy"/>
        </a>
        <div class="info">
          <p class="info-item">
            <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
        </div>
      </div>
    `
    )
    .join('');
}
