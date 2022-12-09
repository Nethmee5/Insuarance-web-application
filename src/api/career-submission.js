import formData from "form-data";
import Mailgun from "mailgun.js";

const domain = process.env.MAILGUN_DOMAIN;
const apiKey = process.env.MAILGUN_API_KEY;

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: apiKey || "key-yourkeyhere",
});

const to =
  process.env.NODE_ENV === "production"
    ? ["careers@insureme.lk"]
    : ["mahesh@atdigital.io", "asitha@atdigital.io"];

export default async function handler(req, res) {
  const { fields, attachment, name } = req.body || {};

  const config = {
    from: `noreply <noreply@${domain}>`,
    to,
    subject: "Form Submission from Careers Page",
    text: "Form Submission from Careers Page",
    html: getEmailBody(fields),
  };

  if (attachment) {
    config.attachment = {
      data: Buffer.from(attachment, "base64"),
      filename: `${name} - CV.pdf`,
    };
  }

  await mg.messages
    .create(domain, config)
    .then((msg) => console.log(msg)) // logs response data
    .catch((err) => console.error(err)); // logs any error

  res.status(200).json({ status: "success" });
}

const getEmailBody = (fields = []) => {
  const html = `
    <b>Form data:</b>
    <ul style="list-style-type: none; padding-left: 10px">
    ${fields
      .map(({ key, value }) => {
        return `<li>${key}: ${value}</li>`;
      })
      .join("")}
    </ul>
    <br/>`;
  return html;
};
