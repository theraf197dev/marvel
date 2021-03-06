import axios from 'axios';
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import CollapsibleComponents from '../components/CollapsibleComponents/CollapsibleComponents';
import CommentContainer from '../components/CommentContainer/CommentContainer';
import { API_URL } from '../constants';
import { MComic } from '../models/MComic';
import { MEvent } from '../models/MEvent';
import { MSerie } from '../models/MSerie';
import { MStory } from '../models/MStory';
import { MUrl } from '../models/MUrl';

const HeroDetail = () => {
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

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
      const state = location.state || location.pathname.split('/')[2];

      const url = API_URL.concat('/hero/getHeroDetail?characterId=') + state;
  
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
        })
        .catch(e => {
          console.log(e.message);
          navigate('/heroes')
        });
    };

    peticion();
  }, [location, navigate]);
  
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
          <CommentContainer heroId={location.state} />
        </div>
      }
    </>
  )
}

export default HeroDetail