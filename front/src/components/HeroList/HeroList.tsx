import React, { FC } from 'react';
import Hero from '../Hero/Hero';

interface HeroListProps {
  heroes: Array<any>
}

const HeroList: FC<HeroListProps> = ({heroes}) => {
  return(
    <>
      {(heroes.length <= 0) ? <div data-testid="no-heroes">No more heroes</div>
      :
      <div className='row align-items-start no-border spacing' data-testid="heroes">
        {heroes.map((hero) => <Hero key={hero.id} id={hero.id} heroName={hero.name} thumbnail={hero.thumbnail.path} extension={hero.thumbnail.extension} />)}
      </div>
      }
    </>
  );
}

export default HeroList;

