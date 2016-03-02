//記錄原各式屬性的class
var origin = null;

//當text類型的div觸發resize事件時，能跟著變動text size
function resizeText(target){
	nowHeight = $(target).height();
	nowWidth = $(target).width();
	
	//find minimize change and change style
	var heightDiff = (nowHeight / origin.height);
	var widthDiff = (nowWidth / origin.width);

	var adjustment = Math.min(heightDiff,widthDiff);
	var unit = $(target).css("font-size").slice(-2);

	var result = parseFloat(origin.size.slice(0,-2) * adjustment) + unit;

	if(adjustment != 0){
		$(target).css("font-size",result);
	}
}

//當IMG觸發resize事件時，能跟著變動pic size
function resizePic(target){
	nowHeight = $(target).height();
	nowWidth = $(target).width();

	var pic = target.firstChild;
	$(pic).height(nowHeight);
	$(pic).width(nowWidth);
}


//讓文字變成resizable
function singleResizable(target){
	unResizable(target);	//避免重複新增control point

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

	//record text(div) origin css
	if(origin == null){
		origin = new Origin($(target).position().top,$(target).position().left
		,$(target).width(),$(target).height()
		,$(target).html().replace(/<br>/g,'\n')
		,$(target).css('color'),$(target).css('font-size')
		,$(target).css('letter-spacing'),$(target).css('line-height'));
	}
}

//取消resizable，不重複resize point
function unResizable(target){
	$(".ui-resizable-handle").remove();
	try{
		$(target).resizable('destroy');
	}catch(err){
		//do nothing
	}
}

//取消resizable element
function cancelResizableElement(){
	$(".ui-resizable-handle").parent().resizable('destroy');
	$(".ui-resizable-handle").remove();
}
