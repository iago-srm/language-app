const axios = require("axios");

exports.handler = async function(event) {

  for(let record of event.Records) {
    console.log({record});
  }
  console.log("API_URL",process.env.API_URL);

  return {};
}
