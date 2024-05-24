const express = require('express');
const router = express.Router();
const matchController = require('../controllers/matchController');
const upload = require('../middlewares/multer');
const auth = require('../middlewares/auth');

// Ajouter un match avec les fichiers téléchargés
router.post('/add', auth, upload.fields([{ name: 'team1Logo', maxCount: 1 }, { name: 'team2Logo', maxCount: 1 }]), matchController.addMatch);

router.get('/', matchController.getAllMatchs);
router.patch('/:id/score', matchController.updateScore);
router.get('/reservations', matchController.getAllReservations);
router.delete('/:id', auth, matchController.deleteMatch);
router.get('/reservations/user', auth, matchController.getUserMatchReservations);

module.exports = router;
