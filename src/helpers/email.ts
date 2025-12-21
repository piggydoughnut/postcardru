let cachedClient: any;

const getMailgunClient = async () => {
  if (cachedClient) return cachedClient;

  const Mailgun = (await import("mailgun.js")).default;
  const formData = (await import("form-data")).default;

  const mailgun = new Mailgun(formData);
  cachedClient = mailgun.client({
    username: "api",
    key: process.env.EMAIL_API_KEY ?? "",
    url: "https://api.eu.mailgun.net",
  });

  return cachedClient;
};

export const sendEmail = async (email: string, postcardUrl: string) => {
  const client = await getMailgunClient();

  const DOMAIN = "postcardru.com";
  const data = {
    from: "PostcardRu <hello@postcardru.com>",
    to: email,
    subject: "You received a postcard",
    html: `Hello! <br/><br/>
You've got a postcard. To view this postcard, click on the
following link at anytime within the next 365 days
${postcardUrl}.<br/><br/>
 
Greeting postcards at<br/>
http://www.postcardru.com/`,
  };

  return client.messages.create(DOMAIN, data);
};
