import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CollapsibleComponents from '../components/CollapsibleComponents/CollapsibleComponents';
import CreateComment from '../components/CreateComment/CreateComment';
import { API_URL, BACK_URL } from '../constants';
import { MComic } from '../models/MComic';
import { MEvent } from '../models/MEvent';
import { MSerie } from '../models/MSerie';
import { MStory } from '../models/MStory';
import { MUrl } from '../models/MUrl';

const HeroDetail = () => {
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const [heroName, setHeroName] = useState('');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [comicUrl, setComicUrl] = useState('');

  const [comics, setComics] = useState(new Array<MComic>());
  const [events, setEvents] = useState(new Array<MEvent>());
  const [series, setSeries] = useState(new Array<MSerie>());
  const [stories, setStories] = useState(new Array<MStory>());

  useEffect(() => {
    const peticion = async(endpoint = "") => {
      const url = API_URL.concat('/hero/getHeroDetail?characterId=') + location.state;
  
      axios.get(url)
        .then(res => {
          const json = res.data;
          const result = json.data.results[0];
  
          setHeroName(result.name);
          setDescription(result.description);
          setThumbnail(result.thumbnail.path + '.' + result.thumbnail.extension);
  
          const urls: Array<MUrl> = result.urls || [];
          const urlC = urls.find((_url) => (_url.type === 'comiclink'));
          
          setComicUrl((urlC !== undefined && urlC !== null) ? urlC.url : '');
  
          setComics(result.comics.items);
          setEvents(result.events.items);
          setSeries(result.series.items);
          setStories(result.stories.items);
  
          setLoading(false);
      });
    };

    peticion();
  }, []);
  
  return(
    <>
      {loading ? <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
        :
        <div>
          <div className='container-fluid '>
            <CollapsibleComponents comics={comics} events={events} series={series} stories={stories} heroName={heroName} description={description} thumbnail={thumbnail} heroId={location.state} comicUrl={comicUrl} />
          </div>
          <br/><br/>
          <CreateComment heroId={location.state} />
        </div>
      }
    </>
  )
}

export default HeroDetail