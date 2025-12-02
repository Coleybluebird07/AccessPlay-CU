import React from 'react';
import { render, screen } from '@testing-library/react';
import LandingPage from '../src/LandingPage';

describe('LandingPage', () => {
  test('renders hero section', () => {
    render(<LandingPage />);
    expect(screen.getByText(/discover mobile games built for everyone/i)).toBeInTheDocument();
  });

  test('renders contact section with email', () => {
    render(<LandingPage />);
    expect(screen.getByText(/info@accessplay.co.uk/i)).toBeInTheDocument();
  });
});
