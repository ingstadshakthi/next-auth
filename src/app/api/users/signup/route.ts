import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { username, email, password } = reqBody;
        console.log(reqBody);

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({
                success: false,
                error: "user already exists",
                status: 400
            })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })

        const savedUser = await newUser.save();
        console.log(savedUser);

        // send verification email
        const mailResponse = await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id });


        return NextResponse.json({
            success: true,
            message: "User registered successfully",
            status: 201,
            savedUser
        });


    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message,
            status: 500
        });
    }
}

