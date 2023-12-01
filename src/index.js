import { fetchBreeds, fetchCatByBreed } from '/cat-api';
import SlimSelect from 'slim-select';
import '../node_modules/slim-select/dist/slimselect.css';

const elements = {
  breedSelect: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  error: document.querySelector('.error'),
  cat: document.querySelector('.cat-info'),
};

let breedSelected = false;

function onSelect(value) {
  elements.cat.innerHTML = '';
  makeCatCard(value);
  breedSelected = true;
}

const slimSelect = new SlimSelect({
  select: '.breed-select',
  settings: {
    placeholderText: 'Select a breed',
  },
});

slimSelect.selectEl.addEventListener('change', event => {
  onSelect(event.target.value);
});

function makeCatCard(breedId) {
  if (!breedSelected) return;
  showLoader();
  return fetchCatByBreed(breedId)
    .then(data => {
      elements.cat.innerHTML = createCatCardMarkup(data);
    })
    .finally(() => {
      hideLoader();
    });
}

function createCatCardMarkup(arr) {
  if (!arr || arr.length === 0) {
    return '<p>No information available for this breed.</p>';
  }
  const { description, name, temperament } = arr[0].breeds[0];

  return `
    <img src="${arr[0].url}" alt="${name}" width="350"/>
    <h1 class="cat-info_name-breed">${name}</h1>
    <p class="cat-info_description">${description}</p>
    <p class="cat-info_name-habbit">${temperament}</p>
  `;
}

function init() {
  showLoader();
  fetchBreeds()
    .then(data => {
      const selectData = data.map(({ id, name }) => ({
        text: name,
        value: id,
      }));
      slimSelect.setData(selectData);
    })
    .finally(() => {
      hideLoader();
    });
}

init();

function showLoader() {
  elements.loader.style.display = 'block';
}

function hideLoader() {
  elements.loader.style.display = 'none';
}
