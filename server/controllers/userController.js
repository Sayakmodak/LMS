import { User } from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import { generateToken } from "../utils/generateToken.js";
// import jwt from 'jsonwebtoken';


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "all fields are required"
            })
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({
                success: false,
                message: "email is already exists"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userCreation = await User.create({
            name: name,
            email: email,
            password: hashedPassword
        })
        return res.status(200).json({
            success: true,
            message: "user created", userCreation
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "user is not created"
        })
    }
}



const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "all fields are required"
            })
        }

        const user = await User.findOne({ email }); // finding the user based on the email
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "invalid credentials"
            })
        }

        const isMatchedPassword = await bcrypt.compare(password, user.password);
        if (!isMatchedPassword) {
            res.status(400).json({
                success: false,
                message: "invalid credentials"
            })
        }
        // generate token for authentication
        generateToken(res, user, `hello ${user.name}`);

        /*
        const token = jwt.sign({ userId: user._id }, "secret_key", { expiresIn: '1d' });
        return res.status(200).cookie("token", token).json({
            message: true,
            token
        })*/

    } catch (error) {
        console.log(error);
        return res.status(400).json({
            success: false,
            message: "error occured"
        })
    }
}

module.exports = {
    register,
    login
};