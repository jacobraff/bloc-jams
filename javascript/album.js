var setSong = function(songNumber){
  currentlyPLayingSongNumber = parseInt(songNumber);
  currnetSongFromAlbum = currentAlbum.songs[songNumber - 1];
};

var getSongNumberCell = function(number){
  return $('.song-item-number[data-song-number="' + currentlyPLayingSongNumber +'"]');
};

var createSongRow = function(songNumber, songName, songLength) {
    var template =
       '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'
     ;
     var $row = $(template);

         var clickHandler = function() {
	var songNumber = parseInt($(this).attr('data-song-number'));

	if (currentlyPlayingSongNumber !== null) {

		var currentlyPlayingCell = getSongNumberCell(currentlyPLayingSongNumber);
		currentlyPlayingCell.html(currentlyPlayingSongNumber);

	}
	if (currentlyPlayingSongNumber !== songNumber) {

		$(this).html(pauseButtonTemplate);
		setSong(songNumber);

             updatePlayerBarSong();
	} else if (currentlyPlayingSongNumber === songNumber) {

		$(this).html(playButtonTemplate);
    $('.main-controls .play-pause').html(playerBarPlayButton);
		currentlyPlayingSongNumber = null;
    currentSongFromAlbum = null;
	}
};


       };
    return $row = $(template);
    var onHover = function(event) {
      var songNumberCell = $(this).find('.song-item-number');
      var songNumber = parseInt($(this).attr('data-song-number'));

      if (songNumber !== currentlyPlayingSongNumber) {
        songNumberCell.html(playButtonTemplate);
      }
    };

    var offHover = function(event){};
    var songNumberCell = $(this).find('.song-item-number');
    var songNumber = parseInt($(this).attr('data-song-number'));

    if (songNumber !== currentlyPlayingSongNumber) {
      songNumberCell.html(songNumber);
    }
    console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
  };


    $row.find('.song-item-number').click(clickHandler);
    // #2
    $row.hover(onHover, offHover);
    // #3
    return $row;
};
    var $albumTitle = $('.album-view-title');
     var $albumArtist = $('.album-view-artist');
     var $albumReleaseInfo = $('.album-view-release-info');
     var $albumImage = $('.album-cover-art');
     var $albumSongList = $('.album-view-song-list');


var setCurrentAlbum = function(album) {
  currentAlbum = album;

     // #1
     $albumTitle.text(album.title);
     $albumArtist.text(album.artist);
     $albumReleaseInfo.text(album.year + ' ' + album.label);
     $albumImage.attr('src', album.albumArtUrl);


   $albumSongList.empty();

   for(i = 0; i < album.songs.length; i++) {
     var $newRow = createSongRow(i + 1, album.songs[i].title, album.songs[i].duration);
     $albumSongList.append($newRow);
   }
};
var trackIndex = function(album,song) {
  return album.songs.index.Of(song);
};
var nextSong = function() {
  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);

  currentSongIndex++;
  if (currentSongIndez >= currentAlbum.songs.length) {
    currentSongIndex = 0;
  }



var lastSongNumber = currentlyPlayingSongNumber;

currentlyPlayingSongNumber =  currentSongIndex + 1;
currentSongFromAlbum = currentALbum.songs[currentSongIndex];

    updatePlayerBarSong();

    var $nextSongNumberCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
    var $lastSongNumberCell = $('.song-item-number[data-song-number="' + lastSongNumber + '"]');

    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
  };

var updatePlayerBarSong = function() {

    $('.currently-playing .song-name').text(currentSongFromAlbum.title);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.title + " - " + currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarpauseButton);
};



// album button templates//
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';

var currentlyPlayingSongNumber =null;
var currentSongFromAlbum = null;

var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.main-controls .next');

 var currentAlbum = null;
 var currentlyPlayingSongNumber = null;
 var currentSongFromAlbum = null;



      $(document).ready(function() {
     setCurrentAlbum(albumPicasso);
     $previousButton.click(previousSong);
$nextButton.click(nextSong);


   });

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
