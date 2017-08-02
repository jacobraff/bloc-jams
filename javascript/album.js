/* set song function */
var setSong = function(songNumber){
  if (currentSoundFile) {
    currentSoundFile.stop();
  }
  currentlyPLayingSongNumber = parseInt(songNumber);
  currnetSongFromAlbum = currentAlbum.songs[songNumber - 1];
  // #1
  alert("Setting song");
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
        // #2
        formats: [ 'mp3' ],
        preload: true
    });
    setVolume(currentVolume);
};

/* seek function */
var seek = function(time) {
    if (currentSoundFile) {
        currentSoundFile.setTime(time);
    }
}

/* set volumen */
var setVolume = function(volume) {
  if (currentSoundFile){
    currentSoundFile.setVolume(volume);
  }
};

/* get song number */
var getSongNumberCell = function(number){
  return $('.song-item-number[data-song-number="' + currentlyPLayingSongNumber +'"]');
};

/* create song row */
var createSongRow = function(songNumber, songName, songLength) {
    var template =
       '<tr class="album-view-song-item">'
     + '  <td class="song-item-number" data-song-number="' + songNumber + '">' + songNumber + '</td>'
     + '  <td class="song-item-title">' + songName + '</td>'
     + '  <td class="song-item-duration">' + songLength + '</td>'
     + '</tr>'
     ;
     var row = $(template); // ????

    /* click handler */
    var clickHandler = function() {
       var songNumber = parseInt($(this).attr('data-song-number'));
       if (currentlyPlayingSongNumber !== null) {
         var currentlyPlayingCell = getSongNumberCell(currentlyPLayingSongNumber);
         currentlyPlayingCell.html(currentlyPlayingSongNumber);
       }
       if (currentlyPlayingSongNumber !== songNumber) {
         currentSoundFile.play();
         $(this).html(pauseButtonTemplate);
         setSong(songNumber);
         updatePlayerBarSong();
       }
       else if (currentlyPlayingSongNumber === songNumber) {
         if (currentSoundFile.isPaused()) {
              $(this).html(pauseButtonTemplate);
              $('.main-controls .play-pause').html(playerBarPauseButton);
              currentSoundFile.play();
         }
         else {
              $(this).html(playButtonTemplate);
             $('.main-controls .play-pause').html(playerBarPlayButton);
               currentSoundFile.pause();
         }
       }
    };

    /* on hover */
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
        console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber);
    };

    //????
    $(row).find('.song-item-number').click(clickHandler);
    // #2
    $(row).hover(onHover, offHover);
    // #3
    return row; //????
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

var previousSong = function() {
    /*...*/
    setSong(currentSongIndex + 1);
    currentSoundFile.play();
};

var nextSong = function() {
  setSong(currentSongIndex + 1);
  currentSoundFile.play();

  var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);

  currentSongIndex++;
  if (currentSongIndex >= currentAlbum.songs.length) {
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
}; /* is this closing nextSong? */

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
var currentSoundFile = null;
var currentVolume = 80;

var $previousButton = $('.main-controls .previous');
 var $nextButton = $('.msain-controls .next');

 var currentAlbum = null;
 var currentlyPlayingSongNumber = null;
 var currentSongFromAlbum = null;



/* document ready used to be here */

 var albums = [albumPicasso, albumMarconi, albumJake];
 var index = 0;
 $albumImage.click(function(event) {
//$('.album-cover-art').addEventListener("click", function (event){
//$albumImage.addEventListener("Click", function (event){
  setCurrentAlbum(albums[index]);
  index++;
  if (index == albums.length) {
    index = 0;
  }
});


/* }; what is this closing */

/* find parent by class name */
var findParentByClassName = function(element, targetClass) {
    if (element) {
        var currentParent = element.parentElement;
        while (currentParent.className !== targetClass && currentParent.className !== null) {
            currentParent = currentParent.parentElement;
        }
        return currentParent;
    }
};

var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause':
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item':
            return element.querySelector('.song-item-number');
        case 'song-item-title':
        case 'song-item-duration':
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');
        case 'song-item-number':
            return element;
        default:
            return;
    }
};

/* is this part of a function or loose like it's written? */
/* songRows doesn't exist~! */
/* skipped step? */
/*
for (var i = 0; i < songRows.length; i++) {
    songRows[i].addEventListener('mouseleave', function(event) {
        // Selects first child element, which is the song-item-number element
        this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
    });

    songRows[i].addEventListener('click', function(event) {
        // Event handler call
    });
}*/

var updateSeekBarWhileSongPlays = function() {
    if (currentSoundFile) {
        // #10
        currentSoundFile.bind('timeupdate', function(event) {
            // #11
            var seekBarFillRatio = this.getTime() / this.getDuration();
            var $seekBar = $('.seek-control .seek-bar');

            updateSeekPercentage($seekBar, seekBarFillRatio);
        });
    }
};



 var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
    var offsetXPercent = seekBarFillRatio * 100;
    // #1
    offsetXPercent = Math.max(0, offsetXPercent);
    offsetXPercent = Math.min(100, offsetXPercent);

    // #2
    var percentageString = offsetXPercent + '%';
    $seekBar.find('.fill').width(percentageString);
    $seekBar.find('.thumb').css({left: percentageString});
 };



 var setupSeekBars = function() {
     var $seekBars = $('.player-bar .seek-bar');

     $seekBars.click(function(event) {
         // #3
         var offsetX = event.pageX - $(this).offset().left;
         var barWidth = $(this).width();
         // #4
         var seekBarFillRatio = offsetX / barWidth;

         if ($(this).parent().attr('class') == 'seek-control') {
           seek(seekBarFillRatio * currentSoundFile.getDuration());
       } else {
           setVolume(seekBarFillRatio * 100);
       }


         // #5
         updateSeekPercentage($(this), seekBarFillRatio);
     });

    $seekBars.find('.thumb').mousedown(function(event) {
    // #8
    var $seekBar = $(this).parent();

    // #9
    $(document).bind('mousemove.thumb', function(event){
        var offsetX = event.pageX - $seekBar.offset().left;
        var barWidth = $seekBar.width();
        var seekBarFillRatio = offsetX / barWidth;


        if ($seekBar.parent().attr('class') == 'seek-control') {
           seek(seekBarFillRatio * currentSoundFile.getDuration());
       } else {
           setVolume(seekBarFillRatio);
       }

        updateSeekPercentage($seekBar, seekBarFillRatio);
    });

    // #10
    $(document).bind('mouseup.thumb', function() {
        $(document).unbind('mousemove.thumb');
        $(document).unbind('mouseup.thumb');
    });
  }); /* closing seekbars find */
}; /* setup seek bars */


/* i think this should be in a function... */
var songNumber = 1; /* added this for giggles */
if (currentlyPlayingSongNumber !== songNumber) {
      /* current album not set! */
      currentAlbum = albumMarconi;
      currentSongFromAlbum = currentAlbum.songs[songNumber - 1];


     setSong(songNumber);
     currentSoundFile.play();
     updateSeekBarWhileSongPlays();

     var $volumeFill = $('.volume .fill');
     var $volumeThumb = $('.volume .thumb');
     $volumeFill.width(currentVolume + '%');
     $volumeThumb.css({left: currentVolume + '%'});

     $(this).html(pauseButtonTemplate);
     updatePlayerBarSong();
 }

/* moved this to the bottom since setupSeekBars was not found */
 $(document).ready(function() {
      setCurrentAlbum(albumPicasso);
      setupSeekBars();
      $previousButton.click(previousSong);
      $nextButton.click(nextSong);
  });
