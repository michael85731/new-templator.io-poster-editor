//讓所有posterArea裡面的原件都能draggable
function draggableAll(){
	$(".posterArea").children("div").draggable({
    	containment: ".posterArea",
	});
}

//讓新產生的div能有draggable的效果
function singleDraggable(target){
	$(target).draggable({
		containment: ".posterArea"
	});
}

//multiple element draggable
function multiDraggable(){
	var offsetTop = 0;
	var offsetLeft = 0;

	$('.multi').on('drag dragcreate',function(event,ui){
		switch(event.type){
			case 'dragcreate':
				initElementOrigin(event.target);
				break;
			case 'drag':
				offsetTop = ui.position.top - event.target.origin.top;
				offsetLeft = ui.position.left - event.target.origin.left;
				$('.multi').each(function(){
					$(this).css('top',parseFloat(this.origin.top) + offsetTop);
					$(this).css('left',parseFloat(this.origin.left) + offsetLeft);
				});
				break;
		}
	});
	try{
		$('.multi').removeClass('ui-draggable ui-draggable-handle');
		$('.multi').draggable('destroy');
		$('.multi').draggable();
	}catch(err){
		//do nothing
	}

}