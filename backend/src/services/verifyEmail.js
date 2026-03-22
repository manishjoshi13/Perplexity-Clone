import 'dotenv/config'
import { sendEmail } from './mail.service.js';
import jwt from 'jsonwebtoken';



async function sendVerificationEmail(username,email,token){
    
    await sendEmail({
            to: email,
            subject: "Welcome to Perplexity",
            html: `<div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px;">
            <h2 style="color: #333;">Welcome! 🎉</h2>
    
            <p>Hi ${username},</p>
    
            <p>
                Thank you for registering with us. We're excited to have you onboard!
            </p>
            <a href="${process.env.CLIENT_URL}/api/auth/verify-email?token=${token}" >
                Click Here To Verify Your Account 
            </a>(Valid for 15 minutes)
    
            <p>
                Once you verify your account, you can start using all the features.
            </p>
    
            <p style="margin-top:20px;">
                Best regards,<br/>
                <strong>Team 
                <br/>
                Perplexity Cohort
                </strong>
            </p>
            </div>`
      });
}
export {sendVerificationEmail}