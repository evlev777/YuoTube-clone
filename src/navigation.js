
import { api_key, video_http, channel_http } from "./savedHistory";


const videoCardContainerNavigation = document.querySelector('.navigation .video-container');

fetch(video_http + new URLSearchParams({
    key: api_key,
    part: [
        'snippet',
        'statistics'
    ],
    chart: 'mostPopular',
    maxResults: 50,
    regionCode: 'IN'
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
        part: [
            'snippet',
            'statistics'
        ],
        id: video_data.snippet.channelId
    }))
    .then(res => res.json())
    .then(data => {
        video_data.channelThumbnail = data.items[0].snippet.thumbnails.default.url;
        makeVideoCardNavigation(video_data);
    })
}

const makeVideoCardNavigation = (data) => {
    videoCardContainerNavigation.innerHTML += `
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

    videoCardContainerNavigation.querySelectorAll('video').sort((a,b) =>{
        return a.statistics.viewCount - b.statistics.viewCount;
    })
}


