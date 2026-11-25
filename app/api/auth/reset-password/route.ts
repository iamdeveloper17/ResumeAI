import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { token, newPassword } = await req.json();
    
    // 🎯 DEBUG: Terminal me dekho kya token aa raha hai
    console.log("--- RESET PASSWORD API HIT ---");
    console.log("Received Token:", token);
    console.log("New Password Length:", newPassword?.length);

    await connectDB();

    // 1. User dhundo (Token aur Expiry check)
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: new Date() }, 
    });

    // 🎯 DEBUG: User mila ya nahi?
    if (!user) {
      console.log("❌ Error: User NOT found. Token expired or invalid.");
      
      // Check karo database me token hai ya nahi
      const anyUser = await User.findOne({ resetToken: token });
      if (anyUser) {
         console.log("⚠️ Token mila par EXPIRE ho gaya hai. Expiry:", anyUser.resetTokenExpiry);
      } else {
         console.log("⚠️ Token database me hi nahi hai. Shayad save nahi hua.");
      }

      return NextResponse.json(
        { error: "Invalid or expired token. Please request a new link." },
        { status: 400 }
      );
    }

    console.log("✅ User Found:", user.email);

    // 2. Naya password hash karo
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // 3. Password update karo aur token clear karo
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    
    await user.save();
    console.log("🎉 Password Successfully Updated!");

    return NextResponse.json({ message: "Password reset successful" });
    
  } catch (error) {
    console.error("🔥 Server Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}