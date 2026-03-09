const express = require('express')
const userModel = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

async function registerUser(req, res) {

    try {
        const { username, email, password, role = 'user' } = req.body
        const isUserExists = await userModel.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
        if (isUserExists) {
            return res.status(409).json({
                message: 'User Already Exists'
            })
        }
        const hash = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username,
            email,
            password: hash,
            role
        })
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET)
        res.cookie('token', token, {
            // httpOnly: true,

        })

        res.status(201).json({
            message: 'User Registered',
            user: {
                id: user._id,
                email: user.email,
                username: user.username,
                role: user.role
            }
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'Server DID NOT Register User',
            error: err.message
        })
    }

}

async function loginUser(req, res) {

    try {
        const { username, email, password } = req.body

        const user = await userModel.findOne({
            $or: [
                { username: username },
                { email: email }
            ]
        })
        if (!user) {
            return res.status(401).json({ message: "Invalid Credentials" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid Credentials"
            })
        }
        else {
            const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET)
            res.cookie('token', token, {
                // httpOnly: true,
            })
            res.status(200).json({
                message: "User Login Successful",
                user: {
                    id: user._id,
                    email: user.email,
                    username: user.username,
                    role: user.role
                }
            })
        }
    }
    catch (err) {
        res.status(500).json({
            message: 'Server DID NOT Login User',
            error: err.message
        })
    }


}

async function logoutUser(req, res) {
    res.clearCookie('token')
    res.status(200).json({
        message: "User Logged Out"
    })
}

module.exports = { registerUser, loginUser, logoutUser }
