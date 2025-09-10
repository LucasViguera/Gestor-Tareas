# Gestor-Tareas

---

## Descripción
**Gestor-Tareas** es una aplicación web para la gestión de tareas, con roles diferenciados (`USER` y `ADMIN`). Los usuarios pueden:

- Crear, editar, eliminar y visualizar tareas.  
- Organizar tareas según prioridad o estado.  
- Gestionar usuarios y roles (solo administradores).

**Tecnologías y características:**

- **Backend:** Node.js, Express  
- **Frontend:** Angular  
- **Base de datos:** MySQL  
- **Seguridad:** JWT para autenticación, hashing de contraseñas  
- **API REST** documentada con Swagger  

La plataforma está diseñada para ser segura, escalable y fácil de mantener.

---

## Instalación

### Requisitos
- Node.js y npm  
- MySQL  

### Clonar el repositorio
git clone https://github.com/LucasViguera/Gestor-Tareas.git
cd Gestor-Tareas

### Configuración

### Instalar dependencias del backend:

cd backend
npm install


### Instalar dependencias del frontend:

cd ../frontend
npm install

### Crear un archivo .env en backend:

DATABASE_URL="mysql://uwzaec7mqimymo3p:M42PFCQTRbR5p86hMYrZ@bnxckqizzupy4akvlyql-mysql.services.clever-cloud.com:3306/bnxckqizzupy4akvlyql"
JWT_SECRET="claveSecreta"
PORT=3000


### Inicializar la base de datos MySQL y crear la base gestortareasdb.

### Ejecución
#### Backend
cd backend
node app.js


#### Frontend
cd ../frontend
npm start

**Sitio web disponible en: https://gestor-tareas-lucasvigueras-projects.vercel.app/home**

## Endpoints principales
**Autenticación**
Método	Ruta	Descripción
POST	/auth/register	Registrar un usuario
POST	/auth/login	Iniciar sesión
**Usuarios (solo ADMIN)**
Método	Ruta	Descripción
GET	/users	Listar usuarios
PUT	/users/:id/role	Cambiar rol de usuario
DELETE	/users/:id	Eliminar usuario
**Tareas**
Método	Ruta	Descripción
GET	/tasks	Listar tareas
POST	/tasks	Crear nueva tarea
PUT	/tasks/:id	Editar tarea existente
DELETE	/tasks/:id	Eliminar tarea
**Pruebas Unitarias**

Actualmente no están implementadas. Se adjuntó documentación y ejemplos de pruebas en la carpeta docs.

## Contacto

**Para dudas o consultas:** Lucas.viguera2001@gmail.com