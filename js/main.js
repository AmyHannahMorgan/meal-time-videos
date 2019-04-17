const fiveToSeven = document.getElementById('5to7'),
sevenToTen = document.getElementById('7to10'),
tenToFifthteen = document.getElementById('10to15'),
fifthteenToThirty = document.getElementById('15to30'),
thirtyPlus = document.getElementById('30plus'),
videoBoxTemplate = document.getElementById('videoBoxTemplate');

loadVideos();

function VideoBoxObject(element, postData){
  this.element = element;
}

function loadVideos(){
  console.log('hello world');
  let oReq = new XMLHttpRequest();
  oReq.onload = () => {
    console.log(oReq.responseText);
  }
  oReq.open('GET', 'https://www.reddit.com/r/mealtimevideos/top/.json?t=day');
  oReq.send();
}
