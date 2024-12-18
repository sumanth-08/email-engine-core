import { Client } from "@elastic/elasticsearch";

let elasticClient;
// console.log(process.env.CLOUDID);

const getDBConnections = () => {
  if (!elasticClient) {
    elasticClient = new Client({
      // node: "http://localhost:9200",
      node: "http://127.0.0.1:9200",
      // cloud: {
      //   id: process.env.CLOUDID,
      // },
      // auth: {
      //   username: process.env.DBUSER,
      //   password: process.env.DBPASSWORD,
      // },
      // node: "https://b1bae38299f74a25b80a609057bc38f1.us-central1.gcp.cloud.es.io:443",
      // auth: { apiKey: "WWp1czE1TUJaUmx0NUJnY3pFRkQ6T2oxbTV2cEFSOFdFcjJManhjbnpDZw==" },
      // maxRetries: 5,
      // requestTimeout: 60000,
      // sniffOnStart: true,
    });

    elasticClient
      .info()
      .then(() => {
        console.log("Database Connected Successfully");
      })
      .catch((err) => {
        console.log("DB Failed to connect!", err.message);
      });
  }
  return elasticClient;
};

export default getDBConnections;
