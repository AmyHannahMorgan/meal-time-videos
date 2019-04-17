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
};

getRedditPosts();

function VideoBoxObject(element, postData){
  this.element = element;
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
}
