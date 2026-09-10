import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 3000;

const doc = {
  info: {
    title: 'AutoFix-Express API',
    description: 'API para el sistema de gestión del taller mecánico AutoFix Express',
    version: '1.0.0',
  },
  host: `localhost:${PORT}`,
  schemes: ['http'],
  basePath: '/api',
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'Token JWT. Formato: Bearer <token>',
    },
  },
  tags: [
    {
      name: 'Usuarios',
      description: 'Endpoints para gestión de usuarios (autenticación y registro)',
    },
  ],
  definitions: {
    User: {
      id: 1,
      nombre: 'Juan Pérez',
      email: 'juan@autofix.com',
      role: 'RECEPCIONISTA',
      creadoEn: '2026-09-10T20:00:00.000Z',
    },
    LoginResponse: {
      message: 'Login exitoso',
      user: {
        id: 1,
        nombre: 'Juan Pérez',
        email: 'juan@autofix.com',
        role: 'RECEPCIONISTA',
      },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    },
    Error: {
      message: 'Error description',
    },
  },
};

const outputFile = './src/swagger.json';
const endpointsFiles = [
  './src/routes/userRoutes.ts',
  './src/index.ts',
];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc).then(() => {
  console.log('✅ Swagger JSON generado correctamente');
  console.log('📁 Archivo creado en: src/swagger.json');
  console.log('🔗 Documentación disponible en: http://localhost:' + PORT + '/api-docs');
});