import { Client } from "@elastic/elasticsearch";

let elasticClient;
// console.log(process.env.CLOUDID);

const getDBConnections = () => {
  if (!elasticClient) {
    elasticClient = new Client({
      cloud: {
        id: process.env.CLOUDID,
      },
      auth: {
        username: process.env.DBUSER,
        password: process.env.DBPASSWORD,
      },
      // auth: { apiKey: "WWp1czE1TUJaUmx0NUJnY3pFRkQ6T2oxbTV2cEFSOFdFcjJManhjbnpDZw==" },
      maxRetries: 5,
      requestTimeout: 30000,
      sniffOnStart: true,
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
