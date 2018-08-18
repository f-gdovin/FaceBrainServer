const Clarifai = require('clarifai');

const app = new Clarifai.App({
    apiKey: 'f1e1465f2808430e8416b62327e5a125'
});

const handleApiCall = (req, res) => {
    const { input } = req.body;

    app.models.predict(Clarifai.FACE_DETECT_MODEL, input)
        .then(data => res.json(data))
        .catch(err => res.status(400).json("Unable to handle ClarifAi API call"))
};

const handleImage = (db) => (req, res) => {
    const {id} = req.body;
    db('users')
        .where('id', '=', id)
        .increment('usecount', 1)
        .returning('usecount')
        .then(useCounts => res.json(Number(useCounts[0])))
    // .catch(res.status(404).json('Error updating use count'))
};

module.exports = {
    handleImage,
    handleApiCall
};