const log = console.log
const chalk = require('chalk');

module.exports = (req) => {
    
    const currentDate = {
        date: req.requestTime.getDate(),
        month: req.requestTime.getMonth(),
        year: req.requestTime.getFullYear(),
        hours: req.requestTime.getHours(),
        minutes: req.requestTime.getMinutes(),
        seconds: req.requestTime.getSeconds()
    }

    return log(chalk.yellow(`connect... ${currentDate.date}-${currentDate.month}-${currentDate.year} ${currentDate.hours}:${currentDate.minutes}:${currentDate.seconds}`))
}