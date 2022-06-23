const router = require('express').Router();

const { 
    getAllThoughts,
    getThoughtById,
    updateThought,
    addThought, 
    removeThought, 
    addReaction, 
    removeReaction } = require('../../controllers/thought-controller');

// /api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

// /api/thoughts/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought);
    
// /api/thoughts/<userId>/<thoughtId>
// removeThought -> DELETE callback
router
    .route('/:userId/:thoughtId')
    .put(addReaction)
    .delete(removeThought);

// /api/thoughts/<userId>/<thoughtId>/<reactionId>
// removeReaction -> DELETE callback
router
    .route('/:userId/:/thoughtId/:reactionId')
    .delete(removeReaction);

module.exports = router;