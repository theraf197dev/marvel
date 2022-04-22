import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CollapsibleComponents from './CollapsibleComponents';

describe('<CollapsibleComponents />', () => {
  test('load arrays', () => {
    const testData = {
      heroId: 1017100,
      heroName: 'A-Bomb (HAS)',
      description: `Rick Jones has been Hulk's best bud since day one, but now he's more than a friend...he's a teammate! Transformed by a Gamma energy explosion, A-Bomb's thick, armored skin is just as strong and powerful as it is blue. And when he curls into action, he uses it like a giant bowling ball of destruction! `,
      thumbnail: 'http://i.annihil.us/u/prod/marvel/i/mg/3/20/5232158de5b16.jpg',
      comicUrl: 'http://marvel.com/comics/characters/1017100/a-bomb_has?utm_campaign=apiRef&utm_source=5050390db4a2be78ef8aba674412fc9d',
      comics: [
        {
          "name": "FREE COMIC BOOK DAY 2013 1 (2013) #1",
          "resourceURI": "http://gateway.marvel.com/v1/public/comics/47176"
        }
      ],
      events: [],
      series: [
        {
          "name": "FREE COMIC BOOK DAY 2013 1 (2013)",
          "resourceURI": "http://gateway.marvel.com/v1/public/series/17765"
        }
      ],
      stories: [
        {
          "name": "Hulk (2008) #55",
          "resourceURI": "http://gateway.marvel.com/v1/public/stories/92078",
          "type": "cover"
        },
        {
          "name": "Hulk (2008) #56",
          "resourceURI": "http://gateway.marvel.com/v1/public/stories/92078",
          "type": "cover"
        }
      ]
    };

    const collapsibleComponents = render(<CollapsibleComponents comics={testData.comics} events={testData.events} series={testData.series} stories={testData.stories} heroId={testData.heroId} heroName={testData.heroName} description={testData.description} thumbnail={testData.thumbnail} comicUrl={testData.comicUrl} />);
    
    const comics = collapsibleComponents.getByTestId("comics");
    const events = collapsibleComponents.getByTestId("events");
    const series = collapsibleComponents.getByTestId("series");
    const stories = collapsibleComponents.getByTestId("stories");

    expect(comics.childElementCount === 1);
    expect(events.childElementCount === 0);
    expect(series.childElementCount === 1);
    expect(stories.childElementCount === 2);
  });
});