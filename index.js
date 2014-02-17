function init(){
  for(var i=0;i<500;i++){
    document.body.innerHTML += "<div class='container'><div class='record'></div><div class='label' style='background-color:"+get_random_color()+";'><div class='text'>Moosic</div></div><div class='hole'></div></div>";
  }
  function get_random_color() {
      return '#' + Math.floor((Math.random() * 0xF00000) + 0x0FFFFF).toString(16);
  }
}
