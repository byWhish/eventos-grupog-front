export const toFixedLocale = (float, lang, country, currency) => {
    const options = {
        minimumFractionDigits: 2,
        // currency: lang.locale.currency,
        currency: 'ARS',
        style: 'currency',
        currencyDisplay: 'symbol',
    };
    // return float.toLocaleString(`${lang}-${country}`, options);
    return float.toLocaleString('es-AR', options);
};

export const toLocalDateTime = (date, lang, country) => {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
    };
    return date.toLocaleDateString('es-AR', options);
};

export const toLocalDateTimeShort = (date, lang, country) => {
    const options = {
        weekday: 'short',
        year: '2-digit',
        month: 'short',
        day: 'numeric',
    };
    return date.toLocaleDateString('es-AR', options);
};

export const translateBoolean = (bool) => {
    return bool ? 'Si' : 'No';
};
