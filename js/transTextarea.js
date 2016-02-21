//轉為textarea
function transToTextarea(target){
	//transform to textarea
	var originContent = $(target).text();
	var editText = $("<textarea />");
	$(target).replaceWith(editText);	//now target replace to editText
	$(editText).focus();
	setLastCharFocus(editText,originContent);	//focus on last character

	//set textarea listen event
	$(editText).keypress(function(event){
		//只按enter則變回div
		if(event.keyCode == 13 && !(event.shiftKey)){
			var afterContent = $(editText).val();
			var newContent = processText(afterContent);
			$(editText).replaceWith(newContent);
		}
	});
}

//轉成textarea時能focus在最後一個字
function setLastCharFocus(target,content){
	$(target).text("temp");
	$(target).text(content);
}

//將textarea的內容轉成div
function processText(content){
	var lineBreakNum = 0;
	if(content.match(/\n/g) != null){	//判斷空行數量
		lineBreakNum = content.match(/\n/g).length;
	}
	var splitContent = content.split("\n");
	var newText = $('<div></div>');
	var tempContent = "";
	for(var i = 0;i <= lineBreakNum;i++){	//最後一個不用空行
		if(i == lineBreakNum){
			tempContent += splitContent[i];
		}else{
			tempContent += splitContent[i] + "<br>";
		}
	}
	newText.html(tempContent);
	newText.addClass("drag ui-draggable ui-draggable-handle");
	newText.css("position","relative");
	return newText;
}