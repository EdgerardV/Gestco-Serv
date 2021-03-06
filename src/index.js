const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

const taskRoutes = require('./routes/tasks.routes.js');

const app = express();

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(taskRoutes);
app.use((err, req, res, next) => {
	return res.json({
		error: true,
		message: err.message
	})
})

app.listen(3001);
console.log('Server on port 3001');