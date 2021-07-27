const loadMore = document.querySelector('.load-more')


export function hiddenBtn() {
    loadMore.hidden = true;
    loadMore.textContent = "Load more";
}

export function loadMoreBtn() {
    loadMore.hidden = false;
    loadMore.textContent = "Load more";
}
export function endImgBtn() {
    loadMore.hidden = false;
    loadMore.textContent = "End"
    loadMore.disabled = 'true';
}

export function loadingBtn() {
    loadMore.hidden = false;
    loadMore.textContent = "Loading..."
}   