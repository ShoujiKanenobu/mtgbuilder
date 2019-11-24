const mtg = require('mtgsdk');

const handleList = (req, res) => {
	console.log("handlelist called");
	let results = [{}];
	let deck = req.body.decklist;
	let parsedList = [];

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


			mtg.card.where({name: `${name}`})
			.then(result => {
				results.push(result);
			})


		}
	
	res.status(200).json(results);
};

module.exports = {
  handleList
}