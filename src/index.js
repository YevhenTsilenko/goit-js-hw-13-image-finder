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
}


refs.form.addEventListener('submit', onSearch);
refs.button.addEventListener('click', showMore);

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
            error({
                title: 'Error',
                text: 'try another word',
              });
        }
        renderImages(images);
        btnScrollElem();
        
    } catch (error){
        console.log(error);
    }
}

async function showMore() {
    createImages();
}

function clearImageList() {
    refs.imageList.innerHTML='';
  }

function btnScrollElem() {
    refs.button.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }
