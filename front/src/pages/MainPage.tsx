import axios from 'axios';
import React, { useEffect, useState } from 'react'
import HeroList from '../components/HeroList/HeroList'
import { API_URL, CONCAT, LIMIT, PAGE } from '../constants';
import { MHero } from '../models/MHero';

 
const MainPage = () => {
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(1);
  const limit = 30;
  const [total, setTotal] = useState(1000);
  const [count, setCount] = useState(30);
  
  const [heroes, setHeroes] = useState(new Array<MHero>());

  useEffect(() => {
    const peticion = async(endpoint = "") => {
      const urlPage = API_URL.concat('/hero/getHeroes?').concat(PAGE) + page
      const url = urlPage.concat(CONCAT).concat(LIMIT) + limit;
  
      setLoading(true);
      axios.get(url)
        .then(res => {
          const json = res.data;
          setTotal(json.data.total);
          setCount(json.data.count);
          setHeroes([]);
  
          for(const hero of json.data.results){
            setHeroes(currentHeroes => currentHeroes.concat(hero));
          }
          
          setLoading(false);
      });
    };
    
    peticion();
  }, [page, limit]);

  const handleBefore = () =>{
    if(page === 1)
        return;
    
    setPage(page - 1);
    document.documentElement.scrollTop = 0;
  };

  const handleAfter = () =>{
    if(count !== limit || total <= page*limit)
        return;

    setPage(page + 1);
    document.documentElement.scrollTop = 0;
  };

  const handleFirst = () =>{
    setPage(1);
    document.documentElement.scrollTop = 0;
  };

  const handleLast = () =>{
    let lastPage = Math.floor(total/limit);
    
    if(total%(page*limit) !== 0)
        lastPage ++;

    setPage(lastPage);
    document.documentElement.scrollTop = 0;
  };

  return (
    <>
      {loading ? <div className="d-flex justify-content-center">
                  <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                  </div>
                </div>
      :
      <div>
        <HeroList heroes={heroes}></HeroList>
        <nav className='center-pagination' aria-label="Pagination">
            <ul className="pagination">
              <li className="page-item">
                <button type="button" onClick={handleFirst} className="btn custom-button spacing" aria-label="First">
                  <span aria-hidden="true">&laquo;</span>
                </button>
              </li>
              <li className="page-item"><button type="button" hidden={page === 1} onClick={handleBefore} className="btn custom-button spacing">Previous</button></li>
              <li className="page-item"><p className="rounded-border spacing">{page}</p></li>
              <li className="page-item"><button type="button" hidden={(count !== limit || total <= page*limit)} onClick={handleAfter} className="btn custom-button spacing">Next</button></li>
              <li className="page-item">
                  <button type="button" onClick={handleLast} className="btn custom-button spacing" aria-label="Last">
                    <span aria-hidden="true">&raquo;</span>
                  </button>
              </li>
            </ul>
        </nav>
      </div>
      }
    </>
  )
}

export default MainPage