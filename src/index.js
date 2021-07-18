import './sass/main.scss';
import fetchImg from './js/apiService';
import imageTemp from './templates/imageTemp.hbs';

const refs = {
    form : document.querySelector('#search-form'),
    imageList : document.querySelector('.gallery'),
}


   
refs.form.addEventListener('submit', onSearch);

async function onSearch (event) {
    event.preventDefault();
    const text = refs.form.elements.query.value.trim();
    if(!text) {
        return ;
    }

    try {
        const images = await fetchImg(text);
        renderImages(images);
        
    } catch (error){
        console.log(error);
    }

}

function renderImages (images) {
    refs.imageList.insertAdjacentHTML('beforeend', imageTemp(images));
}

async function onScroll ([entrie]) {
     if(!entrie.isIntersecting) {
        return;
    }
    
    try {
        const images = await fetchImg(text);
        renderImages(images);
        
    } catch (error){
        console.log(error);
    }
    
}

const observer = new IntersectionObserver (onScroll, {
    threshold: 0,
});

observer.observe(refs.imageList);