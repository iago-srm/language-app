import { IQueueService } from "../ports";
import AWS, { SQS } from 'aws-sdk';
import { promisify } from 'util';
import { HTTPDefinition } from '@language-app/common-core'

export class SQSService implements IQueueService {

  private _sqs: SQS;

  constructor() {
    AWS.config.update({ region: 'us-east-1' });
    this._sqs = new AWS.SQS({apiVersion: '2012-11-05'});
  }

  async sendMessage(message: any, queueUrl: string, destinationEndpoint: HTTPDefinition) {

    const sendMessage = promisify(this._sqs.sendMessage.bind(this._sqs));

    console.log("platform code",{queueUrl, message});
    await sendMessage({
      // Remove DelaySeconds parameter and value for FIFO queues
      DelaySeconds: 10,
      MessageBody: JSON.stringify(message),
      QueueUrl: queueUrl,
      MessageAttributes:  {
        httpPath: {
          DataType: 'STRING_VALUE',
          StringValue: destinationEndpoint.path
        },
        httpMethod: {
          DataType: 'STRING_VALUE',
          StringValue: destinationEndpoint.method
        }
      }
    });

    return true;
  }
}
