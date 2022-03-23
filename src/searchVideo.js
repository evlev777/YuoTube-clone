let searchLink = "https://www.youtube.com/results?search_query=";
const searchInput = document.querySelector('.search-bar');


const searchVideos = () => {
    if(searchInput.value.length){
        location.href = searchLink + searchInput.value;
    }
}

export {searchVideos};