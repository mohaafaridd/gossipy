import React from 'react'
import { Comment } from '../interfaces/Comment'
import CommentCard from './CommentCard'

const Comments = ({ comments }: { comments: Comment[] }) => {
  return (
    <div className='comments'>
      <h3>Comments</h3>

      {comments.map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export default Comments
