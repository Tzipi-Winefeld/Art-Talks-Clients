const express = require('express');
const router = express.Router();
const { getImageDetails } = require('../services/imageService');

// get the list of all pictures
router.get('/', (req, res) => {
    const pictures = [
        { id: 1, name: "image1.png", artist: "Artist 1", description: "Lorem ipsum", ...getImageDetails('image1.png') },
        { id: 2, name: "image2.png", artist: "Artist 2", description: "Lorem ipsum", ...getImageDetails('image2.png') },
        { id: 3, name: "image3.png", artist: "Artist 3", description: "Lorem ipsum", ...getImageDetails('image3.png') },
        { id: 4, name: "image4.png", artist: "Artist 4", description: "Lorem ipsum", ...getImageDetails('image4.png') },
        { id: 5, name: "image5.png", artist: "Artist 5", description: "Lorem ipsum", ...getImageDetails('image5.png') },
        { id: 6, name: "image6.png", artist: "Artist 6", description: "Lorem ipsum", ...getImageDetails('image6.png') },
    ];
    res.json(pictures);
});

// get a specific picture
router.get('/:id', (req, res) => {
    const pictureId = parseInt(req.params.id, 10);
    const pictures = [
        { id: 1, name: "image1.png", artist: "Artist 1", description: "Lorem ipsum", ...getImageDetails('image1.png') },
        { id: 2, name: "image2.png", artist: "Artist 2", description: "Lorem ipsum", ...getImageDetails('image2.png') },
        { id: 3, name: "image3.png", artist: "Artist 3", description: "Lorem ipsum", ...getImageDetails('image3.png') },
        { id: 4, name: "image4.png", artist: "Artist 4", description: "Lorem ipsum", ...getImageDetails('image4.png') },
        { id: 5, name: "image5.png", artist: "Artist 5", description: "Lorem ipsum", ...getImageDetails('image5.png') },
        { id: 6, name: "image6.png", artist: "Artist 6", description: "Lorem ipsum", ...getImageDetails('image6.png') },
    ];

    const picture = pictures.find(pic => pic.id === pictureId);
    if (picture) {
        res.json(picture);
    } else {
        res.status(404).json({ error: "picture not found" });
    }
});

module.exports = router; 
