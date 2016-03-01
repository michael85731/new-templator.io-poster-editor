//記錄原各式屬性的class
var origin;

//轉為textarea
function transToTextarea(target){
	unResizable(target); 	//取消resize point,避免html()時會取到resize point
	
	//紀錄原來element的css
	origin = new Origin($(target).position().top,$(target).position().left
		,$(target).width(),$(target).height()
		,$(target).html().replace(/<br>/g,'\n')
		,$(target).css('color'),$(target).css('font-size')
		,$(target).css('letter-spacing'),$(target).css('line-height'));

	//transform to textarea
	var editText = $("<textarea />");
	$(target).replaceWith(editText);	//now target replace to editText
	
	//紀錄已經存在於海報，在setTextareaStyle中用於設定element的top,left
	editText.exist = true;
	setTextareaStyle(editText,origin);
	
	//set focus
	$(editText).focus();
	setLastCharFocus(editText,origin.text);	//focus on last character

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
			var afterContent = $(target).val();
			var newDiv = processTextToDiv(afterContent);
			singleDraggable(newDiv);

			//若目前element存在，則不需重新設定element's tope %&left
			if(target.exist){
				newDiv.exist = true;
			}
			setTextStyle(newDiv,origin);

			$(target).replaceWith(newDiv);
		}else{
			//統一用html()計算
			var afterContent = $(target).val();
			$(target).html(afterContent);
			
			//調整textarea的顯示樣式
			adjustTextarea(target,origin);
		}

	});
}

//將textarea的內容轉成div
function processTextToDiv(content){
	var lineBreakNum = 0;
	if(content.match(/\n/g) != null){	//判斷空行數量
		lineBreakNum = content.match(/\n/g).length;
	}
	var splitContent = content.split("\n");
	var newDiv = $('<div></div>');
	var tempContent = "";
	for(var i = 0;i <= lineBreakNum;i++){	//最後一個不用空行
		if(i == lineBreakNum){
			tempContent += splitContent[i];
		}else{
			tempContent += splitContent[i] + "<br>";
		}
	}
	newDiv.html(tempContent);
	return newDiv;
}