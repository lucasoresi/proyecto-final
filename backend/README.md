# Psico Backend

API para el sitio de psicología (Bahía Blanca). Usa Supabase como base de datos.  
Esta documentación explica lo que se implementó y cómo probar los endpoints en Postman.

## Qué hicimos
- Configuración de servidor Express + TypeScript.
- Cliente Supabase centralizado en `src/lib/supabase.ts`.
- Rutas CRUD mínimas para las tablas existentes en Supabase:
  - `usuarios`, `testimonials`, `turnos`, `agendar_consultas`
  - `services` (opcional — configurar nombre de tabla si existe)
- Middleware de autenticación que valida JWT (supabase.auth.getUser).
- Archivo de colección Postman: `backend/postman_collection.json`.

## Variables de entorno (backend/.env)
- SUPABASE_URL=https://...supabase.co
- SUPABASE_ANON_KEY=eyJ...
- (opcional) SUPABASE_SERVICE_ROLE_KEY=...  — solo para operaciones privilegiadas en servidor
- PORT=4000
- (opcional) SUPABASE_SERVICES_TABLE=services

Copia `.env.example` a `.env` y completa las claves.

## Instalar y ejecutar (PowerShell)
```powershell
cd "c:\Users\Alexandre\Downloads\proyecto-final-main\backend"
npm install
copy .env.example .env   # editar .env con tus credenciales
npm run dev
```

## Rutas principales
Base: http://localhost:4000

- Health
  - GET /health

- Perfil (protegido)
  - GET /api/profile  — requiere header Authorization: Bearer <token>

- Usuarios
  - GET /api/usuarios
  - GET /api/usuarios/:id
  - GET /api/usuarios?email=...
  - POST /api/usuarios
  - DELETE /api/usuarios/:id

- Testimonials
  - GET /api/testimonials
  - GET /api/testimonials/:id
  - POST /api/testimonials
  - DELETE /api/testimonials/:id

- Agendar consultas
  - GET /api/agendar_consultas
  - GET /api/agendar_consultas/:id
  - POST /api/agendar_consultas
  - DELETE /api/agendar_consultas/:id

- Turnos
  - GET /api/turnos
  - GET /api/turnos/:id
  - POST /api/turnos
  - DELETE /api/turnos/:id