import axios from "axios";

export const axiosFeatchUserMailData = async (endpoint, token) => {
  let config = {
    method: "GET",
    maxBodyLength: Infinity,
    url: endpoint,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  let { data } = await axios.request(config);
  return data;
};
