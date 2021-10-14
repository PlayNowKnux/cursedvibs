var dir = document.getElementById("src_images");
addImage = function(src, name, force = false) {
  if (!force) {
    dir.innerHTML += `<img src="${src}" id="${name}">` + '\n';
    return document.getElementById(name);
  } else {
    dir.innerHTML += `<img src="${src}" id="${name}" width="${force.split('-')[0]}" height="${force.split('-')[1]}">` + '\n';
    return document.getElementById(name);
  }
}
addSound = function(src, name) {
  var e = src.split('.');
  e = e[e.length - 1];
  if (e == 'mp3') {
    dir.innerHTML += `
    <audio id="${name}">
      <source src="${src}" type="audio/mpeg">
    </audio>
    `
  } else if (e == 'wav') {
    dir.innerHTML += `
    <audio id="${name}">
      <source src="${src}" type="audio/wav">
    </audio>
    `
  } else if (e == 'ogg') {
    dir.innerHTML += `
    <audio id="${name}">
      <source src="${src}" type="audio/ogg">
    </audio>
    `
  } else {
    throw new Error(`Invalid audio type ${e}`);
  }
  return document.getElementById(name);
}
HTMLAudioElement.prototype.stop = function() {
  this.pause();
  this.load();
}

var eyes_amount = 6;
var mouths_amount = 6;
var base_amount = 1;

// Indexes of eyes to ignore mirroring
var ignore_flip = [0,5];

var eyes = [];
var mouths = [];
var bases = [];

var baseLoaded = false;

var rand_default = [
  Math.floor(Math.random() * eyes_amount),
  Math.floor(Math.random() * mouths_amount),
]

for (let i = 0; i < eyes_amount; i++) {
    eyes.push(addImage("eyes/eye" + i + ".png", "eye" + i));
}

for (let i = 0; i < mouths_amount; i++) {
    mouths.push(addImage("mouths/mouth" + i + ".png", "mouth" + i));
}

for (let i = 0; i < base_amount; i++) {
    bases.push(addImage("misc/base" + i + ".png", "base" + i));
}

bases[bases.length - 1].addEventListener("load", function() {
    baseLoaded = true;
    console.log("ok");
    draw();
})