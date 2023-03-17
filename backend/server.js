const express = require('express')
const dotenv = require('dotenv').config()
const port = process.env.PORT || 5000

const app = express()

app.get('/api/getgoals', (req, res) => {
    res.json({ message: 'get goals' })
})
app.listen(port, () => console.log(`server started on prot ${port}`))