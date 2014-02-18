var initialwidth = window.innerHeight /window.innerWidth *100 + "%";
var initialleft = 50 - (window.innerHeight /window.innerWidth*100)/2 + "%";
function init(){
  disable_scroll();
  container = document.getElementById('containerofallcontainers');
  container.style.height = "100%";
  container.style.width = window.innerHeight /window.innerWidth *100 + "%";
  container.style.left = 50 - (window.innerHeight /window.innerWidth*100)/2 + "%";
  for(var i=0;i<9;i++){
    var color = get_random_color();
    var gradient = "background-image: -webkit-radial-gradient(center center, circle cover,"+color+","+increase_brightness(color, 30)+");" 
    container.innerHTML += "<div class='container' id='"+i+"' onclick='playSong();enlargeRotate("+i+");'><div class='record'><div class='label' style='"+gradient+";'><div class='text' style='color:"+get_text_color(color)+"'>Music</div><div class='hole'</div</div></div></div>";
  }
}
function get_random_color() {
  return '#' + Math.floor((Math.random() * 0xF00000) + 0x0FFFFF).toString(16);
}
function get_text_color(color) {
  // console.log(get_brightness(color));
  if (get_brightness(color) >= 100) {
    return 'black';
  }
  return 'white';
}
function get_brightness(color) {
  R = hexToR(color);
  G = hexToG(color);
  B = hexToB(color);
  return (R + G + B) / 3;
}
function wheel(e) {
  preventDefault(e);
}
function keydown(e) {
    for (var i = keys.length; i--;) {
            if (e.keyCode === keys[i]) {
                        preventDefault(e);
                        return;
                    }
        }
}
function disable_scroll() {
  if (window.addEventListener) {
        window.addEventListener('DOMMouseScroll', wheel, false);
    }
  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}
function stopAndGoBack(id){
    document.getElementById(id).className.replace('rotating','') ;
    setTimeout(function(){
      coac = document.getElementById('containerofallcontainers');
      coac.style.height = "100%" ;
      coac.style.left = initialleft;
      coac.style.top = "0%";
      coac.style.width = initialwidth;
    },2000);
}
function enlargeRotate(id){
    coac = document.getElementById('containerofallcontainers');
    id_i = parseInt(id);
    b = (id_i%3);
    a = (id_i-(id_i%3))/3;
    coac.style.height = "300%" ;
    coac.style.left = -b*parseInt(coac.style.width)+"%";
    coac.style.top = -a*parseInt(coac.style.width)*1.87+"%";
    coac.style.width = parseInt(coac.style.width )*3 +"%";
    setTimeout(function(){
      document.getElementById(id).className += ' rotating ' ;
    },2000);
}
// http://stackoverflow.com/questions/6443990/javascript-calculate-brighter-colour
function increase_brightness(hex, percent){
  // strip the leading # if it's there
  hex = hex.replace(/^\s*#|\s*$/g, '');

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if(hex.length == 3){
      hex = hex.replace(/(.)/g, '$1$1');
  }

  var r = parseInt(hex.substr(0, 2), 16),
      g = parseInt(hex.substr(2, 2), 16),
      b = parseInt(hex.substr(4, 2), 16);

  return '#' +
     ((0|(1<<8) + r + (256 - r) * percent / 100).toString(16)).substr(1) +
     ((0|(1<<8) + g + (256 - g) * percent / 100).toString(16)).substr(1) +
     ((0|(1<<8) + b + (256 - b) * percent / 100).toString(16)).substr(1);
}
  //http://www.javascripter.net/faq/hextorgb.htm
  function hexToR(h) {return parseInt((cutHex(h)).substring(0,2),16)}
  function hexToG(h) {return parseInt((cutHex(h)).substring(2,4),16)}
  function hexToB(h) {return parseInt((cutHex(h)).substring(4,6),16)}
  function cutHex(h) {return (h.charAt(0)=="#") ? h.substring(1,7):h}

function playSong() {
  //var audio = document.getElementById("audio");
  //if(!audio.paused)
    //audio.pause();
  //audio.src = JSON.parse(httpGet("../get-song")).url;
  //audio.play();
}

function httpGet(theUrl)
{
  var xmlHttp = null;

  xmlHttp = new XMLHttpRequest();
  xmlHttp.open( "GET", theUrl, false );
  xmlHttp.send( null );
  return xmlHttp.responseText;
}
