//讀取圖片
function addPic(target){
	if(target.files[0]){
		//create blob object
		var blob = new Blob([target.files[0]],{type:target.files[0].type});
		var url = URL.createObjectURL(blob);

		$('.picFilter').attr('src',url); 	//change filter preview

		var newPic = $('<img />');
		$(newPic).attr('src',url);
		$(newPic).addClass('pic');

		//due to jquery's restriction, i have to create a container to display img element. otherwhise image can't being able to drag and resize.
		var picContainer = $("<div />");
		$(picContainer).css("display","inline-block");
		$(picContainer).append(newPic);
		$(picContainer).addClass('pic');

		$('.posterArea').append(picContainer); 	//先append，不然fixResizePoint會抓不到resizePoint

		singleDraggable(picContainer);
		singleResizable(picContainer);
	}
}

//改變圖片濾鏡
function chFilter(filterElement){
	//先清除先前的filter
	var nowFilter = $('.ui-resizable-handle').parent().attr('class').split(' ').pop();
	$('.ui-resizable-handle').parent().removeClass(nowFilter);

	var newFilter = $(filterElement).attr('class').split('picFilter')[1];
	$('.ui-resizable-handle').parent().addClass(newFilter);
}