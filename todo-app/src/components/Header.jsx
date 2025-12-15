import { Moon, Sun, CheckCircle } from 'lucide-react';

/**
 * Componente Header - Encabezado de la aplicación con toggle dark mode
 */
export const Header = ({ darkMode, setDarkMode }) => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-gray-900 dark:to-gray-800 text-white shadow-lg">
      <div className="max-w-4xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCircle size={32} />
            <div>
              <h1 className="text-3xl font-bold">Gestor de Tareas</h1>
              <p className="text-blue-100 dark:text-gray-300 text-sm">
                Organiza tu día de manera eficiente
              </p>
            </div>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition"
            title={`Activar modo ${darkMode ? 'claro' : 'oscuro'}`}
          >
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};
