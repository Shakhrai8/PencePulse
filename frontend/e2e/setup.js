var mongoose = require('mongoose');

beforeAll(function (done) {
  mongoose.connect('mongodb://0.0.0.0/pencepulse_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.on('open', function () {
    done();
  });
});

beforeEach(async () => {
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});
