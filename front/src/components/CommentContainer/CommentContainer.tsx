import { FC, useState } from 'react';
import CommentList from '../CommentList/CommentList';
import CreateComment from '../CreateComment/CreateComment';

interface CommentContainerProps {
  heroId: number
}

const CommentContainer: FC<CommentContainerProps> = ({heroId}) => {
  const [change, setChange] = useState(false);

  const handleCreateComment = () =>{
    setChange(!change);
  };

  return(
    <div className="custom-card spacing">
      <CreateComment heroId={heroId} handleCreateComment={handleCreateComment} />
      <br/><br/>
      <CommentList heroId={heroId} change={change} />
    </div>
  )
};

export default CommentContainer;
