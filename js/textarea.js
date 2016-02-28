//設定初始textarea樣式
function setTextareaStyle(target,originContent,originTop,originLeft){
	$(target).addClass('input');
	var mostWidth = countTextWidth(originContent);
	var rows = countTextRows(originContent);

	$(target).width(mostWidth);
	$(target).attr('rows',rows);
	$(target).css({'top':originTop,'left':originLeft});
}

//當文字增加時，調整textarea樣式
function adjustTextarea(target){
	var newContent = $(target).html();
	newContent = newContent.replace(/<br>/g,'\n');

	var mostWidth = countTextWidth(newContent);
	var rows = countTextRows(newContent);

	$(target).width(mostWidth);
	$(target).attr('rows',rows);
}

//計算width
function countTextWidth(content){
	var allWidth = [];
	content = content.split('\n');
	
	for(var i = 0;i < content.length;i++){
		var tempSpan = $('<span />'); 	//利用span計算width
		$(tempSpan).html(content[i]);
		$('body').append(tempSpan);
		allWidth.push($(tempSpan).innerWidth() + 5);
		tempSpan.remove();
	}

	return Math.max.apply(Math,allWidth);
}

//計算該顯示多少row
function countTextRows(content){
	var tempContent = content.split('\n');
	return tempContent.length;
}
