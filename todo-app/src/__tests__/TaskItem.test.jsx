import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TaskItem } from '../components/TaskItem';
import { vi } from 'vitest';

const baseTask = {
  id: 1,
  title: 'Tarea de prueba',
  description: 'Descripción opcional',
  priority: 'alta',
  status: 'pendiente',
  dueDate: '2025-12-31T00:00:00.000Z'
};

describe('TaskItem', () => {
  test('renderiza título y prioridad', () => {
    const onUpdate = vi.fn();
    const onDelete = vi.fn();
    const onEdit = vi.fn();

    render(<TaskItem task={baseTask} onUpdate={onUpdate} onDelete={onDelete} onEdit={onEdit} />);

    expect(screen.getByText('Tarea de prueba')).toBeInTheDocument();
    // Muestra etiqueta de prioridad (Alta/Media/Baja)
    expect(screen.getByText('Alta')).toBeInTheDocument();
  });

  test('dispara onUpdate al alternar estado (checkbox botón)', async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn();

    render(<TaskItem task={baseTask} onUpdate={onUpdate} onDelete={vi.fn()} onEdit={vi.fn()} />);

    // El primer botón es el toggle de estado (checkbox visual)
    const toggleBtn = screen.getAllByRole('button')[0];
    await user.click(toggleBtn);

    expect(onUpdate).toHaveBeenCalledTimes(1);
    expect(onUpdate).toHaveBeenCalledWith(1, { status: 'completada' });
  });

  test('dispara onEdit y onDelete en botones de acción', async () => {
    const user = userEvent.setup();
    const onUpdate = vi.fn();
    const onDelete = vi.fn();
    const onEdit = vi.fn();

    render(<TaskItem task={baseTask} onUpdate={onUpdate} onDelete={onDelete} onEdit={onEdit} />);

    const buttons = screen.getAllByRole('button');
    const editBtn = buttons[1];
    const deleteBtn = buttons[2];

    await user.click(editBtn);
    expect(onEdit).toHaveBeenCalledTimes(1);
    expect(onEdit).toHaveBeenCalledWith(baseTask);

    await user.click(deleteBtn);
    expect(onDelete).toHaveBeenCalledTimes(1);
    expect(onDelete).toHaveBeenCalledWith(1);
  });
});
