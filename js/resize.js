//儲存原先element的width,height
var originHeight = 0;
var originWidth = 0;

//當text類型的div觸發resize事件時，能跟著變動text size
function resizeText(target){
	nowHeight = $(target).height();
	nowWidth = $(target).width();
	//find min change persent and change style
	var heightPersent = (nowHeight / originHeight) * 100;
	var widthPersent = (nowWidth / originWidth) * 100;
	var scale = Math.min(heightPersent,widthPersent) + "%";
	$(target).css("font-size",scale);
}

//讓文字變成resizable
function resizableText(target){
	$(target).resizable({
		containment: ".posterArea"
	});
	originWidth = $(target).width();
	originHeight = $(target).height();
}