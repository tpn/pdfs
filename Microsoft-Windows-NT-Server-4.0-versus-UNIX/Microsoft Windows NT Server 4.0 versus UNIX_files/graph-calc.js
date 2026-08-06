function getEventX(event) {
	var posx = 0;
	if (event.pageX || event.pageY) {
		posx =  event.pageX;
	}
	else if (event.clientX || event.clientY) 	{
		posx = event.clientX + document.body.scrollLeft
			+ document.documentElement.scrollLeft;
	}
	return posx;
}
function getOffset(elem) {
  var box = (typeof elem.getBoundingClientRect !== 'undefined') ?
    elem.getBoundingClientRect() : {top: 0, left: 0};
  var w = window, d = elem.ownerDocument.documentElement;
  return {
    top: box.top + (w.pageYOffset || d.scrollTop) - (d.clientTop || 0),
    left: box.left + (w.pageXOffset || d.scrollLeft) - (d.clientLeft || 0)
  };
}
function getElementX(obj) {
  return Math.round(getOffset(obj).left);
}
function zeroPad(str,len) {
	var i;
	var pad = "";
	var s = str.toString();
	for(i=s.length; i < len; i++) {
		pad = "0".toString() + pad.toString();
	}
	return pad.toString() + s.toString();
}

function dateToTimestamp(date) {
	return date.getFullYear() +
		zeroPad(date.getMonth()+1,2) +
		zeroPad(date.getDay()+1,2) +
		zeroPad(date.getHours(),2) +
		zeroPad(date.getMinutes(),2) +
		zeroPad(date.getSeconds(),2);
}

function calcTimestamp(event,element,firstMS,lastMS) {
	  var eventX = getEventX(event);
	  var elementX = getElementX(element);
	  var elementWidth = element.width;
	  var msWidth = lastMS - firstMS;
	  var x = eventX - elementX;
	  var pct = x / elementWidth;
	  var pctDate = pct * msWidth;
	  var date = pctDate + firstMS;
	  return dateToTimestamp(new Date(date));
}
