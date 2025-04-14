import dotenv from 'dotenv';
dotenv.config();
const env = process.env.NODE_ENV || 'development';
const devConfig = {
    environment: "development",
    port: process.env.APP_PORT,
    apiURL: `${process.env.BASE_URL}/api`,
    baseURL: `${process.env.BASE_URL}`,
    databaseMySQL: {
        host : process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    },
    "jwtSecret": process.env.JWT_SECRET
}
const prodConfig = {
}
const config = {
	development: devConfig,
	production: prodConfig
};

export default config[env];