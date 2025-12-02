import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import MicrophoneButton from '../src/components/MicrophoneButton';

describe('MicrophoneButton', () => {
  test('renders the microphone button', () => {
    render(<MicrophoneButton />);
    const button = screen.getByLabelText(/voice search/i);
    expect(button).toBeInTheDocument();
  });

  test('shows tooltip on hover', () => {
    render(<MicrophoneButton />);
    const button = screen.getByLabelText(/voice search/i);
    fireEvent.mouseOver(button);
    const tooltip = screen.getByText(/voice commands/i);
    expect(tooltip).toBeInTheDocument();
  });
});
