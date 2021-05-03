let mongoose = require('mongoose');
var uri = "mongodb://127.0.0.1:27017/assignment";

mongoose
  .connect(uri, { useNewUrlParser: true, connectTimeoutMS: 1000 })
  .then((res) => console.log('Connection Established'))
  .catch((error) => console.log("Disconnected", error));

let express = require('express');
let app = express();
let cors = require('cors');
// let bodyParser = require('body-parser')
let http = require("http");
let photoRoute = require('./route/photoRoute');
let port = 5000;


app.use(cors());
app.all("*", function (req, res, next) {
	res.set("Access-Control-Allow-Origin", "*");
	res.set("Access-Control-Allow-Credentials", true);
	res.set("Access-Control-Allow-Methods", "POST,GET,PUT,DELETE");
	res.set(
		"Access-Control-Allow-Headers",
		"X-Requested-With, Content-Type, Authorization"
	);
	if ("OPTIONS" == req.method) return res.sendStatus(200);
	next();
});

app.use('/',photoRoute);

let server = http.createServer(app);
server.listen(
    port, 
    () => console.log(`app listening at http://localhost:${port}`)
  );