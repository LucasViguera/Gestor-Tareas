# Gestor-Tareas

---

## Descripción
**Gestor-Tareas** es una aplicación web para la gestión de tareas, con roles diferenciados (`USER` y `ADMIN`).

### Los usuarios pueden:
- Visualizar sus propias tareas en un listado de Tareas pendientes.  
- Verificar el estado actual de la tarea (completado o incompleto). 
- Analizar estadisticas propias o de otros usuarios sobre cantidad de tareas asignadas, completas o pendientes.
- Gestionar usuarios y roles (solo administradores).
- Visualizar un calendario con todas las tareas propias.
- Gestionar las tareas de los usuarios (solo administradores)
- Panel de administrador para gestion de usuarios (solo administradores)

**Tecnologías y características:**

- **Backend:** Node.js, Express  
- **Frontend:** Angular  
- **Base de datos:** MySQL  
- **Seguridad:** JWT para autenticación, hashing de contraseñas  

La plataforma está diseñada para ser segura, escalable y fácil de mantener.

---

## Instalación

### Requisitos
- Node.js y npm  
- MySQL  

### Clonar el repositorio
- git clone https://github.com/LucasViguera/Gestor-Tareas.git
- cd Gestor-Tareas

### Configuración

### Instalar dependencias del backend:

- cd backend
- npm install


### Instalar dependencias del frontend:

- cd ../frontend
- npm install

### Crear un archivo .env en backend:

- DATABASE_URL="mysql://uwzaec7mqimymo3p:M42PFCQTRbR5p86hMYrZ@bnxckqizzupy4akvlyql-mysql.services.clever-cloud.com:3306/bnxckqizzupy4akvlyql"
- JWT_SECRET="claveSecreta"
PORT=3000


### Inicializar la base de datos MySQL y crear la base gestortareasdb.

### Ejecución
#### Backend
- cd backend
- node app.js


#### Frontend
- cd ../frontend
- ng serve

**Sitio web disponible en: https://gestor-tareas-lucasvigueras-projects.vercel.app/home**

## Contacto

**Para dudas o consultas:** Lucas.viguera2001@gmail.com