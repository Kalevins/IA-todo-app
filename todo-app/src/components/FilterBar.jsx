import { Filter, SortAsc } from 'lucide-react';

/**
 * Componente FilterBar - Proporciona opciones de filtrado y ordenamiento
 */
export const FilterBar = ({ filter, setFilter, sortBy, setSortBy, taskCount }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Filtro */}
        <div className="flex-1">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Filter size={18} />
            Filtrar por
          </label>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'todas', label: 'Todas' },
              { value: 'pendientes', label: 'Pendientes' },
              { value: 'completadas', label: 'Completadas' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setFilter(option.value)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                  filter === option.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ordenamiento */}
        <div className="flex-1">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <SortAsc size={18} />
            Ordenar por
          </label>
          <div className="flex gap-2 flex-wrap">
            {[
              { value: 'fecha', label: 'Fecha' },
              { value: 'prioridad', label: 'Prioridad' }
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setSortBy(option.value)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition ${
                  sortBy === option.value
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {/* Contador */}
        <div className="text-right">
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {taskCount} {taskCount === 1 ? 'tarea' : 'tareas'}
          </p>
        </div>
      </div>
    </div>
  );
};
