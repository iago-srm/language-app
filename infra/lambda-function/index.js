const axios = require("axios");

exports.handler = async function(event) {

  for(let record of event.Records) {
    console.log({record});
  }
  //console.log({event, context})


  return {};
}
