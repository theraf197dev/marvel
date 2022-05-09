import React, { FC } from 'react';
import { MComic } from '../../models/MComic';
import { MEvent } from '../../models/MEvent';
import { MSerie } from '../../models/MSerie';
import { MStory } from '../../models/MStory';
import HeroDetailCard from '../HeroDetailCard/HeroDetailCard';

interface CollapsibleComponentsProps {
  comics: Array<MComic>,
  comicUrl: string,
  events: Array<MEvent>,
  series: Array<MSerie>,
  stories: Array<MStory>,
  heroId: number,
  heroName: string,
  description: string,
  thumbnail: string
}

const CollapsibleComponents: FC<CollapsibleComponentsProps> = ({comics, comicUrl, events, series, stories, heroId, heroName, description, thumbnail}) => {
  return(
    <div>
      <p>
        <button className="btn custom-button spacing" type="button" data-bs-toggle="collapse" data-bs-target="#comics" aria-expanded="false" aria-controls="comics">Comics</button>
        <button className="btn custom-button spacing" type="button" data-bs-toggle="collapse" data-bs-target="#events" aria-expanded="false" aria-controls="events">Events</button>
        <button className="btn custom-button spacing" type="button" data-bs-toggle="collapse" data-bs-target="#series" aria-expanded="false" aria-controls="series">Series</button>
        <button className="btn custom-button spacing" type="button" data-bs-toggle="collapse" data-bs-target="#stories" aria-expanded="false" aria-controls="stories">Stories</button>
      </p>
      <div className="row">
        <div className='col'>
          <div className='collapse multi-collapse show' data-testid="heroDetail" id='heroDetail'>
            <HeroDetailCard heroId={heroId} heroName={heroName} description={description} thumbnail={thumbnail} />
          </div>
        </div>
        <div className="col">
          <div className="collapse multi-collapse show" id="comics">
            <ul className="list-group" data-testid="comics">
            {(comics.length > 0) ? comics.map((comic) => <li key={comic.name} className="list-group-item black-background li-custom">{comic.name}</li>)                
             : 'Has not appeared in comics'}
             {(comics.length > 0 && comicUrl !== '') ? <a href={comicUrl} className="btn custom-button" target="_blank">Go to Comics</a> : ''}
            </ul>
          </div>
        </div>
        <div className="col">
          <div className="collapse multi-collapse show" id="events">
            <ul className="list-group" data-testid="events">
            {(events.length > 0) ? events.map((event) => <li key={event.name} className="list-group-item black-background li-custom">{event.name}</li>) : 'Has not appeared in events'}      
            </ul>
          </div>
        </div>
        <div className="col">
          <div className="collapse multi-collapse show" id="series">
            <ul className="list-group" data-testid="series">
            {(series.length > 0) ? series.map((serie) => <li key={serie.name} className="list-group-item black-background li-custom">{serie.name}</li>) : 'Has not appeared in series'}      
            </ul>
          </div>
        </div>
        <div className="col">
          <div className="collapse multi-collapse show" id="stories">
            <ul className="list-group" data-testid="stories">
            {(stories.length > 0) ? stories.map((story) => <li key={story.name} className="list-group-item d-flex justify-content-between align-items-start black-background li-custom"><div>{story.name}</div><span className="badge bg-primary rounded-pill">{story.type}</span></li>) : 'Has not appeared in stories'}      
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
};

export default CollapsibleComponents;
