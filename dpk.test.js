const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the hash on value", () => {
    const candidate = {
      id: 1,
      name: 'Joseph Steffin',
      isSelected: 'Pending'
    }
    const trivialKey = deterministicPartitionKey(candidate);
    expect(trivialKey).toBe("4921f6dea74f26d14697bc79c9d5f15dff3f790a6ad859adbea0fa1d59779dd366e46ee1a08c02d44888ef381e0ac624d7cbf9e2cd2e0d0cc1b9090ea7a6180c");
  });
});
