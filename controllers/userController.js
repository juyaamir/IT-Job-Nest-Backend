import axios from 'axios';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//@desc Register a new user
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).send({ message: 'Please fill all the fields' });
    }
    const user = await User.findOne({ email });
    if (user) {
        return res.status(400).send({ message: 'User already exists' });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });
        res.status(201).send({ message: 'User created successfully' });
    } catch (error) {
        res.status(500).send({ message: `Server error ${error.message}` });
    }
};

//@desc login a user and compare the password and create a token
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send({ message: 'Invalid credentials!' });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send({ message: 'Invalid credentials!' });
        }

        //create json token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).send({ message: 'Logged in successfully!', token });
    } catch (error) {
        res.status(500).send({ message: `Server Error ${error.message}` });
    }
};

//@desc delete a user
export const deleteUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: 'All fields are required' });
    }

    try {
        const user = await User.findOneAndDelete({ email, password });
        if (!user) {
            return res.status(400).send({ message: 'User not found!' });
        }
        res.status(204).send({ message: 'User was successfully deleted' });
    } catch (error) {
        res.status(500).send({ message: `Server Error ${error.message}` });
    }
};

//@desc update a user with new password
export const updateUser = async (req, res) => {
    const { email, password, newName } = req.body;

    //check if all fields are provided
    if (!email || !password || !newName) {
        return res.status(400).send({ message: 'All fields are required!' });
    }

    try {
        const user = await User.findOneAndUpdate({ email, password }, { name: newName });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ message: 'Data has been updated successfully.' });
    } catch (error) {
        res.status(500).send({ message: `Internal Server Error ${error.message}` });
    }
};

//@desc get user profile by id and send it to the client
export const getProfile = async (req, res) => {
    const id = req.user.id;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ profile: user });
    } catch (error) {
        res.status(500).send({ message: `Internal Server Error ${error.message}` });
    }
};