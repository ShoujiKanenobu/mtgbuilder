const mtg = require('mtgsdk');
const https = require('https');

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

const searchPrice = (req, res) => {
	console.log("handlelist called");
	let results = {total: 0, missedCards: []};
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
		let name = parts.join("+");

		if (name.length > 0)
		{
			https.get('https://api.scryfall.com/cards/named?fuzzy=' + name, (resp) => {
  					let data = '';
 					 resp.on('data', (chunk) => {
    					data += chunk;
  					});

  					resp.on('end', () => {
  						i++;
  						let parsedData = JSON.parse(data)
  						if(parsedData.prices.usd != null)
  							results.total += parseInt(parsedData.prices.usd);
  						else
  						{
  							name = name.replace(/\+/g, " ");
  							results.missedCards.push(name);
  						}
  						if(i >= lines.length)
  						{
  							res.status(200).json(results);
  						}
  					});

					}).on("error", (err) => {
  						res.status(400)
					});
		}

		
	}
};

module.exports = {
	handleList,
	searchPrice
}