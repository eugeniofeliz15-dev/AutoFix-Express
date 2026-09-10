import { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/userService.js';
import { registerUserSchema, loginUserSchema } from '../utils/validations.js';

export const register = async (req: Request, res: Response) => {
  try {
    const validatedData = registerUserSchema.parse(req.body);
    const newUser = await registerUser(validatedData);
    res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = loginUserSchema.parse(req.body);
    const result = await loginUser(email, password);
    res.status(200).json({ message: 'Login exitoso', ...result });
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return res.status(400).json({ errors: error.errors });
    }
    res.status(401).json({ message: error.message });
  }
};