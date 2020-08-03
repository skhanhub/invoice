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
        this.loadData()
    }

    private loadData() {
        const rawData = fs.readFileSync(this.path);
        const data = JSON.parse(rawData.toString());
        try{
            this.baseCurrency = data.invoice.currency;
            this.lineItems = data.invoice.lines;
            this.date = data.invoice.date;
            return this.date;
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
        return this.queryString;
    }

    async fetchExchangeRate(queryString?: string){
        this.queryString = queryString || this.queryString;
        const response = await axios.get(this.queryString)
        const exchangeRates: any = {};
        Object.keys(response.data.rates).forEach((key: string, index)=>{
            exchangeRates[key] = Math.round((response.data.rates[key] + Number.EPSILON) * 10000) / 10000
        })
        this.exchangeRates = exchangeRates;
        return exchangeRates
    }

    calculateLineTotal(lineItems?: Array<ILineItem>, exchangeRates?: { [key: string]: number; }){
        this.lineItems = lineItems || this.lineItems;
        this.exchangeRates = exchangeRates || this.exchangeRates;
        this.lineTotal = this.lineItems.map(lineItem=>{
            return {
                description: lineItem.description,
                amount: Math.round(((lineItem.amount/this.exchangeRates[lineItem.currency]) + Number.EPSILON) * 100) / 100
            }
        })
        return this.lineTotal;
    }

    calculateInvoiceTotal(lineTotal?: Array<ILineTotal>){
        this.lineTotal = lineTotal || this.lineTotal;
        const reducer = (accumulator: number, currentValue: ILineTotal) => accumulator + currentValue.amount;
        this.invoiceTotal = Math.round((this.lineTotal.reduce(reducer, 0) + Number.EPSILON) * 100) / 100
        return this.invoiceTotal
    }

    public async printInvoiceTotal(invoiceTotal?: number){
        this.invoiceTotal = invoiceTotal || this.invoiceTotal;
        this.generateQuery()
        await this.fetchExchangeRate()
        this.calculateLineTotal()
        this.calculateInvoiceTotal()
        console.log(this.invoiceTotal)
    }

}