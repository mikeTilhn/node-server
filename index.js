const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const nodemailer = require('nodemailer');
// const appRoute = require('./routes/route');


const app = express();

// Middleware
app.use(express.static('public'));
app.use(express.json());
// app.use('/api', appRoute);

// Routes

app.get('/', (req, res, next)=>{
    res.sendFile(__dirname + '/public/contactform.html')
});

app.post('/', (req, res)=>{
    console.log(req.body);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        secure: false,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_APP_PSWD
        },
    })

    const mailOptions = {
        from: req.body.email,
        to: 'michael.cgart@gmail.com',
        subject: `Message from ${req.body.email}: ${req.body.subject}`,
        text: req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error){
            console.log(error);
            res.send('error')
        }else{
            console.log('Email sent: ' + info.response);
            res.send('success');
        }
    })
});


const PORT =  process.env. PORT || 5002;
app.listen(PORT, ()=> console.log(`Server is running on this port ${PORT}`));