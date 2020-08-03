import Invoice from '../../src/services/invoice';
import * as path from "path";

describe('Tests for the generateQuery method for the Invoice class', () => {

  test('Should return a query string based on the inputfile content', () => {

    //Arrange
    const filePath = path.join(__dirname, "./01-input.txt");
    const invoice = new Invoice(filePath);

    //Act
    const RESULT = invoice.generateQuery();

    //Assert
    expect(RESULT).toEqual("https://api.exchangeratesapi.io/2020-07-07?base=NZD&symbols=USD,AUD");

  });

})