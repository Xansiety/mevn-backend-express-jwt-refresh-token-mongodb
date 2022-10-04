import jsonwebtoken from "jsonwebtoken"

export const GenerarJWT = (uid = "") => {
  return new Promise((resolve, reject) => {
    const payload = { uid } 
    jsonwebtoken.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(error)
          reject("No se pudo generar el token")
        } else {
          resolve(token)
        }
      }
    )
  })
}