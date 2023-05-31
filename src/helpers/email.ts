import Mailgun from "mailgun.js";
const formData = require("form-data");

export const sendEmail = async (email: string, postcardUrl: string) => {
  const mailgun = new Mailgun(formData);

  const DOMAIN = "postcardru.com";
  const client = mailgun.client({
    username: "api",
    key: process.env.NEXT_PUBLIC_EMAIL_API_KEY ?? "",
    url: "https://api.eu.mailgun.net",
  });
  console.log("Sending a postcard to ", email);
  const data = {
    from: "PostcardRu  <hello@postcardru.com>",
    to: email,
    subject: "You have received a postcaard",
    html: `Hello! <br/><br/>
You've got a postcard. To view this postcard, click on the
following link at anytime within the next 365 days
${postcardUrl}.<br/><br/>
 
Greeting postcards at<br/>
http://www.postcardru.com/`,
  };

  return client.messages.create(DOMAIN, data);
};
