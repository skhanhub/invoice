import * as fs from 'fs';
import axios from 'axios';

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
            this.date = data.invoice.date;
        }catch(err){
            throw new Error("Invalid input file")
        }
    }

    generateQuery(){
        const baseURL = 'https://api.exchangeratesapi.io';
        let queryString = `${baseURL}/${this.date}?base=${this.baseCurrency}&symbols=`
        this.lineItems.forEach((lineItem, index) => {
            queryString+=`${lineItem.currency}${ index === this.lineItems.length-1 ? "" : ","}`
        });
        this.queryString = queryString;
    }

    async fetchExchangeRate(){
        const response = await axios.get(this.queryString)
        this.exchangeRates = response.data.rates;
    }

    calculateLineTotal(){}
    calculateInvoiceTotal(){}
    public printInvoiceTotal(){
        this.loadData()
        this.generateQuery()
        this.fetchExchangeRate()
    }

}