import { LOGIN, REGISTER } from "../constants/url";

export async function registerUser(userName, email, password) {
  try {
    const response = await fetch(`${REGISTER}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, email, password }),
    });

    if (!response.ok) {
      alert("Failed To Register,Please Try again");
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
}

export async function loginUser(email, password) {
  try {
    const response = await fetch(`${LOGIN}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      alert("Failed To Login,Please Try again");
      return;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error logging in", error);
    throw error;
  }
}
