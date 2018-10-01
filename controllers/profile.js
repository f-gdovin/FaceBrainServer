const handleProfile = (db) => (req, res) => {
    const { id } = req.params;
    db.select('*').from('users').where({ id })
        .then(users => {
            if (users.length) {
                res.json(users[0])
            } else {
                res.status(404).json('Not found');
            }
        })
        .catch(err => res.status(500).json('Error fetching data'))
};

const handleProfileUpdate = (db) => (req, res) => {
    const { id } = req.params;
    const { name } = req.body.formInput;
    db('users').where({ id })   // id = id
        .update({ name })
        .then(resp => {
            if (resp) {
                res.json("Profile updated")
            } else {
                res.status(404).json('Unable to update profile');
            }
        })
        .catch(err => res.status(500).json('Error updating user'))
};

module.exports = {
    handleProfile, handleProfileUpdate
};