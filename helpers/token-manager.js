import jsonwebtoken from "jsonwebtoken";

export const generateToken = (uid = "") => {
  const payload = { uid };
  const expiresIn = 60 * 15; //15 minutos
  try {
    const token = jsonwebtoken.sign(payload, process.env.SECRETORPRIVATEKEY, {
      expiresIn,
    });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};
