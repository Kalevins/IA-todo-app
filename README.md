# 🚀 Guía Rápida de Ejecución

## ✅ Estado Actual

La aplicación **Gestor de Tareas** ha sido creada exitosamente y está **lista para usar**.

## 📍 Ubicación del Proyecto

```
todo-app
```

## ⚡ Comandos Rápidos

### 1. **Iniciar en Desarrollo** (Ya está ejecutándose)
```bash
cd .\todo-app
npm run dev
```
- URL: http://localhost:5173/

### 2. **Compilar para Producción**
```bash
npm run build
```
- Genera carpeta `dist/` lista para deployment

### 3. **Vista Previa del Build**
```bash
npm run preview
```

## 📦 Dependencias Instaladas

✅ React 18.3.1
✅ Vite 5.2.0
✅ Tailwind CSS 3.4.1
✅ Dexie.js 4.0.0
✅ Lucide-React 0.428.0

## 🎯 Funcionalidades Implementadas

✅ **CRUD Completo**
- Crear tareas (título, descripción, fecha, prioridad)
- Leer tareas (listado visual con estado)
- Actualizar tareas (editar contenido, marcar como completada)
- Eliminar tareas (con confirmación)

✅ **Organización**
- Filtrado: Todas, Pendientes, Completadas
- Ordenamiento: Por fecha o por prioridad
- Contador de tareas

✅ **Persistencia**
- IndexedDB (Dexie.js)
- Datos persisten al recargar
- Sin necesidad de servidor

✅ **UI/UX**
- Dark/Light mode
- Diseño responsive (mobile-first)
- Colores según prioridad
- Iconos Lucide-React
- Feedback visual completo

✅ **Arquitectura**
- Componentes modulares y reutilizables
- Custom hook `useTasks` para lógica
- Manejo de errores con try/catch
- Comentarios en código complejo
- Separación de responsabilidades

## 📁 Estructura de Carpetas

```
todo-app/
├── src/
│   ├── components/           # Componentes React
│   │   ├── Header.jsx        # Encabezado + dark mode
│   │   ├── TaskForm.jsx      # Formulario crear/editar
│   │   ├── TaskList.jsx      # Lista de tareas
│   │   ├── TaskItem.jsx      # Tarea individual
│   │   └── FilterBar.jsx     # Filtros y ordenamiento
│   ├── hooks/
│   │   └── useTasks.js       # Custom hook principal
│   ├── db/
│   │   └── database.js       # Configuración Dexie
│   ├── App.jsx               # Componente raíz
│   ├── main.jsx              # Punto de entrada
│   └── index.css             # Estilos globales
├── public/                   # Archivos estáticos
├── index.html                # HTML principal
├── package.json              # Dependencias
├── vite.config.js            # Config Vite
├── tailwind.config.js        # Config Tailwind
└── README.md                 # Documentación completa
```

### Características Disponibles

1. **Crear Tarea**: Formulario con título, descripción, fecha y prioridad
2. **Editar Tarea**: Botón ✏️ en cada tarea
3. **Completar Tarea**: Click en checkbox
4. **Eliminar Tarea**: Botón 🗑️ con confirmación
5. **Filtrar**: Todas, Pendientes, Completadas
6. **Ordenar**: Por fecha o prioridad
7. **Modo Oscuro**: Toggle en encabezado
8. **Persistencia**: Los datos se guardan automáticamente

## 🛑 Detener el Servidor

En la terminal, presiona:
```
q + Enter
```

## 📝 Personalización

Para personalizar la aplicación:

1. **Cambiar colores**: Edita `tailwind.config.js`
2. **Agregar campos**: Modifica `database.js` y `TaskForm.jsx`
3. **Cambiar textos**: Edita los componentes en `src/components/`

## 🚀 Deploy

Para llevar la aplicación a producción:

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Arrastra carpeta 'dist/'
```

### GitHub Pages
```bash
npm run build
# Sube 'dist/' como rama 'gh-pages'
```

---

## ✨ Resumen de Entregables

✅ **Comandos de instalación**: `npm install`
✅ **Estructura de carpetas**: Modular y escalable
✅ **Código completo**: Todos los componentes
✅ **Configuración Dexie**: Database.js listo
✅ **Instrucciones de ejecución**: Este archivo

## 🎉 ¡Aplicación Lista!

El **Gestor de Tareas** está completamente funcional y listo para usar.

Accede a: **https://ia-todo-app-kalevin.vercel.app/**

---

## 🧪 Pruebas Automatizadas

En la app `todo-app` se configuró un entorno de pruebas con Vitest y React Testing Library para validar componentes y flujos end‑to‑end en `jsdom` usando IndexedDB (Dexie) simulado con `fake-indexeddb`.

- Entorno: Vitest (jsdom), RTL (`@testing-library/react`, `@testing-library/user-event`), `@testing-library/jest-dom`, `fake-indexeddb`.
- Configuración: ver [todo-app/vite.config.js](todo-app/vite.config.js) y [todo-app/setupTests.js](todo-app/setupTests.js).
- Limpieza de DB: `setupTests.js` elimina la base Dexie (`TodoAppDB`) tras cada test.

### Scripts

Ejecuta los comandos desde la carpeta `todo-app`.

```bash
cd todo-app
npm run test          # modo watch interactivo
npm run test -- --run # ejecución única (ideal para CI)
npm run test:coverage # reporte de cobertura (texto + html)
```

### Estructura de pruebas

- Unitario: [todo-app/src/__tests__/TaskItem.test.jsx](todo-app/src/__tests__/TaskItem.test.jsx)
	- Verifica render de `TaskItem`, prioridad, toggle de estado y acciones editar/eliminar.
- Integración: [todo-app/src/__tests__/AppIntegration.test.jsx](todo-app/src/__tests__/AppIntegration.test.jsx)
	- Flujo “Crear Tarea”: escribir título, agregar, esperar a que aparezca en el DOM.
- Integración (filtros/orden): [todo-app/src/__tests__/AppFiltersAndSort.test.jsx](todo-app/src/__tests__/AppFiltersAndSort.test.jsx)
	- Crear múltiples tareas, ordenar por prioridad, filtrar “Completadas”, “Pendientes” y “Todas”.

Buenas prácticas aplicadas:
- Consultas accesibles (roles, placeholder, texto visible).
- `userEvent.setup()` con `await` en interacciones.
- `findBy*` para esperar actualizaciones asíncronas (Dexie/React).

### CI

Se añadió un workflow de GitHub Actions para ejecutar pruebas en cada push/PR a `main`:

- Archivo: [.github/workflows/tests.yml](.github/workflows/tests.yml)
- Pasos: `npm ci` y `npm run test -- --run` dentro de [todo-app](todo-app).

Notas:
- React puede mostrar avisos sobre `act()` durante interacciones; las pruebas ya usan `await` y `findBy*` para sincronizar.
- Dexie puede registrar mensajes al cerrar/eliminar la base durante la limpieza; no afectan los resultados.
