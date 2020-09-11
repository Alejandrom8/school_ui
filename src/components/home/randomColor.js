function getRandom(limit){
	let number = Math.round(Math.random() * limit);
	return number <= limit ? number : --number;
}

function randomColor(range){
	let colors = range;
	let index;
	index = getRandom(colors.length);
	return colors[index];
}

export default randomColor;