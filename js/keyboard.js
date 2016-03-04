var nowClone;

function copy(){
	nowClone = $('.ui-resizable-handle').parent().clone();
}

function paste(){
	copy(); 	//只按ctrl+v時仍然能夠paste上一個copy的物件
	$('.posterArea').append(nowClone);
	$(nowClone).css('top',parseFloat($(nowClone).css('top').slice(0,-2)) + $(nowClone).height() + 20);
	singleResizable(nowClone);
	singleDraggable(nowClone);
}