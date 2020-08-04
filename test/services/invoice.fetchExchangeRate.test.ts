import * as path from "path";

import axios from "axios";
import Invoice from "../../src/services/invoice";

jest.mock("axios");
const data = {
  rates: {
    USD: 0.6541135574,
    AUD: 0.9421205098,
  },
  base: "NZD",
  date: "2020-07-07",
};
const resp = { data };
const mockedAxios = axios as jest.Mocked<typeof axios>;
const correctResult = { USD: 1.5288, AUD: 1.0614 };

describe("Tests for the fetchExchangeRate method for the Invoice class", () => {
  test("Should return an object containing the exchange rate", async () => {
    //Arrange
    mockedAxios.get.mockResolvedValue(resp);
    const filePath = path.join(__dirname, "./01-input.txt");
    const invoice = new Invoice(filePath);

    //Act
    const RESULT = await invoice.fetchExchangeRate(
      "https://api.exchangeratesapi.io/2020-07-07?base=NZD&symbols=AUD,USD"
    );

    //Assert
    expect.assertions(1);
    expect(RESULT).toEqual(correctResult);
  });
});
