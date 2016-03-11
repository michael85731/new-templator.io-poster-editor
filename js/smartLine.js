//smart Line div的寬度
var smartDistance = 10;

//檢查element的real line有沒有符合眾多smart line的其中一條
function checkSmart(target){
	var targetTop = $(target).offset().top;
	var targetLeft = $(target).offset().left;
	var targetBottom = $(target).offset().top + $(target).height();
	var targetRight = $(target).offset().left + $(target).width();

	//逐一檢查smart element
	$('.smart').each(function(){
		var check = $(this).attr('id').split('smart').slice(1).toString(); //檢查的項目

		var top = $(this).offset().top; 	//取得smart元件的top smart位置
		var left = $(this).offset().left; 	//取得smart元件的left smart位置
		var bottom = $(this).offset().top + $(this).parent().height();
		var right = $(this).offset().left + $(this).parent().width();

		switch(check){
			case 'Top':
			case 'Bottom':
				if(targetTop >= top - smartDistance && targetTop <= top - smartDistance){
					console.log('check');
					removeMirror();
					mirror(target,'top',top);
					return false;
				}else if(targetTop >= bottom - smartDistance && targetTop <= bottom + smartDistance){
					removeMirror();
					mirror(target,'top',bottom);
					return false;
				}else if(targetBottom >= top - smartDistance && targetBottom <= top + smartDistance){
					removeMirror();
					mirror(target,'top',top - $(target).height());
					return false;
				}else{
					removeMirror();
					return;
				}
				break;
			case 'Left':
			case 'Right':
				if(targetLeft >= left - smartDistance && targetLeft <= left + smartDistance){
					removeMirror();
					mirror(target,'left',left);
					return false;
				}else if(targetLeft >= right - smartDistance && targetLeft <= right + smartDistance){
					removeMirror();
					mirror(target,'left',right);
					return false;
				}else if(targetRight >= left - smartDistance && targetRight <= left + smartDistance){
					removeMirror();
					mirror(target,'left',left - $(target).width());
					return false;
				}else{
					removeMirror();
					return;
				}
				break;
		}
	
	});

}

//clone origin element and hide origin one
function mirror(target,argument,data){
	var mirror = $(target).clone();
	$(mirror).attr('id','mirror');
	$('.posterArea').append(mirror);
	
	switch(argument){
		case 'top':
			$(mirror).offset({top:data,left:$(target).offset().left});
			break;
		case 'left':
			$(mirror).offset({top:$(target).offset().top,left:data});
			break;
	}
}

//remove mirror
function removeMirror(){
	$('#mirror').remove();
}

//建立real line
function createSmart(target){
	var realTop = $('<div />');
	var realLeft = $('<div />');
	var realRight = $('<div />');
	var realBottom = $('<div />');

	var top = parseFloat($(target).css('top').slice(0,-2));
	var left = parseFloat($(target).css('left').slice(0,-2));

	$(realTop).width($('.posterArea').width());
	$(realLeft).height($('.posterArea').height());
	$(realBottom).width($('.posterArea').width());
	$(realRight).height($('.posterArea').height());

	//add class
	$(realTop).addClass('smart');
	$(realTop).attr('id','smartTop');
	$(realLeft).addClass('smart');
	$(realLeft).attr('id','smartLeft');
	$(realBottom).addClass('smart');
	$(realBottom).attr('id','smartBottom');
	$(realRight).addClass('smart');
	$(realRight).attr('id','smartRight');

	//set top and left
	$(realTop).css({'top':0,'left':0 - left - 2});
	$(realLeft).css({'top':0 - top - 2,'left':0});
	$(realBottom).css({'top':0 + $(target).height(),'left':0 - left - 2});
	$(realRight).css({'top':0 - top - 2,'left':0 + $(target).width()});

	$(target).append(realTop,realRight,realBottom,realLeft);
}

//when element moves, adjust its real line position
function adjustSmart(target){
	var top = parseFloat($(target).css('top').slice(0,-2));
	var left = parseFloat($(target).css('left').slice(0,-2));

	//set top and left
	$(target).children('#smartTop').css({'top':0,'left':0 - left - 2});
	$(target).children('#smartLeft').css({'top':0 - top - 2,'left':0});
	$(target).children('#smartBottom').css({'top':0+ $(target).height(),'left':0 - left - 2});
	$(target).children('#smartRight').css({'top':0 - top - 2,'left':0 + $(target).width()});
}

//remove smart line
function removeSmart(target){
	$(target).children('.smart').remove();
}