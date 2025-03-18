import axios from "axios";

interface PropSub {
  email: string;
}

export async function susbcribre(email: PropSub) {
  try {
    const { PUBLIC_HOST_EXTERNA } = import.meta.env;
    return await axios.post(`${PUBLIC_HOST_EXTERNA}/user/susbcribe`, {
      email,
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
