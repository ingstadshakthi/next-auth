import User from '@/models/userModel';
import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';

type EmailParams = {
    email: string,
    emailType: 'VERIFY' | 'RESET',
    userId: string,
}

export const sendEmail = async ({ email, emailType, userId }: EmailParams) => {
    try {

        //TODO: configure mail for usage

        const token = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === 'VERIFY') {
            await User.findByIdAndUpdate(
                userId,
                {
                    verifyToken: token,
                    verifyTokenExpiry: Date.now() + 1000 * 60 * 60
                })
        } else if (emailType === 'RESET') {
            await User.findByIdAndUpdate(userId,
                {
                    forgotPasswordToken: token,
                    forgotPasswordTokenExpiry: Date.now() + 1000 * 60 * 60
                })
        }

        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILER_USERNAME,
                pass: process.env.MAILER_PASSWORD
            }
        });

        const subject = emailType === 'VERIFY' ? "Verify your email" : 'Reset your password';
        const link = emailType === 'VERIFY' ? `${process.env.DOMAIN}/verifyemail?token=${token}` : `${process.env.DOMAIN}/resetpassword?token=${token}`
        const mailOptions = {
            from: 'ingstad26@gmail.com',
            to: email,
            subject,
            html: `<p>Click <a href="${link}">here</a> to ${subject.toLowerCase()} 
            or copy and paste the link below in your browser. <br /> ${link}`
        }

        const mailResponse = await transporter.sendMail(mailOptions);
        return mailResponse;
    } catch (err: any) {
        throw new Error(err.message);
    }
}