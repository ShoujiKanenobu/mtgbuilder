const mtg = require('mtgsdk');

const handleList = (req, res) => {
	console.log("handlelist called");
	let results = [];
	let parsedList = [];
	let deck = req.body.decklist;

	var i = 0;

	let lines = deck.split('\n');
	console.log("Going to while loop");
	lines.forEach(forEachFunction);
	function forEachFunction(line, index)
	{
		console.log("In loop");
		console.log(line);
		let parts = line.split(' ');
		let numCard = parseInt(parts[0]);
		parts.shift();
		let name = parts.join(" ");

		if (name.length > 0)
		{
			mtg.card.where({name: `${name}`})
			.then(result => {
				i++;
				results.push(result[0]);
				console.log(i);
				if(i >= lines.length)
				{
					res.status(200).json(results);
				}
			})
		}

		
	}
};

module.exports = {
	handleList
}