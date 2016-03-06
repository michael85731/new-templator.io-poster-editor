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

//drag型智慧型參考線
function smartDragLine(target){
	getData();

	//刪除自己，確認比對資料不含自己的內容
	var selfIndex = allTop.indexOf($(target).css('top'));
	allTop.splice(selfIndex,1);

	//建立除了自己之外的smartLine區間
	buildSmartLine(allTop);

	var now = parseFloat($(target).css('top').slice(0,-2));
	var match = 0;
	var hide = false;
	//確認是否在其中一個smartLine裡面，有的話才隱形
	for(var i = 0;i < smartTop.length;i++){
		if(now >= smartTop[i][0] && now <= smartTop[i][1]){
			match = smartTop[i][0] + 15; 	//取得真正符合的資料
			hide = true;
			break;
		}else{
			hide = false;
		}
	}

	if(hide){
		$(target).css('visibility','hidden');
	}else{
		$(target).css('visibility','visible');
	}

	return {'hide':hide,'match':match};
}

//取得目前所有元件的資料
function getData(){
	//清除先前資料
	allTop = [];
	allLeft = [];
	allWidth = [];
	allHeight = [];
	
	$('.posterArea').children('div').each(function(){
		allTop.push($(this).css('top'));
		allLeft.push($(this).css('left'));
		allWidth.push($(this).width());
		allHeight.push($(this).height());
	})
}

//建立smartLine區間，也就是目前dragging物件在這些區間都會隱藏
function buildSmartLine(data){
	//清除先前資料
	smartTop = [];
	smartLeft = [];
	smartWidth = [];
	smartHeight = [];

	//build smartTop sector
	for(var i = 0;i < data.length;i++){
		smartTop.push([]);
		smartTop[i].push(parseFloat(data[i].slice(0,-2)) - 15);
		smartTop[i].push(parseFloat(data[i].slice(0,-2)) + 15);
	}

}