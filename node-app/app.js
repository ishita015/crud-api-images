const express = require('express');
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Headers", 
		"*"
	);
	if(req.method == 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'GET, POST, DELETE');
		return res.status(200).json({});
	}
	next();
});
const detail = require('./api/routes/detailRoutes')
app.use(express.static('./api/upload-image'));
app.use('/detail', detail);
app.use('/uploads',express.static('api/upload-image/'));
const product = require('./api/routes/productRoutes')
app.use('/product',product);

module.exports = app;