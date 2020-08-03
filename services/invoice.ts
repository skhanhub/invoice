interface ILineItem {
    description: string;
    currency: string;
    amount: number;
}
interface ILineTotal {
    description: string;
    amount: number;
}

// A class for calculating the total invoice amount for a given currency
export default class invoice {
    private path: string;
    private baseCurrency: string;
    private date: string;
    private lineItems: Array<ILineItem>;
    private queryString: string;
    private exchangeRates: { [key: string]: number; };
    private lineTotal: Array<ILineTotal>;

}