import React, { FC } from 'react';

interface CommentProps {
  username: string,
  description: string
}

const Comment: FC<CommentProps> = ({username, description}) => {
  return(
    <div className="custom-card black-background text-left spacing">
      <h5 className="card-header" data-testid="username">{username}</h5>
      <div className="card-body li-custom">
        {description.split('\n').map((segment, i) => <p key={i} className="card-text" data-testid="description">{segment}</p>)}
      </div>
    </div>
  )
};

export default Comment;
