
import {
	PASSWORD_RESET_REQUEST_TEMPLATE,
	PASSWORD_RESET_SUCCESS_TEMPLATE,
} from "./emailTemplates.js";
import nodemailer from "nodemailer";

export const sendPasswordResetEmail = (email, resetURL) => {
	
	try {
		const transporter = nodemailer.createTransport({
			service:"gmail",
			auth:{
				user:process.env.EMAIL,
				pass:process.env.EMAIL_PASS
			}
		});
		const mailOptions = {
			from:process.env.EMAIL,
			to:email,
			subject: "Reset your password",
			html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
			category: "Password Reset",
		}

		transporter.sendMail(mailOptions,(error)=>{
			if(error){
				console.log("Error",error)
			}else{
				console.log("Email sent ")
			}
		})
	} catch (error) {
		console.error(`Error sending password reset email`, error);

		throw new Error(`Error sending password reset email: ${error}`);
	}
};

export const sendResetSuccessEmail = (email) => {
	
	try {
		const transporter = nodemailer.createTransport({
			service:"gmail",
			auth:{
				user:process.env.EMAIL,
				pass:process.env.EMAIL_PASS
			}
		});
		const mailOptions = {
			from:process.env.EMAIL,
			to:email,
			subject: "Password Reset Successful",
			html: PASSWORD_RESET_SUCCESS_TEMPLATE,
			category: "Password Reset",
		}

		transporter.sendMail(mailOptions,(error,info)=>{
			if(error){
				console.log("Error",error)
			}else{
				console.log("Email sent successfully", info.response)
			}
		})
		console.log("Password reset email sent successfully", response);
	} catch (error) {
		console.error(`Error sending password reset success email`, error);

		throw new Error(`Error sending password reset success email: ${error}`);
	}
};