const nodemailer = require("nodemailer")

const sendWelcomeEmail = async ( fullName, userEmail, emailSubject, url ) =>{
    try {

        // create Transport
        let mailerTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: `${process.env.EMAIL}`,
                pass: `${process.env.EMAIL_PASSWORD}`
            }
        })

        // Create email details to send
        let mailDetails = {
            from: `${process.env.EMAIL}`,
            to: userEmail,
            subject: emailSubject,
            html:`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Welcome to Our Service</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f6f6f6;
            margin: 0;
            padding: 0;
            color: #333;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border: 1px solid #e6e6e6;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #007bff;
            color: #ffffff;
            padding: 10px;
            text-align: center;
        }
        .content {
            padding: 20px;
        }
        .footer {
            text-align: center;
            padding: 10px;
            font-size: 12px;
            color: #999999;
        }
        .button {
            display: inline-block;
            background-color: #007bff;
            color: #ffffff;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome to Our Service!</h1>
        </div>
        <div class="content">
            <h2>Hi  ${fullName},</h2>
            <p>Thank you for registering with us. We are thrilled to have you on board. Here are some quick tips to get you started:</p>
            <ul>
                <li>Explore our features and see what we have to offer.</li>
                <li>Visit your profile to customize your preferences.</li>
                <li>Check out our community forum to connect with other users.</li>
            </ul>
            <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
            <p>Click the button below to get started:</p>
            <p><a href=${url} class="button">Get Started</a></p>
            <p>We hope you enjoy your experience with us!</p>
            <p>Best regards,<br>The Wallet Management System Team</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 Wallet Management System. All rights reserved.</p>
            <p>If you did not register for this account, please disregard this email.</p>
        </div>
    </div>
</body>
</html>
`
        }

        // Ask Transport to send email details
        const result = await mailerTransport.sendMail(mailDetails)

        return result
    
        
    } catch (error) {

        return console.log(error)
        
    }

}


const sendResetPasswordEmail = async ( userEmail, emailSubject,  Url )=>{

    try {
        
        // Create Transport
        const mailerTransport = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: `${process.env.EMAIL}`,
                pass: `${process.env.EMAIL_PASSWORD}`
            }
        })
    
        // Create email details to send
        const mailDetails = {
            from: `${process.env.EMAIL}`,
            to: userEmail,
            subject: emailSubject,
            html:`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Your Password</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f6f6f6;
                margin: 0;
                padding: 0;
                color: #333;
            }
            .container {
                width: 100%;
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border: 1px solid #e6e6e6;
                box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            .header {
                background-color: #007bff;
                color: #ffffff;
                padding: 10px;
                text-align: center;
            }
            .content {
                padding: 20px;
            }
            .footer {
                text-align: center;
                padding: 10px;
                font-size: 12px;
                color: #999999;
            }
            .button {
                display: inline-block;
                background-color: #007bff;
                color: #ffffff;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 5px;
            }
            .button:hover {
                background-color: #0056b3;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Reset Your Password</h1>
            </div>
            <div class="content">
                <p>Hello,</p>
                <p>We received a request to reset your password. Click the button below to reset your password:</p>
                <p><a href=${ Url} class="button">Reset Password</a></p>
                <p>If you did not request a password reset, please ignore this email. This link will expire in 1 hour.</p>
                <p>Best regards,<br>The Wallet Management System Team</p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Wallet Management System. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    `
        }

        // Ask Transport to send email details
        const result = await mailerTransport.sendMail(mailDetails)

        return result
    
        
    } catch (error) {
        return console.log(error)
        
    }


}



module.exports = {
    sendWelcomeEmail,
    sendResetPasswordEmail
}