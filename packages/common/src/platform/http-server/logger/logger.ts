import pino from 'pino';
import { ILogger } from './ilogger';
const logger = pino({
  prettyPrint: {
    ignore: process.env.NODE_ENV !== 'prod' ? 'pid, hostname' : undefined,
  },
}) as ILogger;

export { logger };
