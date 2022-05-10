const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'viktoria.yakimenko3232@gmail.com',
        pass: 'viktoria_m1106'
    }
})

const mailOptions = {
    from: 'viktoria.yakimenko3232@gmail.com',
    to: 'viktoria.yakimenko3232@gmail.com',
    subject: 'Work with node email sending',
    html: '<h1>Hello!</h1>',
    // text: 'hello',
}

transporter.sendMail(mailOptions, (err, info) => {
    if (err) throw err
    console.log('Email sent: ' + info.response)
})