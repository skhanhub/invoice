import Invoice from "./services/invoice";

const invoice = new Invoice("./test-data/01-input.tx")
try{
    invoice.printInvoiceTotal()
}
catch(err){
    console.log(`Error: ${err.message}`);
}