// Example Album
var albumPicasso = {
    title: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'images/album_covers/07.png',
    songs: [
        { title: 'Blue', duration: '4:26' },
        { title: 'Green', duration: '3:14' },
        { title: 'Red', duration: '5:01' },
        { title: 'Pink', duration: '3:21'},
        { title: 'Magenta', duration: '2:15'}
    ]
};

// Another Example Album
var albumMarconi = {
    title: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'images/album_covers/07.png',
    songs: [
        { title: 'Hello, Operator?', duration: '1:01' },
        { title: 'Ring, ring, ring', duration: '5:01' },
        { title: 'Fits in your pocket', duration: '3:21'},
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Wrong phone number', duration: '2:15'}
    ]
};
var albumJake  = {
    title: 'jakey boy',
    artist: 'Jacob',
    label: 'flame records',
    year: '2017',
    albumArtUrl: 'images/album_covers/07.png',
    songs: [
        { title: 'Hello, Hello?', duration: '2:01' },
        { title: 'whats good homie', duration: '5:01' },
        { title: 'excited or what', duration: '4:21'},
        { title: 'Can you hear me now?', duration: '3:14' },
        { title: 'Dance Dance  ', duration: '2:15'}
    ]
};



var createSongRow = function(songNumber, songName, songLength) {
    var template =
       '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'
     ;

    return template;
};
var albumTitle = document.getElementsByClassName('album-view-title')[0];
var albumArtist = document.getElementsByClassName('album-view-artist')[0];
var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0];
var albumImage = document.getElementsByClassName('album-cover-art')[0];
var albumSongList = document.getElementsByClassName('album-view-song-list')[0];


var setCurrentAlbum = function(album) {
     // #1
      albumTitle.firstChild.nodeValue = album.name;
      albumArtist.firstChild.nodeValue = album.artists;
      albumReleaseInfo.firstChild.nodeValue = album.year + '' + album.label;
      albumImage.setAttribute('src', album.albumArtUrl);


   albumSongList.innerHTML = '';

   for(i = 0; i < album.songs.length; i++) {
     albumSongList.innerHTML += createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
   }
};

//checkpoint 26 //

var findParentByClassName = function(element, targetClass) {
  var currentParent = element.parentElement;
  if (element) {
    while (currentParent.className !== targetClass && currentParent.className !== null) {
      currentParent = currentParent.parentElement;
    }
    return currentParent;
  } else if ( currentParent == undefined || currentParent == null ) {
    console.log("No parent found");
  } else if ( currentParent.className !== targetClass || currentParent.parentElement !== targetClass ) {
    console.log("No parent found with that class name");
  }
};

var getSongItem = function(element){
var clickHandler = function(targetElement){
  var songItem = getSongItem(targetElement);

  if (currentlyPlayingSong === null) {
    songItem.inner.HTML = pauseButtonTemplate;
    currentlyPlayingSong = songItem.getAttribute('data-song-number');

  }

  else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')){
    songItem.innerHTML = playButtonTemplate;
    currentlyPLayingSong = null;

  }
  else if (currentlyPLayingSong !== songItem.getAttribute('data-song-number')){
    var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
        currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
    }
}

};
// checkpoint 24 //


var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item');
// album button templates//
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';

var currentlyPlayingSong =null;

 window.onload = function() {
     setCurrentAlbum(albumPicasso);

     songListContainer.addEventListener('mouseover', function(event){
       // #1 //
       if(event.target.parentElement.className ==='album-view-song-item'){

         event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
       };
     });

     for (var i = 0; i < songRows.length; i++) {
       songRows[i].addEventListener('mouseleave', function(event){

      //#1//

      var songItem = getSongItem(event.target);
      var songItemNumber = songItem.getAttribute('data-song-number');

      //#2
      if(songItemNumber !== currentlyPLayingSong) {
        songItem.innerHTML = songItemNumber;
      }
       });
       songRows[i].addEventListener('click', function(event){
         clickHandler(event.target);

       });
     }

     var albums = [albumPicasso, albumMarconi, albumJake];
     var index = 2;

     albumImage.addEventListener("Click", function (event){
setCurrentAlbum(albums[index]);
index++;
if (index == albums.length) {
  index = 0;
}

     });
 };
