import Notiflix from 'notiflix';
import '../node_modules/notiflix/dist/notiflix-3.2.6.min.css';
import axios from 'axios';
import { servicePixabay } from '/api';

const elements = {
  form: document.querySelector('#search-form'),
  btnSearch: document.querySelector('button[type = submit]'),
  gallery: document.querySelector('.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};

elements.form.addEventListener('submit', onSubmit);
// elements.btnLoadMore.addEventListener('click', onLoadMore);

elements.btnLoadMore.style.display = 'none';

let page = 1;
let currentPage;
const per_page = 40;

async function onSubmit(event) {
  event.preventDefault();
  elements.gallery.innerHTML = '';

  page = 1;
  const formData = new FormData(event.currentTarget);
  const searchQuery = formData.get('searchQuery');
  console.log('searchQuery', searchQuery);

  try {
    const { data } = await servicePixabay(searchQuery, page);
    console.log('data', data);
    elements.gallery.insertAdjacentHTML('beforeend', createGallery(data.hits));

    if (data.totalHits > per_page) {
      elements.btnLoadMore.style.display = 'block';
      let totalPages = data.totalHits / per_page;
      console.log(`Total pages = ${Math.ceil(totalPages)}`);
    } else if (data.totalHits < per_page) {
      elements.btnLoadMore.style.display = 'none';
      console.log('This is the last page of Gallery');
    }
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
}

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

// async function onLoadMore() {
//   const searchQuery = elements.form.elements.searchQuery.value;
//   page += 1;
//   console.log(searchQuery);

//   try {
//     const response = await servicePixabay({ searchQuery });
//     console.log(response);

//     if (response.data.totalHits === 0) {
//       notifyUser(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       return;
//     }

//     elements.gallery.insertAdjacentHTML(
//       'beforeend',
//       renderGallery(response.data.hits)
//     );
//   } catch (error) {
//     console.error('Error loading more data:', error);
//   }
// }
