const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');

const profile = require('./controllers/profile');
const signIn = require('./controllers/signin');
const register = require('./controllers/register');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'postgres',
        database: 'smart-brain'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

// just a heartbeat test
app.get('/', (req, res) => res.send('Server alive'));

// every of these functions will receive (req, res) as well
app.get('/profile/:id', profile.handleProfile(db));

app.post('/signin', signIn.handleSignIn(db, bcrypt));

app.post('/register', register.handleRegister(db, bcrypt));

app.post('/imageurl', image.handleApiCall);
app.put('/image', image.handleImage(db));

app.listen(process.env.PORT || 3000, () => {
    console.log(`App running at ${process.env.PORT || 3000}`)
});