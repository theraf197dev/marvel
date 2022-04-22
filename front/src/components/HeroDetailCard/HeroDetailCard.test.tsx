import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import HeroDetailCard from './HeroDetailCard';

describe('<HeroDetailCard />', () => {
  const testData = {
    heroName: 'A-Bomb (HAS)',
    description: `Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...`,
    thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16.jpg'
  };
  test('it should get values from test data', () => {
    const heroDetailCard = render(<HeroDetailCard heroName={testData.heroName} description={testData.description} thumbnail={testData.thumbnail} heroId={0} />);
    
    const heroName = heroDetailCard.getByTestId('heroName');
    const description = heroDetailCard.getByTestId('description');

    expect(heroName.nodeValue === testData.heroName);
    expect(description.nodeValue === testData.description);
  });
  test('it should get values from test data, but with no description', () => {
    const heroDetailCard = render(<HeroDetailCard heroName={testData.heroName} description={''} thumbnail={testData.thumbnail} heroId={0} />);
    
    const heroName = heroDetailCard.getByTestId('heroName');
    const description = heroDetailCard.getByTestId('no-description');

    expect(heroName.nodeValue === testData.heroName);
    expect(description.nodeValue === '???');
  });
});