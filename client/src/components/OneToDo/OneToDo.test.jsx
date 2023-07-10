import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { OneToDo } from './OneToDo';

describe('OneToDo component', () => {
  const mockProps = {
    title: 'Test Title',
    description: 'Test Description',
    members: ['John', 'Jane'],
    comments: ['Comment 1', 'Comment 2'],
    duedate: '10:3:3:3',
  };

  test('renders OneToDo component', () => {
    render(<OneToDo {...mockProps} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Description')).toBeInTheDocument();
    expect(screen.getByText('members:John,Jane')).toBeInTheDocument();
    expect(screen.getByText('comment:Comment 1,Comment 2')).toBeInTheDocument();
    expect(screen.getByText('due date:2023-07-01')).toBeInTheDocument();
    expect(screen.getByText('when create:10:3:3:3')).toBeInTheDocument();
  });

  test('opens edit mode when edit button is clicked', () => {
    render(<OneToDo {...mockProps} />);

    expect(screen.queryByText('EditToDo')).not.toBeInTheDocument();

    fireEvent.click(screen.getByText('edit'));

    expect(screen.getByText('EditToDo')).toBeInTheDocument();
  });

  test('deletes the block when delete button is clicked', () => {
    const deleteMock = jest.fn();
    jest.mock('axios', () => ({
      delete: () => Promise.resolve({ status: 200 }),
    }));

    render(<OneToDo {...mockProps} />);

    fireEvent.click(screen.getByText('X'));

    expect(deleteMock).toHaveBeenCalledTimes(1);
  });
});
