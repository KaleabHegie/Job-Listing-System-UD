const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (authHeader && authHeader.startsWith('Bearer')) {
        token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                console.error('Token verification failed:', err);
                res.status(401);
                throw new Error('Not authorized! Invalid token.');
            }
            
            req.user = decoded.user;
            next();
        });
    } else {
        console.error('Authorization header missing or invalid');
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

// Generic role validation middleware
const validateRole = (allowedRoles) => {
    return asyncHandler((req, res, next) => {
        validateToken(req, res, () => {
            if (allowedRoles.includes(req.user.role)) {
                next();
            } else {
                res.status(403);
                throw new Error('Forbidden: You do not have access to this resource');
            }
        });
    });
};

// Specific validations
const validateAdmin = validateRole(['admin']);
const validateRecruiter = validateRole(['recruiter']);
const validateRecruiterOrAdmin = validateRole(['recruiter', 'admin']);
const validateCandidateOrAdmin = validateRole(['candidate', 'admin']);
const validateRecruiterOrCandidate = validateRole(['recruiter', 'candidate']);
const validateCandidate = validateRole(['candidate']);

module.exports = {
    validateToken,
    validateRecruiter,
    validateCandidate,
    validateAdmin,
    validateRecruiterOrAdmin,
    validateCandidateOrAdmin,
    validateRecruiterOrCandidate
};
