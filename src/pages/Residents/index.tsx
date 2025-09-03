import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import api from '../../api/api'
import { Resident } from '../../models/Resident'

import { FaPlus, FaTimes as FaTimesRaw, FaEdit, FaTrash } from 'react-icons/fa'
import Navbar from '../../components/Navbar'
import {
  ContentContainer,
  Container,
  Header,
  Title,
  Button,
  FilterInput,
  ResidentList,
  ResidentCard,
  ResidentName,
  ResidentInfo,
  ActionsContainer,
  ActionButton,
  ModalOverlay,
  ModalContent,
  CloseButton,
  Input,
  ModalContentTitle,
  ModalContentBody,
  ModalContentButton,
  ButtonCancelar,
  ModalHeader,
  CancelButton,
  ButtonArea,
  ButtonSubmit
} from './styles'

const FaTimes = FaTimesRaw as unknown as React.FC
const FaPlusIcon = FaPlus as unknown as React.FC
const FaEditIcon = FaEdit as unknown as React.FC
const FaTrashIcon = FaTrash as unknown as React.FC

function Residents() {
  const [residents, setResidents] = useState<Resident[]>([])
  const [filter, setFilter] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editModalOpen, setEditModalOpen] = useState(false)
  const [deleteModalOpen, setDeleteModalOpen] = useState(false)

  const [selectedResident, setSelectedResident] = useState<Resident | null>(
    null
  )

  const [formResident, setFormResident] = useState<Resident>({
    id: '',
    name: '',
    apartment: '',
    email: '',
    phone: ''
  })

  useEffect(() => {
    fetchResidents()
  }, [])

  const fetchResidents = () => {
    api
      .get('/residents')
      .then((res) => setResidents(res.data))
      .catch((err) => console.error('Erro ao buscar moradores:', err))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormResident({ ...formResident, [name]: value })
  }
  const [errorMessage, setErrorMessage] = useState('')
  // Cadastro novo morador
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('') // limpa erro anterior

    api
      .post('/residents', formResident)
      .then(() => {
        fetchResidents()
        setFormResident({
          id: '',
          name: '',
          apartment: '',
          email: '',
          phone: ''
        })
        setShowModal(false)
      })
      .catch((err) => {
        if (err.response?.status === 409) {
          setErrorMessage(err.response.data)
        } else {
          console.error('Erro ao cadastrar morador:', err)
          setErrorMessage('Erro inesperado. Tente novamente.')
        }
      })
  }

  // Abrir modal de edição com dados do morador selecionado
  const openEditModal = (resident: Resident) => {
    setSelectedResident(resident)
    setFormResident(resident)
    setEditModalOpen(true)
  }

  // Enviar edição
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedResident) return

    api
      .put(`/residents/${selectedResident.id}`, formResident)
      .then(() => {
        fetchResidents()
        setEditModalOpen(false)
        setSelectedResident(null)
        setFormResident({
          id: '',
          name: '',
          apartment: '',
          email: '',
          phone: ''
        })
      })
      .catch((err) => console.error('Erro ao editar morador:', err))
  }

  // Abrir modal para confirmar exclusão
  const openDeleteModal = (resident: Resident) => {
    setSelectedResident(resident)
    setDeleteModalOpen(true)
  }

  // Confirmar exclusão
  const handleDelete = () => {
    if (!selectedResident) return
    const token = localStorage.getItem('app_token')

    api
      .delete(`/residents/${selectedResident.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(() => {
        fetchResidents()
        setDeleteModalOpen(false)
        setSelectedResident(null)
      })
      .catch((err) => console.error('Erro ao excluir morador:', err))
  }

  const filteredResidents = residents.filter(
    (r) =>
      r.name.toLowerCase().includes(filter.toLowerCase()) ||
      r.apartment.includes(filter)
  )
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <ContentContainer>
        <Navbar />
        <Container>
          <Header>
            <Title>Moradores</Title>
            <Button
              onClick={() => {
                setFormResident({
                  id: '',
                  name: '',
                  apartment: '',
                  email: '',
                  phone: ''
                })
                setShowModal(true)
              }}
            >
              <FaPlusIcon /> Cadastrar morador
            </Button>
          </Header>

          <FilterInput
            placeholder="Buscar por nome ou apartamento"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />

          <ResidentList>
            {filteredResidents.map((resident) => (
              <ResidentCard key={resident.id}>
                <ResidentName>{resident.name}</ResidentName>
                <ResidentInfo>
                  <strong>Apartamento:</strong> {resident.apartment}
                </ResidentInfo>
                <ResidentInfo>
                  <strong>Email:</strong> {resident.email}
                </ResidentInfo>
                <ResidentInfo>
                  <strong>Telefone:</strong> {resident.phone}
                </ResidentInfo>

                <ActionsContainer>
                  <ActionButton
                    onClick={() => openEditModal(resident)}
                    title="Editar"
                  >
                    <FaEditIcon />
                  </ActionButton>
                  <ActionButton
                    onClick={() => openDeleteModal(resident)}
                    title="Excluir"
                    style={{ color: 'gray' }}
                  >
                    <FaTrashIcon />
                  </ActionButton>
                </ActionsContainer>
              </ResidentCard>
            ))}
          </ResidentList>

          {/* Modal Novo Morador */}
          {showModal && (
            <ModalOverlay>
              <ModalContent>
                <ModalHeader>
                  <h3>Cadastrar novo morador</h3>
                  <CloseButton onClick={() => setShowModal(false)}>
                    <FaTimes />
                  </CloseButton>
                </ModalHeader>

                <form onSubmit={handleSubmit}>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={formResident.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="text"
                    name="apartment"
                    placeholder="Apartamento"
                    value={formResident.apartment}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formResident.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="text"
                    name="phone"
                    placeholder="Telefone"
                    value={formResident.phone}
                    onChange={handleChange}
                    required
                  />
                  {errorMessage && (
                    <p style={{ color: 'red', marginBottom: '10px' }}>
                      {errorMessage}
                    </p>
                  )}

                  <ButtonArea>
                    <ButtonSubmit type="submit">Cadastrar</ButtonSubmit>
                    <CancelButton onClick={() => setShowModal(false)}>
                      Cancelar
                    </CancelButton>
                  </ButtonArea>
                </form>
              </ModalContent>
            </ModalOverlay>
          )}

          {/* Modal Editar Morador */}
          {editModalOpen && (
            <ModalOverlay>
              <ModalContent>
                <ModalHeader>
                  <h3>Editar morador</h3>
                  <CloseButton onClick={() => setIsEditModalOpen(false)}>
                    <FaTimes />
                  </CloseButton>
                </ModalHeader>

                <form onSubmit={handleEditSubmit}>
                  <Input
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={formResident.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="text"
                    name="apartment"
                    placeholder="Apartamento"
                    value={formResident.apartment}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formResident.email}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    type="text"
                    name="phone"
                    placeholder="Telefone"
                    value={formResident.phone}
                    onChange={handleChange}
                    required
                  />

                  <ButtonArea>
                    <ButtonSubmit type="submit">Salvar</ButtonSubmit>

                    <CancelButton onClick={() => setIsEditModalOpen(false)}>
                      Cancelar
                    </CancelButton>
                  </ButtonArea>
                </form>
              </ModalContent>
            </ModalOverlay>
          )}

          {/* Modal Confirmar Exclusão */}
          {deleteModalOpen && (
            <ModalOverlay>
              <ModalContent>
                <ModalHeader>
                  <h3>Confirmar exclusão</h3>
                </ModalHeader>

                <ModalContentBody>
                  <p>
                    Tem certeza que deseja excluir o morador{' '}
                    <strong>
                      {selectedResident?.name} do apartamento{' '}
                      {selectedResident?.apartment}
                    </strong>
                    ?
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      gap: '10px'
                    }}
                  ></div>
                </ModalContentBody>
                <ModalContentButton>
                  <Button onClick={handleDelete}>Excluir</Button>
                  <ButtonCancelar onClick={() => setDeleteModalOpen(false)}>
                    Cancelar
                  </ButtonCancelar>
                </ModalContentButton>
              </ModalContent>
            </ModalOverlay>
          )}
        </Container>
      </ContentContainer>
    </div>
  )
}

export default Residents
