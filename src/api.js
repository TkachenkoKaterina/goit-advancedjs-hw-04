import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32131085-77c33ae4af62fbdfe36accafe';

async function servicePixabay(searchQuery, page) {
  return await axios.get(
    `${BASE_URL}?key=${API_KEY}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=20`
  );
}

export { servicePixabay };
