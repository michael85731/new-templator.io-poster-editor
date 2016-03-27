//rotate point跟原物件的距離
var rotatePointDistance = 30;

function singleRotatable(target){
	cancelRotatePoint();	//移除所有的rotate point
	rotatable(target);
}

function multiRotatable(target){
	rotatable(target);
}

function rotatable(target){
	//新增rotate point
	var rotatePoint = $('<div />');
	$(rotatePoint).addClass('rotatePoint');
	$(target).append(rotatePoint);
	$(rotatePoint).css({'top':0 - rotatePointDistance,'left':0 + ($(target).width() / 2) - (parseFloat($('.rotatePoint').css('width').slice(0,-2)) / 2)});

	//取得斜線兩點的座標
	var nw = $(target).children('.nwgripStyle').offset();
	var se = $(target).children('.segripStyle').offset();

	//建立中心
	var center = {x:(nw.left + se.left) / 2, y:(nw.top + se.top) / 2};
	$(target)[0].center = center;
}

//調整target的中心點、rotate line、rotate point
function adjustRotate(target){
	//adjust rotate Point
	$(target).children('.rotatePoint').css({'top':0 - rotatePointDistance,'left':0 + ($(target).width() / 2) - (parseFloat($('.rotatePoint').css('width').slice(0,-2)) / 2)});

	//取得斜線兩點的座標
	var nw = $(target).children('.nwgripStyle').offset();
	var se = $(target).children('.segripStyle').offset();

	//adjust coordinate
	$(target)[0].center = {x:(nw.left + se.left) / 2, y:(nw.top + se.top) / 2};
}

//hide rotate point
function cancelRotatePoint(){
	$('.rotatePoint').remove();
}

//計算角度
function positionAngel(center,rotate){
	var res=(Math.atan2(rotate.y - center.y,rotate.x - center.x)) / Math.PI * 180.0;
	return (res>=0 && res <=180)?res+=90:((res<0 && res>=-90)? res+=90: res+=450);
}

//將本體draggable取消，並用滑鼠目前位置計算實際rotate point的角度
function rotating(target){
	$(target).parent().draggable('destroy');

	$(document).on('mousemove mouseup',function(event){
		switch(event.type){
			case 'mousemove':
				var mousePosition = {x:event.pageX,y:event.pageY};
				var angel = positionAngel($(target).parent()[0].center,mousePosition);
				$(target).parent().css({
					'-webkit-transform' : 'rotate(' + angel + 'deg)',
					'transform' : 'rotate(' + angel + 'deg)'
				});
				break;
			case 'mouseup':
				$(document).off('mousemove');
				break;
		}
	});

	singleDraggable($(target).parent()[0]);
}