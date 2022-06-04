import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { BACK_URL } from '../../constants';
import { MComment } from '../../models/MComment';
import Comment from '../Comment/Comment';

interface CommentListProps {
  heroId: number,
  change?: boolean
}

const CommentList: FC<CommentListProps> = ({heroId, change}) => {
  const [comments, setComments] = useState(new Array<MComment>());
  
  useEffect(() => {
    const url = BACK_URL.concat('/comment');

    axios.get(url, {params : {heroId: heroId}})
      .then(res => {
        if(res.data.length > 0)
          setComments(res.data.reverse());
      })
      .catch(e => console.log(e.message));
  }, [change, heroId]);
  
  return(
    <div className='spacing'>
      {(comments.length <= 0) ? <div data-testid="no-comments">No comments</div> :
      <div className='spacing' data-testid="comments">
        {comments.map((comment, i) => <Comment key={i} username={comment.username} description={comment.comment} />)}
      </div>}
    </div>
  );
};

export default CommentList;