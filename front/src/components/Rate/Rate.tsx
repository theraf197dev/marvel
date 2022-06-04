import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { BACK_URL, NO_USERS_RATE, NO_YOUR_RATE, USERS_RATE, YOUR_RATE } from '../../constants';

interface RateProps {
  heroId: number,
  interactable: boolean,
  onRateChange?: Function,
  change?: boolean
}

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
        .catch(e => console.log(e.message));
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
        .catch(e => console.log(e.message));
    };
    
    if(interactable){
      petition();
    }
    else{
      averagePetition();
    }
  }, [change, heroId, interactable]);
  
  const handleRate = (event: React.MouseEvent<HTMLButtonElement>) =>{
    if(!interactable)
      return;
    
    const star = event.currentTarget;
    let _rate = 0;

    switch (star.id) {
      case 's1':
        _rate = 1;
      break;
      case 's2':
        _rate = 2;
      break;
      case 's3':
        _rate = 3;
      break;
      case 's4':
        _rate = 4;
      break;
      case 's5':
        _rate = 5;
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
            .catch(e => console.log(e.message));
        }
        else{
          axios.post(back_url,{heroId: heroId, userId: Number.parseInt(localStorage.getItem("userId") as string), rate: _rate})
            .then(res =>{
              if(onRateChange !== undefined)
                onRateChange();
            })
            .catch(e => console.log(e.message));
        }
      })
      .catch(e => console.log(e.message));
  };

  const handleClassName = (rateLength: number) => {
    let s = 'fa';

    s += (lRate > rateLength) ? ' fa-star' : ' fa-star-o';

    if((lRate - rateLength) > 0 && (lRate - rateLength) < 1)
      s += '-half-o';

    s += (!interactable) ? ' no-interactable' : ' star-color';

    return s;
  };

  return (
    <div className="row spacing col">
      {(lRate > 0) ? <p>{interactable ? YOUR_RATE : USERS_RATE}: {lRate}</p> : <p>{interactable ? NO_YOUR_RATE : NO_USERS_RATE}</p>}
      <div className='col'>
        <span id='s1' onClick={handleRate} data-testid="star" className={handleClassName(0)}></span>
        <span id='s2' onClick={handleRate} data-testid="star2" className={handleClassName(1)}></span>
        <span id='s3' onClick={handleRate} data-testid="star3" className={handleClassName(2)}></span>
        <span id='s4' onClick={handleRate} data-testid="star4" className={handleClassName(3)}></span>
        <span id='s5' onClick={handleRate} data-testid="star5" className={handleClassName(4)}></span>
      </div>
    </div>
  )
};

export default Rate;
