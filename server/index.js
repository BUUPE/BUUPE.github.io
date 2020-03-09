require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


//Email API
app.post('/api/email/contactForm', (req, res) => {
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



//Members API
app.get('/api/Classes/get/Classes', (req, res) => {
	var db = req.query.db;
	console.log(`SELECT * from upe_members."${db}"`);
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

app.get('/api/Classes/get/Alpha', (req, res) => {
	pool.connect(function(err, db, done) {
		if (err) {
			return res.status(400).send(err);
		} else {
			db.query('SELECT * from upe_members."alphaClass"', function(err, table) {
				done();
				if(err){
					return res.status(400).send(err); 
				} else {
					return res.send(table.rows); 
				}
			});
		}
	});
	
});

app.get('/api/Classes/get/Beta', (req, res) => {
	pool.connect(function(err, db, done) {
		if (err) {
			return res.status(400).send(err);
		} else {
			db.query('SELECT * from upe_members."betaClass"', function(err, table) {
				done();
				if(err){
					return res.status(400).send(err); 
				} else {
					return res.send(table.rows); 
				}
			});
		}
	});
	
});

app.get('/api/Classes/get/Gamma', (req, res) => {
	pool.connect(function(err, db, done) {
		if (err) {
			return res.status(400).send(err);
		} else {
			db.query('SELECT * from upe_members."gammaClass"', function(err, table) {
				done();
				if(err){
					return res.status(400).send(err); 
				} else {
					return res.send(table.rows); 
				}
			});
		}
	});
	
});

app.get('/api/Classes/get/Delta', (req, res) => {
	pool.connect(function(err, db, done) {
		if (err) {
			return res.status(400).send(err);
		} else {
			db.query('SELECT * from upe_members."deltaClass"', function(err, table) {
				done();
				if(err){
					return res.status(400).send(err); 
				} else {
					return res.send(table.rows); 
				}
			});
		}
	});
	
});

app.get('/api/Classes/get/Alumni', (req, res) => {
	pool.connect(function(err, db, done) {
		if (err) {
			return res.status(400).send(err);
		} else {
			db.query('SELECT * from upe_members."alumniClass"', function(err, table) {
				done();
				if(err){
					return res.status(400).send(err); 
				} else {
					return res.send(table.rows); 
				}
			});
		}
	});
	
});

app.get('/api/Classes/get/EBoard', (req, res) => {
	pool.connect(function(err, db, done) {
		if (err) {
			return res.status(400).send(err);
		} else {
			db.query('SELECT * from upe_members."upeEboard"', function(err, table) {
				done();
				if(err){
					return res.status(400).send(err); 
				} else {
					return res.send(table.rows); 
				}
			});
		}
	});
	
});

app.post('/api/Classes/add/Classes', (req, res) => {});
app.post('/api/Classes/add/Alpha', (req, res) => {});
app.post('/api/Classes/add/Beta', (req, res) => {});
app.post('/api/Classes/add/Gamma', (req, res) => {});
app.post('/api/Classes/add/Delta', (req, res) => {});
app.post('/api/Classes/add/Alumni', (req, res) => {});
app.post('/api/Classes/add/EBoard', (req, res) => {});

app.post('/api/Classes/delete/Classes', (req, res) => {});
app.post('/api/Classes/delete/Alpha', (req, res) => {});
app.post('/api/Classes/delete/Beta', (req, res) => {});
app.post('/api/Classes/delete/Gamma', (req, res) => {});
app.post('/api/Classes/delete/Delta', (req, res) => {});
app.post('/api/Classes/delete/Alumni', (req, res) => {});
app.post('/api/Classes/delete/EBoard', (req, res) => {});

app.post('/api/Classes/edit/Classes', (req, res) => {});
app.post('/api/Classes/edit/Alpha', (req, res) => {});
app.post('/api/Classes/edit/Beta', (req, res) => {});
app.post('/api/Classes/edit/Gamma', (req, res) => {});
app.post('/api/Classes/edit/Delta', (req, res) => {});
app.post('/api/Classes/edit/Alumni', (req, res) => {});
app.post('/api/Classes/edit/EBoard', (req, res) => {});



//Events API
app.get('/api/Events/get', (req, res) => {
	pool.connect(function(err, db, done) {
		if (err) {
			return res.status(400).send(err);
		} else {
			db.query('SELECT * from upe_events."events"', function(err, table) {
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

app.post('/api/Events/add', (req, res) => {});
app.post('/api/Events/edit', (req, res) => {});
app.post('/api/Events/delete', (req, res) => {});








//Listing
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

