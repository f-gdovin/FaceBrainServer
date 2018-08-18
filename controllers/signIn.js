const handleSignIn = (db, bcrypt) => (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json("Incorrect form submission");
    }

    db.select('email', 'password').from('login')
        .where('email', '=', email)
        .then(loginInfo => {
            const isValid = bcrypt.compareSync(password, loginInfo[0].password);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(userInfo => res.status(200).json(userInfo[0]))
                    .catch(err => res.status(404).json('Wrong credentials'))
            } else {
                res.status(404).json('Wrong credentials')
            }
        })
        .catch(err => res.status(404).json('Wrong credentials'))
};

module.exports = {
    handleSignIn
};