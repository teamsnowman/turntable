function init(){
  var h = window.innerHeight;
  var  w = window.innerWidth;
  var height  = (w/10)/h *100;
  for(var i=0;i<10;i++){
    for(var j=0;j<10;j++){
      document.body.innerHTML += '<div class="container" style="top:'+i*height+'%; left:'+j*10+'%;width:10%; height:' +height+'%;"> <div class="record"></div> <div class="label" style="background-color:'+get_random_color()+';"> <div class="text">Moosic</div></div> <div class="hole"></div></div>'
    }
  }
  function get_random_color() {
      return '#' + Math.floor((Math.random() * 0xF00000) + 0x0FFFFF).toString(16);
  }
}
