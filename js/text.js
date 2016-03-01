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
function setTextStyle(target,origin){
	$(target).addClass('text');
	if(target.exist){
		$(target).css({
			'top':origin.top,
			'left':origin.left,
			'width':origin.width,
			'height':origin.height,
			'color':origin.color,
			'font-size':origin.size,
			'letter-spacing':origin.letterSpacing});
	}else{
		$(target).css({'top':150,'left':150,'position':"absolute"});
	}
}

//change text color
function chColor(colorElement){
	var color = '#' + $(colorElement).val();
	$('.ui-resizable-handle').parent().css('color',color);
}