import { TaskItem } from './TaskItem';

/**
 * Componente TaskList - Renderiza la lista de tareas filtradas
 */
export const TaskList = ({ tasks, onUpdate, onDelete, onEdit, loading }) => {
  if (loading) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p>Cargando tareas...</p>
      </div>
    );
  }

  if (tasks.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        <p className="text-lg">No hay tareas</p>
        <p className="text-sm">¡Crea una nueva tarea para comenzar!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
};
