//讓所有posterArea裡面的原件都能draggable
function draggableAll(){
	$(".posterArea").children("div").each(function(){
		singleDraggable(this);
	});
}

//讓新產生的div能有draggable的效果，並寫出所有drag類的偵測事件
function singleDraggable(target){
	$(target).on('drag dragcreate dragstop',function(event,ui){
		switch(event.type){
			case 'dragcreate':
				createSmart(event.target);
				break;
			case 'drag':
				removeSmart(event.target); 	//不要檢查到自己，所以先把自己的smartLine刪除
				checkSmart(event.target);
				break;
			case 'dragstop':

				$(event.target).css('position','absolute');

				//如果已經有smart element存在則不用再新增
				if(!($(event.target).children().hasClass('smart'))){
					createSmart(event.target);
				}

				hideSmartLine();
				
				adjustRotate(event.target);

				if($('.mirror').length){
					replaceMirrorToReal(event.target); 	//若目前的element有符合smartLine而產生mirror，則刪除原本元件用mirror取代
				}
				break;
		}
	});

	$(target).draggable();
}

//multiple element draggable
function multiDraggable(){

	$('.multi').on('drag dragstop',function(event,ui){

		switch(event.type){
			case 'drag':
				//get offset of now dragging element
				var offsetTop = $(event.target).offset().top - $(event.target)[0].lastTop;
				var offsetLeft = $(event.target).offset().left - $(event.target)[0].lastLeft;
				
				//set correct element position
				$('.multi').each(function(){
					$(this).offset({top:$(this)[0].lastTop + offsetTop, left:$(this)[0].lastLeft + offsetLeft});

					removeSmart($(this)[0]); 	//不要檢查到自己，所以先把自己的smartLine刪除
				});

				break;
			case 'dragstop':
				$('.multi').css('position','absolute');

				$('.multi').each(function(){
					//如果已經有smart element存在則不用再新增
					if(!($(this).children().hasClass('smart'))){
						createSmart($(this)[0]);
						adjustRotate($(this)[0]);
					}
				});
				break;
		}

	});
}

//set target's position is relative，避免target在drag時的位置跑掉
function setRelative(target){
    var lastWidth = $(target).width();
    var lastHeight = $(target).height();
    $(target).css('position','relative');
    $(target).width(lastWidth);
    $(target).height(lastHeight);
}

//recover to position absolute
function absoluteAll(){
	$('.posterArea').children().css('position','absolute');
}