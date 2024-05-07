import { body, param, validationResult } from 'express-validator';
import { BadRequestError } from '../utils/customError.js';
import User from '../models/UserModel.js';

// boiler-plate code for validation
const withValidationErrors = (validateValues)  =>{
    return [
        ...validateValues,
        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map(error => error.msg)
                throw new BadRequestError(errorMessages);
            }
            next();
        }
    ]
}

// for createJob and updateJob
export const validateJobInput = withValidationErrors([
    body('company').isString().notEmpty().withMessage('Company name is required'),
    body('position').isString().notEmpty().withMessage('Position is required'),
    body('jobLocation').notEmpty().withMessage('Job location is required'),
    body('jobStatus').isIn(['interview', 'declined', 'pending']).withMessage('Invalid job status'),
    body('jobType').isIn(['full-time', 'part-time', 'internship']).withMessage('Invalid job type'),
]);

// validate param for mongodb id
export const validateIdParam = withValidationErrors([
    param('id').isMongoId().withMessage('Invalid id')
    // alternatively, you can use the below code
    // param('id')
    // .custom((value) => mongoose.Types.ObjectId.isValid(value))
    // .withMessage('invalid MongoDB id'),
]);

// for register
export const validateRegisterInput = withValidationErrors([
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
    .notEmpty().withMessage('email is required')
    .isEmail()
    .withMessage('Invalid email format')
    .custom(async (email)=>{
        const user = await User.findOne({email});
        if(user){
            throw new BadRequestError('Email already exists');
        }
    }),
    body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
    body('location').notEmpty().withMessage('location is required'),
    body('lastName').notEmpty().withMessage('lastName is required'),
]);

// for login
export const validateLoginInput = withValidationErrors([
    body('email')
    .notEmpty().withMessage('email is required')
    .isEmail()
    .withMessage('Invalid email format'),

    body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
]);


// for update user
export const validateUpdateUserInput = withValidationErrors([
    body('password').customSanitizer(() => undefined),  // remove password from req.body
    body('name').notEmpty().withMessage('Name is required'),
    body('email')
    .notEmpty().withMessage('email is required')
    .isEmail().withMessage('Invalid email format')
    .custom(async (email, {req})=>{
        const user = await User.findOne({email});
        if(user && user._id.toString() !== req.user.userId){
            throw new BadRequestError('Email already exists');
        }
    }),
    body('location').notEmpty().withMessage('location is required'),
    body('lastName').notEmpty().withMessage('lastName is required'),
    body('role').customSanitizer(() => 'user'),  // prevent role from updating
]);