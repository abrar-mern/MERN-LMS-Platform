//  Require the dependency model
const User = require("../models/User");
const mailSender = require("../utils/mailsender");
const crypto = require("crypto");
const bcrypt = require("bcrypt");

// Reset Password token generation and sending email
// ===================================================================
exports.resetPasswordToken = async(req, res) => {
    try{
        // Get Email from the request body
        const email = req.body.email;
        // Check if the user is registered or not with this email and add validation
        const userDetails = await User.findOne({email: email});
        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: "user not found with this email",
            });
        }
        // Generate a unique token for password reset
		const token = crypto.randomBytes(20).toString("hex");
        // Update the user by adding the token and its expiry time (1 hour)
        const updateDetails = await User.findOneAndUpdate(
            {email: email},
            {
                token: token,
                resetPasswordToken: Date.now() + 5*60*1000, // 5 minutes
            },
            {new: true} // To return the updated document
        );
        console.log("Details", updateDetails)

        // Create a password reset URL containing the token
    const url = `http://localhost:3000/update-password/${token}`;
        
        // Send the password reset email to the user

        await mailSender(email, "Reset Your Password", `Click on the link to reset your password: ${url} . This link is valid for 5 minutes.`);
        // Return a response to the frontend about the success/failure of the email sending 
        return res.status(200).json({
            success: true,
            message: "Password reset email sent successfully.",
        });
      
    }
    catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong in sending password reset email."
        });
    }
}


// Reset Password
// ===================================================================

exports.resetPassword = async(req, res) => {
    try{
        // Get data from the request body
        const {token, password, confirmPassword} = req.body;

        // Check Validation 
        if(password !== confirmPassword){
            return res.status(400).json({
                success: false,
                message: "New Password and Confirm Password do not match.",
            });
        }

        if(password.length < 6){
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long.",
            });
        }

        // Get the user Details from the database using the token
        const userDetails = await User.findOne({
            token: token,
        })

        
        // If no entry then invlaid token

        if(!userDetails){
            return res.status(404).json({
                success: false,
                message: "Invalid token.",
            });
        }

        // Check for token expiry
        if(userDetails.resetPasswordToken < Date.now()){
            return res.status(400).json({
                success: false,
                message: "Token has expired. Please try again.",
            });
        }

        // hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //update the password in the database and remove the token and its expiry time
        await User.findOneAndUpdate(
            {token: token},
            {password: hashedPassword},
           {new: true} // To return the updated document

        );

        // send a success response to the frontend
        return res.status(200).json({
            success: true,
            message: "Password updated successfully.",
        });
    }
    
    catch(error){
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Something went wrong in updating the password."
        });
    }
}