function toggleButton(element){
	console.log(element.getAttribute('selected'));
	if(element.getAttribute('selected')=='true'){
		element.style.backgroundColor='lightgrey';
		element.setAttribute('selected','false');
	}
	else{
		element.style.backgroundColor='grey';
		element.setAttribute('selected','true');
	}
}
function test(element){
	element.style.height='100%';
}
function toggleEC(element){
	var content=element.parentNode.getElementsByClassName('content')[0];
	content.style.transform='scaleY(1)';	
}
	
	
