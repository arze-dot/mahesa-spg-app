import chalk from 'chalk';

const { fork } = require("child_process");
const child = fork('./server/child.listerner.js');

let logQueue: string[][] = []
const timeouts = 10000
setInterval(() => {
    if (logQueue.length > 0) {
        child.send(logQueue);
        logQueue = []
    }
}, timeouts)

export function logger(title: string, type?: string, message?: string, status?: number) {
    return (data: any) => {
        const responseStatusColor = (statusCode: number) => {
            switch (statusCode) {
                case 200:
                    return `${chalk.bgGreen.white(` ${statusCode} `)}`
                case 201:
                    return `${chalk.bgGreen.white(` ${statusCode} `)}`
                case 400:
                    return `${chalk.bgRedBright.white(` ${statusCode} `)}`
                case 401:
                    return `${chalk.bgRedBright.white(` ${statusCode} `)}`
                case 403:
                    return `${chalk.bgYellow.white(` ${statusCode} `)}`
                case 500:
                    return `${chalk.bgRed.white(` ${statusCode} `)}`
                case 502:
                    return `${chalk.bgRed.white(` ${statusCode} `)}`
                default:
                    return `${chalk.bgGray.white(` ${statusCode} `)}`
            }
        }

        const info = () => {
            logQueue.push([`${chalk.blue('? [INFO]')} ${responseStatusColor(status || 200)} ${chalk.greenBright(title)} | ${message} | ${chalk.green(JSON.stringify(data))}`])
        };

        const error = () => {
            logQueue.push([`${chalk.red('✕ [ERROR]')} ${chalk.bgRed.white(` ${status} `)} ${chalk.greenBright(title)} | ${message} | ${chalk.green(JSON.stringify(data))}`])
        };

        const warn = () => {
            logQueue.push([`${chalk.yellow('▲ [WARN]')} ${chalk.bgYellow.white(` ${status} `)} ${chalk.greenBright(title)} | ${message} | ${chalk.green(JSON.stringify(data))}`])
        };

        const debug = () => {
            logQueue.push([`${chalk.gray('! [DEBUG]')} ${chalk.bgGray.white(` ${status} `)} ${chalk.greenBright(title)} | ${message} | ${chalk.green(JSON.stringify(data))}`])
        };

        return {
            info,
            error,
            warn,
            debug
        }
    }
}
