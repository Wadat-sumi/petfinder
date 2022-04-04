const petfinder = require("@petfinder/petfinder-js");

const Api = {
  apiKey: process.env.REACT_APP_API_KEY,
  secret: process.env.REACT_APP_API_SECRET,
};

const client = new petfinder.Client(Api);

export default client;
