let date = new Date();
let currentDate = date.getDate() + 1;
let futureDate = date.getDate() + 2;
let month = date.getMonth()+1;
let year = date.getFullYear();


module.exports = { 
    getDate: () => {
        if(currentDate < 10 && month < 10) {
            currentDate = '0' + currentDate;
            month = '0' + month;
        }
        date = year +'-' + month + '-' + currentDate;
        return date;
    },
    getFutureDate: () => {
        if(futureDate < 10) {
            futureDate = '0' + futureDate;
        }
        futureDate = year +'-' + month + '-' + futureDate;
        return futureDate;
    }
}