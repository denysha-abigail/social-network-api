const router = require('express').Router();

const { 
    getAllThoughts,
    getThoughtById,
    addThought, 
    updateThought,
    removeThought, 
    addReaction, 
    removeReaction } = require('../../controllers/thought-controller');

// set up GET all thoughts at /api/thoughts
router
    .route('/')
    .get(getAllThoughts)

// set up POST thoughts at /api/thoughts/:userId
router
    .route('/:userId')
    .post(addThought);

// set up GET, PUT, and DELETE for thoughts at /api/thoughts/:userId/:thoughtId
router
    .route('/:userId/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

// set up PUT reactions at /api/thoughts/:userId/:thoughtId/reactions
router
    .route('/:userId/:thoughtId/reactions')
    .put(addReaction)

// set up DELETE reactions at /api/thoughts/:userId/:/thoughtId/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;