import * as path from "path";

import Invoice from "../../src/services/invoice";

jest.mock("axios");
const lineItems = [
  { description: "Intel Core i9", currency: "USD", amount: 700 },
  { description: "ASUS ROG Strix", currency: "AUD", amount: 500 },
];
const exchangeRates = { USD: 1.5288, AUD: 1.0614 };
const correctResult = [
  { description: "Intel Core i9", amount: 1070.16 },
  { description: "ASUS ROG Strix", amount: 530.7 },
];

describe("Tests for the calculateLineTotal method for the Invoice class", () => {
  test("Should return an array of object containing the line total", async () => {
    //Arrange
    const filePath = path.join(__dirname, "./01-input.txt");
    const invoice = new Invoice(filePath);

    //Act
    const RESULT = invoice.calculateLineTotal(lineItems, exchangeRates);

    //Assert
    expect.assertions(1);
    expect(RESULT).toEqual(correctResult);
  });
});
