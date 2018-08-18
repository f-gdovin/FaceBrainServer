const handleProfile = (db) => (req, res) => {
    const {id} = req.params;
    db.select('*').from('users').where('id', id)
        .then(users => {
            if (users.length) {
                res.json(users[0])
            } else {
                res.status(404).json('Not found');
            }
        })
        .catch(res.status(500).json('Error fetching data'))
};

module.exports = {
    handleProfile
};