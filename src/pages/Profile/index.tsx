// Profile.tsx
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'

import api from '../../api/api'
import { FaPlus, FaPlusCircle, FaUserCircle } from 'react-icons/fa'
import {
  FormRow,
  Label,
  Input,
  Button,
  Card,
  DeleteButton,
  PageContainer,
  ContentContainer,
  MainContent,
  Tabs,
  Tab,
  Section,
  Title
} from './styles'

function Profile() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState<
    'profile' | 'employees' | 'register'
  >('profile')
  const [filter, setFilter] = useState('')

  const [user, setUser] = useState({
    username: '',
    email: '',
    phone: '',
    role: '',
    password: ''
  })
  const [usersList, setUsersList] = useState([])
  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    password: '',
    phone: '',
    role: 'ADMIN'
  })

  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const tabParam = params.get('tab') as 'profile' | 'employees' | 'register'
    if (tabParam) setActiveTab(tabParam)
  }, [location.search])

  useEffect(() => {
    const token = localStorage.getItem('app_token')
    if (!token) return

    api
      .get('/auth/me', { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setUser({
          username: res.data.username,
          email: res.data.email,
          phone: res.data.phone || '',
          role: res.data.role,
          password: ''
        })
      })
      .catch((err) => console.error('Erro ao buscar dados do usuário:', err))
  }, [])

  useEffect(() => {
    if (activeTab === 'employees') {
      api
        .get('/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('app_token')}`
          }
        })
        .then((res) => setUsersList(res.data))
        .catch((err) => console.error('Erro ao buscar usuários:', err))
    }
  }, [activeTab])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const handleSave = async () => {
    try {
      await api.put('/auth/update', user, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('app_token')}`
        }
      })
      alert('Dados atualizados com sucesso!')
      setIsEditing(false)
    } catch (err) {
      alert('Erro ao atualizar dados.')
      console.error(err)
    }
  }

  const handleDelete = async (id: number) => {
    const confirm = window.confirm(
      'Deseja realmente excluir este funcionário? Esta ação não pode ser desfeita.'
    )
    if (!confirm) return

    try {
      await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('app_token')}`
        }
      })
      setUsersList((prev) => prev.filter((u: any) => u.id !== id))
    } catch (err) {
      alert('Erro ao excluir funcionário.')
      console.error(err)
    }
  }

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value })
  }

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', newUser, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('app_token')}`
        }
      })
      alert('Funcionário cadastrado com sucesso!')
      setNewUser({
        username: '',
        email: '',
        password: '',
        phone: '',
        role: 'ADMIN'
      })
    } catch (err) {
      alert('Erro ao cadastrar funcionário.')
      console.error(err)
    }
  }

  const renderProfile = () => (
    <>
      <FormRow>
        <div style={{ flex: 1 }}>
          <Label>Nome de Usuário</Label>
          <Input name="username" value={user.username} readOnly />
        </div>
        <div style={{ flex: 1 }}>
          <Label>Função</Label>
          <Input name="role" value={user.role} readOnly />
        </div>
      </FormRow>
      <FormRow>
        <div style={{ flex: 1 }}>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Label>Telefone</Label>
          <Input
            type="text"
            name="phone"
            value={user.phone}
            onChange={handleChange}
            readOnly={!isEditing}
          />
        </div>
      </FormRow>
      <FormRow>
        <div style={{ flex: 1 }}>
          <Label>Nova senha</Label>
          <Input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Deixe em branco para manter a atual"
            readOnly={!isEditing}
          />
        </div>
      </FormRow>
      {!isEditing ? (
        <Button onClick={() => setIsEditing(true)}>Editar Informações</Button>
      ) : (
        <>
          <Button onClick={handleSave}>Salvar</Button>
          <Button onClick={() => setIsEditing(false)}>Cancelar</Button>
        </>
      )}
    </>
  )

  const renderEmployees = () => (
    <>
      <Input
        placeholder="Filtrar por nome"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        style={{ marginBottom: '20px' }}
      />
      {usersList
        .filter((u: any) =>
          u.username.toLowerCase().includes(filter.toLowerCase())
        )
        .map((u: any) => (
          <Card key={u.id}>
            <DeleteButton onClick={() => handleDelete(u.id)}>
              Excluir
            </DeleteButton>
            <strong>{u.username}</strong> ({u.role})<br />
            Email: {u.email} <br />
            Telefone: {u.phone || 'Não informado'}
          </Card>
        ))}
    </>
  )

  const renderRegister = () => (
    <>
      <FormRow>
        <div style={{ flex: 1 }}>
          <Label>Nome de Usuário</Label>
          <Input
            name="username"
            value={newUser.username}
            onChange={handleRegisterChange}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Label>Email</Label>
          <Input
            name="email"
            type="email"
            value={newUser.email}
            onChange={handleRegisterChange}
          />
        </div>
      </FormRow>
      <FormRow>
        <div style={{ flex: 1 }}>
          <Label>Senha</Label>
          <Input
            name="password"
            type="password"
            value={newUser.password}
            onChange={handleRegisterChange}
          />
        </div>
        <div style={{ flex: 1 }}>
          <Label>Telefone</Label>
          <Input
            name="phone"
            value={newUser.phone}
            onChange={handleRegisterChange}
          />
        </div>
      </FormRow>
      <Button onClick={handleRegister}>Cadastrar Funcionário</Button>
    </>
  )

  return (
    <PageContainer>
      <Sidebar />
      <ContentContainer>
        <Navbar />
        <MainContent>
          <Tabs>
            <Tab
              active={activeTab === 'profile'}
              onClick={() => setActiveTab('profile')}
            >
              Minha Conta
            </Tab>
            <Tab
              active={activeTab === 'employees'}
              onClick={() => setActiveTab('employees')}
            >
              Funcionários
            </Tab>
            <Tab
              active={activeTab === 'register'}
              onClick={() => setActiveTab('register')}
            >
              Cadastrar Funcionário
            </Tab>
          </Tabs>
          <Section>
            <Title>
              {activeTab === 'profile'
                ? 'Conta'
                : activeTab === 'employees'
                ? 'Funcionários'
                : 'Cadastrar Funcionário'}
            </Title>
            {activeTab === 'profile' && renderProfile()}
            {activeTab === 'employees' && renderEmployees()}
            {activeTab === 'register' && renderRegister()}
          </Section>
        </MainContent>
      </ContentContainer>
    </PageContainer>
  )
}

export default Profile
