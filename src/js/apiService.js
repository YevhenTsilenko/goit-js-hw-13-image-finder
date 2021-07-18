const URL = 'https://pixabay.com/api/';
const KEY = '22485348-da19140f48b52c54df68447da';

export default  async function fetchImg (text) {

    let page = 1;

    const response = await fetch(`${URL}?image_type=photo&orientation=horizontal&q=${text}&page=${page}&per_page=12&key=${KEY}`);
    const images = await response.json();

    pageIncrement ();

    return await images.hits;

    function pageIncrement () {
        page += 1;
    }
}