import React, { FC } from 'react'
import {
  AuthState,
  StationState,
  CommentState,
  MembershipState,
  TagState,
  TopicState
} from './context/'
const Context: FC = ({ children }) => {
  return (
    <AuthState>
      <StationState>
        <MembershipState>
          <TopicState>
            <CommentState>
              <TagState>{children}</TagState>
            </CommentState>
          </TopicState>
        </MembershipState>
      </StationState>
    </AuthState>
  )
}

export default Context
