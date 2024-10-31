const asyncHandler = require('express-async-handler')
const Users = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400)
        throw new Error('Please provide email and password')
    }

    // Add `await` here to wait for the user to be fetched
    const user = await Users.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign(
            {
                user: {
                    username: user.user_name, // Use `user_name` to match your schema
                    email: user.email,
                    id: user._id,
                    role : user.role
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            {
                expiresIn: '15m'
            }
        )

        res.status(200).json({ accessToken })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
})

module.exports = {
    login,
    currentUser
}
