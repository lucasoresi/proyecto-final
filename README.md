# Bahía Zen Therapy - Psychology Practice Website

Website profesional para consultorios de psicología en Bahía Blanca, Argentina. Sistema completo con gestión de turnos, autenticación de usuarios y panel de administración.

## Descripción

Aplicación web moderna desarrollada con React y TypeScript que ofrece:
- Página pública informativa con servicios de psicología
- Sistema de reserva de turnos para pacientes
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
- **Animations**: Magic UI components

## Requisitos Previos

- Node.js (versión 16 o superior) - [instalar con nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
- npm o yarn
- Cuenta de Supabase (para backend)

## Instalación

1. Clonar el repositorio:
```sh
git clone <YOUR_GIT_URL>
cd bahia-zen-therapy
```

2. Instalar dependencias:
```sh
npm install
```

3. Configurar variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con las siguientes variables:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_ADMIN_PASSWORD=your_admin_password
```

4. Iniciar el servidor de desarrollo:
```sh
npm run dev
```

El servidor se iniciará en `http://localhost:8080`

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
│   │   ├── magicui/        # Componentes animados
│   │   └── css/            # Estilos específicos
│   ├── pages/              # Páginas de la aplicación
│   │   ├── Index.tsx       # Página pública
│   │   ├── IndexLogin.tsx  # Dashboard de usuario
│   │   ├── IndexAdmin.tsx  # Dashboard de admin
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
- **Gestión de Turnos**: Los usuarios pueden solicitar turnos con selector de fecha
- **Panel Administrativo**: Gestión completa de consultas y calendario
- **Testimonios Dinámicos**: Sistema de testimonios con animación marquee
- **Formularios Validados**: React Hook Form con esquemas Zod
- **Integración WhatsApp**: Contacto directo desde formularios
- **Diseño Responsive**: Optimizado para todos los dispositivos
- **SEO Optimizado**: Meta tags y HTML semántico

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

## Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto es privado y pertenece al consultorio de psicología en Bahía Blanca.

## Contacto

Para consultas sobre el proyecto, contactar a: equipopsipbbca@gmail.com
