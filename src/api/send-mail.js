import get from "lodash/get";
import axios from "axios";

export default async function handler(req, res) {
  const auth = await axios({
    method: "post",
    url: "https://auth-api.insureme.lk/v2/token",
    headers: {
      api_key: process.env.INME_AUTH_API_KEY,
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      user_name: process.env.INME_AUTH_USERNAME,
      password: process.env.INME_AUTH_PASSWORD,
    }),
  })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log("Auth Err: ", error);
      return {};
    });

  let formResponse = null;

  try {
    const response = await axios({
      method: "post",
      url: "https://com-sys.insureme.lk/inquiry-api/v1/inquire",
      headers: {
        auth_key: get(auth, "data.auth_key"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(req.body),
    });
    formResponse = response?.data?.data ? response?.data?.data : null;
  } catch (e) {
    console.log('send-mail error', e.message);
  }

  return res.status(200).json({
    message: "success",
    formResponse: {
      data: {
        inquiry_id: formResponse?.inquiry_id?formResponse?.inquiry_id:null,
      },
    },
  });
}
