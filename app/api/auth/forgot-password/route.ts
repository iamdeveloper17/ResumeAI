import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import crypto from "crypto";

export async function POST(req: Request) {
  try {
    const { email } = await req.json();
    await connectDB();

    const user = await User.findOne({ email });
    
    if (!user) {
      return NextResponse.json({ message: "If email exists, reset link sent." });
    }

    // 1. Token generate
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    // 2. Database me save
    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    // 3. Link banao
    const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;

    // 🚀 TERMINAL PRINT (backup ke liye)
    console.log("\n🔐 PASSWORD RESET LINK:", resetUrl, "\n");

    // 🎯 FRONTEND KO LINK BHEJO
    return NextResponse.json({ 
      message: "Reset link generated successfully", 
      resetUrl: resetUrl 
    });
  } catch (error) {
    console.error("Forgot password error:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}