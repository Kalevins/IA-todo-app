import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import App from '../App.jsx';

// JSDOM no implementa window.confirm por defecto; lo mockeamos por si se usa
beforeAll(() => {
  vi.spyOn(window, 'confirm').mockReturnValue(true);
});

afterAll(() => {
  window.confirm.mockRestore();
});

describe('Flujo de crear tarea (integración)', () => {
  test('crear una tarea y verla listada', async () => {
    const user = userEvent.setup();

    render(<App />);

    // Encontrar elementos del formulario por labels/roles accesibles.
    // TaskForm debe renderizar inputs con labels o placeholders predecibles.
    // Buscar el input por su placeholder visible para el usuario
    const titleInput = await screen.findByPlaceholderText(/comprar leche/i);

    // Si TaskForm usa selects para prioridad/fecha, podemos buscar por role
    // Pero al menos el flujo mínimo requiere título y botón "Agregar"
    await user.type(titleInput, 'Nueva tarea desde test');

    // Encontrar botón de agregar por su texto
    const addButton = screen.getByRole('button', { name: /agregar tarea/i });
    await user.click(addButton);

    // Manejo de asincronía: la inserción en Dexie es async.
    // Usamos findByText que espera automáticamente hasta que el elemento aparezca.
    const newTaskTitle = await screen.findByText('Nueva tarea desde test');
    expect(newTaskTitle).toBeInTheDocument();
  });
});
