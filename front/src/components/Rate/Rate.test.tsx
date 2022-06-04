import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Rate from './Rate';

describe('<Rate />', () => {
  test('it should fill 2 stars', () => {
    const rate = render(<Rate heroId={0} interactable={true} />);
    
    const star = rate.getByTestId('star');
    const star2 = rate.getByTestId('star2');
    const star3 = rate.getByTestId('star3');
    const star4 = rate.getByTestId('star4');
    const star5 = rate.getByTestId('star5');

    expect(star.classList.contains('fa fa-star'));
    expect(star2.classList.contains('fa fa-star'));
    expect(star3.classList.contains('fa fa-star-o'));
    expect(star4.classList.contains('fa fa-star-o'));
    expect(star5.classList.contains('fa fa-star-o'));
  });
});