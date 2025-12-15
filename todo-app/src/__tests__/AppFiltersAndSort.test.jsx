import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App.jsx';
import { vi } from 'vitest';

beforeAll(() => {
  vi.spyOn(window, 'confirm').mockReturnValue(true);
});

afterAll(() => {
  window.confirm.mockRestore();
});

describe('Filtros y Ordenamiento (integración)', () => {
  test('crear múltiples tareas y validar filtros/orden', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Helper para crear tarea
    const createTask = async ({ title, priority = 'media' }) => {
      const titleInput = await screen.findByPlaceholderText(/comprar leche/i);
      await user.clear(titleInput);
      await user.type(titleInput, title);

      const prioritySelect = screen.getByRole('combobox');
      await user.selectOptions(prioritySelect, priority);

      const addButton = screen.getByRole('button', { name: /agregar tarea/i });
      await user.click(addButton);
      await screen.findByText(title);
    };

    // Crear 3 tareas con distintas prioridades y fechas
    await createTask({ title: 'Tarea A alta', priority: 'alta' });
    await createTask({ title: 'Tarea B media', priority: 'media' });
    await createTask({ title: 'Tarea C baja', priority: 'baja' });

    // Validar que aparecen en la lista
    expect(await screen.findByText('Tarea A alta')).toBeInTheDocument();
    expect(await screen.findByText('Tarea B media')).toBeInTheDocument();
    expect(await screen.findByText('Tarea C baja')).toBeInTheDocument();

    let titles; // placeholder to keep structure similar

    // Cambiar orden a Prioridad: Alta > Media > Baja
    const sortPriorityBtn = screen.getByRole('button', { name: /prioridad/i });
    await user.click(sortPriorityBtn);

    const a = screen.getByText('Tarea A alta');
    const b = screen.getByText('Tarea B media');
    const c = screen.getByText('Tarea C baja');
    // Verify DOM order: A before B before C
    expect(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(b.compareDocumentPosition(c) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    // Filtrar completadas: marcar una como completada
    // El primer botón en cada TaskItem toggles estado
    const itemA = screen.getByText('Tarea A alta');
    const itemAFlexRow = itemA.closest('div').parentElement; // row that contains toggle + content
    const toggleA = within(itemAFlexRow).getAllByRole('button')[0];
    await user.click(toggleA);

    const filterCompletedBtn = screen.getByRole('button', { name: /completadas/i });
    await user.click(filterCompletedBtn);

    // Debe mostrar solo las completadas (la primera)
    expect(screen.getByText('Tarea A alta')).toBeInTheDocument();
    expect(screen.queryByText('Tarea B media')).toBeNull();
    expect(screen.queryByText('Tarea C baja')).toBeNull();

    // Filtrar pendientes
    const filterPendingBtn = screen.getByRole('button', { name: /pendientes/i });
    await user.click(filterPendingBtn);
    expect(screen.getByText('Tarea B media')).toBeInTheDocument();
    expect(screen.getByText('Tarea C baja')).toBeInTheDocument();

    // Volver a todas
    const filterAllBtn = screen.getByRole('button', { name: /todas/i });
    await user.click(filterAllBtn);
    expect(screen.getByText('Tarea A alta')).toBeInTheDocument();
    expect(screen.getByText('Tarea B media')).toBeInTheDocument();
    expect(screen.getByText('Tarea C baja')).toBeInTheDocument();
  });
});
