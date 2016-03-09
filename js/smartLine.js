//儲存各項數據
var allTop = [];
var allLeft = [];
var allWidth = [];
var allHeight = [];
//各屬性的smartLine區間
var smartTop = [];
var smartLeft = [];
var smartWidth = [];
var smartHeight = [];
//參考線距離
var smartDistance = 10;
//參考的div要是global，不然會無法刪除
var smartDiv = $('<div />');
$(smartDiv).css('position','absolute'); 	//沒設定會無法指定top,left
//check smart variable
var isTopSmart;
var isLeftSmart;
var isWidthSmart;
var isHeightSmart;

//drag型智慧型參考線
function smartDragLine(target){
	getData();

	//刪除自己，確認比對資料不含自己的內容
	var selfTopIndex = allTop.indexOf($(target).css('top'));
	var selfLeftIndex = allLeft.indexOf($(target).css('left'));
	allTop.splice(selfTopIndex,1);
	allLeft.splice(selfLeftIndex,1);

	//建立除了自己之外的smartLine區間
	buildSmartLine(allTop,'top');
	buildSmartLine(allLeft,'left');

	//確認是否在其中一個smartLine裡面，有的話才隱形
	isTopSmart = checkSmart('top',target);
	isLeftSmart = checkSmart('left',target);
	
	//符合某個區間時的設定
	if(isLeftSmart.hide){
		createSmart(target);
		
		//left相同
		$(target).css('visibility','hidden');
		$(smartDiv).css(isLeftSmart.which,isLeftSmart.match);
		$(smartDiv).css('visibility','visible');

		// $('.multi').each(function(){
		// 	var offset = $(smartDiv).position().top - smartDiv.origin.top;
		// 	$(this).css('top',this.origin.top + offset);
		// });

	}else if(isTopSmart.hide){
		createSmart(target);
		
		//top相同
		$(target).css('visibility','hidden');
		$(smartDiv).css(isTopSmart.which,isTopSmart.match);
		$(smartDiv).css('visibility','visible');

		// $('.multi').each(function(){
		// 	var offset = $(smartDiv).position().left - smartDiv.origin.left;
		// 	$(this).css('left',this.origin.left + offset);
		// });

	}else{
		//都不符合
		$(target).css('visibility','visible');
		$(smartDiv).css('visibility','hidden');
		$(smartDiv).remove();
		return true;
	}
}

//resize型智慧型參考線
function smartResizeLine(target){
	getData();

	//刪除自己，確認比對資料不含自己的內容
	var selfWidthIndex = allWidth.indexOf($(target).width());
	var selfHeightIndex = allHeight.indexOf($(target).height());
	allWidth.splice(selfWidthIndex,1);
	allHeight.splice(selfHeightIndex,1);

	//建立除了自己之外的smartLine區間
	buildSmartLine(allWidth,'width');
	buildSmartLine(allHeight,'height');

	//確認是否在其中一個smartLine裡面，有的話才隱形
	isWidthSmart = checkSmart('width',target);
	isHeightSmart = checkSmart('height',target);

	//符合某個區間時的設定
	if(isWidthSmart.hide){
		createSmart(target);
		
		//left相同
		$(target).css('visibility','hidden');
		$(smartDiv).width(isWidthSmart.match);
		$(smartDiv).css('visibility','visible');
		
		// $('.multi').each(function(){
		// 	var offset = $(smartDiv).position().top - smartDiv.origin.top;
		// 	$(this).css('top',this.origin.top + offset);
		// });

	}else if(isHeightSmart.hide){
		createSmart(target);
		
		//top相同
		$(target).css('visibility','hidden');
		$(smartDiv).height(isHeightSmart.match);
		$(smartDiv).css('visibility','visible');

		// $('.multi').each(function(){
		// 	var offset = $(smartDiv).position().left - smartDiv.origin.left;
		// 	$(this).css('left',this.origin.left + offset);
		// });

	}else{
		//都不符合
		$(target).css('visibility','visible');
		$(smartDiv).css('visibility','hidden');
		$(smartDiv).remove();
		return true;
	}
}

//取得目前所有元件的資料
function getData(){
	//清除先前資料，因為elemnt會有變動
	allTop = [];
	allLeft = [];
	allWidth = [];
	allHeight = [];
	
	$('.posterArea').children('div').each(function(){
		if(!($(this).hasClass('smart'))){ 	//不能取到smart元素，因smart element只是輔助
			allTop.push($(this).css('top'));
			allLeft.push($(this).css('left'));
			allWidth.push($(this).width());
			allHeight.push($(this).height());
		}
	})
}

//建立smartLine區間，也就是目前dragging物件在這些區間都會隱藏
function buildSmartLine(data,which){

	//build sector
	switch(which){
		case 'top':
			//清除先前資料
			smartTop = [];
			
			//build smartTop sector
			for(var i = 0;i < data.length;i++){
				smartTop.push([]);
				smartTop[i].push(parseFloat(data[i].slice(0,-2)) - smartDistance);
				smartTop[i].push(parseFloat(data[i].slice(0,-2)) + smartDistance);
			}
			break;
		case 'left':
			//清除先前資料
			smartLeft = [];
			
			//build smartLeft sector
			for(var i = 0;i < data.length;i++){
				smartLeft.push([]);
				smartLeft[i].push(parseFloat(data[i].slice(0,-2)) - smartDistance);
				smartLeft[i].push(parseFloat(data[i].slice(0,-2)) + smartDistance);
			}
			break;
		case 'width':
			//清除先前資料
			smartWidth = [];
			
			//build smartWidth sector
			for(var i = 0;i < data.length;i++){
				smartWidth.push([]);
				smartWidth[i].push(data[i] - smartDistance);
				smartWidth[i].push(data[i] + smartDistance);
			}
			break;
		case 'height':
			//清除先前資料
			smartHeight = [];
			
			//build smartHeight sector
			for(var i = 0;i < data.length;i++){
				smartHeight.push([]);
				smartHeight[i].push(data[i] - smartDistance);
				smartHeight[i].push(data[i] + smartDistance);
			}
			break;
	}
}

function checkSmart(condition,target){
	var which = '';		//紀錄哪個smart區間被觸發
	var match = 0;		//真正match某元件的值
	var hide = false; 	//是否隱藏origin element

	switch(condition){
		case 'top':
			//檢查smartTop
			var nowTop = parseFloat($(target).css('top').slice(0,-2));
			for(var i = 0;i < smartTop.length;i++){
				if(nowTop >= smartTop[i][0] && nowTop <= smartTop[i][1]){
					match = smartTop[i][0] + smartDistance; 	//取得真正符合的資料
					hide = true;
					which = 'top';
					break;
				}
			}
			return {'hide':hide,'match':match,'which':which};
			break;
		case 'left':
			var nowLeft = parseFloat($(target).css('left').slice(0,-2));
			//檢查smartLeft
			for(var i = 0;i < smartLeft.length;i++){
				if(nowLeft >= smartLeft[i][0] && nowLeft <= smartLeft[i][1]){
					match = smartLeft[i][0] + smartDistance; 	//取得真正符合的資料
					hide = true;
					which = 'left';
					break;
				}
			}
			return {'hide':hide,'match':match,'which':which};
			break;
		case 'width':
			var nowWidth = $(target).width();
			if(isLeftSmart.hide){
				for(var i =0;i < smartWidth.length;i++){
					if(nowWidth >= smartWidth[i][0] && nowWidth <= smartWidth[i][1]){
						match = smartWidth[i][0] + smartDistance; 	//取得真正符合的資料
						hide = true;
						which = 'width';
						break;
					}
				}
			}

			return {'hide':hide,'match':match};
			break;
		case 'height':
			var nowHeight = $(target).height();
			if(isTopSmart.hide){
				for(var i =0;i < smartHeight.length;i++){
					if(nowHeight >= smartHeight[i][0] && nowHeight <= smartHeight[i][1]){
						match = smartHeight[i][0] + smartDistance; 	//取得真正符合的資料
						hide = true;
						which = 'height';
						break;
					}
				}
			}
			return {'hide':hide,'match':match};
			break;
	}

}

//generate same object with event.target but has the particular top
function createSmart(target){
	//不更新smartDiv，因為要計算offset；也不能在這邊更新target，因為dragging時要參考原來的位置計算offset
	$(smartDiv).css('top',$(target).position().top);
	$(smartDiv).css('left',$(target).position().left);
	$(smartDiv).css('width',$(target).css('width'));
	$(smartDiv).css('height',$(target).css('height'));
	$(smartDiv).css('font-size',$(target).css('font-size'));
	$(smartDiv).css('letter-spacing',$(target).css('letter-spacing'));
	$(smartDiv).css('line-height',$(target).css('line-height'));

	smartDiv.html($(target).html());
	smartDiv.exist = true;
	smartDiv.addClass('smart');

	if(!($('.posterArea').children('div').hasClass('smart'))){ 	//若目前已經有smartDiv存在則不需要再新增(已經在smart區間)
		$('.posterArea').append(smartDiv);
		initElementOrigin(smartDiv); //紀錄smartDiv的原位置
	}
}

//若使用者mouseup時，刪除dragging物件，並產生跟smartDiv一模一樣的物件新增到posterArea中
function eliminateOrigin(){
	$('.posterArea').children('div').each(function(){
		if($(this).css('visibility') == 'hidden'){
			//清掉resize point並加到posterArea中
			var newElement = $(smartDiv).clone();
			$('.posterArea').append(newElement);
			$(newElement).children().remove('.ui-resizable-handle');

			//set css class
			newElement.exist = true;
			$(newElement).removeClass('smart');
			$(newElement).addClass('text');

			if($('.posterArea').children('div').hasClass('multi')){
				multiDraggable(newElement);
				multiResizable(newElement);
			}else{
				singleDraggable(newElement);
				singleResizable(newElement);
			}

			$(this).remove();
			$(smartDiv).remove();
		}
	});
}