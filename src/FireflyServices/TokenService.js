import axios from "axios";

class TokenService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl || "http://localhost:5000/api/v1";
  }

  createTokenPool() {
    return axios.post(`${this.baseUrl}/namespaces/default/tokens/pools`, {
      type: "nonfungible",
      name: "donations",
    });
  }

  async getMyAddress() {
    const response = await axios.get(`${this.baseUrl}/status`);
    this.myAddress = response.data.org.identity;
    return response.data.org.identity;
  }

  async getAddress(baseUrl) {
    const response = await axios.get(`${baseUrl}/status`);
    return response.data.org.identity;
  }

  async getBalances(address) {
    let addr = address || this.myAddress;
    if (!addr) {
      addr = await this.getMyAddress();
    }
    const response = await axios.get(
      `${this.baseUrl}/namespaces/default/tokens/balances?key=${addr}&balance=>0`
    );
    return response.data;
  }

  async getTransfers(tokenIndex, toAddress) {
    let addr = toAddress || this.myAddress;
    if (!addr) {
      addr = await this.getMyAddress();
    }
    const response = await axios.get(
      `${this.baseUrl}/namespaces/default/tokens/transfers?to=${addr}&tokenIndex=${tokenIndex}`
    );
    return response.data;
  }

  async getDataId(messageId) {
    const response = await axios.get(
      `${this.baseUrl}/namespaces/default/messages/${messageId}`
    );
    return response.data.data[0].id;
  }

  async getNfts(address) {
    let addr = address || this.myAddress;
    if (!addr) {
      addr = await this.getMyAddress();
    }
    // Right now we will use the minter's address to lookup the mint transfer
    // This transfer will have a message attached which has the dataId we need
    if (!this.donorAddress) {
      this.donorAddress = await this.getAddress("http://localhost:5000/api/v1");
    }
    const balances = await this.getBalances(addr);
    const nfts = [];
    for (const token of balances) {
      if (token.tokenIndex) {
        const transfers = await this.getTransfers(
          token.tokenIndex,
          this.donorAddress
        );
        const messageId = transfers[0].message;
        const dataId = await this.getDataId(messageId);
        nfts.push({
          tokenIndex: token.tokenIndex,
          dataId: dataId,
        });
      }
    }
    return nfts;
  }

  mintNft(dataId) {
    return axios.post(
      `${this.baseUrl}/namespaces/default/tokens/mint?confirm=true`,
      {
        amount: 1,
        message: {
          data: [{ id: dataId }],
        },
      }
    );
  }

  broadcastNft(dataId) {
    return axios.post(`${this.baseUrl}/namespaces/default/messages/broadcast`, {
      data: [
        {
          value: {
            Message: "A donation has been created!",
            ImageData: dataId,
          },
        },
      ],
    });
  }

  transferToken(toAddress, tokenIndex) {
    return axios.post(
      `${this.baseUrl}/namespaces/default/tokens/transfers?confirm=true`,
      {
        to: toAddress,
        tokenIndex: tokenIndex,
        amount: 1,
      }
    );
  }
}

export default TokenService;
