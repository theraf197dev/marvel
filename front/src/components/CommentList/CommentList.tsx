import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { BACK_URL } from '../../constants';
import { MComment } from '../../models/MComment';
import Comment from '../Comment/Comment';

interface CommentListProps {
  heroId: number
}

const CommentList: FC<CommentListProps> = ({heroId}) => {
  const [comments, setComments] = useState(new Array<MComment>());
  
  useEffect(() => {
    const url = BACK_URL.concat('/comment');

    axios.get(url, {params : {heroId: heroId}})
      .then(res => {
        if(res.data.length > 0)
          setComments(res.data);
    });
  }, []);
  
  return(
    <div className='spacing'>
      {(comments.length <= 0) ? <div data-testid="no-comments">No comments</div> :
      <div className='spacing' data-testid="comments">
        {comments.map((comment) => <Comment key={comment.id} username={comment.username} description={comment.comment} />)}
      </div>}
    </div>
  );
};

export default CommentList;