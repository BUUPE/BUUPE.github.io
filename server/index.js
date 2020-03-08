require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const pg = require('pg');
const sgMail = require('@sendgrid/mail'); 

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const pool = new pg.Pool({
	port: process.env.DB_PORT,
	host: process.env.DB_HOST,
	user: process.env.DB_USER,
	password: process.env.DB_PASS,
	database: process.env.DB_DB,
	max: 10
});

const app = express();
const PORT = process.env.PORT || 3030;

//Setup
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Requests
app.post('/api/contactForm', (req, res) => {
	console.log(req.body);
	
	sgMail.setApiKey(process.env.SENDGRID_API_KEY);
	const msg = {
		to: 'upe@bu.edu',
		from: req.body.email,
		subject: req.body.subject,
		text: req.body.text
	};
	
	(async () => {
		try {
			await sgMail.send(msg);
		} catch (err) {
			console.error(err.toString());
		}
	});
});

app.get('/api/getClasses', (req, res) => {
	console.log("hi");
	
	pool.connect(function(err, db, done) {
		if (err) {
			return res.status(400).send(err);
		} else {
			db.query('SELECT * from upe_members."upeClasses"', function(err, table) {
				done();
				if(err){
					return res.status(400).send(err); 
				} else {
					console.log(table.rows);
					return res.send(table.rows); 
				}
			});
		}
	});
	
});



//Listing
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

