//讓所有posterArea裡面的原件都能draggable
function activateAll(){
	$(".posterArea").children("div").draggable({
    	containment: ".posterArea"
	});
}

//讓新產生的div能有draggable的效果
function singleActivate(target){
	$(target).draggable({
		containment: ".posterArea"
	});
}