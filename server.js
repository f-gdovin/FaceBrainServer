const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const morgan = require('morgan');
const bcrypt = require('bcrypt-nodejs');

const heartbeat = require('./controllers/heartbeat');
const profile = require('./controllers/profile');
const signIn = require('./controllers/signIn');
const register = require('./controllers/register');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: process.env.DATABASE_URI
});

const whitelist = ['http://localhost:3001'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
};

const app = express();

app.use(morgan('combined'));
app.use(cors(corsOptions));
app.use(bodyParser.json());

// just a heartbeat test
app.get('/', heartbeat.testHeartbeat(db));

// every of these functions will receive (req, res) as well
app.get('/profile/:id', profile.handleProfile(db));

app.post('/signin', signIn.handleSignIn(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.post('/imageurl', image.handleApiCall);
app.put('/image', image.handleImage(db));

app.listen(process.env.PORT || 3000, () => {
    console.log(`FaceBrain server running at ${process.env.PORT || 3000}`)
});