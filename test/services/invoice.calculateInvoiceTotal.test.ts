import * as path from "path";

import Invoice from '../../src/services/invoice';

const lineTotal = [{"description":"Intel Core i9", "amount":1070.16},{"description":"ASUS ROG Strix", "amount":530.7}];
const correctResult = 1600.86;

describe('Tests for the calculateInvoiceTotal method for the Invoice class', () => {

  test('Should return a number representing the invoice total',async () => {

    //Arrange
    const filePath = path.join(__dirname, "./01-input.txt");
    const invoice = new Invoice(filePath);

    //Act
    const RESULT =  invoice.calculateInvoiceTotal(lineTotal);

    //Assert
    expect(RESULT).toEqual(correctResult);

  });

  test('Should throw an error for missing lineTotal',async () => {

    //Arrange
    const filePath = path.join(__dirname, "./01-input.txt");
    const invoice = new Invoice(filePath);

    //Assert
    expect(() => {
      invoice.calculateInvoiceTotal();
    }).toThrow();

  });

})