const handleRegister = (db, bcrypt) => (req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json("Incorrect form submission");
    }

    // sync because we want transaction here
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
        trx
            .insert({
                email: email,
                password: hash,
            })
            .into('login')
            .returning('email')
            .then(loginEmail => {
                console.log(`Inserted into 'login' table, continuing with email ${loginEmail}`);
                return trx('users')
                    .returning('*')
                    .insert({
                        name: name,
                        email: loginEmail[0],
                        joined: new Date()
                    })
                    .then(user => {
                        console.log(`Inserted into 'users' table, returning ${user[0]}`);
                        res.status(200).json(user[0])
                    })
            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(() => res.status(400).json("Unable to register"));
};

module.exports = {
    handleRegister
};