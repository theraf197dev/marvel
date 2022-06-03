import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { BACK_URL } from '../../constants';

interface UpvoteProps {
  heroId: number
}

const Upvote: FC<UpvoteProps> = ({heroId}) => {
  const [lUpvote, setLUpvote] = useState(false);

  useEffect(() => {
    const peticion = async(endpoint = "") => {
      const url = BACK_URL.concat('/upvote');
  
      axios.get(url, {params : {heroId: heroId, userId: Number.parseInt(localStorage.getItem("userId") as string)}})
        .then(res => {
          setLUpvote(res.data.length > 0);
        })
        .catch(e => console.log(e));
    };
    
    peticion();
  }, []);

  const handleUpvote = (event: React.MouseEvent<HTMLButtonElement>) =>{
    const icon = event.currentTarget;

    setLUpvote(!icon.classList.contains('fa-heart'));

    const back_url = BACK_URL.concat('/upvote');
    const params = {
      heroId: heroId,
      userId: Number.parseInt(localStorage.getItem("userId") as string)
    };

    if(!lUpvote){
      axios.post(back_url,{heroId: heroId, userId: Number.parseInt(localStorage.getItem("userId") as string)})
        .then(res => {
          console.log(res.data);
        })
        .catch(e => console.log(e));
    }
    else{
      axios.delete(back_url,{params})
        .then(res => {
          console.log(res.data);
        })
        .catch(e => console.log(e));
    }
  };

  return (
    <div className='col-3 center-self'>
      <i onClick={handleUpvote} data-testid="heart" className={lUpvote ? 'fa fa-heart' : 'fa fa-heart-o'} />
    </div>
  );
};

export default Upvote;
