export function formatIDRCurrency(number) {
    const formattedNumber = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(number);

    return formattedNumber.replace('Rp', 'Rp ');
}
