export function formatIDRCurrency(number) {
    const formattedNumber = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(number);

    return formattedNumber.replace('Rp', 'Rp ');
}


export function fixDate(date){
    let dateLocal = new Date(date);
    let newDate = new Date(
        dateLocal.getTime() - dateLocal.getTimezoneOffset() * 60 * 1000
    );
    const year = newDate.getFullYear();
    const month = (newDate.getMonth() + 1).toString().padStart(2, '0');
    const day = newDate.getDate().toString().padStart(2, '0');
    const hours = newDate.getHours().toString().padStart(2, '0');
    const minutes = newDate.getMinutes().toString().padStart(2, '0');
    const seconds = newDate.getSeconds().toString().padStart(2, '0');
    const miliSeconds = newDate.getMilliseconds().toString().padStart(3, '0');
    const result = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${miliSeconds}`;

    return result;
}

