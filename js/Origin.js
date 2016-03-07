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
	target.origin = new Origin($(target).css('top'),$(target).css('left')
		,$(target).width(),$(target).height()
		,$(target).html().replace(/<br>/g,'\n')
		,$(target).css('color'),$(target).css('font-size')
		,$(target).css('letter-spacing'),$(target).css('line-height'));
}