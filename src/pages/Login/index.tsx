import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../../services/authService'

import { FaEye, FaEyeSlash } from 'react-icons/fa'

import {
  Container,
  LoginBox,
  Title,
  Input,
  InputWrapper,
  EyeIcon,
  Button,
  ErrorMessage
} from './styles'
// Forçando tipo de componente
const EyeIconComponent = FaEye as unknown as React.FC
const EyeSlashComponent = FaEyeSlash as unknown as React.FC

function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await login(username, password)
      navigate('/home')
    } catch {
      setError('Usuário ou senha inválidos')
    }
  }

  return (
    <Container>
      <LoginBox>
        <Title>Login - Lock System</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <InputWrapper>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <EyeIcon onClick={() => setShowPassword(!showPassword)}>
              <EyeIcon onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeSlashComponent /> : <EyeIconComponent />}
              </EyeIcon>
            </EyeIcon>
          </InputWrapper>
          <Button type="submit">Entrar</Button>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </form>
      </LoginBox>
    </Container>
  )
}

export default Login
