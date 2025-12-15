import { Trash2, Edit2, Check } from 'lucide-react';

/**
 * Componente TaskItem - Representa una tarea individual
 * Muestra el contenido de la tarea y proporciona acciones (editar, eliminar, marcar como completa)
 */
export const TaskItem = ({ task, onUpdate, onDelete, onEdit }) => {
  const priorityColors = {
    'alta': 'bg-priority-high',
    'media': 'bg-priority-medium',
    'baja': 'bg-priority-low'
  };

  const priorityLabels = {
    'alta': 'Alta',
    'media': 'Media',
    'baja': 'Baja'
  };

  const handleToggleStatus = () => {
    const newStatus = task.status === 'pendiente' ? 'completada' : 'pendiente';
    onUpdate(task.id, { status: newStatus });
  };

  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className={`p-4 rounded-lg border-l-4 ${
      task.status === 'completada'
        ? 'bg-gray-100 dark:bg-gray-800 border-gray-400'
        : 'bg-white dark:bg-gray-900 border-blue-500'
    } shadow-md transition-all hover:shadow-lg`}>
      
      <div className="flex items-start gap-3">
        {/* Checkbox */}
        <button
          onClick={handleToggleStatus}
          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition ${
            task.status === 'completada'
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 dark:border-gray-600 hover:border-green-500'
          }`}
        >
          {task.status === 'completada' && (
            <Check size={16} className="text-white" />
          )}
        </button>

        {/* Contenido */}
        <div className="flex-1">
          <h3 className={`text-lg font-semibold ${
            task.status === 'completada'
              ? 'line-through text-gray-500'
              : 'text-gray-800 dark:text-white'
          }`}>
            {task.title}
          </h3>

          {task.description && (
            <p className={`text-sm mt-1 ${
              task.status === 'completada'
                ? 'text-gray-400'
                : 'text-gray-600 dark:text-gray-300'
            }`}>
              {task.description}
            </p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className={`text-xs px-2 py-1 rounded text-white ${priorityColors[task.priority]}`}>
              {priorityLabels[task.priority]}
            </span>
            {task.dueDate && (
              <span className="text-xs text-gray-500 dark:text-gray-400">
                📅 {formatDate(task.dueDate)}
              </span>
            )}
          </div>
        </div>

        {/* Acciones */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-blue-500 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition"
            title="Editar tarea"
          >
            <Edit2 size={18} />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 rounded transition"
            title="Eliminar tarea"
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};
