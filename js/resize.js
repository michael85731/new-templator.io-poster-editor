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
	var direction = ["nw","ne","sw","se","n","s","e","w"];
	
	//create control point
	for(var i = 0;i < 8;i++){
		var controlPoint = $("<div></div>");

		//set controlPoint style
		var styleName = "ui-resizable-handle ui-resizable-";
		styleName = styleName + direction[i];
		controlPoint.addClass(styleName);
		controlPoint.attr("id",direction[i]+"grip");
		$(target).append(controlPoint);
	}

	$(target).resizable({
		containment: ".posterArea",
		handles:{
			'nw': '#nwgrip',
			'ne': '#negrip',
			'sw': '#swgrip',
			'se': '#segrip',
			'n': '#ngrip',
			'e': '#egrip',
			's': '#sgrip',
			'w': '#wgrip'
		}
	});
	originWidth = $(target).width();
	originHeight = $(target).height();
}