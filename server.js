const express = require('express');
require('./models/index');
const app = express();
app.use(express.json());
const port = 4000;


const employeeRouter = require('./routes/employee');
const contactRouter = require('./routes/contact');

app.use('/employees', employeeRouter);
app.use('/contacts', contactRouter);

app.use((req, res) => {
    return res.status(404).send("Error 404, Route not found");
  });

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})