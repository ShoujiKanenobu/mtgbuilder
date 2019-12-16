const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

const saveDeck = (req, res) => {
		pool.query('INSERT into decks (name, list) values ($1, $2)',[req.body.deckname, req.body.decklist], (error, results) => {
			if(error){
				console.log(error);
			} else {
				res.status(200);
			}
		});
};

const loadDeck = (req, res) => {
		pool.query('SELECT list from decks where deckname = $1',[req.body.deckname], (error, results) => {
			if(error){
				console.log(error);
			} else {
				let list = results.rows[0]
				res.status(200).json({decklist: list});
			}
		});
};


module.exports = {
	saveDeck,
	loadDeck
}