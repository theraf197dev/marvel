import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import './Hero.module.css';

interface HeroProps {
  id: number;
  heroName: string;
  thumbnail: string;
  extension: string;
}

const Hero: FC<HeroProps> = ({id, heroName, thumbnail, extension}) => {
  const photo = thumbnail + '.' + extension;

  return (
    <div className="custom-card col-md-4 center">
      <NavLink aria-current="page" to={`/heroes/${heroName}`} state={id}>
        <img src={photo} className="card-img-top" alt={heroName} data-testid="photo"/>
      </NavLink>
      
      <div className="card-body center">
        <h5 className="card-title rounded-border-text" data-testid="heroName">{heroName}</h5>
      </div>
    </div>
  );
};

export default Hero;