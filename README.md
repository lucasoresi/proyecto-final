# Bahía Zen Therapy - Psychology Practice Website

Website profesional para consultorios de psicología en Bahía Blanca, Argentina. Sistema completo con gestión de turnos, autenticación de usuarios y panel de administración.

## Descripción

Aplicación web moderna desarrollada con React y TypeScript que ofrece:
- Página pública informativa con servicios de psicología
- Sistema de reserva de turnos para pacientes
- **Chatbot asistente virtual** integrado con n8n (solo para usuarios autenticados)
- Panel de administración para gestión de consultas
- Autenticación dual (usuarios y administradores)
- Integración con Supabase para base de datos y autenticación
- Diseño responsive y optimizado para SEO

## Tecnologías Utilizadas

- **Frontend**: React 18.3.1 con TypeScript
- **Build Tool**: Vite con SWC plugin
- **Routing**: React Router DOM v6
- **UI Framework**: shadcn/ui (basado en Radix UI)
- **Styling**: Tailwind CSS con tokens personalizados
- **State Management**: TanStack Query (React Query)
- **Forms**: React Hook Form + Zod validation
- **Backend**: Supabase (Auth, Database, Storage)
- **Chatbot**: Integración con n8n via webhook
- **Markdown**: react-markdown + remark-gfm (para renderizar respuestas del chatbot)
- **Animations**: Magic UI components

## Requisitos Previos

- Node.js (versión 16 o superior) - [instalar con nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm o yarn
- Cuenta de Supabase (para backend)

## Instalación

1. Clonar el repositorio:
```sh
git clone https://github.com/lucasoresi/proyecto-final
cd proyecto-final
```

2. Instalar dependencias:
```sh
npm install
npm install react-markdown remark-gfm
```

3. Iniciar el servidor de desarrollo:
```sh
npm run dev
```

El servidor se iniciará en `http://localhost:8080`

No el backend anda en la nube, asi que no se tiene que hacer nada mas que esos comandos para andar


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
bahia-zen-therapy/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── ui/             # Componentes base de shadcn/ui
│   │   ├── auth/           # Providers y rutas protegidas
│   │   ├── chatbot/        # Sistema de chatbot con n8n
│   │   │   ├── chatbot-trigger.tsx   # Botón flotante
│   │   │   ├── chatbot-popup.tsx     # Modal del chat
│   │   │   ├── chatbot-ui.tsx        # Interfaz del chat
│   │   │   └── chatbot-runtime.tsx   # Lógica + integración n8n
│   │   ├── magicui/        # Componentes animados
│   │   └── css/            # Estilos específicos
│   ├── pages/              # Páginas de la aplicación
│   │   ├── Index.tsx       # Página pública
│   │   ├── IndexLogin.tsx  # Dashboard de usuario (incluye chatbot)
│   │   ├── IndexAdmin.tsx  # Dashboard de admin (incluye chatbot)
│   │   └── CalendarioAdmin.tsx  # Gestión de calendario
│   ├── config/             # Configuración (Supabase)
│   ├── hooks/              # Custom hooks
│   ├── lib/                # Utilidades
│   └── assets/             # Recursos estáticos
├── public/                 # Archivos públicos
└── package.json
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

## Comandos Disponibles

```sh
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo (puerto 8080)
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
## Desarrollo con Lovable

Este proyecto fue creado con [Lovable.dev](https://lovable.dev/projects/bdce1f43-33e3-4273-9b9e-31611168f47d).

### Editar con Lovable
Visita el [proyecto en Lovable](https://lovable.dev/projects/bdce1f43-33e3-4273-9b9e-31611168f47d) para hacer cambios mediante prompts. Los cambios se commitean automáticamente.

### Editar localmente
Los cambios locales pusheados al repositorio se reflejarán en Lovable automáticamente.

### GitHub Codespaces
1. Click en "Code" en el repositorio
2. Selecciona la pestaña "Codespaces"
3. Click en "New codespace"

## Despliegue

### Con Lovable
Abre [Lovable](https://lovable.dev/projects/bdce1f43-33e3-4273-9b9e-31611168f47d) y haz click en Share → Publish.

### Dominio Personalizado
Navega a Project > Settings > Domains y click en Connect Domain.

Más información: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

### Despliegue Manual
```sh
npm run build
```

Los archivos de producción se generarán en el directorio `dist/`

## Configuración de Supabase

El proyecto requiere las siguientes tablas en Supabase:
- `users` - Gestión de usuarios
- `appointments` - Turnos y consultas
- `testimonials` - Testimonios de clientes

Configura las políticas de seguridad (RLS) según los requisitos de tu aplicación.

## Configuración del Chatbot con n8n

El chatbot está integrado con n8n mediante webhooks. Para configurarlo:

### 1. Configurar el Webhook en n8n

1. Crea un workflow en n8n con un nodo **Webhook**
2. Configura el webhook para recibir peticiones POST
3. Asegúrate de que tu webhook devuelva una respuesta en formato JSON:
   ```json
   {
     "response": "La respuesta del asistente aquí"
   }
   ```
   También soporta los campos: `message`, `output`, o `text`

4. **Importante**: Configura CORS en el nodo Webhook o Response:
   ```
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Methods: POST, OPTIONS
   Access-Control-Allow-Headers: Content-Type
   ```

### 2. Actualizar la URL del Webhook

Edita el archivo `src/components/chatbot/chatbot-runtime.tsx` (línea 8):
```typescript
const N8N_WEBHOOK_URL = 'https://tu-instancia.n8n.cloud/webhook/input';
```

### 3. Formato de Petición

El chatbot envía al webhook:
```json
{
  "message": "texto del usuario",
  "sessionId": "session_unique_id",
  "history": [
    {"role": "user", "content": "Hola"},
    {"role": "assistant", "content": "Hola, ¿en qué puedo ayudarte?"}
  ]
}
```

### 4. Características del Chatbot

- **SessionId único**: Cada conversación tiene un ID único para mantener contexto
- **Historial**: Se envía el historial completo de mensajes en cada petición
- **Markdown**: Las respuestas soportan markdown (tablas, listas, código, etc.)
- **Solo usuarios autenticados**: El chatbot solo aparece después de login
- **Debugging**: Logs detallados en consola del navegador (📤 📥 ✅ ❌)

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Workflow n8n
<img width="1522" height="560" alt="image" src="https://github.com/user-attachments/assets/2c39aa37-ceaf-41d6-8c02-1118c4b79cfb" />


## Contacto

Para consultas sobre el proyecto, contactar a: equipopsipbbca@gmail.com
