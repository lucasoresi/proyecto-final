# Bahía Zen Therapy - Psychology Practice Website

Website profesional para consultorios de psicología en Bahía Blanca, Argentina. Sistema completo con gestión de turnos, autenticación de usuarios y panel de administración.

## Descripción

Aplicación web moderna desarrollada con React y TypeScript que ofrece:
- Página pública informativa con servicios de psicología
- Sistema de reserva de turnos para pacientes
- **Chatbot asistente virtual** integrado con n8n (solo para usuarios autenticados)
- Panel de administración para gestión de consultas
- Autenticación dual (usuarios y administradores)
- Backend REST API con Express y TypeScript
- Integración con Supabase para base de datos
- Diseño responsive y optimizado para SEO

## Tecnologías Utilizadas

### Frontend
- **React** 18.3.1 con TypeScript 5.8.3
- **Build Tool**: Vite 5.4.19 con plugin SWC
- **Routing**: React Router DOM v6.30.1
- **UI Framework**: shadcn/ui (basado en Radix UI)
- **Styling**: Tailwind CSS 3.4.17 con tokens personalizados
- **State Management**: TanStack Query (React Query) v5.83.0
- **Forms**: React Hook Form 7.61 + Zod 3.25 validation
- **Markdown**: react-markdown 10.1 + remark-gfm 4.0
- **Animations**: Magic UI components
- **Notifications**: Sonner 1.7

### Backend
- **Runtime**: Node.js con Express 4.22.1
- **Lenguaje**: TypeScript 5.1.6
- **Base de datos**: Supabase (PostgreSQL)
- **Autenticación**: JWT (jsonwebtoken 8.5) + bcryptjs 2.4
- **Seguridad**:
  - Helmet 7.0 (headers de seguridad HTTP)
  - CORS 2.8.5 (control de origen cruzado)
  - CSURF 1.11 (protección CSRF)
  - Express Rate Limit 8.2 (limitación de intentos)
  - XSS 1.0.15 (sanitización de inputs)
- **Validación**: Zod 3.23 (esquemas de validación)
- **Logging**: Morgan 1.10 (logs HTTP)
- **Dev Tools**: ts-node-dev 2.0 (hot reload)

### Integraciones
- **Chatbot**: n8n webhook (https://n8n.srv910860.hstgr.cloud)
- **Base de datos**: Supabase JS 2.89 (cliente)

## Requisitos Previos

- Node.js (versión 16 o superior) - [instalar con nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm o yarn
- Cuenta de Supabase (para backend)

## Instalación

### 1. Clonar el repositorio
```sh
git clone https://github.com/lucasoresi/proyecto-final
cd proyecto-final
```

### 2. Configurar el Backend

#### a) Instalar dependencias
```sh
cd backend
npm install
```


#### b) Iniciar el servidor backend
```sh
npm run dev
```

El backend estará disponible en `http://localhost:4000`

### 3. Configurar el Frontend

En una **nueva terminal**:

#### a) Instalar dependencias
```sh
cd frontend
npm install
```

#### b) Iniciar el servidor frontend
```sh
npm run dev
```

El frontend estará disponible en `http://localhost:8080`

### 4. Verificar instalación

- **Frontend:** http://localhost:8080
- **Backend API:** http://localhost:4000/health (debería responder "ok")

**Importante:** Ambos servidores deben estar corriendo simultáneamente para que la aplicación funcione correctamente.

## Credenciales de Acceso

### Usuario Administrador
Para acceder al panel de administración:

- **URL**: `/admin`
- **Usuario**: `equipopsipbbca@gmail.com`
- **Contraseña**: `rhOracMenTomBrialdnaLIOSADUcIN`

### Usuarios Regulares
Los usuarios pueden registrarse libremente en `/register` o iniciar sesión en `/login`

## Estructura del Proyecto

```
proyecto-final/
├── frontend/                    # Aplicación React (puerto 8080)
│   ├── src/
│   │   ├── components/          # Componentes reutilizables
│   │   │   ├── ui/             # Componentes base shadcn/ui (50+ archivos)
│   │   │   ├── auth/           # Sistema de autenticación dual
│   │   │   │   ├── AuthProvider.tsx        # Provider usuarios
│   │   │   │   ├── AuthProviderAdmin.tsx   # Provider admin
│   │   │   │   ├── ProtectedRoute.tsx      # Rutas protegidas usuarios
│   │   │   │   ├── ProtectedAdmin.tsx      # Rutas protegidas admin
│   │   │   │   ├── useAuth.tsx             # Hook usuarios
│   │   │   │   └── useAuthAdmin.tsx        # Hook admin
│   │   │   ├── chatbot/        # Sistema de chatbot con n8n
│   │   │   │   ├── chatbot-trigger.tsx     # Botón flotante
│   │   │   │   ├── chatbot-popup.tsx       # Modal del chat
│   │   │   │   ├── chatbot-ui.tsx          # Interfaz del chat
│   │   │   │   └── chatbot-runtime.tsx     # Lógica + integración n8n
│   │   │   ├── magicui/        # Componentes animados
│   │   │   ├── css/            # Estilos personalizados
│   │   │   ├── Header.tsx, Hero.tsx, Services.tsx
│   │   │   ├── Login.tsx, Register.tsx
│   │   │   └── Testimonials.tsx, Contact.tsx, Footer.tsx
│   │   ├── pages/              # Páginas principales
│   │   │   ├── Index.tsx               # Página pública
│   │   │   ├── IndexLogin.tsx          # Dashboard usuario (con chatbot)
│   │   │   ├── IndexAdmin.tsx          # Dashboard admin (con chatbot)
│   │   │   ├── CalendarioAdmin.tsx     # Gestión de calendario
│   │   │   ├── IndexConsultas.tsx      # Vista consultas
│   │   │   └── NotFound.tsx
│   │   ├── config/             # Configuración Supabase
│   │   ├── hooks/              # Custom hooks
│   │   ├── lib/                # Utilidades
│   │   └── assets/             # Recursos estáticos (imágenes, fuentes)
│   ├── public/
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.ts
│   └── tsconfig.json
│
└── backend/                     # API Express (puerto 4000)
    ├── src/
    │   ├── routes/             # Endpoints API
    │   │   ├── auth.ts         # Login, logout, CSRF, me
    │   │   ├── usuarios.ts     # CRUD usuarios + registro
    │   │   ├── turnos.ts       # Gestión de turnos/citas
    │   │   ├── agendar_consultas.ts  # Consultas agendadas
    │   │   ├── testimonials.ts # Testimonios
    │   │   └── services.ts     # Servicios de terapia
    │   ├── middleware/         # Middlewares
    │   │   ├── auth.ts         # Validación JWT (cookies)
    │   │   ├── admin.ts        # Verificación rol admin
    │   │   └── rateLimit.ts    # Limitadores de tasa
    │   ├── lib/
    │   │   ├── supabase.ts     # Cliente Supabase
    │   │   └── sanitize.ts     # Sanitización XSS
    │   ├── types/              # Tipos TypeScript
    │   └── index.ts            # Punto de entrada Express
    ├── package.json
    ├── tsconfig.json
    └── postman_collection.json # Colección Postman para testing
```

## Rutas de la Aplicación

- `/` - Página principal (pública)
- `/login` - Inicio de sesión de usuarios
- `/register` - Registro de nuevos usuarios
- `/main` - Dashboard de usuario (requiere autenticación)
- `/admin` - Panel de administración (requiere autenticación admin)
- `/calendario` - Calendario administrativo (requiere autenticación admin)
- `/consultas` - Gestión de consultas (requiere autenticación admin)

## Características Principales

- **Autenticación Dual**: Sistema separado para usuarios regulares y administradores
- **Chatbot Asistente Virtual**:
  - Integrado con n8n via webhook
  - Solo visible para usuarios autenticados
  - Soporte para markdown (tablas, listas, código)
  - Mantiene contexto de conversación con sessionId único
  - Logging detallado para debugging
- **Gestión de Turnos**: Los usuarios pueden solicitar turnos con selector de fecha
- **Panel Administrativo**: Gestión completa de consultas y calendario
- **Testimonios Dinámicos**: Sistema de testimonios con animación marquee
- **Formularios Validados**: React Hook Form con esquemas Zod
- **Integración WhatsApp**: Contacto directo desde formularios
- **Diseño Responsive**: Optimizado para todos los dispositivos
- **SEO Optimizado**: Meta tags y HTML semántico

## Arquitectura de Autenticación

### Sistema Dual de Autenticación

El proyecto implementa dos sistemas de autenticación separados:

#### 1. Usuarios Regulares
- **Registro:** `/register` (email, nombre, contraseña)
- **Login:** `/login` (email, contraseña)
- **Dashboard:** `/main` (acceso con autenticación)
- **Provider:** `AuthProvider` (components/auth/AuthProvider.tsx)
- **Hook:** `useAuth()` (components/auth/useAuth.tsx)
- **Protección:** `<ProtectedRoute>` (components/auth/ProtectedRoute.tsx)

#### 2. Administradores
- **Email fijo:** `equipopsipbbca@gmail.com`
- **Contraseña:** `rhOracMenTomBrialdnaLIOSADUcIN`
- **Panel:** `/admin`
- **Calendario:** `/calendario`
- **Consultas:** `/consultas`
- **Provider:** `AuthProviderAdmin` (components/auth/AuthProviderAdmin.tsx)
- **Hook:** `useAuthAdmin()` (components/auth/useAuthAdmin.tsx)
- **Protección:** `<ProtectedAdmin>` (components/auth/ProtectedAdmin.tsx)

### Flujo de Autenticación

```
1. Frontend obtiene CSRF token
   GET /api/auth/csrf-token

2. Frontend envía credenciales
   POST /api/auth/login
   Headers: X-CSRF-Token: <token>
   Body: { email, password }

3. Backend valida con bcrypt y Supabase
   - Verifica hash de contraseña
   - Valida contra tabla usuarios
   - Genera JWT

4. Backend envía JWT en cookie httpOnly
   Set-Cookie: session_jwt=<jwt>; HttpOnly; SameSite=lax

5. Frontend valida sesión
   GET /api/auth/me
   Cookie: session_jwt=<jwt>

6. Backend responde con datos de usuario
   { user: { id, email, name } }
```

### Seguridad Implementada

- **JWT:** Tokens firmados con secret, expiración 24h
- **Cookies httpOnly:** Protección contra XSS
- **CSRF Protection:** Tokens CSRF en operaciones de escritura
- **Rate Limiting:**
  - Login: 5 intentos / 15 minutos
  - Registro: 5 cuentas / hora por IP
  - General: 20 solicitudes / 15 minutos
- **Bloqueo de cuenta:** Después de 5 intentos fallidos (15 minutos)
- **Hash de contraseñas:** bcrypt con salt automático
- **Sanitización:** XSS protection en todos los inputs
- **CORS:** Restringido a `FRONTEND_URL`


### Tablas de Supabase Requeridas

El backend espera las siguientes tablas en Supabase:

#### Tabla: `usuarios`
```sql
CREATE TABLE usuarios (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,           -- Hash bcrypt
  name TEXT,
  failed_login_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabla: `turnos`
```sql
CREATE TABLE turnos (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES usuarios(id),
  fecha DATE NOT NULL,              -- Formato: YYYY-MM-DD
  hora TIME NOT NULL,               -- Formato: HH:mm
  created_by TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabla: `agendar_consultas`
```sql
CREATE TABLE agendar_consultas (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  date DATE NOT NULL,
  modalidad TEXT NOT NULL,          -- 'presencial' | 'virtual'
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabla: `testimonials`
```sql
CREATE TABLE testimonials (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES usuarios(id),
  name TEXT NOT NULL,
  location TEXT,
  body TEXT NOT NULL,
  rating INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabla: `services` (opcional)
```sql
CREATE TABLE services (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio DECIMAL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Políticas de Seguridad (RLS)

Configura Row Level Security en Supabase según tus necesidades. El backend usa el **service role key** que bypasea RLS, por lo que el control de acceso se maneja en el código del backend.

### API Endpoints Disponibles

Ver documentación completa en `backend/README.md`.

**Base URL:** `http://localhost:4000`

#### Autenticación
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual
- `POST /api/auth/logout` - Cerrar sesión
- `GET /api/auth/csrf-token` - Obtener token CSRF

#### Usuarios
- `GET /api/usuarios` - Listar usuarios
- `GET /api/usuarios/:id` - Obtener usuario por ID (ejemplo: `/api/usuarios/1`)
- `GET /api/usuarios?email=...` - Buscar por email
- `POST /api/usuarios` - Crear usuario (registro)
- `DELETE /api/usuarios/:id` - Eliminar usuario

#### Turnos
- `GET /api/turnos` - Listar turnos
- `GET /api/turnos/:id` - Obtener turno por ID
- `POST /api/turnos` - Crear turno
- `DELETE /api/turnos/:id` - Eliminar turno

#### Consultas
- `GET /api/agendar_consultas` - Listar consultas
- `GET /api/agendar_consultas/:id` - Obtener consulta por ID
- `POST /api/agendar_consultas` - Agendar consulta
- `DELETE /api/agendar_consultas/:id` - Eliminar consulta

#### Testimonios
- `GET /api/testimonials` - Listar testimonios
- `GET /api/testimonials/:id` - Obtener testimonio por ID
- `POST /api/testimonials` - Crear testimonio
- `DELETE /api/testimonials/:id` - Eliminar testimonio

#### Servicios
- `GET /api/services` - Listar servicios
- `GET /api/services/:id` - Obtener servicio por ID
- `POST /api/services` - Crear servicio
- `DELETE /api/services/:id` - Eliminar servicio

#### Health Check
- `GET /health` - Verificar estado del servidor

### Testing con Postman

Importa la colección `backend/postman_collection.json` en Postman para probar todos los endpoints con ejemplos pre-configurados.

Para obtener el token CSRF necesario:
```sh
GET http://localhost:4000/api/auth/csrf-token
```

Luego úsalo en el header `X-CSRF-Token` para operaciones POST/DELETE.

## Configuración del Chatbot con n8n

El chatbot está integrado con n8n mediante webhooks y solo es visible para usuarios autenticados.

### Características Técnicas

- **Acceso:** Solo usuarios autenticados (regular o admin)
- **Ubicación:**
  - Dashboard usuario: `/main` (IndexLogin.tsx)
  - Dashboard admin: `/admin` (IndexAdmin.tsx)
- **UI:** Botón flotante en esquina inferior derecha
- **SessionId:** Único por conversación para mantener contexto
- **Historial:** Se envía el historial completo en cada petición
- **Markdown:** Soporte completo (tablas, listas, código, blockquotes)
- **Logging:** Console logs detallados (📤 📥 ✅ ❌)

### Implementación Frontend

**Archivos:**
- `chatbot-trigger.tsx` - Botón flotante (MessageCircle icon)
- `chatbot-popup.tsx` - Modal del chat
- `chatbot-ui.tsx` - Interfaz visual
- `chatbot-runtime.tsx` - Lógica + integración n8n

**Hook personalizado:**
```typescript
// frontend/src/components/chatbot/chatbot-runtime.tsx
const { messages, sendMessage, isLoading, error } = useChatbot();
```

### 1. Configurar el Webhook en n8n

1. Crea un workflow en n8n con un nodo **Webhook**
2. Configura el webhook para recibir peticiones POST
3. URL actual: `https://n8n.srv910860.hstgr.cloud/webhook/input`

4. Asegúrate de que tu webhook devuelva una respuesta en formato JSON:
   ```json
   {
     "response": "La respuesta del asistente aquí"
   }
   ```
   También soporta los campos: `message`, `output`, o `text`

5. **IMPORTANTE - Configurar CORS** en el nodo Webhook o Response:
   ```
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Methods: POST, OPTIONS
   Access-Control-Allow-Headers: Content-Type
   ```

### 2. Actualizar la URL del Webhook

Edita el archivo `frontend/src/components/chatbot/chatbot-runtime.tsx` (línea 8):
```typescript
const N8N_WEBHOOK_URL = 'https://tu-instancia.n8n.cloud/webhook/input';
```

### 3. Formato de Petición

El chatbot envía al webhook:
```json
{
  "message": "texto del usuario",
  "sessionId": "session_1704672000_abc123",
  "history": [
    {"role": "user", "content": "Hola"},
    {"role": "assistant", "content": "Hola, ¿en qué puedo ayudarte?"},
    {"role": "user", "content": "¿Qué servicios ofrecen?"}
  ]
}
```

### 4. Formato de Respuesta Esperada

N8n debe responder con uno de estos formatos:
```json
// Opción 1:
{
  "response": "Texto de la respuesta con **markdown**"
}

// Opción 2:
{
  "message": "Texto de la respuesta"
}

// Opción 3:
{
  "output": "Texto de la respuesta"
}

// Opción 4:
{
  "text": "Texto de la respuesta"
}
```

### 5. Debugging

El chatbot incluye logging detallado en la consola del navegador:
- 📤 `Enviando a n8n:` - Request enviado
- 📥 `Respuesta de n8n:` - Response recibida
- ✅ `Mensaje procesado` - Éxito
- ❌ `Error:` - Errores

Abre las DevTools del navegador (F12) y revisa la pestaña Console para ver el flujo completo.

### 6. Testing del Chatbot

Para probar el chatbot:
1. Inicia sesión como usuario regular o admin
2. Haz clic en el botón flotante de mensaje (esquina inferior derecha)
3. Escribe un mensaje de prueba
4. Verifica en la consola del navegador que se envía correctamente
5. Revisa que n8n esté respondiendo en el formato correcto

## Comandos Disponibles

### Frontend (puerto 8080)
```sh
cd frontend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Compilar para producción
npm run build

# Compilar en modo desarrollo
npm run build:dev

# Ejecutar linter
npm run lint

# Preview de build de producción
npm run preview
```

### Backend (puerto 4000)
```sh
cd backend

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo con hot-reload
npm run dev

# Compilar TypeScript a JavaScript (dist/)
npm run build

# Ejecutar código compilado (producción)
npm start
```

### Iniciar ambos simultáneamente

**Opción 1: Dos terminales**
```sh
# Terminal 1 - Backend
cd backend && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

**Opción 2: Con concurrently (opcional)**
```sh
# Instalar concurrently globalmente
npm install -g concurrently

# Desde la raíz del proyecto
concurrently "cd backend && npm run dev" "cd frontend && npm run dev"
```

## Despliegue

### Frontend

#### Opción 1: Vercel / Netlify
```sh
cd frontend
npm run build
# Subir carpeta dist/ a Vercel/Netlify
```

#### Opción 2: Build manual
```sh
cd frontend
npm run build
```
Los archivos de producción se generarán en `frontend/dist/`

### Backend

#### Opción 1: Railway / Render / Fly.io
1. Conecta tu repositorio
2. Configura las variables de entorno (ver sección Configuración del Backend)
3. Build command: `cd backend && npm run build`
4. Start command: `cd backend && npm start`

#### Opción 2: VPS (Ubuntu/Debian)
```sh
# Instalar Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clonar y configurar
git clone https://github.com/lucasoresi/proyecto-final
cd proyecto-final/backend
npm install
npm run build

# Configurar variables de entorno
nano .env

# Usar PM2 para proceso persistente
npm install -g pm2
pm2 start dist/index.js --name bahia-backend
pm2 save
pm2 startup
```

#### Opción 3: Docker
```dockerfile
# backend/Dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 4000
CMD ["node", "dist/index.js"]
```

### Configuración de Producción

**Variables de entorno críticas:**
- `NODE_ENV=production`
- `JWT_SECRET` - Usar secreto fuerte y único
- `FRONTEND_URL` - URL del frontend desplegado (ej: https://tudominio.com)
- `SUPABASE_SERVICE_KEY` - Mantener seguro, nunca commitear

**Seguridad en producción:**
- HTTPS obligatorio (certificado SSL)
- `secure: true` en cookies (backend/src/index.ts)
- CORS restringido a dominio específico
- Rate limiting activado
- Helmet con CSP completo
- Variables de entorno en plataforma de hosting

### Dominio Personalizado

Si usas un dominio personalizado, actualiza:
- Variable `FRONTEND_URL` en el backend
- Configuración CORS en backend/src/index.ts
- URL del webhook n8n si es necesario

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Origen del Proyecto

Este proyecto fue inicialmente creado con [Lovable.dev](https://lovable.dev/projects/bdce1f43-33e3-4273-9b9e-31611168f47d) y posteriormente extendido con un backend completo en Node.js/Express.

## Workflow n8n
<img width="1522" height="560" alt="image" src="https://github.com/user-attachments/assets/2c39aa37-ceaf-41d6-8c02-1118c4b79cfb" />

## Contacto

Para consultas sobre el proyecto, contactar a: equipopsipbbca@gmail.com
