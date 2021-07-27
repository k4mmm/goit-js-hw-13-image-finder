import './sass/main.scss';
import { Notify } from "notiflix";
import { apiService } from './part/apiService';
import cards from './template/cards.hbs'
import SimpleLightbox from 'simplelightbox';
import {loadingBtn,loadMoreBtn,endImgBtn,hiddenBtn} from './part/loadMore'

var lightbox = new SimpleLightbox('.gallery a');
lightbox.on('show.simplelightbox');
const value = document.getElementById("search-form");
const gallery = document.querySelector('.gallery');
const loadMore = document.querySelector('.load-more')
let totalImg = []
let page = null;
let searchQuery = '';
loadMore.hidden = true;

value.addEventListener('submit', onSubmit);
loadMore.addEventListener('click', onClickLoadMore);


function scroll() {
const { height: cardHeight } = document.querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();
    window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
    });
}

function clearGallery() {
    gallery.innerHTML = "";
}

function createCards(result) {
    gallery.insertAdjacentHTML('beforeend', cards(result))
}

async function renderImg(searchQuery) {
    page = 1;
    loadingBtn()
    await apiService(searchQuery, page).then((r) => {
        if (r.total == 0) {
            Notify.info('Sorry, there are no images matching your search query. Please try again.');
            hiddenBtn()
        } else {
            Notify.success(`Hooray! We found ${r.totalHits} images.`)
            clearGallery();
            createCards(r.hits);
            loadMoreBtn()
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
    lightbox.refresh();
    
}
   
async function onClickLoadMore(e) {
    e.preventDefault()
    loadingBtn()
    page += 1;
    await apiService(searchQuery, page).then((r) => {
        if (totalImg.length >= r.totalHits) {
            Notify.info("We're sorry, but you've reached the end of search results.");
            endImgBtn()
        } else {
            createCards(r.hits);
            totalImg.push(...r.hits)
            lightbox.refresh();
            scroll()
            loadMoreBtn()

        }
    })
}








    













