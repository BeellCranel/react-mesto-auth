const baseUrl = "https://auth.nomoreparties.co";

function checkResponse(response) {
  if (response.ok) {
    return response.json();
  }
  return response.json().then((data) => {
    const { statusCode } = data;
    const { message } = data.message[0].messages[0];
    const error = new Error(message || "Что-то пошло не так");
    error.status = statusCode;
    throw error;
  });
}

export function register(email, password) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(checkResponse);
}

export function login(identifier, password) {
  return fetch(`${baseUrl}/singin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ identifier, password }),
  }).then(checkResponse);
}

export function getContent(token) {
  return (`${baseUrl}/users/me`,
  {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
}
