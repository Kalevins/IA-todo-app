**Rol:** Actúa como un Ingeniero de Software Senior especializado en Frontend con React y Arquitectura de Software.

**Objetivo:** Crear una aplicación web de "Gestor de Tareas" (To-Do App) moderna, robusta y escalable utilizando React y JavaScript, con persistencia de datos en el navegador (Client-side Database).

**Stack Tecnológico Preferido:**
1.  **Framework:** React 18+ (usando Vite para el scaffolding).
2.  **Lenguaje:** JavaScript (ES6+).
3.  **Persistencia (DB Local):** Usa 'Dexie.js' (wrapper de IndexedDB) para una persistencia real y estructurada, NO uses localStorage.
4.  **Estilos:** Tailwind CSS (para un diseño rápido, responsivo y moderno).
5.  **Iconos:** Lucide-React o React-Icons.

**Requerimientos Funcionales (Core Features):**
1.  **CRUD Completo:**
    * Crear tareas (Título, Descripción, Fecha de vencimiento, Prioridad: Alta/Media/Baja).
    * Leer tareas (Listado visual).
    * Actualizar tareas (Editar contenido o marcar como completada con un checkbox).
    * Eliminar tareas.
2.  **Organización:**
    * Filtrado por estado (Todas, Pendientes, Completadas).
    * Ordenamiento (por fecha o por prioridad).
3.  **Persistencia:** Los datos deben guardarse automáticamente en IndexedDB y persistir tras recargar la página.

**Requerimientos de UI/UX:**
* Diseño limpio y minimalista (Dark/Light mode es un plus opcional).
* Feedback visual al usuario (ej. tachar texto al completar, colores según prioridad).
* Diseño totalmente responsivo (Mobile-first).

**Estructura del Código y Calidad:**
* **Modularidad:** Separa el código en componentes pequeños y reutilizables (ej: `TaskItem`, `TaskList`, `TaskForm`, `FilterBar`).
* **Custom Hooks:** Crea un hook personalizado (ej: `useTasks`) para manejar la lógica de la base de datos y el estado, separando la lógica de la vista.
* **Manejo de Errores:** Implementa bloques try/catch básicos para las operaciones de base de datos.
* **Comentarios:** Breves explicaciones sobre partes complejas del código.

**Entregables:**
1.  Comandos de instalación necesarios (`npm install ...`).
2.  Estructura de carpetas recomendada.
3.  El código completo de los componentes principales y la configuración de Dexie.js.
4.  Instrucciones breves de cómo ejecutarlo.