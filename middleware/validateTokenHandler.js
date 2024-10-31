const asyncHandler = require('express-async-handler')
const jwt = require('jsonwebtoken')


const validateToken = asyncHandler(async (req, res, next) => {
    let token
    let authHeader = req.headers.authorization || req.headers.Authorization
    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401)
                throw new Error('Not authorized! Invalid token.')
            }
            req.user = decoded.user 
            next()
        })
    } else {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
})




const validateAdmin = asyncHandler((req, res, next) => {
    validateToken(req, res, () => {
        
        if (req.user.role === 'admin') {
            next()  
        } else {
            res.status(403)
            throw new Error('Forbidden: You do not have access to this resource')
        }
    })
})


const validateRecruiter = asyncHandler((req, res, next) => {
    validateToken(req, res, () => {
        if (req.user.role === 'recruiter') {
            next()  
        } else {
            res.status(403)
            throw new Error('Forbidden: You do not have access to this resource')
        }
         
    })
})


const validateCandidate = asyncHandler((req, res, next) => {
    validateToken(req, res, () => {
        if (req.user.role === 'candidate') {
            next() 
        } else {
            res.status(403)
            throw new Error('Forbidden: You do not have access to this resource')
        }
    })
})

module.exports = {
    validateToken,  
    validateRecruiter,  
    validateCandidate  ,
    validateAdmin
}
