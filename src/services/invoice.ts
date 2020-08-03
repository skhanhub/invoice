import * as fs from 'fs';

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
export default class Invoice {
    private path: string;
    private baseCurrency: string;
    private date: string;
    private lineItems: Array<ILineItem>;
    private queryString: string;
    private exchangeRates: { [key: string]: number; };
    private lineTotal: Array<ILineTotal>;
    private invoiceTotal: number | null;
    constructor(path: string){
        this.path = path
        this.baseCurrency = "AUD";
        this.date = "2020/08/10";
        this.lineItems = [];
        this.queryString = "";
        this.exchangeRates = {};
        this.lineTotal = [];
        this.invoiceTotal = null;
    }

    loadData() {
        const rawData = fs.readFileSync(this.path);
        const data = JSON.parse(rawData.toString());
        try{
            this.baseCurrency = data.invoice.currency;
            this.lineItems = data.invoice.lines;
        }catch(err){
            throw new Error("Invalid input file")
        }
    }
    generateQuery(){}
    fetchExchangeRate(){}
    calculateLineTotal(){}
    calculateInvoiceTotal(){}
    public printInvoiceTotal(){
        this.loadData()
    }

}