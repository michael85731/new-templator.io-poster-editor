//設定既有文字的textarea樣式
function setTextareaStyle(target){
	$(target).addClass('input');

	$(target).css({
		'top':target.origin.top,
		'left':target.origin.left,
		'width':target.origin.width + 5, 	//讓游標不會跟border太近
		'height':target.origin.height,
		'color':target.origin.color,
		'font-size':target.origin.size,
		'letter-spacing':target.origin.letterSpacing,
		'line-height':target.origin.lineHeight});
}

//當文字增加時，調整textarea樣式並更新origin(因為回復成div text的時候是參考origin)
function adjustTextarea(target){
	var newContent = $(target).html().replace(/<br>/g,'\n');

	var mostWidth = countTextWidth(newContent,target.origin.size,target.origin.letterSpacing);
	var nowHeight = countTextHeight(newContent,target.origin.size,target.origin.lineHeight);

	$(target).width(mostWidth);
	$(target).height(nowHeight);

	//update target's origin
	target.origin.width = mostWidth;
	target.origin.height = nowHeight;
}

//計算width
function countTextWidth(content,fontSize,letterSpacing){
	var allWidth = [];
	content = content.split('\n');
	
	for(var i = 0;i < content.length;i++){
		var tempSpan = $('<span />'); 	//利用span計算width
		$(tempSpan).html(content[i]);
		$(tempSpan).css('font-size',fontSize);
		$(tempSpan).css('letter-spacing',letterSpacing);
		$('body').append(tempSpan);
		allWidth.push($(tempSpan).width() + 5);
		tempSpan.remove();
	}

	return Math.max.apply(Math,allWidth);
}

//計算該顯示多少row
function countTextHeight(content,fontSize,lineHeight){
	var height = 0;

	var tempSpan = $('<span />'); 	//利用span計算height
	content = content.replace(/\n/g,'<br>');

	if(content.slice(-4) == '<br>'){
		$(tempSpan).html(content + 's'); //計算正確的高度;而因為span空白時不會計算空行，所以多一個字元使計算空行數量正確
	}else{
		$(tempSpan).html(content);
	}
	
	$(tempSpan).css('font-size',fontSize);
	$(tempSpan).css('line-height',lineHeight);
	$('body').append(tempSpan);

	if(lineHeight.slice(0,-2) > 20){
		height = $(tempSpan).height() + parseFloat(lineHeight.slice(0,-2) - 20); 	// + 新列高 - 基本列高，讓高度與原本div text一致
	}else{
		height = $(tempSpan).height();
	}
	tempSpan.remove();

	return height;
}

//強制將目前的input textarea轉成div text
function forceToDiv(){
	if($('.input').length){
		var lastTextarea = $('.input');
		lastTextarea.exist = true;
		toDiv(lastTextarea);
	}
}
