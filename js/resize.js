/*reszie都是根據原本的物件來resizing，所以resize結束後不會更新origin*/

//當text類型的div觸發resize事件時，能跟著變動text size
function resizeText(target){
	nowHeight = $(target).height();
	nowWidth = $(target).width();
	
	//find minimize change and change style
	var heightDiff = (nowHeight / $(target)[0].origin.height);
	var widthDiff = (nowWidth / $(target)[0].origin.width);

	var adjustment = Math.min(heightDiff,widthDiff);
	var unit = $(target).css("font-size").slice(-2);

	var result = parseFloat($(target)[0].origin.size.slice(0,-2) * adjustment) + unit;
	
	if(adjustment != 0){
		$(target).css("font-size",result);
	}
}

//讓taget變成resizable
function singleResizable(target){
	cancelResizableElement();	//移除所有resizable element，避免重複resizable
	resizable(target);
}

//讓多個taget變成resizable
function multiResizable(target){
	resizable(target);
}

function multiResizing(){
	$('.multi').on('resize resizestop',function(event){

		switch(event.type){
			case 'resize':
				//計算各類offset
				var offsetTop  = $(event.target).offset().top - $(event.target)[0].lastTop;
				var offsetLeft = $(event.target).offset().left - $(event.target)[0].lastLeft;
				var offsetWidth = $(event.target).width() - $(event.target)[0].lastWidth;
				var offsetHeight = $(event.target).height() - $(event.target)[0].lastHeight;

				$('.multi').each(function(){
					//調整位置大小
					$(this).offset({top:$(this)[0].lastTop + offsetTop, left:$(this)[0].lastLeft + offsetLeft});
					$(this).height($(this)[0].lastHeight + offsetHeight);
					$(this).width($(this)[0].lastWidth + offsetWidth);

					//smartLine & rotatePoint & fixResize point position
					removeSmart($(this)[0]); 		//不要檢查到自己，所以先把自己的smartLine刪除
					adjustRotate($(this)[0]); 	//調整rotate point
					fixResizePoint($(this)[0]);	//調整resize point

					//調整文字
					resizeText($(this)[0]);
				});
				break;
			case 'resizestop':
				$('.multi').each(function(){
					if(!($(this).children().hasClass('smart'))){
						createSmart($(this)[0]);
					}
				});
				break;
		}
	});
}

function resizable(target){

	var direction = ["nw","ne","sw","se","n","s","e","w"];
	
	//create control point
	for(var i = 0;i < 8;i++){
		var controlPoint = $("<div></div>");

		//set controlPoint style
		var styleName = "ui-resizable-handle ui-resizable-";
		styleName = styleName + direction[i];

		controlPoint.addClass(styleName);
		controlPoint.addClass(direction[i]+"gripStyle"); 	//加上另外的class是因為還要加上一些css的變化，直接覆寫class會蓋掉原本jQuery UI的設定
		$(target).append(controlPoint);
	}

	//set smartLine，不用偵測resizecreate是因為在element新增時就已經在draggable中加上smartLine了，所以不用再createSmart
	$(target).on('resize resizestop',function(event,ui){
		switch(event.type){
			case 'resize':
				removeSmart(event.target); 		//不要檢查到自己，所以先把自己的smartLine刪除
				checkSmart(event.target,true); 	//送一個識別resizing的參數
				adjustRotate(event.target); 	//調整rotate point
				fixResizePoint(event.target);	//調整resize point
				break;
			case 'resizestop':

				//幫原來的原件(target)加上smartLine，因為resize時刪掉了
				if(!($(event.target).children().hasClass('smart'))){
					createSmart(event.target);
				}
				hideSmartLine();
				
				if($('.mirror').length){
					replaceMirrorToReal(event.target); 	//若目前的element有符合smartLine而產生mirror，則刪除原本元件用mirror取代
				}
				break;
		}
	});

	$(target).resizable({
		handles:{
			'nw': '.nwgripStyle',
			'ne': '.negripStyle',
			'sw': '.swgripStyle',
			'se': '.segripStyle',
			'n': '.ngripStyle',
			'e': '.egripStyle',
			's': '.sgripStyle',
			'w': '.wgripStyle'
		}
	});

	fixResizePoint(target);

	//record text(div) target.origin css, and make sure target.origin won't update
	if($(target)[0].origin == null){
		initElementOrigin(target);
	}
}

//fix n,e,s,w position，因為設定50%是設定原點而非正確的位置
function fixResizePoint(target){
	if($(target).css('visibility') == 'visible'){ 	//因為有mirror時也會連帶調整原本的element，而使mirror上的resize point位置不對。要只調整mirror的resize point就必須指定target必須是visible
		$(target).children('.ngripStyle').css('left',$(target).width() / 2 - parseFloat($('.ngripStyle').css('width').slice(0,-2)) / 2);
		$(target).children('.egripStyle').css('top',$(target).height() / 2 - parseFloat($('.egripStyle').css('height').slice(0,-2)) / 2);
		$(target).children('.sgripStyle').css('left',$(target).width() / 2 - parseFloat($('.sgripStyle').css('width').slice(0,-2)) / 2);
		$(target).children('.wgripStyle').css('top',$(target).height() / 2 - parseFloat($('.wgripStyle').css('height').slice(0,-2)) / 2);
	}
}

//取消resizable element
function cancelResizableElement(){
	// console.trace();
	try{
		$('.ui-resizable-handle').parent().resizable('destroy'); 	//新加的element會沒有resizable，所以用try避免出現錯誤
		$('.ui-resizable-handle').remove();
		$('.multi').removeClass('multi'); 	//取消一起resize的判斷class
	}catch(err){
		//do nothing
	}
}
