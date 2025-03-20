import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

declare module 'express' {
    export interface Request {
        user?: any;
    }
}

export const authenticateUser = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.header('Authorization')?.split(' ')[1];
    console.log(`Token recieved: ${token}`);

    if (!token) {
        res.status(401).json({
            message: 'Access denied. No token provided',
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = decoded;
        console.log(`Decoded user: ${req.user}`);
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token' });
        return;
    }
};
