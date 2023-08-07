export const sendPostcardApi = async (body: any) =>
  fetch(`/api/postcards`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
