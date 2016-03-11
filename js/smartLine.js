//smart Line div的寬度
var smartDistance = 10;

//檢查element的real line有沒有符合眾多smart line的其中一條
function checkSmart(target){
	var nowTop = $(target).offset().top;
	var nowLeft = $(target).offset().left;
	var nowBottom = $(target).offset().top + $(target).height();
	var nowRight = $(target).offset().left + $(target).width();

	$('.smart').each(function(){
		var check = $(this).attr('id').split('smart').slice(1).toString(); //檢查的項目

		switch(check){
			case 'Top':
				var top = $(this).offset().top; 	//取得smart元件的top smart位置
				if(nowTop >= top - smartDistance && nowTop <= top + smartDistance){	//檢查nowTop是否有符合任何smartTop
					removeMirror(); //若目前仍在該區間則會重複新增，所以先移除舊的mirror再新增
					mirror(target,'top',top);
					return false; 	//break jquery each
				}else{
					removeMirror();
					return; 		//continue jquery each
				}
				break;
			case 'Left':
				
				break;
			case 'Bottom':
				
				break;
			case 'Right':
				
				break;
		}
	
	});

}

//clone origin element and hide origin one
function mirror(target,argument,data){
	var mirror = $(target).clone();
	$(mirror).attr('id','mirror');
	$('.posterArea').append(mirror);
	$(mirror).offset({top:data,left:$(target).offset().left});
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