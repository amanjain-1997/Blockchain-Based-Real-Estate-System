const express = require('express')
var fs = require('fs');
var path=require('path')
var session = require('express-session');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');
//var User = require('./models/user');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
const multer = require("multer");
var pdf = require("pdf-creator-node");
 
// Read HTML 
var html = fs.readFileSync('1.html', 'utf8');



mongoose.connect('mongodb://localhost/LandRecords');

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {

});

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
         user: 'amanjain1483@gmail.com',
         pass: 'newnewpokemon14'
     }
 });

var options={
index:false
}




const app = express()

const port = 3000


app.use(express.static(path.join(__dirname, 'src'), options));
app.use(express.static(path.join(__dirname, 'build/contracts'), options));


app.use(session({
	secret: 'secret',
	resave: true,
   saveUninitialized: true,
   store: new MongoStore({
    mongooseConnection: db
  })
	// cookie: { secure: true }
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

var Schema = mongoose.Schema;

userSchema = new Schema( {
	landid: String,
	rooms: String,
	sqrt: String,
	price: String,
  description: String,
  images: [
    {
    }
   ]
}),
User = mongoose.model('Record', userSchema);

var optionspdf = {
  format: "A4",
  orientation: "portrait",
  border: "15mm",
  header: {
      height: "45mm",
      contents: '<h2>BPRES</h2> <h2><center>Blockchain Property Report</center></h2>'
  },
  "footer": {
      "height": "28mm",
      "contents": {
      first: '1',
      2: '2', // Any page number is working. 1-based index
      default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
      last: 'Last Page'
  }
}};
var users = [
  {
      name:"Shyam",
      age:"26"
  },
  {
      name:"Navjot",
      age:"26"
  },
  {
      name:"Vitthal",
      age:"26"
  }
]



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
var storage	=	multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './src/img/properties');
  },
  filename: function (req, file, callback) {

    callback(null, Date.now() + path.extname(file.originalname));
  }
});
var upload = multer({ storage : storage}).single('userPhoto');

app.post('/upload',function(req,res){
 var land_id= req.query.id;

	upload(req,res,function(err) {
    console.log("dataa"+land_id)
    storepath=req.file.destination;
    var mongourl= storepath.replace('./src/','') + '/' + req.file.filename;
    console.log(mongourl);
   
    var myquery = { landid:  land_id };

   User.update( myquery , { $push: { images: mongourl } },function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
    });  


		if(err) {
		return res.end("Error uploading file.");
		}
		res.end("File is uploaded");
	});
});

app.get('/', function(request, response) {
	response.redirect('/home');
});

app.get('/login', function(request, response) {
	if (request.session.loggedin && request.session.username=="admin") {
    response.redirect('/adminhome');

  } else if(request.session.loggedin){
	response.redirect('/home');
  } else {
    response.sendFile(__dirname + '/src/login.html');
  }
});

app.post('/otp', function(request, response) {
  var digits = '0123456789'; 
  let OTP = ''; 
  for (let i = 0; i < 4; i++ ) { 
      OTP += digits[Math.floor(Math.random() * 10)]; 
  } 
  var atposition=request.body.username.indexOf("@");  
  var dotposition=request.body.username.lastIndexOf(".");  
  if (atposition < 1 || dotposition<atposition+2 || dotposition+2>= request.body.username.length){  
    
    response.sendFile(__dirname + '/src/login.html');
  }  
  request.session.email=request.body.username;
  console.log(request.session.email);
  request.session.otp=OTP;
  if(request.body.username)
  var mailOptions = {
    from: 'bpres@gmail.com',
    to: request.body.username,
    subject: 'Sending Email using Node.js',
    text: OTP
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);

    }
  });
 
  response.sendFile(__dirname + '/src/login2.html');

   
  });

  app.post('/landupdate', function(request,response){
    console.log(request.body);
    var myquery = { landid:  request.body.currenturl };
    var newvalues = { $set: {rooms: request.body.room, sqrt: request.body.sqrt, price:request.body.price, description: request.body.desc } };  
  
    User.updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
    });

  });


  app.post('/landinsert', function(request,response){
    console.log(request.body.land_id);
    console.log(request.get('host')+request.originalUrl);
    var newPerson = new User({
    	landid: request.body.land_id,
	    rooms: "",
	    sqrt: "",
	    price: "",
      description:"",
      images:[]
    });

    newPerson.save(function(err, Person){
      if(err)
        console.log(err);
      else
        console.log('Success');
    }); 
  
  });


app.get('/abc', function(request,response){
  console.log(request.query.lid);
  User.findOne({ landid: request.query.lid}, function(err, res) {
       if (err) throw err;
       response.send(res);
       
  });

      
  });

  app.post('/pdf', function(request,response){
    console.log(request.body.result);
    var document = {
      html: html,
      data: {
      users: request.body.result
      },
      path: "./src/output.pdf"
      };

    pdf.create(document, optionspdf)
    .then(res => {
      response.end("hello");
    })
    .catch(error => {
        console.error(error)
    });
        
    });

  app.get('/getpropertydata', function(request,response){
    console.log(request.query.lid);
    User.findOne({ landid: request.query.lid}, function(err, res) {
         if (err) throw err;
         response.send(res);
         
    });
  
        
    });


app.post('/auth', function(request, response) {
var username = request.body.username;
  var password = request.body.password;
  console.log(request.session.otp);
	if (username && password) {

			if (password == request.session.otp) {
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/home');
			} else if(username == "admin" && password == "admin"){
				request.session.loggedin = true;
				request.session.username = username;
				response.redirect('/adminhome');
			}
			else  {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
	
  } 
    else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});


app.get('/home', function(request, response) {

    if (request.session.loggedin) {
      response.sendFile(__dirname + '/src/searchproperty.html');
    } else {
      response.redirect('./login');
    }
  });
  app.get('/adminhome', function(request, response) {
	//response.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	console.log(request.session.loggedin);
    if (request.session.loggedin) {

      response.sendFile(__dirname + '/src/searchpropertyadmin.html');
    } else {
		console.log("Reached");
      response.redirect('./login');
    }
  });
  app.post('/ipfsimpl', function(request,response){
    console.log("hello");
  });

  app.get('/storeproperty', function(request, response) {

    if (request.session.loggedin) {
      response.sendFile(__dirname + '/src/storeproperty.html');
    } else {
      response.redirect('./login');
    }
  });
  app.get('/getdocument', function(request, response) {

    if (request.session.loggedin) {
      response.sendFile(__dirname + '/src/template.html');
    } else {
      response.redirect('./login');
    }
  });
  app.get('/contact', function(request, response) {

    if (request.session.loggedin && request.session.username=="admin" ) {
      response.sendFile(__dirname + '/src/admincontact.html');
	}
	else if(request.session.loggedin){
		if (request.session.loggedin ) {
			response.sendFile(__dirname + '/src/contact.html');
		  }
	}
	 else {
      response.redirect('./login');
    }
  });
  app.get('/propertylist', function(request, response) {

    if (request.session.loggedin && request.session.username=="admin" ) {
      response.sendFile(__dirname + '/src/adminproperty-list.html');
	}
	else if(request.session.loggedin){
		if (request.session.loggedin ) {
			response.sendFile(__dirname + '/src/property-list.html');
		  }
	}
	 else {
      response.redirect('./login');
    }
  });
  app.get('/logout', function(request, response) {
	request.session.destroy();
	response.redirect('./login');
	//response.clearCookie(session.cookie);
//return resppnse.status(200).redirect('/login');


  });



 