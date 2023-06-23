const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const User = require('./models/user');

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

let connection

const init = async () => {
  try {
    let user = await User.findOne({ id: 123123 });

    if (!user) {
      // User does not exist, so create a new one
      user = new User({
        id: 123123,
        first_name: 'moshe',
        last_name: 'israeli',
        birthday: new Date('1990-01-10T00:00:00.000Z'),
      });

      await user.save();
      console.log('User created!');
    } else {
      console.log('User exists!');
    }
  } catch (err) {
    console.error(err);
  }
}

const connectToDatabase = async (connectionString) => {
  console.log(connectionString)

  // If Mongoose is not disconnected, close the current connection
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }

  // Open a new connection
  const connection = await mongoose.connect(`mongodb://localhost:27017/${connectionString}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return connection;
};

const costController = require('./controllers/cost_controller');
const userController = require('./controllers/user_controller');

// Route for adding a cost
app.post('/addcost/', costController.addCost);

// Route for generating a report
app.get('/report/', costController.getReport);

// Route for retrieving user information
app.get('/about/', userController.getAbout);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));


connectToDatabase('cm');

init()


module.exports = { app, connectToDatabase };
