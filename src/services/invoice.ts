// Import necessary libraries
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

//function for rounding a number to a given specific decimal places
function precise_round(num, dec) {
  var num_sign = num >= 0 ? 1 : -1;

  return +(Math.round(num * Math.pow(10, dec) + num_sign * 0.0001) / Math.pow(10, dec)).toFixed(dec);
}

// A class for calculating the total invoice amount for a given currency
export default class Invoice {
  private path: string;
  private baseCurrency: string;
  private date: string;
  private lineItems: Array<ILineItem>;
  private queryString: string;
  private exchangeRates: { [key: string]: number };
  private lineTotal: Array<ILineTotal>;
  private invoiceTotal: number | null;
  // initialize properties and load data from the given path.
  constructor(path: string) {
    this.path = path;
    this.baseCurrency = 'AUD';
    this.date = '2020/08/10';
    this.lineItems = [];
    this.queryString = '';
    this.exchangeRates = {};
    this.lineTotal = [];
    this.invoiceTotal = null;
    this.loadData();
  }
  /*
    function for loading data from json file
    The function doesnt take any arguments
    The function returns the json data read from the file
  */
  private loadData() {
    const rawData = fs.readFileSync(this.path);
    const data = JSON.parse(rawData.toString());
    try {
      this.baseCurrency = data.invoice.currency;
      this.lineItems = data.invoice.lines;
      this.date = data.invoice.date;
      return this.date;
    } catch (err) {
      throw new Error('Invalid input file');
    }
  }
  /*
    function for generating query string from date, baseCurrency and lineItems properties
    The function doesnt take any arguments
    The function returns the a query string
  */
  generateQuery() {
    const baseURL = 'https://api.exchangeratesapi.io';
    let queryString = `${baseURL}/${this.date}?base=${this.baseCurrency}&symbols=`;
    this.lineItems.forEach((lineItem, index) => {
      queryString += `${lineItem.currency}${index === this.lineItems.length - 1 ? '' : ','}`;
    });
    this.queryString = queryString;
    return this.queryString;
  }
  /*
    async function for making http get request that fetches exchange rates
    The function either takes a query string or uses the queryString property as an input
    The function returns an exchangerate object
    {
        "USD": 0.6541135574,
        "AUD": 0.9421205098
    }
  */
  async fetchExchangeRate(queryString?: string) {
    try {
      this.queryString = queryString || this.queryString;
      const response = await axios.get(this.queryString);
      const exchangeRates: any = {};
      Object.keys(response.data.rates).forEach((key: string, index) => {
        exchangeRates[key] = precise_round(response.data.rates[key], 4);
      });
      this.exchangeRates = exchangeRates;
      return exchangeRates;
    } catch (err) {
      throw new Error(err.response.data.error);
    }
  }
  /*
    function for calculating line total
    The function either takes an array of lineItems and  exchangeRates as arguments or uses the properties as an input
    The function returns an array of object that follows ILineItem interface
    [{"description":"Intel Core i9", "amount":1070.17},{"description":"ASUS ROG Strix", "amount":530.73}];
  */
  calculateLineTotal(lineItems?: Array<ILineItem>, exchangeRates?: { [key: string]: number }) {
    this.lineItems = lineItems || this.lineItems;
    this.exchangeRates = exchangeRates || this.exchangeRates;
    this.lineTotal = this.lineItems.map(lineItem => {
      return {
        description: lineItem.description,
        amount: precise_round(lineItem.amount / this.exchangeRates[lineItem.currency], 2)
      };
    });
    return this.lineTotal;
  }
  /*
    function for calculating the invoice total
    The function either takes an array of ILineTotal as arguments or uses the lineTotal property as an input
    The function returns the invoice total
  */
  calculateInvoiceTotal(lineTotal?: Array<ILineTotal>) {
    this.lineTotal = lineTotal || this.lineTotal;
    const reducer = (accumulator: number, currentValue: ILineTotal) => accumulator + currentValue.amount;
    this.invoiceTotal = precise_round(this.lineTotal.reduce(reducer, 0), 2);
    return this.invoiceTotal;
  }
  /*
    function for logging the invoice total
    The function either takes invoiceTotal as arguments or uses the invoiceTotal property as an input
    The function logs invoiceTotal on the console
  */
  public async printInvoiceTotal(invoiceTotal?: number) {
    try {
      this.invoiceTotal = invoiceTotal || this.invoiceTotal;
      this.generateQuery();
      await this.fetchExchangeRate();
      this.calculateLineTotal();
      this.calculateInvoiceTotal();
      console.log(this.invoiceTotal);
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
