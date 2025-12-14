
export const PriceUnit = (price: string) => {
    return `${price != "-" ? `€ ${price}` : '-'}`;
};