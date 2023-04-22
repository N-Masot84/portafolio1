const {Pool}  = require('pg')

const Pool = new Pool ({
    host:"localhost",
    user:"postgres",
    database:"portafolio",
    password: "1984",
    port: 5432
})