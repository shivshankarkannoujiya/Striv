import React from 'react'
import { useAuthStore } from '../store/useAuthStore'


const ChatPage = () => {
  const { signOut } = useAuthStore();
  return (
    <div>ChatPage
      <button
       className='btn btn-primary' 
      onClick={signOut}
      >Log out</button>
    </div>
  )
}

export default ChatPage