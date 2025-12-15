import { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { TaskForm } from './components/TaskForm';
import { FilterBar } from './components/FilterBar';
import { TaskList } from './components/TaskList';
import { useTasks } from './hooks/useTasks';
import './index.css';

/**
 * Componente principal App - Orquesta toda la aplicación
 * Integra todos los componentes y maneja el estado global
 */
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  
  // Custom hook para gestionar tareas
  const {
    tasks,
    allTasks,
    filter,
    setFilter,
    sortBy,
    setSortBy,
    addTask,
    updateTask,
    deleteTask,
    loading,
    error
  } = useTasks();

  // Manejar envío del formulario (crear o editar)
  const handleFormSubmit = useCallback(async (formData, taskId) => {
    try {
      if (taskId) {
        // Editar tarea existente
        await updateTask(taskId, formData);
        setEditingTask(null);
      } else {
        // Crear nueva tarea
        await addTask(formData);
      }
    } catch (err) {
      console.error('Error al procesar tarea:', err);
    }
  }, [addTask, updateTask]);

  // Manejar eliminación de tarea
  const handleDeleteTask = useCallback(async (taskId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta tarea?')) {
      try {
        await deleteTask(taskId);
      } catch (err) {
        console.error('Error al eliminar tarea:', err);
      }
    }
  }, [deleteTask]);

  // Aplicar tema oscuro/claro
  const effectiveDarkMode = darkMode;
  if (effectiveDarkMode) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  return (
    <div className={effectiveDarkMode ? 'dark' : ''}>
      <div className="bg-gray-50 dark:bg-gray-950 min-h-screen transition-colors">
        {/* Header */}
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 py-8">
          {/* Mostrar error si existe */}
          {error && (
            <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-lg">
              {error}
            </div>
          )}

          {/* Formulario */}
          <div className="mb-8">
            <TaskForm
              onSubmit={handleFormSubmit}
              onCancel={() => setEditingTask(null)}
              editingTask={editingTask}
            />
          </div>

          {/* Filtros y Ordenamiento */}
          <div className="mb-6">
            <FilterBar
              filter={filter}
              setFilter={setFilter}
              sortBy={sortBy}
              setSortBy={setSortBy}
              taskCount={tasks.length}
            />
          </div>

          {/* Lista de Tareas */}
          <div>
            <TaskList
              tasks={tasks}
              onUpdate={updateTask}
              onDelete={handleDeleteTask}
              onEdit={setEditingTask}
              loading={loading}
            />
          </div>

          {/* Footer */}
          <footer className="mt-12 text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>Total de tareas: {allTasks.length}</p>
            <p className="mt-2">
              🎯 Mantén tu productividad con el Gestor de Tareas
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;
