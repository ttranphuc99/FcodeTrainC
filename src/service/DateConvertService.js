class DateConvert {
    formatDate(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0'+minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear() + "  " + strTime;
    }

    convert(str) {
        if (str === '' || str === null || str === undefined) return '';

        var date = new Date(str);
        return this.formatDate(date);
    }
}

export default new DateConvert()