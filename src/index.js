import {searchVideos} from './searchVideo';
import {api_key,video_http,channel_http} from './savedHistory'
import {saveData} from './data.js';
import './style.css';


const videoCardContainer = document.querySelector('.video-container');


fetch(video_http + new URLSearchParams({
    key: api_key,
    part: 'snippet',
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'BY'
}))
.then(res => res.json())
.then(data => {
    console.log(data)
    data.items.forEach(item => {
        getChannelIcon(item);
    })
})
.catch(err => console.log(err));

const getChannelIcon = (video_data) => {
    fetch(channel_http + new URLSearchParams({
        key: api_key,
        part: 'snippet',
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCard(video_data);
    })
}

const makeVideoCard = (data) => {
    videoCardContainer.innerHTML += `
    <div class="video" onclick="location.href = 'https://youtube.com/watch?v=${data.id}'">
        <img src="${data.snippet.thumbnails.high.url}" class="thumbnail" alt="">
        <div class="content">
            <img src="${data.channelThumbnail}" class="channel-icon" alt="">
            <div class="info">
                <h5 class="title">${data.snippet.title}</h5>
                <p class="channel-name">${data.snippet.channelTitle}</p>
            </div>
        </div>
    </div>
    `;
}



// search bar


const searchBtn = document.querySelector('.search-btn');


searchBtn.addEventListener('click', () => {
    searchVideos()
})


//show/close navbar


const toggleBtn = document.querySelector('.toggle-btn');
const bar = document.querySelector('.side-bar')

toggleBtn.addEventListener('click',() =>{
    bar.classList.toggle('hidden');
})

//saved history 


videoCardContainer.addEventListener('click', (e) =>{
    if(e.target.classList.contain('video')){
        saveData.unsshift(e.target);
    }

})



