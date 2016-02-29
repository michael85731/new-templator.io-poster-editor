//新增textarea讓使用者直接輸入文字
function addText(){
	cancelResizableElement();

	var newText = $("<textarea />");
	$(newText).addClass('input');
	$(newText).css({'top':150,'left':150,'position':"absolute"});

	//set keyboard event and textarea style
	setConvertDiv(newText);
	adjustTextarea(newText);
	
	$(".posterArea").append(newText);
	$(newText).focus();
	$(newText).click();	//取消目前有control point的element
}

//處理text css
function setTextStyle(target,originTop,originLeft){
	$(target).addClass('text');
	if(target.exist){
		$(target).css({'top':originTop,'left':originLeft,'position':"absolute"});
	}else{
		$(target).css({'top':150,'left':150,'position':"absolute"});
	}
}

//change text color
function chColor(colorElement){
	var color = '#' + $(colorElement).val();

	//藉由resize point,判斷是目前是否為text
	if($('.ui-resizable-handle').parent().hasClass('text')){
		$('.ui-resizable-handle').parent().css('color',color);
	}
}