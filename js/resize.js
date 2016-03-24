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

	fixResizePoint(target);
}

//當IMG觸發resize事件時，能跟著變動pic size
function resizePic(target){
	nowHeight = $(target).height();
	nowWidth = $(target).width();

	var pic = target.firstChild;
	$(pic).height(nowHeight);
	$(pic).width(nowWidth);

	fixResizePoint(target);
}


//讓taget變成resizable
function singleResizable(target,mouseX,mouseY){
	//記錄滑鼠跟target的差距，用於在drag時設定object正確的position
	$(target)[0].mouseDiffX = mouseX - $(target).offset().left;
	$(target)[0].mouseDiffY = mouseY - $(target).offset().top;	

	//移除所有resizable element，避免重複resizable，以及將目前仍為textarea的element轉成div text
	cancelResizableElement();
	forceToDiv();

	//移除所有的rotate point
	cancelRotatePoint();

	resizable(target);
}

//讓多個taget變成resizable
function multiResizable(target){
	$(target).addClass('multi');
	forceToDiv();

	//若按到已被選過的element，或對element按下ctrl鍵，則取消選取
	if($(target).children('.ui-resizable-handle').length){
		$(target).children().remove('.ui-resizable-handle');
		$(target).removeClass('multi');		
	}else{
		resizable(target);
	}
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
				break;
			case 'resizestop':
				//幫原來的原件(target)加上smartLine，因為resize時刪掉了
				if(!($(event.target).children().hasClass('smart'))){
					createSmart(event.target);
				}
				adjustSmart(event.target);
				hideSmartLine();
				
				if($('.mirror').length){
					replaceMirrorToReal(event.target); 	//若目前的element有符合smartLine而產生mirror，則刪除原本元件用mirror取代
				}
				break;
		}
	});

	$(target).resizable({
		alsoResize: '.multi',
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
		$('.ngripStyle').css('left',$(target).width() / 2 - parseFloat($('.ngripStyle').css('width').slice(0,-2)) / 2);
		$('.egripStyle').css('top',$(target).height() / 2 - parseFloat($('.egripStyle').css('height').slice(0,-2)) / 2);
		$('.sgripStyle').css('left',$(target).width() / 2 - parseFloat($('.sgripStyle').css('width').slice(0,-2)) / 2);
		$('.wgripStyle').css('top',$(target).height() / 2 - parseFloat($('.wgripStyle').css('height').slice(0,-2)) / 2);
	}
}

//取消resizable element
function cancelResizableElement(){
	try{
		$('.ui-resizable-handle').parent().resizable('destroy'); 	//新加的element會沒有resizable，所以用try避免出現錯誤
		$('.ui-resizable-handle').remove();
		$('.multi').removeClass('multi'); 	//取消一起resize的判斷class
	}catch(err){
		//do nothing
	}
}
