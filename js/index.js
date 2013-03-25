var app = {
  audio: null,
  control: null,
  isPlaying: false,
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function() {
    document.addEventListener('DOMContentLoaded', this.onDeviceReady, false);
  },
  onDeviceReady: function() {
    app.control = document.getElementById('audio-control');
    app.control.addEventListener('click', app.onControl);
    console.log('Connecting to audio');
    app.audio = document.getElementById('player-audio');
    app.audio.src = 'http://chirpradio.org/stream';
    app.audio.mozAudioChannelType = 'content';
    app.audio.load();
    app.audio.play();

    function _onPlay() {
      app.isPlaying = true;
      app.updateControl('Pause');
    }
    function _onEnded() {
      app.isPlaying = false;
      app.updateControl('Play');
    }

    app.audio.addEventListener('play', _onPlay);
    app.audio.addEventListener('pause', _onEnded);
    app.audio.addEventListener('ended', _onEnded);
  },
  onControl: function() {
    console.log('button clicked');
    if (app.isPlaying) {
      app.audio.pause();
    } else {
      app.audio.play();
    }
  },
  updateControl: function(msg) {
    app.control.innerHTML = msg;
  }
};
