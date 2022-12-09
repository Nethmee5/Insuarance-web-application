import axios from "axios";
import get from "lodash/get";

const submitContactForm = async (data) => {
  const {
    name = "N/A",
    email = "N/A",
    phone = "N/A",
    message = "N/A",
    type = "N/A",
    company = "N/A",
    media_code = "N/A",
    departure_date = "N/A",
    arrival_date = "N/A",
    date_of_birth = "N/A",
    passport = "N/A",
    product_type = "N/A"
  } = data;
  const res = await axios
    .post("/api/send-mail", {
      cx_name: name || "N/A",
      cx_email: email || "N/A",
      cx_mobile: phone || "N/A",
      cx_message: message || "N/A",
      cx_company: company || "N/A",
      inquiry_type: "testing",
      inquiry_media: "INME-WEB",
      inquiry_code: "INME-WEB",
      promo_code: "no-promo",
      media_code: media_code || "N/A",
      product_type: product_type || "N/A",
      insurance_type : type || "N/A",
      form_data:{
        departure_date: departure_date || "N/A",
        arrival_date: arrival_date || "N/A",
        passport_number: passport || "N/A",
        date_of_birth: date_of_birth || "N/A",
      }
    })
    .then((res) => {
      return get(res, "data", {});
    })
    .catch((e) => {
      return get(e, "response.status", 404);
    });
  return res;
};

export default submitContactForm;
