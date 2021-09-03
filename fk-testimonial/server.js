var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
var session = require('express-session');
const dotenv = require("dotenv");
const storage = require('node-sessionstorage');
const cluster = require('cluster');
const farmhash = require('farmhash');
const net = require('net');

dotenv.config()
const cors = require('cors');
const cpuCount = require('os').cpus().length;
const workersCount = cpuCount === 1 ? 1 : cpuCount - 1;

const app = express();
app.use(cors());

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);
  // Count the machine's CPUs
  const workers = [];

  const spawnWorker = (id) => {
    workers[id] = cluster.fork();

    workers[id].once('exit', (code, signal) => {
      console.log(`Respawning worker with id ${id}`);
      spawnWorker(id)
    })
  };

  // Create a worker for each CPU
  for (let i = 0; i < workersCount; i += 1) {
    spawnWorker(i)
  }

  const getWorkerIndex = (ip, numberProcesses) => {
    return farmhash.fingerprint32(ip) % numberProcesses
  };


  const server = net.createServer({ pauseOnConnect: true }, (connection) => {
    const workerIndex = getWorkerIndex(connection.remoteAddress, workersCount);
    let worker = workers[workerIndex];
    worker.send('sticky-session:connection', connection)
  });

  server.listen(process.env.PORT || 5000, () => {
    console.log(`Master started listening at port ${process.env.PORT || 5000}`)
  })

// Code to run if we're in a worker process
}
else {
  console.log(`Worker ${process.pid} is running`)

  const authTokens = {
    token: '', tokenSecret: '', id: ''
  }

  passport.serializeUser(function (user, callback) {
    callback(null, user);
  });

  passport.deserializeUser(function (obj, callback) {
    callback(null, obj);
  });


  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  const http = require('http').Server(app)
  app.use(cookieParser());
  app.use(session({
    cookie: {
      maxAge: 2 * 24 * 60 * 60 * 1000,
      //Please note that secure: true is a recommended option. However, it requires an https-enabled website
      secure: false
    },
    name: 'sessionId',
    resave: false,
    saveUninitialized: false,
    secret: '3U8K0A9M3N7FISDHI486',
  }))
  app.use(passport.initialize())
  app.use(passport.session());
  app.use(express.static(path.join(__dirname, "static")));
  app.use(express.static(path.join(__dirname, "build", "static")));
  app.use("/testimonials", express.static(path.join(__dirname, "build", "static")));
  // app.use('/testimonials/*', express.static(path.join(__dirname, "build", "static")));
  app.use("/sharestories", express.static(path.join(__dirname, "build", "static")));
  // app.use('/v1/api/*', express.static(path.join(__dirname, "build", "static")));

  //Strategies
  passport.use(new Strategy({
    consumerKey: process.env.CONSUMER_KEY,
    consumerSecret: process.env.CONSUMER_SECRET,
    callbackURL: '/v1/api/twitter-callback'
  }, async function (token, tokenSecret, profile, callback) {
    authTokens.token = token;
    authTokens.tokenSecret = tokenSecret;
    storage.setItem('twitter-auth', JSON.stringify(authTokens))
    return callback(null, authTokens);
  }));

  passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_KEY,
    clientSecret: process.env.LINKEDIN_SECRET,
    callbackURL: "/v1/api/linkedin-callback",
    scope: ['r_emailaddress', 'r_liteprofile', 'w_member_social'],
  }, function (accessToken, refreshToken, profile, done) {
    authTokens.token = accessToken;
    authTokens.id = profile.id;
    storage.setItem('linkedin-auth', JSON.stringify(authTokens))
    return done(null, authTokens);
  }));


  require("./backend/routes/index")(app);


  const startHTTPServer = (http) => {
    //all the child processes will share this port
    http.listen(8000, () => {
      // here the server should listen at random port which is assigned by passing a 0
      // since we are using cluster module, the port is random in first worker process, the rest
      // worker processes will all listen to this same port

      //console.log(JSON.stringify(environment))
      // prints the value of random port number the child processes are listening tos
      console.log(`server started at port ${8000}`)
    })
  };
  startHTTPServer(http)
  // app.listen(process.env.PORT || 5000);

  process.on('message', (message, connection) => {
    if (message !== 'sticky-session:connection') {
      return
    }

    // for testing purposes
    console.log(`Request sent to worker process with pid ${process.pid}`)
    http.emit('connection', connection)

    connection.resume()
  })

}