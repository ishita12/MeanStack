const express =  require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const config = require('./config/database');
const path = require('path');
const bodyParser = require('body-parser');
const authentication = require('./routes/authentication')(router);
const blogs = require('./routes/blog')(router);
const jobs = require('./routes/job')(router);
const rooms = require('./routes/room')(router);
const chats = require('./routes/chat')(router);
const cors = require('cors');

mongoose.connect(config.database);
mongoose.connection.on('connected', ()=> {
  console.log('connected to database  '+ config.database);
});

mongoose.connection.on('error', (err)=> {
  console.log('error '+ err);
});

app.use(function(req, res, next){
	// Specify the Domain you wish to allow or give * to allow all 	origins.
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

	// Request methods you wish to allow or * to allow all.
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');

	// Check if preflight request
	if (req.method === 'OPTIONS') {
    	res.status(200);
    	res.end();
	}
	else {
    	// Pass to next layer of middleware
    	next();
	}
});


app.use(bodyParser.json());
app.use(express.static(__dirname +  '/client/dist/'));
app.use('/authentication', authentication);
app.use('/blogs', blogs);
app.use('/jobs', jobs);
app.use('/rooms', rooms);
app.use('/chats', chats);
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(8080, () => {
  console.log('listening to port 8080');
});
