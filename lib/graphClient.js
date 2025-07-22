require('isomorphic-fetch');
const { Client } = require('@microsoft/microsoft-graph-client');
const msal = require('@azure/msal-node');

const msalConfig = {
  auth: {
    clientId: process.env.AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${process.env.AZURE_TENANT_ID}`,
    clientSecret: process.env.AZURE_CLIENT_SECRET
  }
};

const cca = new msal.ConfidentialClientApplication(msalConfig);

async function getToken() {
  const result = await cca.acquireTokenByClientCredential({
    scopes: ['https://graph.microsoft.com/.default'],
  });
  return result.accessToken;
}

async function getClient() {
  const token = await getToken();
  return Client.init({ authProvider: done => done(null, token) });
}

module.exports = { getClient };