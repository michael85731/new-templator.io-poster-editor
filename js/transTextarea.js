//轉為textarea
function transToTextarea(target){
	//取消各類輔助(rotate,resize,smartLine)，避免html()會取到不相關的資料
	cancelResizableElement();
	cancelRotatePoint();
	removeSmart(target);

	//初始化原來element的origin
	initElementOrigin(target);

	//transform to textarea
	var editText = $("<textarea />");
	$(target).replaceWith(editText);	//now target replace to editText
	
	//紀錄已經存在於海報，設定origin為原本element的origin；並在setTextareaStyle中用於設定element的top,left
	$(editText)[0].exist = true;
	$(editText)[0].origin = $(target)[0].origin;
	setTextareaStyle(editText);
	
	//set focus
	$(editText).focus();
	setLastCharFocus(editText,$(target)[0].origin.text);	//focus on last character

	setConvertDiv(editText);	//讓目前textarea能轉成div
}


//將目標textarea新增能轉成div的event
function setConvertDiv(target){
	$(target).on('keydown input',function(event){

		//只按enter則變回div
		if(event.keyCode == 13 && !(event.shiftKey)){
			toDivText(target);
		}else{
			//統一用html()計算
			var afterContent = $(target).val();
			$(target).html(afterContent);
			
			//調整textarea的顯示樣式
			adjustTextarea(target);
		}

	});
}