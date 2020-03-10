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


//Login API
app.post('/api/login', (req,res) => {
	var email= req.body.email;
	var password = req.body.password;
	pool.connect(function(err, db, done) {
		if (err) {
			return res.status(400).send(err);
		} else {
			db.query('SELECT * FROM upe_users.users WHERE email = $1', [email], function(error, results, fields) {
				var rows = results.rows;
				done();
				if(error){
					return res.status(400).send(error); 
				} else {
					if (rows.length > 0) {
						console.log('The solution is: ', results);
						if(rows[0].password == password) {
							return res.status(200).send("success");
						} else {
							return res.status(204).send("No match");
						}
					} else {
						return res.status(204).send("Email does not exits"); 
					}
				}
			});
		}
	});
});



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








//Listing
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

