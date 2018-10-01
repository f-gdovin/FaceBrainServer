const express = require('express');

// middlewares
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const auth = require('./middlewares/authorization');

const knex = require('knex');
const redis = require('redis');
const bcrypt = require('bcrypt-nodejs');

const heartbeat = require('./controllers/heartbeat');
const profile = require('./controllers/profile');
const signIn = require('./controllers/signIn');
const register = require('./controllers/register');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: process.env.POSTGRES_URI
});
const redisClient = redis.createClient(process.env.REDIS_URI);

const whitelist = ['http://localhost:3001'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error(`${origin} is not allowed by CORS`))
        }
    }
};

const app = express();

app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(bodyParser.json());

// just a heartbeat test
app.get('/', heartbeat.testHeartbeat(db));

// public routes
app.post('/signin', signIn.handleSignIn(db, bcrypt, redisClient));
app.post('/register', register.handleRegister(db, bcrypt));

// authenticated routes
app.get('/profile/:id', auth.checkAuth(redisClient), profile.handleProfile(db));
app.put('/profile/:id', auth.checkAuth(redisClient), profile.handleProfileUpdate(db));

app.put('/image', auth.checkAuth(redisClient), image.handleImage(db));
app.post('/imageurl', auth.checkAuth(redisClient), image.handleApiCall);

app.listen(process.env.PORT || 3000, () => {
    console.log(`FaceBrain server running at ${process.env.PORT || 3000}`)
});