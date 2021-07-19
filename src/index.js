import './sass/main.scss';
import fetchImg from './js/apiService';
import { refreshPageCounter } from './js/apiService';
import imageTemp from './templates/imageTemp.hbs';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
const { error } = require('@pnotify/core');

const refs = {
    form : document.querySelector('#search-form'),
    imageList : document.querySelector('.gallery'),
    button : document.querySelector('[data-action="show-more"]'),
    body : document.body,
}


refs.form.addEventListener('submit', onSearch);
refs.button.addEventListener('click', showMoreImages);

function onSearch (event) {
    event.preventDefault();
    clearImageList();
    refreshPageCounter();
    createImages();
}


function renderImages (images) {
    refs.imageList.insertAdjacentHTML('beforeend', imageTemp(images));
}

async function createImages() {
    const text = refs.form.elements.query.value.trim();
    if(!text) {
        return ;
    }

    try {
        const images = await fetchImg();
        if(images.length === 0) {
            refs.button.classList.add('is-hidden');
            error({
                title: 'Error',
                text: 'Try another word',
              });
        }
        renderImages(images);
        refs.button.classList.remove('is-hidden');

    } catch (error){
        console.log(error);
    }
}

function showMoreImages () {
    createImages();
    setTimeout(buttonScrollElem, 500);
}


function clearImageList() {
    refs.imageList.innerHTML='';
  }

function buttonScrollElem() {
    refs.button.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }
