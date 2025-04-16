import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (
    email: string, 
    token: string
) => {
    const resetLink = `http://t-8iu5.vercel.app/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "Amazing@resend.dev",
        to: email,
        subject: "Reset your password",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #2563eb;">Reset your password</h1>
                <p>Please click the button below to reset your password :</p>
                <a href="${resetLink}" 
                    style="display: inline-block; 
                           padding: 12px 24px; 
                           background-color: #2563eb; 
                           color: white; 
                           text-decoration: none; 
                           border-radius: 4px;
                           margin-top: 20px;">
                    Reset Password
                </a>
                <p style="margin-top: 30px; color: #6b7280;">
                    If you didn't request this email, you can safely ignore it.
                </p>
            </div>
        `
    });
}

export const sendVerificationEmail = async (
    email: string,
    token: string
) => {
    const confirmLink = `http://t-8iu5.vercel.app/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "Amazing@resend.dev",
        to: email,
        subject: "Confirm your email",
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h1 style="color: #2563eb;">Confirm Your Email Address</h1>
                <p>Please click the button below to verify your email address:</p>
                <a href="${confirmLink}" 
                    style="display: inline-block; 
                           padding: 12px 24px; 
                           background-color: #2563eb; 
                           color: white; 
                           text-decoration: none; 
                           border-radius: 4px;
                           margin-top: 20px;">
                    Verify Email
                </a>
                <p style="margin-top: 30px; color: #6b7280;">
                    If you didn't request this email, you can safely ignore this.
                </p>
            </div>
        `
    });
};