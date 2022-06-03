import React, { FC, useState } from 'react';
import Rate from '../Rate/Rate';
import Upvote from '../Upvote/Upvote';

interface HeroDetailCardProps {
  heroId: number,
  heroName: string,
  description: string,
  thumbnail: string
}

const HeroDetailCard: FC<HeroDetailCardProps> = ({heroId, heroName, description, thumbnail}) => {
  const [change, setChange] = useState(false);

  const onRateChange = () => {
    setChange(!change);
  };

  return (
    <div className="card black-background" style={{width: "27rem"}}>
      <Rate heroId={heroId} interactable={false} change={change}/>
      <img src={thumbnail} className="card-img-top detail-img" alt={heroName}/>
      <div className="card-body">
        <div className='row align-items-start'>
          <Upvote heroId={heroId} />
            <Rate heroId={heroId} interactable={true} onRateChange={onRateChange} />
        </div>
        <hr/>

        <h5 className="card-title" data-testid="heroName">{heroName}</h5>
        <br/>
        {description === '' ? <div data-testid="no-description">???</div> : <p data-testid="description" className="card-text description-text">{description}</p>}
      </div>
    </div>
  );
};

export default HeroDetailCard;
