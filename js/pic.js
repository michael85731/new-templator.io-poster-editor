//讀取圖片
function loadPic(target){
	if(target.files[0]){
		var reader = new FileReader();
		reader.onload = addPic;
		reader.readAsDataURL(target.files[0]);
	}
}

//讀取完將圖片加到posterArea
function addPic(event){
	$('.picFilter').attr('src',event.target.result); 	//change filter preview

	var newPic = $('<img />');
	$(newPic).attr('src',event.target.result);
	$(newPic).addClass('pic');

	//due to jquery's restriction, i have to create a container to display img element. otherwhise image can't being able to drag and resize.
	var picContainer = $("<div />");
	$(picContainer).css("display","inline-block");
	$(picContainer).append(newPic);
	$(picContainer).addClass('pic');

	singleDraggable(picContainer);
	singleResizable(picContainer);

	$('.posterArea').append(picContainer);
}

//改變圖片濾鏡
function chFilter(filterElement){
	//先清除先前的filter
	var nowFilter = $('.ui-resizable-handle').parent().attr('class').split(' ').pop();
	$('.ui-resizable-handle').parent().removeClass(nowFilter);

	var newFilter = $(filterElement).attr('class').split('picFilter')[1];
	$('.ui-resizable-handle').parent().addClass(newFilter);
}