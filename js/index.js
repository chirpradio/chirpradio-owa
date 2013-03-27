var app = {
  audio: null,
  control: null,
  isPlaying: false,
  initialize: function() {
    this.bindEvents();
  },
  bindEvents: function _bindEvents() {
    document.addEventListener('DOMContentLoaded', this.onDeviceReady, false);
  },
  ensureAudio: function _ensureAudio() {
    if (!app.audio) {
      console.log('creating new audio instance');
      // Wow! This needs a cache hack to fully re-get the stream.
      // Otherwise, the stream plays for a bit then goes back to
      // some old buffer.
      app.audio = new Audio('http://chirpradio.org/stream?_=' + Date.now());
      // This lets us keep playing in the background.
      // The manifest must have the corresponding permission.
      app.audio.mozAudioChannelType = 'content';

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
      app.audio.addEventListener('error', function _onError() {
        _onEnded();
        console.log('audio.error', app.audio.error);
      });
      app.audio.addEventListener('invalid', function _onInvalid() {
        _onEnded();
        console.log('got event: invalid');
      });
      app.audio.addEventListener('loadstart', function _onLoadStart() {
        console.log('got event: loadstart');
      });
      app.audio.addEventListener('waiting', function _onWaiting() {
        // We get this when it buffers but we don't
        // get another event when it resumes. Hmm.
        console.log('got event: waiting');
      });
    }
  },
  onDeviceReady: function _onDeviceReady() {
    app.control = document.getElementById('audio-control');
    app.control.addEventListener('click', app.onControl);
    console.log('Connecting to audio');
    app.ensureAudio();
    app.audio.load();
    app.audio.play();
  },
  onControl: function _onControl() {
    console.log('button clicked');
    app.ensureAudio();
    if (app.isPlaying) {
      console.log('pausing...');
      // If the audio is playing, trigger pause handlers
      // but then free the audio object entirely.
      app.audio.pause();
      delete app.audio;
      app.audio = null;
    } else {
      console.log('playing...');
      // If the audio is not playing, recreate the audio
      // object, load it, and play.
      // See: https://bugzilla.mozilla.org/show_bug.cgi?id=855122
      // Because it's a live stream, we can't pause/resume.
      app.audio.load();
      app.audio.play();
    }
  },
  updateControl: function _updateControl(msg) {
    app.control.innerHTML = msg;
  }
};
