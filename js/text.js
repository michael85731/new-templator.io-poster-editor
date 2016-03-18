//新增textarea讓使用者直接輸入文字
function addText(){
	cancelResizableElement();

	var newText = $("<textarea />");
	$(newText).addClass('input');
	$(newText).css({'top':150,'left':150,'position':"absolute"});
	
	//初始化origin
	initElementOrigin(newText);

	//set keyboard event and textarea style
	setConvertDiv(newText);
	adjustTextarea(newText);
	
	$(".posterArea").append(newText);
	$(newText).focus();
	$(newText).click();	//取消目前有control point的element
}

//處理text css
function setOriginTextStyle(target){
	target = $(target)[0];	////取到原本的element而非jquery Object

	$(target).addClass('text');
	if(target.exist){
		$(target).css({
			'position':'absolute',
			'top':target.origin.top,
			'left':target.origin.left,
			'width':target.origin.width,
			'height':target.origin.height,
			'color':target.origin.color,
			'font-size':target.origin.size,
			'letter-spacing':target.origin.letterSpacing,
			'line-height':target.origin.lineHeight});
	}else{
		$(target).css({'top':150,'left':150,'position':"absolute"});
	}
}

//change text color
function chColor(colorElement){
	var color = '#' + $(colorElement).val();
	$('.ui-resizable-handle').parent().css('color',color);
}