import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../../App'
import { Form } from './Form'

interface LoginPageProps {
  user?: User
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

const LoginPage: React.FC<LoginPageProps> = ({ user, setUser }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/')
  }, [navigate, user])

  return (
    <main style={{ overflow: 'auto', height: '100%', width: '100%' }} className="page">
      <div className="login">
        <h1>Strawberry QA</h1>
        <h2>Login</h2>
        <Form setUser={setUser} />
        <br />
        Don't have an account? <Link to={`/signup`} data-testid="signup">Signup</Link>
        <br />
      </div>
      <div className="background">
        <h1 data-testid="title">Welcome to the Strawberry QA Chapter website!</h1>
      </div>
    </main>
  )
}

export default LoginPage
