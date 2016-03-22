//rotate point跟原物件的距離
var rotatePointDistance = 30;

function createRotate(target){
	var top = parseFloat($(target).css('top').slice(0,-2));
	var left = parseFloat($(target).css('left').slice(0,-2));

	//新增rotate point
	var rotatePoint = $('<div />');
	$(rotatePoint).addClass('rotatePoint');
	$(target).append(rotatePoint);
	$(rotatePoint).css({'top':0 - rotatePointDistance,'left':0 + ($(target).width() / 2) - (parseFloat($('.rotatePoint').css('width').slice(0,-2)) / 2),'visibility':'hidden'});

	//建立原點
	var center = {x:$(target).offset().left + ($(target).width() / 2),y:$(target).offset().top + ($(target).height() / 2)};
	$(target)[0].center = center;
}

//調整target的中心點、rotate line、rotate point
function adjustRotate(target){
	var top = parseFloat($(target).css('top').slice(0,-2));
	var left = parseFloat($(target).css('left').slice(0,-2));

	//adjust rotate Point
	$(target).children('.rotatePoint').css({'top':0 - rotatePointDistance,'left':0 + ($(target).width() / 2) - (parseFloat($('.rotatePoint').css('width').slice(0,-2)) / 2)});

	//adjust rotate line
	$(target).children('.rotate.x').css({'top':0 - top - 2,'left':0 + ($(target).width() / 2)});
	$(target).children('.rotate.y').css({'top':0 + ($(target).height() / 2),'left':0 - left - 2});
	
	//adjust coordinate
	$(target)[0].center = {x:$(target).offset().left + ($(target).width() / 2),y:$(target).offset().top + ($(target).height() / 2)};
}

//hide rotate point
function hideRotatePoint(){
	$('.rotatePoint').css('visibility','hidden');
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