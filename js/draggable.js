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
				//set right position of object
				$(document).on('mousemove',function(mouseEvent){
					$(event.target).offset({top:mouseEvent.pageY - $(event.target)[0].mouseDiffY,left:mouseEvent.pageX - $(event.target)[0].mouseDiffX});
				})

				removeSmart(event.target); 	//不要檢查到自己，所以先把自己的smartLine刪除
				checkSmart(event.target);
				break;
			case 'dragstop':
				$(document).off('mousemove');
				
				//如果已經有smart element存在則不用再新增
				if(!($(event.target).children().hasClass('smart'))){
					createSmart(event.target);
				}

				adjustSmart(event.target);
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
	var offsetTop = 0;
	var offsetLeft = 0;

	$('.multi').on('drag dragcreate',function(event,ui){
		switch(event.type){
			case 'dragcreate':
				initElementOrigin(event.target); 	//initicialize target's origin
				break;
			case 'drag':
				//計算與原本位置的offset，並設定參數為原本的top,left再加上offset
				offsetTop = ui.position.top - event.target.origin.top;
				offsetLeft = ui.position.left - event.target.origin.left;
				$('.multi').each(function(){
					$(this).css('top',this.origin.top + offsetTop); 	//this有origin是因為在multiResizable中已經透過resizable設定過了
					$(this).css('left',this.origin.left + offsetLeft);
				});
				break;
		}
	});

	//將draggable移除在加上，以紀錄element的origin屬性
	try{
		$('.multi').removeClass('ui-draggable ui-draggable-handle');
		$('.multi').draggable('destroy');
		$('.multi').draggable();
	}catch(err){
		//do nothing
	}

}