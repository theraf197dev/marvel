import axios from 'axios';
import React, { FC, useState } from 'react';
import { BACK_URL } from '../../constants';
import CommentList from '../CommentList/CommentList';

interface CreateCommentProps {
  heroId: number,
  handleCreateComment?: Function
}

const CreateComment: FC<CreateCommentProps> = ({heroId, handleCreateComment}) => {
  const [description, setDescription] = useState('');

  const handleSubmit = (event: any) =>{
    event.preventDefault();

    if(description.length <= 0)
      return;

    const back_url = BACK_URL.concat('/comment');

    const textareaComment = event.target.textareaComment;

    axios.post(back_url,{heroId: heroId, userId: Number.parseInt(localStorage.getItem("userId") as string), comment: description})
      .then(res => {
        textareaComment.value = '';
        setDescription('');

        if(handleCreateComment !== undefined)
          handleCreateComment();
    });
  };

  return (
    <form className="mb-3 spacing container center" onSubmit={handleSubmit}>
      <textarea name='textareaComment' onChange={event => setDescription(event.target.value)} placeholder='Leave a comment...' rows={5} maxLength={300} className="form-control black-background" data-testid="description"></textarea>
      <button type="submit" className="btn custom-button spacing go-right" aria-label="submit" data-testid="submit">Submit</button>
    </form>
  );
};

export default CreateComment;
