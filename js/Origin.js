function Origin(top,left,width,height,text,color,size,letterSpacing,lineHeight){
	this.top = top;
	this.left = left;
	this.text = text;
	this.color = color;
	this.size = size;
	this.width = width;
	this.height = height;
	this.letterSpacing = letterSpacing;
	this.lineHeight = lineHeight;
}

function initElementOrigin(target){
	$(target)[0].origin = new Origin($(target).position().top,$(target).position().left
		,$(target).width(),$(target).height()
		,$(target).html().replace(/<br>/g,'\n').replace(/<[^>]*>/g, "")
		,$(target).css('color'),$(target).css('font-size')
		,$(target).css('letter-spacing'),$(target).css('line-height'));
}