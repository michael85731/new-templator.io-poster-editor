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
	var res=parseFloat((Math.atan2(rotate.y - center.y,rotate.x - center.x)) / Math.PI * 180.0);
	return (res>=0 && res <=180)?res+=90:((res<0 && res>=-90)? res+=90: res+=450);
}

//將本體draggable取消，並用滑鼠目前位置計算實際rotate point的角度
function rotating(target){
	$(target).parent().draggable('destroy');

	//record multi element's last rotate angel
	$('.multi').each(function(){
		$(this)[0].lastAngel = getRotationDegree($(this)[0]);
	});

	$(document).on('mousemove mouseup',function(event){
		switch(event.type){
			case 'mousemove':
				var mousePosition = {x:event.pageX - $('.rotatePoint').width() / 2 ,y:event.pageY - $('.rotatePoint').height() / 2 };
				var angel = positionAngel($(target).parent()[0].center,mousePosition);
				$(target).parent().css({
					'-webkit-transform' : 'rotate(' + angel + 'deg)',
					'transform' : 'rotate(' + angel + 'deg)'
				});

				//multiple rotating
				var offsetAngel = angel - $(target).parent()[0].lastAngel;

				$('.multi').each(function(){
					if(offsetAngel < 0){
						if(offsetAngel + $(this)[0].lastAngel < 0){
							$(this).css({
								'-webkit-transform' : 'rotate(' + ($(this)[0].lastAngel + offsetAngel + 360) + 'deg)',
								'transform' : 'rotate(' + ($(this)[0].lastAngel + offsetAngel + 360) + 'deg)'
							});
						}else{
							$(this).css({
								'-webkit-transform' : 'rotate(' + ($(this)[0].lastAngel + offsetAngel) + 'deg)',
								'transform' : 'rotate(' + ($(this)[0].lastAngel + offsetAngel) + 'deg)'
							});
						}
					}else{
						if(offsetAngel + $(this)[0].lastAngel > 360){
							$(this).css({
								'-webkit-transform' : 'rotate(' + ($(this)[0].lastAngel + offsetAngel - 360) + 'deg)',
								'transform' : 'rotate(' + ($(this)[0].lastAngel + offsetAngel - 360) + 'deg)'
							});
						}else{
							$(this).css({
								'-webkit-transform' : 'rotate(' + ($(this)[0].lastAngel + offsetAngel) + 'deg)',
								'transform' : 'rotate(' + ($(this)[0].lastAngel + offsetAngel) + 'deg)'
							});
						}
					}

				});
				break;
			case 'mouseup':
				$(document).off('mousemove');
				break;
		}
	});

	singleDraggable($(target).parent()[0]);
}

function getRotationDegree(obj) {
    var matrix = $(obj).css("-webkit-transform") || $(obj).css("transform");
    var angel = 0;
    if(matrix !== 'none') {
        var values = matrix.split('(')[1].split(')')[0].split(',');
        var a = values[0];
        var b = values[1];
        angle = parseFloat(Math.round(Math.atan2(b, a) * (180 / Math.PI)));
    } else { 
    	angle = 0; 
    }
    return (angle < 0) ? angle + 360 : angle;
}