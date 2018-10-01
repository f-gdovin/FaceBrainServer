const jwt = require('jsonwebtoken');

const handleSignIn = (db, bcrypt, redisClient) => (req, res) => {
    const { authorization } = req.headers;
    return authorization ?
        getAuthTokenId(redisClient, req, res) :
        signInUsingCredentials(db, bcrypt)(req)
            .then(data => data.id && data.email ?
                    createUserSession(redisClient, data) :
                    Promise.reject(data))
            .then(userSession => res.json(userSession))
            .catch(err => res.status(400).json(err));
};

const signInUsingCredentials = (db, bcrypt) => (req) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return Promise.reject("Incorrect form submission");
    }

    return db.select('email', 'password').from('login')
        .where('email', '=', email)
        .then(loginInfo => {
            const isValid = loginInfo && loginInfo.length > 0 && bcrypt.compareSync(password, loginInfo[0].password);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(userInfo => userInfo[0])
                    .catch(() => Promise.reject('Wrong credentials'))
            } else {
                return Promise.reject('Wrong credentials')
            }
        })
        .catch(err =>  err)
};

const getAuthTokenId = (redisClient, req, res) => {
    const { authorization } = req.headers;
    return redisClient.get(authorization, (err, reply) => {
        if (err || !reply ) {
            return res.status(401).json('Unauthorized')
        }
        res.json({ id: reply });
    })
};

const createUserSession = (redisClient, user) => {
    const { id, email } = user;
    const signedToken = signToken(email);
    return saveToken(redisClient, id, signedToken)
        .then(() => ({
            success: true,
            userId: id,
            token: signedToken,
        }))
        .catch(err => Promise.reject(err));
};

const signToken = (email) => {
    const jwtPayload = { email };
    return jwt.sign(jwtPayload, 'JWT_SECRET', { expiresIn: '2 days' });
};

const saveToken = (redisClient, id, token) => {
    return Promise.resolve(redisClient.set(token, id));
};

module.exports = {
    handleSignIn
};