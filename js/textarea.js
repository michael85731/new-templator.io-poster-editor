//設定既有文字的textarea樣式
function setTextareaStyle(target,origin){
	$(target).addClass('input');
	var mostWidth = countTextWidth(origin.text,origin.size);
	var nowHeight = countTextHeight(origin.text,origin.size);

	//width and rows
	$(target).width(mostWidth);
	$(target).height(nowHeight);

	//css
	$(target).css({
		'top':origin.top,
		'left':origin.left,
		'width':origin.width,
		'height':origin.height,
		'color':origin.color,
		'font-size':origin.size,
		'letter-spacing':origin.letterSpacing});
}

//當文字增加時，調整textarea樣式並更新origin(因為回復成div text的時候是參考origin)
function adjustTextarea(target,origin){
	var newContent = $(target).html().replace(/<br>/g,'\n');

	var mostWidth = countTextWidth(newContent,origin.size);
	var nowHeight = countTextHeight(newContent,origin.size);

	$(target).width(mostWidth);
	$(target).height(nowHeight);

	//update origin
	origin.width = mostWidth;
	origin.height = nowHeight;
}

//計算width
function countTextWidth(content,fontSize){
	var allWidth = [];
	content = content.split('\n');
	
	for(var i = 0;i < content.length;i++){
		var tempSpan = $('<span />'); 	//利用span計算width
		$(tempSpan).html(content[i]);
		$(tempSpan).css('font-size',fontSize);
		$('body').append(tempSpan);
		allWidth.push($(tempSpan).innerWidth() + 5);
		tempSpan.remove();
	}

	return Math.max.apply(Math,allWidth);
}

//計算該顯示多少row
function countTextHeight(content,fontSize){
	var height = 0;

	var tempSpan = $('<span />'); 	//利用span計算height
	content = content.replace(/\n/g,'<br>s'); //因為span空白時不會計算空行，所以多一個字元使計算空行數量正確

	$(tempSpan).html(content);
	$(tempSpan).css('font-size',fontSize);
	$('body').append(tempSpan);

	height = $(tempSpan).height();
	tempSpan.remove();

	return height;
}
