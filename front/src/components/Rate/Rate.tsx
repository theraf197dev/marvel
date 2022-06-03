import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { BACK_URL } from '../../constants';

interface RateProps {
  heroId: number,
  interactable: boolean,
  onRateChange?: Function,
  change?: boolean
}

const YOUR_RATE = 'Your rate';
const USERS_RATE = 'Average rate';
const NO_YOUR_RATE = 'Rate your hero';
const NO_USERS_RATE = 'Anyone voted yet...';

const Rate: FC<RateProps> = ({heroId, interactable, onRateChange, change}) => {
  const [lRate, setLRate] = useState(0);
  
  useEffect(() => {
    const petition = async(endpoint = "") => {
      const url = BACK_URL.concat('/rate');
  
      axios.get(url, {params : {heroId: heroId, userId: Number.parseInt(localStorage.getItem("userId") as string)}})
        .then(res => {
          if(res.data.length > 0)
            setLRate(res.data[0].rate);
        })
        .catch(e => console.log(e));
    };

    const averagePetition = async(endpoint = "") => {
      const url = BACK_URL.concat('/rate/average');
  
      axios.get(url, {params : {heroId: heroId, userId: Number.parseInt(localStorage.getItem("userId") as string)}})
        .then(res => {
          const data = res.data;

          if(data.length > 0){
            let average = 0;

            for (let i = 0; i < data.length; i++) {
                average += data[i].rate;
            }

            average /= data.length;

            setLRate(Number.parseFloat(average.toFixed(2)));
          }
        })
        .catch(e => console.log(e));
    };
    
    if(interactable){
      petition();
    }
    else{
      averagePetition();
    }
  }, [change]);
  
  const handleRate = (event: React.MouseEvent<HTMLButtonElement>) =>{
    if(!interactable)
      return;
    
    const star = event.currentTarget;
    let _rate = 0;

    switch (star.id) {
      case 's1':
        _rate = 2;
      break;
      case 's2':
        _rate = 4;
      break;
      case 's3':
        _rate = 6;
      break;
      case 's4':
        _rate = 8;
      break;
      case 's5':
        _rate = 10;
      break;
    }
    
    setLRate(_rate);
    
    const back_url = BACK_URL.concat('/rate');

    axios.get(back_url, {params: {heroId: heroId, userId: Number.parseInt(localStorage.getItem("userId") as string)}})
      .then(res => {
        if(res.data.length > 0){
          axios.put(back_url,{heroId: heroId, userId: Number.parseInt(localStorage.getItem("userId") as string), rate: _rate})
            .then(res =>{
              if(onRateChange !== undefined)
                onRateChange();
            })
            .catch(e => console.log(e));
        }
        else{
          axios.post(back_url,{heroId: heroId, userId: Number.parseInt(localStorage.getItem("userId") as string), rate: _rate})
            .then(res =>{
              if(onRateChange !== undefined)
                onRateChange();
            })
            .catch(e => console.log(e));
        }
      })
      .catch(e => console.log(e));
  };

  return (
    <div className="row spacing col">
      {(lRate > 0) ? <p>{interactable ? YOUR_RATE : USERS_RATE}: {lRate}</p> : <p>{interactable ? NO_YOUR_RATE : NO_USERS_RATE}</p>}
      <div className='col'>
        <span id='s1' onClick={handleRate} data-testid="star" className={(lRate > 0) ? 'fa fa-star' : 'fa fa-star-o'} style={{color: 'yellowgreen'}}></span>
        <span id='s2' onClick={handleRate} data-testid="star2" className={(lRate > 2) ? 'fa fa-star' : 'fa fa-star-o'} style={{color: 'yellowgreen'}}></span>
        <span id='s3' onClick={handleRate} data-testid="star3" className={(lRate > 4) ? 'fa fa-star' : 'fa fa-star-o'} style={{color: 'yellowgreen'}}></span>
        <span id='s4' onClick={handleRate} data-testid="star4" className={(lRate > 6) ? 'fa fa-star' : 'fa fa-star-o'} style={{color: 'yellowgreen'}}></span>
        <span id='s5' onClick={handleRate} data-testid="star5" className={(lRate > 8) ? 'fa fa-star' : 'fa fa-star-o'} style={{color: 'yellowgreen'}}></span>
      </div>
    </div>
  )
};

export default Rate;
