// import axios from 'axios';

// const BASE_URL = 'https://pixabay.com/api';
// const API_KEY = '32131085-77c33ae4af62fbdfe36accafe';

// async function servicePixabay({ searchQuery }) {
//   //   showLoadingSpinner();
//   try {
//     const params = new URLSearchParams({
//       key: API_KEY,
//       q: searchQuery,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       page,
//       per_page: 40,
//     });

//     const response = await axios.get(`${BASE_URL}?${params}`);
//     console.log(response);
//     console.log(response.data);
//     console.log(response.data.hits);

//     if (response.data.totalHits === 0) {
//       console.log(
//         'Sorry, there are no images matching your search query. Please try again.'
//       );
//       return;
//     } else if (response.data.totalHits > 0) {
//       elements.btnLoadMore.style.display = 'block';
//       elements.gallery.insertAdjacentHTML(
//         'beforeend',
//         renderGallery(response.data.hits)
//       );
//     }
//   } catch (error) {
//     console.error('Error fetching data:', error);
//     console.log('Error details:', error.response);
//   } finally {
//     // hideLoadingSpinner();
//     elements.btnSearch.disabled = false;
//   }
// }
// export { servicePixabay };
