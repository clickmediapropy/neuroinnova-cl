import { render, screen } from '@testing-library/react';
import { Logo } from './logo';

describe('Logo component', () => {
  it('renders the logo with the correct alt text', () => {
    render(<Logo />);
    const logoImage = screen.getByAltText('NeuroInnova - Innovación en Salud Mental');
    expect(logoImage).toBeInTheDocument();
  });

  it('applies the className prop', () => {
    render(<Logo className="test-class" />);
    const logoImage = screen.getByAltText('NeuroInnova - Innovación en Salud Mental');
    expect(logoImage).toHaveClass('test-class');
  });
});
