import { format } from 'path';
import winston from 'winston';

winston.addColors({
    error: 'red',
    warn: 'yellow',
    info: 'cyan',
    debug: 'green',
});

const logger = winston.createLogger({
    level: 'debug',
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.prettyPrint()
    ),
    defaultMeta: { service: 'service-discord' },
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: 'logs/error.log',
            level: 'error',
        }),
        new winston.transports.File({ filename: 'logs/basic-bot.log' }),
    ],
});

export default logger;
