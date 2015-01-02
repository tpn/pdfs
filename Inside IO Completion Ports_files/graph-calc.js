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
function getElementX(obj) {
	var x = 0;
	if (obj.offsetParent) {
		do {
			x += obj.offsetLeft;
		} while (obj = obj.offsetParent);
	}
	return x;
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
