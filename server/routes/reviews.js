const express = require("express");
const { authenticateJWT } = require('../middleware/authMiddleware');

const Review = require("../models/Reviews");
const router = express.Router();

router.post("/add-review/:id", authenticateJWT, async function(req,res){
    try {
        const newReview = {
            name:  req.body.postAnonymous ? 'Anonymous User' : req.body.name,
            datePosted: Date.now(),
            tradesmanId: req.params.id,
            overallRating: req.body.overallRating,
            featureRatings: req.body.featureRatings,
            textReview: req.body.textReview,
            images: req.body.imageUrls,
            postAnonymous: req.body.postAnonymous
        }
        const review = new Review(newReview)
        await review.save((err) => {
            if (err) {
              console.error(err);
              res.status(500).send('Internal Server Error');
            } else {
              res.status(200).json({ message: 'Review added successfully' });
            }
        })
    } catch (error) {
        
    }
})

router.get("/get-reviews/:id", authenticateJWT, async function(req,res){
    try {
        const reviews = await Review.find({ tradesmanId: req.params.id });

        res.status(200).json(reviews)
    } catch (error) {
        console.error('Error fetching reviews:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
        
    }
    
})

module.exports = router;