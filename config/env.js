module.exports = {
    port: process.env.PORT || 5000,
    db: process.env.DB_URL  || "mongodb+srv://top-gun-lab:topgunlab123@cluster0.mfvvz.mongodb.net/?retryWrites=true&w=majority",
    jwtSecret: process.env.JWT_SECRET || "E19FE5A7A8ECB9296DC4C5B7881AA",
    jwtExpirationTime: parseInt(process.env.JWT_EXPIRATION_TIME) || 3600
}