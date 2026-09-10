import { prisma } from '../lib/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secreto';

export const registerUser = async (data: { 
  nombre: string; 
  email: string; 
  password: string; 
  role?: 'MECANICO' | 'RECEPCIONISTA' | 'DUENO' 
}) => {
  const existingUser = await prisma.usuarios.findUnique({ 
    where: { email: data.email } 
  });
  
  if (existingUser) {
    throw new Error('El correo ya está registrado');
  }

  const password_hash = await bcrypt.hash(data.password, 10);
  
  const newUser = await prisma.usuarios.create({
    data: {
      nombre: data.nombre,
      email: data.email,
      password_hash,
      role: data.role || 'RECEPCIONISTA',
    },
    select: { 
      id: true, 
      nombre: true, 
      email: true, 
      role: true, 
      creadoEn: true 
    }
  });
  
  return newUser;
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.usuarios.findUnique({ 
    where: { email } 
  });
  
  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  const isMatch = await bcrypt.compare(password, user.password_hash);
  if (!isMatch) {
    throw new Error('Credenciales inválidas');
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return {
    user: { 
      id: user.id, 
      nombre: user.nombre, 
      email: user.email, 
      role: user.role 
    },
    token
  };
};