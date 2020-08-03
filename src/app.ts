import Invoice from "./services/invoice";


try{
    const invoice = new Invoice("./test-data/01-input.txt")
    invoice.printInvoiceTotal()
}
catch(err){
    console.log(`Error: ${err.message}`);
}