var initialwidth = window.innerHeight /window.innerWidth *100 + "%";
var initialleft = 50 - (window.innerHeight /window.innerWidth*100)/2 + "%";
var sw =0;
var last_id =0;
function init(){
  var container = document.getElementById('containerofallcontainers');
  container.style.height = "100%";
  container.style.width = window.innerHeight /window.innerWidth *100 + "%";
  container.style.left = 50 - (window.innerHeight /window.innerWidth*100)/2 + "%";
  for(var i=0;i<9;i++){
    var color = getRandomColor();
    var gradient = "background-image: -webkit-radial-gradient(center center, circle cover,"+color+","+increaseBrightness(color, 30)+");" 
    container.innerHTML += "<div class='container' id='"+i+"' onclick='TURNUP("+i+");'><div class='record'><div class='label' style='"+gradient+";'><div class='text' style='color:"+get_text_color(color)+"'>Music</div><div class='hole'</div</div></div></div>";   
  }
  var texts = document.getElementsByClassName('text');
  for(i=0;i<9;i++){
    var random = Math.floor((Math.random() * ((45 + 1) + 45)) + -45);
    texts[i].style.webkitTransform = 'rotate('+random+'deg)';
  }
  window.setInterval(function(){document.body.style.backgroundColor=getRandomColor();}
, 50);
}
window.onresize = function() {
  container = document.getElementById('containerofallcontainers');
  container.style.height = "100%";
  container.style.width = window.innerHeight /window.innerWidth *100 + "%";
  container.style.left = 50 - (window.innerHeight /window.innerWidth*100)/2 + "%";
  initialwidth = window.innerHeight /window.innerWidth *100 + "%";
  initialleft = 50 - (window.innerHeight /window.innerWidth*100)/2 + "%";
}
function getRandomColor() {
  return '#' + Math.floor((Math.random() * 0xF00000) + 0x0FFFFF).toString(16);
}
function get_text_color(color) {
  // console.log(getBrightness(color));
  if (getBrightness(color) >= 100) {
    return 'black';
  }
  return 'white';
}
function getBrightness(color) {
  var R = hexToR(color);
  var G = hexToG(color);
  var B = hexToB(color);
  return (R + G + B) / 3;
}
function stopAndGoBack(id){
    var elements = document.getElementsByClassName("container");
    var needle = document.getElementById('needle');
    needle.remove();
    for(i=0;i<9;i++){
      elements[i].className = elements[i].className.replace('rotating','') ;
    }
    coac = document.getElementById('containerofallcontainers');
    coac.style.height = "100%" ;
    coac.style.left = initialleft;
    coac.style.top = "0%";
    coac.style.width = parseInt(coac.style.width )/3 +"%";
}
function enlargeRotate(id){
    var needle = document.createElement('div');
    needle.setAttribute('id', 'needle');
    document.body.appendChild(needle);
    var coac = document.getElementById('containerofallcontainers');
    var id_i = parseInt(id);
    var b = (id_i%3);
    var a = (id_i-(id_i%3))/3;
    coac.style.height = "300%" ;
    coac.style.left = -b*parseInt(coac.style.width)+"%";
    coac.style.top = -a*parseInt(coac.style.height)/3+"%";
    coac.style.width = parseInt(coac.style.width )*3 +"%";
    setTimeout(function(){
      document.getElementById(id).className += ' rotating ' ;
    },2000);
}
// http://stackoverflow.com/questions/6443990/javascript-calculate-brighter-colour
function increaseBrightness(hex, percent){
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
  var audio = document.getElementById("audio");
  if(!audio.paused)
    audio.pause();

  var xmlHttp = null;
  xmlHttp = new XMLHttpRequest();

  xmlHttp.onreadystatechange = function() {
      if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
          var xmlDoc = xmlHttp.responseText;
          console.log(xmlDoc);
          audio.src = JSON.parse(xmlDoc).url;
          setTimeout(function(){
            audio.play();
          },2000);
      }
  }
  xmlHttp.open( "GET", "/get-song", true );
  xmlHttp.send(null);
}
function TURNUP(id){
  if(sw==0){
    playSong();
    enlargeRotate(id);
    sw =1;
    last_id=id;
  }
  else{
    if(id==last_id){
      document.getElementById('audio').pause();
      stopAndGoBack(id);
      sw=0;
    }
    else{
      stopAndGoBack(id);
      enlargeRotate(id);
      playSong();
      sw =1;
      last_id=id;
    }  
  }
}
