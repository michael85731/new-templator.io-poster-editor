//轉為textarea
function transToTextarea(target){
	cancelResizableElement(); 	//取消resize point,避免html()時會取到resize point

	//初始化原來element的origin
	initElementOrigin(target);

	//transform to textarea
	var editText = $("<textarea />");
	$(target).replaceWith(editText);	//now target replace to editText
	
	//紀錄已經存在於海報，設定origin為原本element的origin；並在setTextareaStyle中用於設定element的top,left
	editText.exist = true;
	editText.origin = target.origin;
	setTextareaStyle(editText);
	
	//set focus
	$(editText).focus();
	setLastCharFocus(editText,target.origin.text);	//focus on last character

	setConvertDiv(editText);	//讓目前textarea能轉成div
}

//轉成textarea時能focus在最後一個字
function setLastCharFocus(target,content){
	$(target).text("temp");
	$(target).text(content);
}

//將目標textarea新增能轉成div的event
function setConvertDiv(target){
	$(target).on('keydown input',function(event){

		//只按enter則變回div
		if(event.keyCode == 13 && !(event.shiftKey)){
			toDiv(target);
		}else{
			//統一用html()計算
			var afterContent = $(target).val();
			$(target).html(afterContent);
			
			//調整textarea的顯示樣式
			adjustTextarea(target);
		}

	});
}

function toDiv(target){
	var content = $(target).html().replace(/\n/,'<br>'); 	//因為div只能讀<br>,所以將textarea中的\n換成<br>
	
	var newDiv = $('<div />');
	newDiv.origin = target.origin; 	//繼承原element的origin
	$(target).replaceWith(newDiv);

	$(newDiv).html(content);
	singleDraggable(newDiv);

	//若目前element存在，則不需重新設定element's tope %&left
	if(target.exist){
		newDiv.exist = true;
	}

	setTextStyle(newDiv);

}