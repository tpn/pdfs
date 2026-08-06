function getFrameArea(frame) {
  if(frame.innerWidth) return frame.innerWidth * frame.innerHeight;
  if(frame.document.documentElement && frame.document.documentElement.clientHeight) return frame.document.documentElement.clientWidth * frame.document.documentElement.clientHeight;
  if(frame.document.body) return frame.document.body.clientWidth * frame.document.body.clientHeight;
  return 0;
}

function isLargestFrame() {
	if(top == self) {
		return true;
	}
	if(top.document.body.tagName == "BODY") {
		return false;
	}
	largestArea = 0;
	largestFrame = null;
	for(i=0;i<top.frames.length;i++) {
		frame = top.frames[i];
		area = getFrameArea(frame);
		if(area > largestArea) {
			largestFrame = frame;
			largestArea = area;
		}
	}
	return (self == largestFrame);
}

function disclaimElement(element) {
	if(isLargestFrame()) {
		element.style.display="block";
		document.body.insertBefore(element,document.body.firstChild);
	}
}

function disclaimToggle(largest, nonLargest) {
	if(isLargestFrame()) {
		largest.style.display="block";
		nonLargest.style.display="none";
	} else {
		largest.style.display="none";
		nonLargest.style.display="block";
	}
}

