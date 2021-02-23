import { render, screen } from '@testing-library/react';
import Ticker from './ticker';

test('renders learn react link', () => {
  render(<Ticker />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
