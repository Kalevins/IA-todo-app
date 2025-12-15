import Dexie from 'dexie';

/**
 * Configuración de la base de datos IndexedDB usando Dexie.js
 * Define el esquema de la tabla 'tasks' con índices para búsquedas eficientes
 */
export const db = new Dexie('TodoAppDB');

db.version(1).stores({
  tasks: '++id, status, priority, dueDate'
});

/**
 * Interfaz de una tarea
 */
export const TaskSchema = {
  id: undefined, // Auto-incrementado
  title: '',
  description: '',
  dueDate: null,
  priority: 'media', // 'alta', 'media', 'baja'
  status: 'pendiente', // 'pendiente', 'completada'
  createdAt: new Date(),
  updatedAt: new Date()
};
