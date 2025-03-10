# 🌟 Employee Management App

## 📋 Descripción

La **Employee Management App** es una aplicación web diseñada para facilitar la gestión de empleados. Con esta herramienta, puedes:

- 🔑 **Iniciar sesión** con un usuario previamente registrado.
- 👀 **Ver una lista de empleados** con detalles básicos.
- ✏️ **Editar empleados existentes**.
- ❌ **Eliminar empleados** que ya no sean necesarios.
- ➕ **Crear nuevos empleados**.
- 🔍 **Filtrar empleados por nombre** para encontrar rápidamente lo que necesitas.
- 📄 **Navegar con paginación**, mostrando 6 empleados por página.

¡Todo esto en una interfaz intuitiva, responsive y fácil de usar! 🚀

---

## 🛠️ Funcionalidades Principales

### ✅ Autenticación
- Solo los usuarios autenticados pueden acceder a la lista de empleados.
- Para iniciar sesión, necesitas un usuario previamente registrado.

### 📄 Gestión de Empleados
- **Crear**: Agrega nuevos empleados al sistema con información básica como nombre, apellido, puesto y fecha de nacimiento.
- **Editar**: Actualiza la información de cualquier empleado existente.
- **Eliminar**: Elimina empleados del sistema con un simple clic.

### 🔍 Filtrado y Paginación
- Filtra la lista de empleados por nombre para encontrar rápidamente lo que buscas.
- Navega fácilmente entre páginas con paginación (6 empleados por página).

---

## 🚀 Cómo Empezar

Sigue estos pasos para configurar y ejecutar la aplicación en tu máquina local:

### 1️⃣ Clona el Repositorio

```bash
git clone https://github.com/nestordqa/emplyees-webapp.git
cd emplyees-webapp
```

### 2️⃣ Instala las Dependencias

Asegúrate de instalar todas las dependencias necesarias ejecutando:

```bash
npm install
```

### 3️⃣ Configura las Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto y añade la siguiente línea:

```env
VITE_API_URL=http://localhost:3000
```

> ⚠️ Asegúrate de que el servidor API esté corriendo en `http://localhost:3000`.

### 4️⃣ Inicia el Servidor de Desarrollo

Ejecuta el siguiente comando para iniciar la aplicación:

```bash
npm run dev
```

### 5️⃣ Abre el Navegador

Abre tu navegador favorito y ve a:

```
http://localhost:5173
```

---

## 🎥 Vista Previa de la Aplicación

Aquí tienes una idea de cómo se ve la aplicación:

| Pantalla | Descripción |
|----------|-------------|
| 🖥️ **Inicio de Sesión** | Página para iniciar sesión con un usuario registrado. |
| 👥 **Lista de Empleados** | Visualiza, filtra, edita o elimina empleados. |
| ➕ **Crear/Editar Empleado** | Modal para agregar o editar empleados. |

---

## 🧪 Características Técnicas

### Tecnologías Utilizadas
- **Frontend**: React + TypeScript + Vite ⚛️
- **UI Framework**: Material-UI (MUI) 🎨
- **Gestión del Estado**: React Context API 🗂️
- **Llamadas a API**: Axios 🌐
- **Paginación y Filtrado**: Implementados manualmente para mejorar la experiencia del usuario.

---

¡Gracias por usar Employee Management App! 🎉 Espero que disfrutes trabajando con esta herramienta tanto como yo disfruté desarrollándola. 😊
```

---