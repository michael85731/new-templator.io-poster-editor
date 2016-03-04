//當text類型的div觸發resize事件時，能跟著變動text size
function resizeText(target){
	nowHeight = $(target).height();
	nowWidth = $(target).width();
	
	//find minimize change and change style
	var heightDiff = (nowHeight / target.origin.height);
	var widthDiff = (nowWidth / target.origin.width);

	var adjustment = Math.min(heightDiff,widthDiff);
	var unit = $(target).css("font-size").slice(-2);

	var result = parseFloat(target.origin.size.slice(0,-2) * adjustment) + unit;

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


//讓taget變成resizable
function singleResizable(target){

	//避免重複resizable，以及將目前仍為textarea的element轉成div text
	$('.ui-resizable-handle').remove();
	try{
		$(target).resizable('destroy');
	}catch(err){
		//do nothing
	}
	forceToDiv();

	resizable(target);
}

//讓多個taget變成resizable
function multiResizable(target){
	forceToDiv();

	//若已被選過的則取消選取
	if($(target).children('.ui-resizable-handle').length){
		$(target).children().remove('.ui-resizable-handle');	
	}else{
		//若之前有選過則會有resizable，先取消再加上才不會有bug
		try{
			$(target).resizable('destroy');
		}catch(err){
			//do nothing
		}

		resizable(target);
	}
}

function resizable(target){

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

	//record text(div) target.origin css
	if(target.origin == null){
		target.origin = new Origin($(target).position().top,$(target).position().left
		,$(target).width(),$(target).height()
		,$(target).html().replace(/<br>/g,'\n')
		,$(target).css('color'),$(target).css('font-size')
		,$(target).css('letter-spacing'),$(target).css('line-height'));
	}

}

//取消resizable element
function cancelResizableElement(){
	$(".ui-resizable-handle").parent().resizable('destroy');
	$('.posterArea').remove(".ui-resizable-handle");
}
