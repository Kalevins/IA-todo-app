**Rol:** Actúa como un Ingeniero de Software Senior especializado en Testing y QA (Quality Assurance) para aplicaciones React.

**Contexto del Proyecto:**
Estoy desarrollando un "Gestor de Tareas" con:
* Frontend: React + Vite + Tailwind CSS.
* Datos: Dexie.js (IndexedDB).
* Lógica: Custom Hooks para gestión de estado.

**Objetivo:** Crear una suite de pruebas automatizadas completa, eficiente y moderna.

**Stack de Testing Requerido:**
1.  **Runner:** Vitest (por su compatibilidad nativa con Vite).
2.  **Librería de Componentes:** React Testing Library (RTL).
3.  **Entorno:** `jsdom` (para simular el navegador).
4.  **Mocking de DB:** `fake-indexeddb` (INDISPENSABLE para testear Dexie.js en el entorno de test).

**Requerimientos del Pedido:**

**1. Configuración del Entorno:**
* Provee los comandos de instalación (`npm install -D ...`).
* Muestra cómo configurar el archivo `vite.config.js` para integrar Vitest.
* Crea un archivo de configuración de pruebas (`setupTests.js`) donde se integre `fake-indexeddb` para que Dexie funcione sin errores durante los tests.

**2. Pruebas Unitarias (Componentes y Utilidades):**
* Crea un test para un componente visual simple (ej: `TaskItem` o `Badge`). Verifica que renderice las props correctamente (título, prioridad) y que dispare eventos (clic en completar/eliminar).
* Usa `vi.fn()` para mockear las funciones pasadas por props.

**3. Pruebas de Integración (Hooks y Base de Datos):**
* **Reto principal:** Testear el hook principal o el flujo de datos real.
* Crea un test que simule el flujo completo de "Crear una Tarea":
    1.  Renderizar la App (o el componente principal).
    2.  Escribir en el input (usando `userEvent`).
    3.  Hacer clic en "Agregar".
    4.  Verificar que la tarea aparece en el documento (DOM).
* *Nota:* Asegúrate de explicar cómo manejar la asincronía de la base de datos (usando `waitFor` o `findBy` de RTL).

**4. Buenas Prácticas:**
* Evita testear detalles de implementación (clases CSS específicas), testea el comportamiento visible para el usuario (roles, textos, labels).
* Limpia la base de datos simulada después de cada test (`afterEach`).

**Entregables:**
* Código completo de `vite.config.js`, `setupTests.js`.
* Ejemplo de archivo `TaskItem.test.jsx`.
* Ejemplo de archivo `AppIntegration.test.jsx` (Flujo de crear y listar).