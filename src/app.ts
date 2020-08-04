// Application for computing the total invoice for a base currency 
import * as path from "path";
import Invoice from "./services/invoice";

try{
    const filePath = path.join(__dirname, "../", process.argv[2])
    const invoice = new Invoice(filePath)
    invoice.printInvoiceTotal()
}
catch(err){
    console.log(`Error: ${err.message}`);
}