import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server'

connect();

export async function POST(request: NextRequest) {
    try {
        const requestBody = await request.json();
        const { token } = requestBody;
        console.log(token)
        if (!token) {
            return NextResponse.json({
                success: false,

                error: "Invalid token"
            }, { status: 400 })
        }

        const user = await User.findOne({ verifyToken: token, verifyTokenExpiry: { $gt: Date.now() } });
        console.log(user)
        if (!user) {
            return NextResponse.json({
                success: false,
                error: "Invalid token"
            }, { status: 400 })
        }

        console.log(user)

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json({
            success: true,
            status: 200,
            message: "Email verification successful"
        })

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            status: 500,
            error: error.message
        }, { status: 500 })
    }
}