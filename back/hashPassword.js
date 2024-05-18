const bcrypt = require('bcrypt');

const password = 'Password123@'; // Remplacez par le mot de passe de votre choix
const saltRounds = 10;

bcrypt.hash(password, saltRounds, (err, hash) => {
  if (err) {
    console.error('Erreur lors du hachage du mot de passe', err);
    return;
  }
  console.log('Mot de passe haché:', hash);
});
