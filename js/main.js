const fiveToSeven = document.getElementById('5to7'),
sevenToTen = document.getElementById('7to10'),
tenToFifthteen = document.getElementById('10to15'),
fifthteenToThirty = document.getElementById('15to30'),
thirtyPlus = document.getElementById('30plus'),
videoBoxTemplate = document.getElementById('videoboxtemplate'),
videos = {
  fiveToSeven: [],
  sevenToTen: [],
  tenToFifthteen: [],
  fifthteenToThirty: [],
  thirtyPlus:[]
},
videoBoxes = [];

getRedditPosts();

function VideoBoxObject(element, postData){
  this.element = element;

  this.element.addEventListener('click',  () => {
    window.location.href = postData.url
  });

  this.element.querySelector('.thumbnail').querySelector('img').src = postData.secure_media.oembed.thumbnail_url;

  this.videoInfo = this.element.querySelector('.videoinfo');

  this.videoInfo.querySelector('.videotitle').innerHTML = postData.secure_media.oembed.title

  let perVotePercent = 100 / (postData.ups + postData.downs),
  downPercent = postData.downs * perVotePercent;

  console.log(perVotePercent, downPercent);

  this.ratingBar = this.videoInfo.querySelector('.ratingbar');
  console.log(this.videoInfo);
  console.log(this.ratingBar);
  this.ratingBar.querySelector('.downPercent').style.width = downPercent + '%';
  this.ratingBar.querySelector('.upPercent').style.width = (100 - downPercent) + '%';
}

function getRedditPosts(){
  let oReq = new XMLHttpRequest();
  oReq.onload = () => {
    loadVideos(JSON.parse(oReq.responseText).data.children);
  }
  oReq.open('GET', 'https://www.reddit.com/r/mealtimevideos/top/.json?t=day&limit=50');
  oReq.send();
}

function loadVideos(redditPosts) {
  console.log(redditPosts);
  for(let i = 0; i < redditPosts.length; i++){
    let post = redditPosts[i].data;
    switch (post.link_flair_text) {
      case '5-7 Minutes':
        if(videos.fiveToSeven.length < 3){
          videos.fiveToSeven.push(post);
        }
        break;
      case '7-10 Minutes':
        if(videos.sevenToTen.length < 3){
          videos.sevenToTen.push(post);
        }
        break;
      case '10-15 Minutes':
        if(videos.tenToFifthteen.length < 3){
          videos.tenToFifthteen.push(post);
        }
        break;
      case '15-30 Minutes':
        if(videos.fifthteenToThirty.length < 3){
          videos.fifthteenToThirty.push(post);
        }
        break;
      case '30 Minutes Plus':
        if(videos.thirtyPlus.length < 3){
          videos.thirtyPlus.push(post);
        }
        break;
    }
  }
  console.log(videos);
  createVideoBoxes();
}

function createVideoBoxes(){
  for (let i = 0; i < videos.fiveToSeven.length; i++) {
    let clone = videoBoxTemplate.cloneNode(true)
    clone.id = '';
    let element = fiveToSeven.appendChild(clone);
    videoBoxes.push(new VideoBoxObject(element, videos.fiveToSeven[i]));
  }
}
