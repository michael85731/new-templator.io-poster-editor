//smart Line div的寬度
var smartDistance = 10;

//檢查element的real line有沒有符合眾多smart line的其中一條
function checkSmart(target,resize){
	var targetTop = $(target).offset().top;
	var targetLeft = $(target).offset().left;
	var targetBottom = $(target).offset().top + $(target).height();
	var targetRight = $(target).offset().left + $(target).width();

	var removeMirrorCheck = false;

	//逐一檢查smart element
	$('.smart').each(function(){
		//bottom跟right不用另外取，因在createSmart的時候就設定過top跟left，所以當取到smartBottom or smartLeft就不用再設定
		var top = $(this).offset().top;
		var left = $(this).offset().left;

		//判斷法則
		if(targetTop >= top - smartDistance && targetTop <= top + smartDistance){
			hideSmartLine();
			removeMirrorCheck = false;

			showSmartLine(this);
			
			if(resize){ 	//resize時才調整
				resize = 'bottom'; 	//resizing而發生top與某smartTop相同時，會改變原物件的bottom，所以要將bottom改成跟原本一樣(bottom位置不動)，故要將height加上兩者bottom的diff(在top不變的狀況下改變height使bottom相同)
			}
			
			mirror(target,'top',top,resize,targetBottom);
			
			$(target).css('visibility','hidden');
			return false;
		}else if(targetBottom >= top - smartDistance && targetBottom <= top + smartDistance){
			hideSmartLine();
			removeMirrorCheck = false;

			showSmartLine(this);
			
			if(resize){ 	//resize時才調整
				resize = 'top'; 	//resizing而發生bottom與某smartTop相同時，原本的top會跑掉，所以要將mirror設定成原本的top。但因為改top後會造成height跟resize後的不同，所以height要再加上原本top跟resize後top的差距(在top不動的狀況下將height加上top間的差距)
				mirror(target,'top',top,resize,targetTop);
			}else{
				mirror(target,'top',top - $(target).height()); 	//drag時的位置跟resize時候不同，drag時top必須是smartTop - target's height
			}
			
			
			$(target).css('visibility','hidden');
			return false;
		}else if(targetLeft >= left - smartDistance && targetLeft <= left + smartDistance){
			hideSmartLine();
			removeMirrorCheck = false;

			showSmartLine(this);
			
			if(resize){ 	//resize時才調整
				resize = 'right'; 	//resizing而發生left跟某smartLeft相同時，原本的right會跑掉，所以要將right改成跟原來相同(right位置不動)，故要將width加上兩者right的diff(在left不變的狀況下改變width使right相同)
			}
			mirror(target,'left',left,resize,targetRight);
			
			$(target).css('visibility','hidden');
			return false;
		}else if(targetRight >= left - smartDistance && targetRight <= left + smartDistance){
			hideSmartLine();
			removeMirrorCheck = false;

			showSmartLine(this);
			
			if(resize){ 	//resize時才調整
				resize = 'left'; 	//resizing而發生right與某smartLeft相同，原本的left會跑掉，所以要將mirror設定成原本的left，再將mirror的width加上原本left跟resize後left的差距(在left不動的狀況下將width加上left間的差距)
				mirror(target,'left',left,resize,targetLeft);
			}else{
				mirror(target,'left',left - $(target).width()); 	//drag時的位置跟resize時候不同，drag時left必須是smartLeft - target's width
			}
			
			
			$(target).css('visibility','hidden');
			return false;
		}else{
			removeMirrorCheck = true;
		}	
	});

	if(removeMirrorCheck){
		$(target).css('visibility','visible');
		hideSmartLine();
		removeMirror();
	}

}

//把參考線show出來
function showSmartLine(smartLine){
	$(smartLine).css({'border':'1px dashed blue','visibility':'visible'});
}

//隱藏參考線
function hideSmartLine(){
	$('.smart').css('visibility','hidden');
}

//clone origin element and hide origin one
function mirror(target,position,positionData,resize,resizeData){
	//若mirror存在則不需再新增
	if(!($('.mirror').length)){
		var mirror = $(target).clone();
		$(mirror).addClass('mirror');
		$(mirror).css('position','absolute');
		$('.posterArea').append(mirror);
		$(mirror)[0].origin = $(target)[0].origin; 	//繼承原物件的origin，在resizeText的時候才能正確顯示文字大小
	}

	switch(position){
		case 'top':
			$('.mirror').offset({top:positionData,left:$(target).offset().left});

			switch(resize){
				case 'bottom':
					var diff = resizeData - ($('.mirror').offset().top + $('.mirror').height());
					$('.mirror').height($('.mirror').height() + diff);
					$('.mirror').width($(target).width());
					break;
				case 'top':
					var diff = positionData - resizeData;
					$('.mirror').offset({top:resizeData,left:$(target).offset().left});
					$('.mirror').height(diff);
					$('.mirror').width($(target).width());
					break;
			}
			break;
		case 'left':
			$('.mirror').offset({top:$(target).offset().top,left:positionData});

			switch(resize){
				case 'right':
					var diff = resizeData - ($('.mirror').offset().left + $('.mirror').width());
					$('.mirror').width($('.mirror').width() + diff);
					$('.mirror').height($(target).height());
					break;
				case 'left':
					var diff = positionData - resizeData;
					$('.mirror').offset({top:$(target).offset().top,left:resizeData});
					$('.mirror').width(diff);
					$('.mirror').height($(target).height());
					break;
			}
			break;
	}

	//resize時mirror的font-size大小也要跟著變
	if(resize){
		resizeText($('.mirror'));
	}


	fixResizePoint($('.mirror')[0]); 	//resize時會跟著調整resize point
	adjustRotate($('.mirror')[0]);		//調整rotate point
}

//remove mirror
function removeMirror(){
	$('.mirror').remove();
}

//建立real line
function createSmart(target){
	var smartTop = $('<div />');
	var smartLeft = $('<div />');
	var smartRight = $('<div />');
	var smartBottom = $('<div />');

	var top = parseFloat($(target).css('top').slice(0,-2));
	var left = parseFloat($(target).css('left').slice(0,-2));

	$(smartTop).width($('.posterArea').width());
	$(smartLeft).height($('.posterArea').height());
	$(smartBottom).width($('.posterArea').width());
	$(smartRight).height($('.posterArea').height());

	//add class
	$(smartTop).addClass('smart');
	$(smartTop).attr('id','smartTop');
	$(smartLeft).addClass('smart');
	$(smartLeft).attr('id','smartLeft');
	$(smartBottom).addClass('smart');
	$(smartBottom).attr('id','smartBottom');
	$(smartRight).addClass('smart');
	$(smartRight).attr('id','smartRight');

	//set top and left
	$(smartTop).css({'top':0,'left':0 - left - 2});
	$(smartLeft).css({'top':0 - top - 2,'left':0});
	$(smartBottom).css({'top':0 + $(target).height(),'left':0 - left - 2});
	$(smartRight).css({'top':0 - top - 2,'left':0 + $(target).width()});

	$(target).append(smartTop,smartRight,smartBottom,smartLeft); 	//不新增在body是因為adjustSmart可以指定要調整的smartLine，而不用全部一起調整
}

//remove element's smart line
function removeSmart(target){
	$(target).children('.smart').remove();
}

//轉成正式object而不是mirror object
function replaceMirrorToReal(old){
	$('.mirror').children().remove('.ui-resizable-handle');
	singleDraggable($('div.mirror')[0]);
	singleResizable($('div.mirror')[0]);
	singleRotatable($('div.mirror')[0]);
	$('.mirror').removeClass('mirror');
	$(old).remove();
}