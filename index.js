function init(){
  for(var i=0;i<100;i++){
    var color = get_random_color();
    var gradient = "background-image: -webkit-radial-gradient(center center, circle cover,"+color+","+increase_brightness(color, 30)+");" 
    document.body.innerHTML += "<div class='container'><div class='record'></div><div class='label' style='"+gradient+";'><div class='text' style='color:"+get_text_color(color)+"'>Moosic</div></div><div class='hole'></div></div>";
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
}
