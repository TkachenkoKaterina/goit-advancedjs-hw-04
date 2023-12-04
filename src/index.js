import Notiflix from 'notiflix';
import axios from 'axios';

const elements = {
  form: document.querySelector('#search-form'),
  btnSearch: document.querySelector('button[type = submit]'),
  gallery: document.querySelector('.gallery'),
};

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '32131085-77c33ae4af62fbdfe36accafe';

elements.form.addEventListener('submit', onSubmit);

function onSubmit(event) {
  event.preventDefault();
  elements.gallery.innerHTML = '';
  const data = {};
  const formData = new FormData(event.currentTarget);
  formData.forEach((val, key) => {
    data[key] = val;
  });
  servicePixabay(data);
  elements.btnSearch.disabled = true;
}

async function servicePixabay({ searchQuery }) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: searchQuery,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });
  return axios
    .get(`${BASE_URL}?${params}`)
    .then(response => {
      if (response.data.total === 0) {
        console.log(
          'Sorry, there are no images matching your search query. Please try again.'
        );

        return;
      } else if (response.data.total > 0) {
        console.log('More 1');
        console.log(response.data.hits);
        elements.gallery.innerHTML = renderGallery(response.data.hits);
      }
      //   console.log(response.data);
    })
    .catch(error => {
      console.error('Error fetching data:', error);
    })
    .finally(() => {
      elements.btnSearch.disabled = false;
    });
}

function renderGallery(arr) {
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
        <img src="${webformatURL}" alt="${tags}" loading="lazy" />
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
