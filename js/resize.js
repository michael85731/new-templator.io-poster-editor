//儲存原先element的originSize,width,height
var originHeight = 0;
var originWidth = 0;
var originSize = 0

//當text類型的div觸發resize事件時，能跟著變動text size
function resizeText(target){
	nowHeight = $(target).height();
	nowWidth = $(target).width();
	
	//find minimize change and change style
	var heightPersent = (nowHeight / originHeight);
	var widthPersent = (nowWidth / originWidth);
	var adjustment = Math.min(heightPersent,widthPersent);
	console.log("height = " + heightPersent + "\n" + "width = " + widthPersent + "\n\n");
	var unit = $(target).css("font-size").slice(-2);
	if(adjustment != 0){
		$(target).css("font-size",originSize * adjustment);
	}
}

//讓文字變成resizable
function resizableText(target){
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

	//紀錄當前數據
	originWidth = $(target).width();
	originHeight = $(target).height();
	originSize = parseFloat($(target).css("font-size").slice(0,-2));
}

//取消resizable，不重複resizable element
function unResizable(target){
	$(".ui-resizable-handle").remove();
	try{
		$(target).resizable('destroy');
	}catch(err){
		//do nothing
	}
}

//取消resize point
function cancelResizePoint(){
	$(".ui-resizable-handle").parent().resizable('destroy');
	$(".ui-resizable-handle").remove();
}
