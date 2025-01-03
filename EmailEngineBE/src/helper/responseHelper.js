export const send = (res, responseData, data = {}) => {
    const { code, message } = responseData;
    res.status(200);
    return res.send({
      responseCode: code,
      responseMessage: message,
      responseData: data,
    });
  };
  
  export const setErrorResponseMsg = (res, parameter) => {
    return {
      code: res.code,   
      message: `${parameter} ${res.message}`,
    };
  };
  