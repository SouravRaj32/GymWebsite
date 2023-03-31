const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const mongoose = require('mongoose');
const port =process.env.PORT || 3000;
mongoose.connect('mongodb+srv://souravraj32:Kc130deploy@souravbooking.fyxeibc.mongodb.net/dynamic?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected...'))
.catch(err => console.log(err));

// Define mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine','pug') // Set the template engine as pug
app.set('views', path.join(__dirname,'views')) // Set the views directory
 
// ENDPOINTS
app.get('/', (req, res)=>{
    const con = "This is the best content on the internet so far so use it wisely"
    const params = {'title': 'PubG is the best game', "content": con}
    res.status(200).render('index.pug', params);
})

app.post('/', (req, res)=>{
    const myData = new Contact(req.body);
    myData.save()
    .then(()=>{
        res.send("This item has been saved to the database");
    })
    .catch((err)=>{
        res.status(400).send("item was not saved to the database");
    });
    // res.status(200).render('contact.pug', );
});
// app.post('/', (req, res)=>{
//     name = req.body.name
//     age = req.body.age
//     gender = req.body.gender
//     address = req.body.address
//     more = req.body.more

//     // let outputToWrite = `the name of the client is ${name}, ${age} years old, ${gender}, residing at ${address}. More about him/her: ${more}`
//     // fs.writeFileSync('output.txt', outputToWrite)
//     const params = {'message': 'Your form has been submitted successfully'}
//     res.status(200).render('index.pug', params);

// })


// START THE SERVER
app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});