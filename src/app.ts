import Invoice from "./services/invoice";

const invoice = new Invoice("./test-data/01-input.txt")
invoice.printInvoiceTotal()