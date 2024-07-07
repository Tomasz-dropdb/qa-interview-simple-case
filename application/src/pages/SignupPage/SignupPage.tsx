import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User } from '../../App'
import { Form } from './Form'

interface SignupPageProps {
  user?: User
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

const SignupPage: React.FC<SignupPageProps> = ({ user, setUser }) => {
  const navigate = useNavigate()

  useEffect(() => {
    if (user) navigate('/')
  }, [navigate, user])

  const labels = getLabels()

  return (
    <main style={{ overflow: 'auto', height: '100%', width: '100%' }} className="page">
      <div className="signup">
        <h1>Strawberry QA</h1>
        <div style={{ width: '100%', paddingRight: '2rem' }}>
          <h2>{labels.title}</h2>
          <Form setUser={setUser} />
        </div>
        <br />
        {labels.login.text} <Link to={`/login`}>{labels.login.cta}</Link>
      </div>

      <div className="background">
          <h1>{labels.aboutTitle}</h1>
          <br/>
          {labels.perks.map((perk) => (
            <p key={perk}>- {perk}</p>
          ))}
        </div>
    </main>
)
}

export default SignupPage

const getLabels = (): {
  aboutTitle: string
  perks: string[]
  login: { text: string; cta: string }
  title: string
} => {
      return {
        aboutTitle: 'You should join us because:',
        perks: ['We are a nice company', 'Free breakfast!'],
        login: { text: 'Already have an account?', cta: 'Login' },
        title: 'Become a member',
      }
  }
