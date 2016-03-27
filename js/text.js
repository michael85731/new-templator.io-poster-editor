//新增textarea讓使用者直接輸入文字
function addText(){
	$('.posterArea').click();

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
}

//轉成div text
function toDivText(target){
	var content = $(target).html().replace(/\n/,'<br>'); 	//因為div只能讀<br>,所以將textarea中的\n換成<br>

	var newDiv = $('<div />');
	$(newDiv)[0].origin = $(target)[0].origin; 	//繼承原element的origin
	$(target).replaceWith(newDiv);

	if(content == ''){
		$(newDiv).remove(); //若為空的直接刪除就可以了
	}else{
		$(newDiv).html(content);

		//若目前element存在，則不需重新設定element's tope %&left
		if($(target)[0].exist){
			$(newDiv)[0].exist = true;
		}

		setOriginTextStyle(newDiv);
		singleDraggable(newDiv);
	}

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