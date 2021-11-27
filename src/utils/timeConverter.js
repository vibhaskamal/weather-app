export default function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var date_value = date + ' ' + month + ' ' + year;
    var day_of_week = a.getDay();
    var result = {
        day: day_of_week,
        date: date_value
    }
    return result;
}