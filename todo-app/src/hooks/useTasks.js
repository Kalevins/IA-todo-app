import { useState, useEffect, useCallback } from 'react';
import { db } from '../db/database';

/**
 * Custom Hook para gestionar las tareas
 * Encapsula toda la lógica de interacción con la base de datos
 */
export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('todas'); // 'todas', 'pendientes', 'completadas'
  const [sortBy, setSortBy] = useState('fecha'); // 'fecha', 'prioridad'
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Cargar todas las tareas desde IndexedDB
  const loadTasks = useCallback(async () => {
    try {
      setLoading(true);
      const allTasks = await db.tasks.toArray();
      setTasks(allTasks);
      setError(null);
    } catch (err) {
      setError('Error al cargar tareas: ' + err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Crear una nueva tarea
  const addTask = useCallback(async (taskData) => {
    try {
      const newTask = {
        ...taskData,
        status: 'pendiente',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      const id = await db.tasks.add(newTask);
      setTasks(prev => [...prev, { ...newTask, id }]);
      return id;
    } catch (err) {
      setError('Error al crear tarea: ' + err.message);
      console.error(err);
      throw err;
    }
  }, []);

  // Actualizar una tarea existente
  const updateTask = useCallback(async (id, updates) => {
    try {
      const timestamp = new Date();
      const taskUpdates = {
        ...updates,
        updatedAt: timestamp
      };
      await db.tasks.update(id, taskUpdates);
      setTasks(prev =>
        prev.map(task =>
          task.id === id ? { ...task, ...taskUpdates } : task
        )
      );
    } catch (err) {
      setError('Error al actualizar tarea: ' + err.message);
      console.error(err);
      throw err;
    }
  }, []);

  // Eliminar una tarea
  const deleteTask = useCallback(async (id) => {
    try {
      await db.tasks.delete(id);
      setTasks(prev => prev.filter(task => task.id !== id));
    } catch (err) {
      setError('Error al eliminar tarea: ' + err.message);
      console.error(err);
      throw err;
    }
  }, []);

  // Obtener tareas filtradas y ordenadas
  const getFilteredAndSortedTasks = useCallback(() => {
    let filtered = tasks;

    // Aplicar filtro
    if (filter === 'pendientes') {
      filtered = filtered.filter(task => task.status === 'pendiente');
    } else if (filter === 'completadas') {
      filtered = filtered.filter(task => task.status === 'completada');
    }

    // Aplicar ordenamiento
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'fecha') {
        return new Date(a.dueDate || new Date(8640000000000000)) -
               new Date(b.dueDate || new Date(8640000000000000));
      } else if (sortBy === 'prioridad') {
        const priorityOrder = { 'alta': 0, 'media': 1, 'baja': 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      return 0;
    });

    return sorted;
  }, [tasks, filter, sortBy]);

  // Cargar tareas al montar el componente
  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  return {
    tasks: getFilteredAndSortedTasks(),
    allTasks: tasks,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    addTask,
    updateTask,
    deleteTask,
    loadTasks,
    loading,
    error
  };
};
