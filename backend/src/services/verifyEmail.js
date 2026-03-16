import 'dotenv/config'
import { sendEmail } from './mail.service.js';


async function sendVerificationEmail(user,emailVerifyToken){
    await sendEmail({
            to: user.email,
            subject: "Welcome to Perplexity",
            html: `<div style="font-family: Arial, sans-serif; max-width: 500px; margin: auto; padding: 20px;">
            <h2 style="color: #333;">Welcome! 🎉</h2>
    
            <p>Hi ${user.username},</p>
    
            <p>
                Thank you for registering with us. We're excited to have you onboard!
            </p>
            <a href="${process.env.CLIENT_URL}/api/auth/verify-email?token=${emailVerifyToken}" >
                Click Here To Verify Your Account 
            </a>(Valid for 7 minutes)
    
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