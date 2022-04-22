import axios from 'axios';
import React, { FC, useState } from 'react';
import { BACK_URL } from '../../constants';
import CommentList from '../CommentList/CommentList';

interface CreateCommentProps {
  heroId: number
}

const CreateComment: FC<CreateCommentProps> = ({heroId}) => {
  const [description, setDescription] = useState('');

  const handleSubmit = () =>{
    if(description.length <= 0)
      return;

    const back_url = BACK_URL.concat('/comment');

    axios.post(back_url,{heroId: heroId, userId: Number.parseInt(localStorage.getItem("userId") as string), comment: description})
      .then(res => {
        window.location.reload();
    });
  };

  return (
    <>
      <div className="mb-3 spacing container center">
        <textarea onChange={event => setDescription(event.target.value)} placeholder='Leave a comment...' rows={5} maxLength={300} className="form-control black-background" data-testid="description"></textarea>
        <button type="button" onClick={handleSubmit} className="btn custom-button spacing go-right" aria-label="submit" data-testid="submit">Submit</button>
      </div>
      <br/><br/>
      <CommentList heroId={heroId} />
    </>
  );
};

export default CreateComment;
