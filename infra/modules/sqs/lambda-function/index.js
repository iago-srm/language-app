const axios = require("axios");

exports.handler = async function(event) {

  const response = { batchItemFailures: [] };

  const promises = event.Records.map(async record => {
    try {
      const { body, messageAttributes } = record;
      console.log({body, messageAttributes});
      // await axios[messageAttributes.httpMethod](`${process.env.API_URL}/${messageAttributes.httpPath}`, body)
    } catch (e) {
      response.batchItemFailures.push({ itemIdentifier: record.messageId });
    }
  });
  console.log("API_URL",process.env.API_URL);

  await Promise.all(promises);
  return response;
}
