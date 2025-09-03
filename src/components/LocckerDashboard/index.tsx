import React, { useEffect, useState } from 'react'
import api from '../../api/api'
import {
  LockerBox,
  LockerGrid,
  Title,
  ModalBackdrop,
  ModalContent,
  ModalButton,
  CancelButton,
  StyledInput,
  LockNumberTitle,
  ModalContentDetails,
  ImageContainer,
  FormContent,
  StyledTextarea,
  ErrorText,
  ErrorBox,
  ModalHeader,
  CloseButton
} from './styles'
import {
  CardContainer,
  SectionTitle,
  Description,
  ProgressBar,
  ProgressFill,
  DetailItem,
  PriorityBadge,
  DetailsBox,
  DetailRow
} from './CardLayout' // ajuste o caminho conforme seu projeto

import logo from '../../assets/images/picture.png'
import EditDeliveryModal from '../../components/DeliveryEdit'
import {
  MdPerson,
  MdVerifiedUser,
  MdApartment,
  MdLocalShipping,
  MdFlashOn,
  MdAccessTime,
  MdErrorOutline,
  MdClose
} from 'react-icons/md'

interface LockerStatus {
  number: number
  status: 'FREE' | 'OCCUPIED'
  delivery?: {
    id: number
    lockerNumber: number
    receivedAt: string
    photoUrl?: string
    observation?: string
    pickupToken: string
    resident: {
      name: string
      apartment: string
    }
    createdBy?: {
      id: number
      username: string
    }
    collectedBy?: {
      id: number
      username: string
    }
  }
}

function LockersDashboard() {
  const [lockers, setLockers] = useState<LockerStatus[]>([])
  const [selectedLocker, setSelectedLocker] = useState<LockerStatus | null>(
    null
  )
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [createLockerNumber, setCreateLockerNumber] = useState<number | null>(
    null
  )
  const [apartmentInput, setApartmentInput] = useState('')
  const [photoUrlInput, setPhotoUrlInput] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [observationInput, setObservationInput] = useState('')
  const [currentUser, setCurrentUser] = useState<{ id: number }>({ id: 0 })
  const [editDelivery, setEditDelivery] = useState<
    LockerStatus['delivery'] | null
  >(null)

  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const MdPersonIcon = MdPerson as unknown as React.FC
  const MdApartmentIcon = MdApartment as unknown as React.FC
  const MdLocalShippingIcon = MdLocalShipping as unknown as React.FC
  const MdVerifiedUserIcon = MdVerifiedUser as unknown as React.FC
  const MdAccessTimeIcon = MdAccessTime as unknown as React.FC
  const MdErrorOutlineIcon = MdErrorOutline as unknown as React.FC
  const MdCloseIcon = MdClose as unknown as React.FC
  useEffect(() => {
    fetchLockers()
  }, [])

  useEffect(() => {
    api
      .get('/auth/me', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('app_token')}`
        }
      })
      .then((res) => setCurrentUser({ id: res.data.id }))
      .catch((err) => console.error('Erro ao buscar usuário logado:', err))
  }, [])
  const [showTokenModal, setShowTokenModal] = useState(false)
  const [inputToken, setInputToken] = useState('')
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (selectedLocker) setSelectedLocker(null)
      if (showTokenModal) setShowTokenModal(false)
      if (showCreateModal) setShowCreateModal(false)
      if (isEditModalOpen) setIsEditModalOpen(false)
    }
    document.addEventListener('keydown', onEsc)
    return () => document.removeEventListener('keydown', onEsc)
  }, [selectedLocker, showTokenModal, showCreateModal, isEditModalOpen])

  const fetchLockers = () => {
    api
      .get('/lockers')
      .then((res) => {
        const formatted = res.data
          .sort((a: any, b: any) => a.number - b.number)
          .map((locker: any) => ({
            number: locker.number,
            status: locker.status,
            delivery: locker.delivery
          }))
        setLockers(formatted)
      })
      .catch((err) => console.error('Erro ao buscar lockers:', err))
  }

  const handleConfirmCollect = async () => {
    if (!selectedLocker?.delivery) return

    if (inputToken !== selectedLocker.delivery.pickupToken) {
      alert('Código incorreto.')
      return
    }

    try {
      await api.put(
        `/deliveries/${selectedLocker.delivery.id}/collect?collectedById=${currentUser.id}`,
        {}, // corpo vazio
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('app_token')}`
          }
        }
      )

      alert('Entrega confirmada e locker liberado.')
      setSelectedLocker(null)
      setShowTokenModal(false)
      setInputToken('')
      fetchLockers()
    } catch (err) {
      console.error('Erro ao confirmar coleta:', err)
      alert('Erro ao confirmar coleta.')
    }
  }

  const openCreateModal = (lockerNumber: number) => {
    setCreateLockerNumber(lockerNumber)
    setApartmentInput('')
    setPhotoUrlInput('')
    setErrorMessage('')
    setShowCreateModal(true)
  }

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!createLockerNumber) return

    try {
      const exists = await api.get(`/residents/exists/${apartmentInput}`)
      if (!exists.data) {
        setErrorMessage('Apartamento não encontrado.')
        return
      }

      await api.post('/deliveries', {
        apartment: apartmentInput,
        lockerNumber: createLockerNumber,
        photoUrl: photoUrlInput,
        observation: observationInput,
        createdById: currentUser.id
      })

      alert('Entrega registrada com sucesso!')
      setShowCreateModal(false)
      setObservationInput('')
      fetchLockers()
    } catch (err) {
      console.error('Erro ao cadastrar entrega:', err)
      setErrorMessage('Erro ao cadastrar entrega.')
    }
  }

  const handleSaveEdit = async (updated: {
    apartment: string
    observation: string
  }) => {
    if (!editDelivery) return

    try {
      const res = await api.put(`/deliveries/${editDelivery.id}`, {
        apartment: updated.apartment,
        observation: updated.observation
      })

      setEditDelivery(null)
      alert('Entrega atualizada com sucesso!')

      fetchLockers() // Atualiza a lista geral

      // Atualiza o selectedLocker se ele estiver aberto e for o mesmo locker da entrega editada
      setSelectedLocker((prev) => {
        if (prev && prev.delivery?.id === res.data.id) {
          return {
            ...prev,
            delivery: res.data
          }
        }
        return prev
      })

      setIsEditModalOpen(false) // Fecha o modal de edição
    } catch (err) {
      console.error('Erro ao atualizar entrega:', err)
      alert('Erro ao atualizar entrega.')
    }
  }

  return (
    <div>
      <Title>Painel dos Lockers</Title>
      <LockerGrid>
        {lockers.map((locker) => (
          <LockerBox
            key={locker.number}
            status={locker.status}
            title={
              locker.status === 'OCCUPIED'
                ? `Ocupado por: ${locker.delivery?.resident.name}`
                : 'Clique para cadastrar nova entrega'
            }
            onClick={() =>
              locker.status === 'OCCUPIED'
                ? setSelectedLocker(locker)
                : openCreateModal(locker.number)
            }
          >
            <LockNumberTitle> {locker.number}</LockNumberTitle>
            <br />
            {locker.status === 'OCCUPIED' ? 'Ocupado' : 'Livre'}
          </LockerBox>
        ))}
      </LockerGrid>

      {/* Modal - Locker Ocupado */}
      {selectedLocker && selectedLocker.delivery && (
        <ModalBackdrop onClick={() => setSelectedLocker(null)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CardContainer>
              <ModalHeader>
                <h3> Detalhes da Encomenda - Locker {selectedLocker.number}</h3>
                <CloseButton
                  aria-label="Fechar"
                  title="Fechar"
                  onClick={() => setSelectedLocker(null)}
                >
                  <MdCloseIcon />
                </CloseButton>
              </ModalHeader>

              <Description>
                Encomenda destinada ao apartamento{' '}
                {selectedLocker.delivery.resident.apartment}, recebida e
                armazenada no locker {selectedLocker.number}.<br></br>
                <br></br>
                <strong>Observação:</strong>{' '}
                {selectedLocker.delivery.observation ||
                  'Sem observações adicionais.'}
              </Description>

              <SectionTitle>Detalhes</SectionTitle>
              <DetailsBox>
                <DetailRow>
                  <span>
                    <MdVerifiedUserIcon /> Responsável:
                  </span>
                  <span>
                    {selectedLocker.delivery.createdBy?.username || 'N/D'}
                  </span>
                </DetailRow>
                <DetailRow>
                  <span>
                    <MdApartmentIcon /> Apartamento:
                  </span>
                  <span>{selectedLocker.delivery.resident.apartment}</span>
                </DetailRow>
                <DetailRow>
                  <span>
                    <MdPersonIcon /> Morador:
                  </span>
                  <span>{selectedLocker.delivery.resident.name}</span>
                </DetailRow>
                <DetailRow>
                  <span>
                    <MdAccessTimeIcon /> Última Atualização:
                  </span>
                  <span>
                    {new Date(
                      selectedLocker.delivery.receivedAt
                    ).toLocaleString()}
                  </span>
                </DetailRow>
              </DetailsBox>
            </CardContainer>

            <ModalButton
              onClick={() => {
                setEditDelivery(selectedLocker.delivery!)
                setTimeout(() => setIsEditModalOpen(true), 100)
              }}
            >
              Editar
            </ModalButton>

            <ModalButton onClick={() => setShowTokenModal(true)}>
              Confirmar Coleta
            </ModalButton>
            <CancelButton onClick={() => setSelectedLocker(null)}>
              Cancelar
            </CancelButton>
          </ModalContent>
        </ModalBackdrop>
      )}
      {showTokenModal && selectedLocker?.delivery && (
        <ModalBackdrop onClick={() => setShowTokenModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3>Digite o código de retirada</h3>

              <CloseButton
                aria-label="Fechar"
                title="Fechar"
                onClick={() => setShowTokenModal(false)}
              >
                <MdCloseIcon />
              </CloseButton>
            </ModalHeader>

            <StyledInput
              type="text"
              placeholder="Código enviado"
              value={inputToken}
              onChange={(e) => setInputToken(e.target.value)}
            />
            <ModalButton onClick={handleConfirmCollect}>Confirmar</ModalButton>
            <CancelButton onClick={() => setShowTokenModal(false)}>
              Cancelar
            </CancelButton>
          </ModalContent>
        </ModalBackdrop>
      )}

      {/* Modal - Cadastrar Entrega */}
      {showCreateModal && createLockerNumber !== null && (
        <ModalBackdrop onClick={() => setShowCreateModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3>Nova Entrega - Locker {createLockerNumber}</h3>
              <CloseButton
                aria-label="Fechar"
                title="Fechar"
                onClick={() => {
                  setShowCreateModal(false)
                  setObservationInput('')
                }}
              >
                <MdCloseIcon />
              </CloseButton>
            </ModalHeader>

            <FormContent>
              <form onSubmit={handleCreateSubmit}>
                <StyledInput
                  type="text"
                  placeholder="Apartamento"
                  value={apartmentInput}
                  onChange={(e) => setApartmentInput(e.target.value)}
                  required
                />
                <StyledTextarea
                  placeholder="Observações sobre a entrega"
                  value={observationInput}
                  onChange={(e) => setObservationInput(e.target.value)}
                />{' '}
                {errorMessage && (
                  <ErrorBox>
                    <ErrorText>
                      <MdErrorOutlineIcon /> {errorMessage}
                    </ErrorText>
                  </ErrorBox>
                )}
                <ModalButton type="submit">Cadastrar</ModalButton>
                <CancelButton
                  type="button"
                  onClick={() => {
                    setShowCreateModal(false)
                    setObservationInput('')
                  }}
                >
                  Cancelar
                </CancelButton>
              </form>
            </FormContent>
          </ModalContent>
        </ModalBackdrop>
      )}

      {/* Modal - Editar Entrega */}
      {editDelivery && isEditModalOpen && (
        <EditDeliveryModal
          isOpen={true}
          delivery={{
            ...editDelivery,
            resident: {
              name: editDelivery.resident.name,
              apartment: editDelivery.resident.apartment,
              id: 0 // ajuste conforme sua necessidade
            }
          }}
          onClose={() => {
            setEditDelivery(null)
            setIsEditModalOpen(false)
          }}
          onSave={handleSaveEdit}
        />
      )}
    </div>
  )
}

export default LockersDashboard
