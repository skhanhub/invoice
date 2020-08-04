import * as path from "path";

import Invoice from '../../src/services/invoice';

const invoiceTotal = 1600.9;
const correctResult = 1600.9;

describe('Tests for the printInvoiceTotal method for the Invoice class', () => {

  test('Should log the invoice total on the console',async () => {

    //Arrange
    console.log = jest.fn();
    const filePath = path.join(__dirname, "./01-input.txt");
    const invoice = new Invoice(filePath);

    //Act
    const RESULT =  await invoice.printInvoiceTotal(invoiceTotal);

    //Assert
    expect(console.log).toHaveBeenCalledWith(correctResult);

  });

})