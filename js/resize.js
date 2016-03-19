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

//當IMG觸發resize事件時，能跟著變動pic size
function resizePic(target){
	nowHeight = $(target).height();
	nowWidth = $(target).width();

	var pic = target.firstChild;
	$(pic).height(nowHeight);
	$(pic).width(nowWidth);
}


//讓taget變成resizable
function singleResizable(target){
	//移除所有resizable element，避免重複resizable，以及將目前仍為textarea的element轉成div text
	cancelResizableElement();
	forceToDiv();

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
		controlPoint.attr("id",direction[i]+"grip");
		$(target).append(controlPoint);
	}

	//set smartLine，不用偵測resizecreate是因為在element新增時就已經在draggable中加上smartLine了，所以不用再createSmart
	$(target).on('resize resizestop',function(event,ui){
		switch(event.type){
			case 'resize':
				removeSmart(event.target); 		//不要檢查到自己，所以先把自己的smartLine刪除
				checkSmart(event.target,true); 	//送一個識別resizing的參數
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
			'nw': '#nwgrip',
			'ne': '#negrip',
			'sw': '#swgrip',
			'se': '#segrip',
			'n': '#ngrip',
			'e': '#egrip',
			's': '#sgrip',
			'w': '#wgrip'
		}
	});

	//record text(div) target.origin css, and make sure target.origin won't update
	if($(target)[0].origin == null){
		initElementOrigin(target);
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
