//新增textarea讓使用者直接輸入文字
function addText(){
	var newText = $("<textarea />");
	setConvertDiv(newText);
	$(".posterArea").append(newText);
	$(newText).focus();
	$(newText).click();	//取消目前有control point的element
}