import { registerUserValidator, loginUserValidator } from "../validators/users.js";
import { UserModel } from "../models/users.js";
import { mailTransporter } from "../utils/mail.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
    try {
      // Validate user input
      const { error, value } = registerUserValidator.validate(req.body);
      if (error) {
        return res.status(422).json(error);
      }
      // Check if user does not exist
      const user = await UserModel.findOne({ email: value.email });
      if (user) {
        return res.status(409).json("User already exists!");
      }
      // Hash their password
      const hashedPassword = bcrypt.hashSync(value.password, 10);
      // Save user into database
      await UserModel.create({
        ...value,
        password: hashedPassword
      });
      // Send comfirmation email
      await mailTransporter.sendMail({
        from: process.env.EMAIL,
        to: value.email,
        subject: "Welcome to Voltpath! 🎉",
        html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
            <h1 style="color: #4CAF50; text-align: center;">Welcome to Voltpath!</h1>
            <p>Dear ${value.name},</p>
            <p>Thank you for registering with Voltpath. We are excited to have you on board!</p>
            <p>Feel free to explore our services and let us know if you have any questions.</p>
            <p style="font-size: 0.9em;">Best regards,<br/>The Voltpath Team</p>
            <footer style="margin-top: 20px; text-align: center; font-size: 0.8em; color: #777;">
                <p>Voltpath Inc.</p>
                <p>1234 Electric Ave, Suite 100</p>
                <p>City, State, ZIP</p>
            </footer>
        </div>
    `
      });
      // Reponse to request
      res.json("User registered!");
    } catch (error) {
      next(error);
    }
  }

  export const loginUser = async (req, res, next) => {
    try {
      // Validate user input
      const { error, value } = loginUserValidator.validate(req.body);
      if (error) {
        return res.status(422).json(error);
      }
      // Find one user with identifier
      const user = await UserModel.findOne({ email: value.email });
      if (!user) {
        return res.status(404).json("User does not exist!");
      }
      // Compare their passwords
      const correctPassword = bcrypt.compareSync(value.password, user.password);
      if (!correctPassword) {
        return res.status(401).json
          ("Invalid credentials!");
      }
      // sigm a token for user
      const token = jwt.sign(
        { id: user.id }, process.env.JWT_PRIVATE_KEY, { expiresIn: "24h" }
      );
      // respond to resquest
      res.json({ message: "User logged in!", accessToken: token })
  
    } catch (error) {
      next(error);
    }
  }

  export const getProfile = async (req, res, next) => {
    try {
      // Find authenticated user from database
      const user = await UserModel
        .findById(req.auth.id)
        .select({ password: false });
      // Response request
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  export const deleteUser = async (req, res, next) => {
    try {
        // Delete user from the database
        const deletedUser = await UserModel.findByIdAndDelete(req.auth.id);
        // Check if user was found and deleted
        if (!deletedUser) {
            return res.status(404).json("User not found!");
        }
        // Respond with a success message
        res.json("User deleted successfully!");
    } catch (error) {
        next(error);
    }
}