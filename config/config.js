const env = process.env.SQY_REDESIGN_ENV || 'development';


const devConfig = {
    environment: "development",
    port: 3000,
    databaseMySQL: {
        host : "127.0.0.1",
        user: "root",
        password: "",
        database: "tracibility",
        port: 3306
    },
    "jwtSecret": "your_secret_key"
}
const prodConfig = {

}

const config = {
	development: devConfig,
	production: prodConfig
};
module.exports = config[env];