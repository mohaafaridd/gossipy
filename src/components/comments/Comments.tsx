import React, { useContext } from 'react'
import CommentCard from './CommentCard'
import useGradient from '../../hooks/useGradient'
import { CommentContext } from '../../context/index'

const Comments = () => {
  const { comments } = useContext(CommentContext)
  // Gradients
  const [[, shade]] = useGradient()

  return (
    <div className='comments '>
      <h3>Comments</h3>

      {comments?.length === 0 && (
        <div
          className={`${shade} p-2 rounded-md text-center text-gray-500 uppercase tracking-widest cursor-default`}>
          No comments on this topic
        </div>
      )}
      {comments?.map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
    </div>
  )
}

export default Comments
