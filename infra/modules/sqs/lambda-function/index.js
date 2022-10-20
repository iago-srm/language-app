const axios = require("axios");

exports.handler = async function(event) {

  const response = { batchItemFailures: [] };

  const promises = event.Records.map(async record => {
    try {
      const { body, messageAttributes } = record;
      console.log({body, messageAttributes});
      await axios[messageAttributes.httpMethod.stringValue](`https://${process.env.API_URL}/${messageAttributes.httpPath.stringValue}`, JSON.parse(body))

    } catch (e) {
      console.error("error",e);
      response.batchItemFailures.push({ itemIdentifier: record.messageId });
    }
  });

  await Promise.all(promises);
  console.log("response",JSON.stringify(response))
  return response;
}
