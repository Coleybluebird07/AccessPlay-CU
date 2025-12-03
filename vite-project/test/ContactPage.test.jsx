import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ContactPage from '../src/ContactPage';

describe('ContactPage', () => {
  test('renders contact email and phone', () => {
    render(<ContactPage />);
    expect(screen.getByText(/info@accessplay.co.uk/i)).toBeInTheDocument();
    expect(screen.getByText(/\+44 20 1234 5678/i)).toBeInTheDocument();
  });

  test('shows alert on form submit', () => {
    window.alert = vi.fn();
    render(<ContactPage />);
    fireEvent.change(screen.getByPlaceholderText(/your name/i), { target: { value: 'Test User' } });
    fireEvent.change(screen.getByPlaceholderText(/your email/i), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText(/your message/i), { target: { value: 'Hello!' } });
    fireEvent.click(screen.getByRole('button', { name: /send message/i }));
    expect(window.alert).toHaveBeenCalledWith('Message sent!'); 
});
});
