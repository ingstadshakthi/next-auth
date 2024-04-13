import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server'
import { getDataFromToken } from '@/helpers/getDataFromToken';
connect();

export async function GET(request: NextRequest) {
    try {

        const userId = await getDataFromToken(request);
        const user = await User.findOne({ _id: userId }).select("-password");

        if (!user) {
            return NextResponse.json({
                success: false,
                error: "User Not found"
            }, { status: 400 });
        }

        return NextResponse.json({
            message: "User found",
            status: 200,
            data: user
        }, { status: 200 })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            error: error.message
        }, { status: 500 });
    }
}