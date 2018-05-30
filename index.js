const express = require('express');
const app = express();

app.get('/', (req,res) => {
	res.send({hi:"Mal"});
})

const PORT = process.env.PORT || 5000;

app.listen(PORT);