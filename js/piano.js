

var notes = new Array();
notes['c1'] = 'https://res.cloudinary.com/djnxdb9dr/video/upload/v1541935863/piano%20music/note_c.mp3';
notes['d'] = 'https://res.cloudinary.com/djnxdb9dr/video/upload/v1541936700/piano%20music/notes_d.mp3';
notes['e'] = 'https://res.cloudinary.com/djnxdb9dr/video/upload/v1541936699/piano%20music/notes_e.mp3';
notes['f'] = 'https://res.cloudinary.com/djnxdb9dr/video/upload/v1541936699/piano%20music/notes_f.mp3';
notes['g'] = 'https://res.cloudinary.com/djnxdb9dr/video/upload/v1541936700/piano%20music/notes_g.mp3';
notes['a'] = 'https://res.cloudinary.com/djnxdb9dr/video/upload/v1541936885/piano%20music/notes_a.mp3';
notes['b'] = 'https://res.cloudinary.com/djnxdb9dr/video/upload/v1541936699/piano%20music/notes_b.mp3';
notes['c2'] = 'https://cloudinary.com/console/media_library/asset/video/upload/piano%20music%2Fnotes_c2';

for(var note in notes) {
  // insert audio
  $('body').append('<audio id="note_'+note+'" src="'+notes[note]+'"></audio>');
  // activate button
  $('#'+note).click(function(e){
    e.preventDefault();
    myNote = document.getElementById('note_' + $(this).attr('id'));
    myNote.currentTime = 0;
    myNote.play();
  });
}

// play a tune
// length of tune in notes
var tune = {};
tune.length = 20 + Math.round(Math.random() * 20);
tune.count = 0;
tune.noteTime = 1000 / Math.pow(2,Math.round(Math.random() * 2));
tune.noteTimer = false;
function playTune() {
  tune.count = 0;
  tune.length = 20 + Math.round(Math.random() * 20);
  playTuneNote();
}
function stopTune() {
  clearTimeout(tune.noteTimer);
  var noteNumber = $('audio').length;
  for (x=0;x<noteNumber;x++) {
    var selectedNote = $('audio').eq(x).attr('id');
    var myNote = document.getElementById(selectedNote);
    myNote.pause();
    myNote.currentTime = 0;
  }
  $('menu button.playing').removeClass('playing');
}
function playTuneNote() {
  if (tune.count < tune.length) {
    var noteNumber = $('audio').length;
    var selectedNoteIndex = Math.floor(Math.random() * noteNumber);
    var selectedNote = $('audio').eq(selectedNoteIndex).attr('id');
    var myNote = document.getElementById(selectedNote);
    myNote.currentTime = 0;
    myNote.play();
    
    tune.count++;
    tune.noteTime = 1000 / Math.pow(2,Math.round(Math.random() * 2));
    var selectedKey = selectedNote.slice(5); console.log(selectedKey);
    $('menu button.playing').removeClass('playing');
    $('#'+selectedKey).addClass('playing'); 
    tune.noteTimer = setTimeout(playTuneNote,tune.noteTime);
  }
  else {
    $('menu button.playing').removeClass('playing');
  }
}
$('#starttune').click(function(){ playTune(); });
$('#stoptune').click(function(){ stopTune(); });
