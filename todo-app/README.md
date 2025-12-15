# 📋 Gestor de Tareas (To-Do App)

Una aplicación moderna y robusta de gestión de tareas construida con **React 18+**, **Vite**, **Tailwind CSS**, **Dexie.js** (IndexedDB) e **Iconos Lucide**.

## ✨ Características

- ✅ **CRUD Completo**: Crear, leer, actualizar y eliminar tareas
- 🎯 **Organización Avanzada**: Filtrado por estado y ordenamiento por fecha/prioridad
- 💾 **Persistencia Real**: Almacenamiento en IndexedDB con Dexie.js
- 🎨 **Diseño Responsive**: Totalmente responsivo (Mobile-first)
- 🌙 **Dark/Light Mode**: Modo oscuro y claro
- ⚡ **Rendimiento**: Actualización instantánea con React y Vite
- 📱 **Mobile-Friendly**: Optimizado para cualquier dispositivo

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| React | 18.3+ | Framework principal |
| Vite | 5.2+ | Bundler y dev server |
| Tailwind CSS | 3.4+ | Estilos y diseño |
| Dexie.js | 4.0+ | IndexedDB wrapper |
| Lucide React | 0.428+ | Iconos SVG |

## 📦 Instalación

### 1. Clonar o descargar el proyecto

```bash
cd todo-app
```

### 2. Instalar dependencias

```bash
npm install
```

Esto instalará:
- React y React-DOM
- Vite y plugins
- Tailwind CSS y herramientas PostCSS
- Dexie.js
- Lucide-React

## 🚀 Iniciar la Aplicación

### Modo Desarrollo

```bash
npm run dev
```

La aplicación se abrirá automáticamente en `http://localhost:5173`

### Modo Producción (Build)

```bash
npm run build
```

Esto generará una carpeta `dist/` lista para deployment.

### Preview del Build

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
todo-app/
├── src/
│   ├── components/
│   │   ├── Header.jsx          # Encabezado con toggle dark mode
│   │   ├── TaskForm.jsx        # Formulario crear/editar tarea
│   │   ├── TaskList.jsx        # Lista de tareas
│   │   ├── TaskItem.jsx        # Componente individual de tarea
│   │   └── FilterBar.jsx       # Filtros y ordenamiento
│   ├── hooks/
│   │   └── useTasks.js         # Custom hook para lógica de tareas
│   ├── db/
│   │   └── database.js         # Configuración de Dexie.js
│   ├── App.jsx                 # Componente principal
│   ├── main.jsx                # Punto de entrada
│   └── index.css               # Estilos globales
├── public/                     # Archivos públicos
├── index.html                  # HTML principal
├── package.json                # Dependencias
├── vite.config.js              # Configuración Vite
├── tailwind.config.js          # Configuración Tailwind
└── postcss.config.js           # Configuración PostCSS
```

## 🎯 Funcionalidades Principales

### 1. Crear Tarea
- Título (requerido)
- Descripción (opcional)
- Fecha de vencimiento (opcional)
- Prioridad: Alta, Media, Baja

### 2. Actualizar Tarea
- Hacer clic en el botón "Editar" (✏️)
- Modificar los campos
- Guardar cambios

### 3. Completar Tarea
- Hacer clic en el checkbox junto a la tarea
- La tarea se marca como completada (con tachado)

### 4. Eliminar Tarea
- Hacer clic en el botón "Eliminar" (🗑️)
- Confirmar en el diálogo

### 5. Filtrar Tareas
- **Todas**: Mostrar todas las tareas
- **Pendientes**: Solo tareas no completadas
- **Completadas**: Solo tareas completadas

### 6. Ordenar Tareas
- **Por Fecha**: Prioriza tareas próximas a vencer
- **Por Prioridad**: Agrupa por nivel de urgencia

## 🏗️ Arquitectura y Patrones

### Custom Hook: `useTasks`
Encapsula toda la lógica de base de datos y estado:
```javascript
const {
  tasks,
  filter,
  sortBy,
  addTask,
  updateTask,
  deleteTask,
  // ... más propiedades
} = useTasks();
```

### Componentes Modulares
Cada componente tiene una responsabilidad única:
- `TaskForm`: Solo maneja el formulario
- `TaskList`: Solo renderiza la lista
- `TaskItem`: Solo representa una tarea
- `FilterBar`: Solo gestiona filtros
- `Header`: Solo muestra el encabezado

## 🔒 Manejo de Errores

La aplicación incluye try/catch en operaciones de base de datos:

```javascript
try {
  await db.tasks.add(newTask);
} catch (err) {
  setError('Error al crear tarea: ' + err.message);
}
```

## 🌐 Persistencia de Datos

Los datos se almacenan automáticamente en **IndexedDB** del navegador:
- ✅ Persisten tras cerrar el navegador
- ✅ No requieren servidor
- ✅ Almacenamiento local y privado
- ✅ Seguro y rápido

## 🎨 Personalización

### Cambiar Colores de Prioridad
Edita `tailwind.config.js`:
```javascript
colors: {
  priority: {
    high: '#ef4444',   // Rojo
    medium: '#f59e0b', // Ámbar
    low: '#10b981',    // Verde
  }
}
```

### Agregar Nuevas Prioridades
1. Modifica `database.js`
2. Actualiza `TaskForm.jsx`
3. Actualiza `TaskItem.jsx`

## 📱 Responsive Design

- **Mobile (< 640px)**: Una columna, texto adaptado
- **Tablet (640px - 1024px)**: Dos columnas
- **Desktop (> 1024px)**: Diseño optimizado

## 📝 Próximas Mejoras Potenciales

- [ ] Sincronización con servidor
- [ ] Compartir tareas entre usuarios
- [ ] Recordatorios por email
- [ ] Exportar tareas a PDF/CSV
- [ ] Integración con Google Calendar
- [ ] Modo offline avanzado

## 🤝 Contribución

Este proyecto es un ejemplo educativo. Siéntete libre de forkearlo y adaptarlo.

**¡Disfruta organizando tus tareas! 🎉**
