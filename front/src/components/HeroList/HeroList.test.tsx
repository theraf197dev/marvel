import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HeroList from './HeroList';

describe('<HeroList />', () => {
  test('it should just print \"No more heroes\"', () => {
    const heroList = render(<HeroList heroes={[]} />);
    
    const heroes = heroList.getByTestId("no-heroes");

    expect(heroes.nodeValue === 'No more heroes');
  });
});