//設定初始textarea樣式
function setTextareaStyle(content,target){
	var mostWidth = countTextWidth(content);
	var rows = countTextRows(content);
	$(target).attr('cols',mostWidth);
	$(target).attr('rows',rows);
}

//調整textarea樣式
function adjustTextarea(target){
	var originContent = $(target).html();
	originContent = originContent.replace('/<br>/g','\n');
	var mostWidth = countTextWidth(originContent);

	var rows = countTextRows(originContent);
	$(target).attr('cols',mostWidth);
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
		allWidth.push($(tempSpan).width());
		tempSpan.remove();
	}

	return Math.max.apply(Math,allWidth);
}

//計算該顯示多少row
function countTextRows(content){
	var tempContent = content.split('\n');
	return tempContent.length;
}

