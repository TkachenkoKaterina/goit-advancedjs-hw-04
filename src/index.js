import Notiflix from 'notiflix';
import '../node_modules/notiflix/dist/notiflix-3.2.6.min.css';
import axios from 'axios';

const elements = {
  form: document.querySelector('#search-form'),
  btnSearch: document.querySelector('button[type = submit]'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};

const BASE_URL = 'https://pixabay.com/api';
const API_KEY = '32131085-77c33ae4af62fbdfe36accafe';

elements.btnLoadMore.style.display = 'none';
let page = 1;

elements.form.addEventListener('submit', onSubmit);
elements.btnLoadMore.addEventListener('click', onLoadMore);

async function onLoadMore() {
  const searchQuery = elements.form.elements.searchQuery.value;
  page += 1;
  console.log(searchQuery);

  try {
    const response = await servicePixabay({ searchQuery });
    console.log(response);

    if (response.data.totalHits === 0) {
      notifyUser(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    }

    elements.gallery.insertAdjacentHTML(
      'beforeend',
      renderGallery(response.data.hits)
    );
  } catch (error) {
    console.error('Error loading more data:', error);
  }
}

async function onSubmit(event) {
  event.preventDefault();
  elements.gallery.innerHTML = '';
  const data = {};
  const formData = new FormData(event.currentTarget);
  const searchQuery = formData.get('searchQuery');
  await servicePixabay({ searchQuery });
}

async function servicePixabay({ searchQuery }) {
  try {
    const params = new URLSearchParams({
      key: API_KEY,
      q: searchQuery,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      page,
      per_page: 40,
    });

    const response = await axios.get(`${BASE_URL}?${params}`);
    console.log(response);
    console.log(response.data);
    console.log(response.data.hits);

    if (response.data.totalHits === 0) {
      console.log(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else if (response.data.totalHits > 40) {
      elements.btnLoadMore.style.display = 'block';
      elements.gallery.insertAdjacentHTML(
        'beforeend',
        renderGallery(response.data.hits)
      );
    } else if (response.data.totalHits <= 40) {
      elements.btnLoadMore.style.display = 'none';
      elements.gallery.insertAdjacentHTML(
        'beforeend',
        renderGallery(response.data.hits)
      );
      console.log('This is the last page');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    console.log('Error details:', error.response);
  } finally {
  }
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
        <img src="${webformatURL}" alt="${tags}" loading="lazy" width="150"/>
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
