const URL = 'https://pixabay.com/api/';
const KEY = '22485348-da19140f48b52c54df68447da';

let page = 1;
export default  async function fetchImg () {
    const text = document.querySelector('#search-form').elements.query.value.trim();
    
    const response = await fetch(`${URL}?image_type=photo&orientation=horizontal&q=${text}&page=${page}&per_page=12&key=${KEY}`);
    const images = await response.json();
    pageIncrement ();
   
    return await images.hits;


}

function pageIncrement () {
  page += 1;
}

export function refreshPageCounter() {
  page = 1;
}