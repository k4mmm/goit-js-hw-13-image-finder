import './sass/main.scss';
import { Notify } from "notiflix";
import { apiService } from './part/apiService';
import cards from './template/cards.hbs'
import * as basicLightbox from 'basiclightbox'


const value = document.getElementById("search-form");
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more')

value.addEventListener('submit', onSubmit);
loadMore.addEventListener('click', onClickLoadMore);

let totalImg = []
let page = null;
let searchQuery = '';
loadMore.hidden = true;

function clearGallery() {
    gallery.innerHTML = "";
}

function createCards(result) {
    gallery.insertAdjacentHTML('beforeend', cards(result))
}

async function renderImg(searchQuery) {
    page = 1;
    await apiService(searchQuery, page).then((r) => {
         Notify.success(`Hooray! We found ${r.totalHits} images.`)
         if (r.total == 0) {
             Notify.info('Sorry, there are no images matching your search query. Please try again.');
             loadMore.hidden = true;
         } else {
            clearGallery();
            createCards(r.hits);
            loadMore.hidden = false;
             totalImg.push(...r.hits)
             
        }
        })
}

async function onSubmit(e) {
   
    e.preventDefault();
    if (searchQuery !== e.currentTarget.elements.searchQuery.value.trim()) {
        searchQuery = e.currentTarget.elements.searchQuery.value.trim()
        await renderImg(searchQuery);
    } else {
        await renderImg(searchQuery);
    }
}
   
async function onClickLoadMore(e) {
    e.preventDefault()
    page += 1;
    await apiService(searchQuery, page).then((r) => {
        if (totalImg.length >= r.totalHits) {
            Notify.info("We're sorry, but you've reached the end of search results.");
            loadMore.hidden = true;
        }
        createCards(r.hits);
        totalImg.push(...r.hits)
        gallery.scrollIntoView({
        behavior: 'smooth',
        block: 'end',
});
    })
}


    
gallery.addEventListener('click', showImg);

function showImg(e) {
  let currentImg = e.target.dataset.src;
  if (e.target.className === 'gallery-img') {
    const instance = basicLightbox.create(`
    <img src=${currentImg} width="800" height="600">
    `);

    instance.show();
  }

  return;
}
            
              




    













