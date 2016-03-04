var nowClone;

function copy(){
	nowClone = $('.ui-resizable-handle').parent().clone();
}

function paste(){
	$('.posterArea').append(nowClone);
	$(nowClone).css('top',parseFloat($(nowClone).css('top').slice(0,-2)) + $(nowClone).height() + 20);
	singleResizable(nowClone);
}