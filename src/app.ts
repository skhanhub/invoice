import Invoice from "./services/invoice";

const invoice = new Invoice("./test-data/01-input.txt")
try{
    invoice.printInvoiceTotal()
}
catch(err){
    console.log(err.message);
}