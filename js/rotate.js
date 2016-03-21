function createRotate(target){
	var top = parseFloat($(target).css('top').slice(0,-2));
	var left = parseFloat($(target).css('left').slice(0,-2));

	//新增rotate的參考線
	var targetX = $('<div />');
	var targetY = $('<div />');
	$(targetX).css({'top':0 + ($(target).height() / 2),'left':0 - left - 2});
	$(targetY).css({'top':0 - top -2,'left':0 + ($(target).width() / 2)});
	$(targetX).width($('.posterArea').width());
	$(targetY).height($('.posterArea').height());
	$(targetX).addClass('rotate');
	$(targetX).addClass('x');
	$(targetY).addClass('rotate');
	$(targetY).addClass('y');
	$(target).append(targetX);
	$(target).append(targetY);

	//新增rotate point
	var rotatePoint = $('<div />');
	$(rotatePoint).addClass('rotatePoint');
	$(target).append(rotatePoint);
	$(rotatePoint).css({'top':0 - 30,'left':0 + ($(target).width() / 2) - (parseFloat($('.rotatePoint').css('width').slice(0,-2)) / 2),'visibility':'hidden'});
	
	//建立要拖曳旋轉的點座標
	var rotate = {x:parseFloat($(rotatePoint).css('top').slice(0,-2)),y:parseFloat($(rotatePoint).css('left').slice(0,-2)) + parseFloat($('.rotatePoint').css('width').slice(0,-2) / 2)};
	$(target)[0].rotate = rotate;

	//建立原點
	var center = {x:parseFloat($(targetX).css('top').slice(0,-2)),y:parseFloat($(targetY).css('left').slice(0,-2))};
	$(target)[0].center = center;

}

//調整target的中心點、rotate line、rotate point
function adjustRotate(target){
	var top = parseFloat($(target).css('top').slice(0,-2));
	var left = parseFloat($(target).css('left').slice(0,-2));

	//adjust rotate Point
	$(target).children('.rotatePoint').css({'top':0 - 30,'left':0 + ($(target).width() / 2) - (parseFloat($('.rotatePoint').css('width').slice(0,-2)) / 2)});

	//adjust rotate line
	$(target).children('.rotate.x').css({'top':0 + ($(target).height() / 2),'left':0 - left - 2});
	$(target).children('.rotate.y').css({'top':0 - top - 2,'left':0 + ($(target).width() / 2)});
	
	//adjust coordinate
	$(target)[0].rotate = {x:parseFloat($('.rotatePoint').css('top').slice(0,-2)),y:parseFloat($('.rotatePoint').css('left').slice(0,-2)) + parseFloat($('.rotatePoint').css('width').slice(0,-2) / 2)};
	$(target)[0].center = {x:parseFloat($(target).children('.rotate.x').css('top').slice(0,-2)),y:parseFloat($(target).children('.rotate.y').css('left').slice(0,-2))};
}

//hide rotate point
function hideRotatePoint(){
	$('.rotatePoint').css('visibility','hidden');
}

//計算角度
function positionAngel(center,rotate){
	var res=(Math.atan2(rotate.y - center.y,rotate.x - center.x)) / Math.PI * 180.0;
	console.log(res);
	return (res>=0 && res <=180)?res+=90:((res<0 && res>=-90)? res+=90: res+=450);
}