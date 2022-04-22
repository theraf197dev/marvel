import express from 'express';
import { MarvelClient } from './MarvelClient';
import cors from 'cors';
import console from 'console';

const port = 3001;

const app = express();
app.use(cors());

const marvelClient = new MarvelClient();

app.get( "/hero/getHeroes", async ( req, res ) => {
    if(req.query) {
        const page = req.query.page as string;
        const limit = req.query.limit as string;
        const result = await marvelClient.getHeroes(page, limit);

        res.send(result);
    }
} );

app.get( "/hero/getHeroDetail", async ( req, res ) => {
    if(req.query){
        const characterId = req.query.characterId as string;
        const result = await marvelClient.getHeroDetail(characterId);
        res.send(result);
    }
} );

app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );