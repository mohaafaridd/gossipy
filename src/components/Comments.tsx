import React from 'react'
import { Comment } from '../interfaces/Comment'
import CommentCard from './CommentCard'

const Comments = ({ comments }: { comments: Comment[] }) => {
  return (
    <div>
      {comments.map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export default Comments
