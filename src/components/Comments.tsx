import React from 'react'
import { Comment } from '../interfaces/Comment'
import CommentCard from './CommentCard'
import useGradient from '../hooks/useGradient'

const Comments = ({ comments }: { comments: Comment[] }) => {
  // Gradients
  const [[, shade]] = useGradient()

  return (
    <div className='comments '>
      <h3>Comments</h3>

      {comments.length === 0 && (
        <div
          className={`${shade} p-2 rounded-md text-center text-gray-500 uppercase tracking-widest cursor-default`}>
          No comments on this topic
        </div>
      )}
      {comments.map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export default Comments
