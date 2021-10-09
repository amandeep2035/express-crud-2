const express = require('express');
const router = express.Router();
const {
    index,
    show,
    create,
    update,
    destroy,
} = require('../controllers/student');

/* GET get all students /students */
router.get('/', index);

/* POST create a students /students */
router.post('/', create);

/* GET get single students /students/:id */
router.get('/:id', show);

/* PUT update a students /:id/edit */
router.put('/:id', update);

/* DELETE delete a students students/:id */
router.delete('/:id', destroy);

module.exports = router;