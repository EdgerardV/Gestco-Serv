const { Pool } = require('pg')

const pool = new Pool({
	user : 'GestcoDbAdmin',
	password: 'qFGdhCIAWa',
	host: 'localhost',
	port: 5432,
	database: 'GestcoDb'
})

module.exports = pool;