import React from 'react'
import UserCard from '../UserCard'
import { useSelector } from 'react-redux'
import FollowBtn from '../FollowBtn'

const Follower = ({users, setFollower}) => {
  const { auth } = useSelector(state => state)
  console.log({users})
  return (
    <div className='follow'>
      <div className='follow_box'>
        <h5 className='text-center'>Followers</h5>
        <hr />
        {
          users.map(user => (
            <UserCard key={user._id} user={user} setFollower={setFollower}>
              {
                auth.user._id !== user._id && <FollowBtn user={user} />
              }
            </UserCard>
          ))
        }
        <div className='close' onClick={() => setFollower(false)}>
          &times;
        </div>
      </div>
    </div>
  )
}

export default Follower