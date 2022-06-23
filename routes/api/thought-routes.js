const router = require('express').Router();

const { addThought, removeThought, addReaction, removeReaction } = require('../../controllers/thought-controller');

// /api/thoughts/<userId>
// addThought -> POST callback
router
    .route('/:userId')
    .post(addThought);

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