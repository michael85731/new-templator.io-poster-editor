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
	var newPic = $('<img />');
	$(newPic).attr('src',event.target.result);
	$(newPic).addClass('pic');
	
	//due to jquery's restriction, i have to create a container to display img element. otherwhise image can't being able to drag and resize.
	var picContainer = $("<div />");
	$(picContainer).css("display","inline-block");
	$(picContainer).append(newPic);

	$(newPic).resizable();
	$(picContainer).draggable();

	$('.posterArea').append(picContainer);
}