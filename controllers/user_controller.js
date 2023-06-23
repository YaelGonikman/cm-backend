const User = require('../models/user');

// GET /about
async function getAbout(req, res) {
  try {
    res.send(
      [{ 'firstname': 'Yael', 'lastname': 'Gonikman', 'id': 206752396, 'email': 'yaelgonikman@gmail.com' },
      { 'firstname': 'Shay', 'lastname': 'Peretz', 'id': 319126405, 'email': 'shay28561@gmail.com' }]
    );
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).send('Internal Server Error');
  }
}

// Export the route handler
module.exports = {
  getAbout,
};
