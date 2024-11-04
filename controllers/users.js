import { registerUserValidator, loginUserValidator } from "../validators/users.js";
import { UserModel } from "../models/users.js";
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