import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Upvote from './Upvote';

describe('<Upvote />', () => {
  test('it should not fill the heart', () => {
    const upvote = render(<Upvote heroId={0} />);
    
    const heart = upvote.getByTestId('heart');

    expect(heart.classList.contains('fa fa-heart-o'));
  });

  test('it should fill the heart', () => {
    const upvote = render(<Upvote heroId={0} />);
    
    const heart = upvote.getByTestId('heart');

    expect(heart.classList.contains('fa-heart'));
  });
});