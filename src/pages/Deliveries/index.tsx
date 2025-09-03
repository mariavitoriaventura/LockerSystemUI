import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import api from '../../api/api'

import Navbar from '../../components/Navbar'
import { Link } from 'react-router-dom'
import { ModalButton } from '../../components/DeliveryEdit'
import EditDeliveryModal from '../../components/DeliveryEdit'
import {
  ContentContainer,
  Container,
  Header,
  Title,
  FilterGroup,
  Input,
  DeliveryList,
  DeliveryCard,
  DeliveryInfo,
  Photo
} from './styles'
interface Resident {
  id: number
  name: string
  apartment: string
  email: string
  phone: string
}

interface Delivery {
  id: number
  lockerNumber: number
  receivedAt: string
  photoUrl?: string
  observation?: string
  resident: Resident
  createdBy?: {
    id: number
    username: string
  }
}

// 📦 Componente principal

function Deliveries() {
  const [deliveries, setDeliveries] = useState<Delivery[]>([])
  const [filters, setFilters] = useState({
    apartment: '',
    name: '',
    date: ''
  })

  useEffect(() => {
    fetchDeliveries()
  }, [])

  const fetchDeliveries = () => {
    api
      .get('/deliveries')
      .then((res) => setDeliveries(res.data))
      .catch((err) => console.error('Erro ao buscar entregas:', err))
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters({ ...filters, [name]: value })
  }

  const filteredDeliveries = deliveries.filter((delivery) => {
    const receivedDate = new Date(delivery.receivedAt)
      .toISOString()
      .slice(0, 10)
    return (
      delivery.resident.name
        .toLowerCase()
        .includes(filters.name.toLowerCase()) &&
      delivery.resident.apartment.includes(filters.apartment) &&
      receivedDate.includes(filters.date)
    )
  })
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(
    null
  )

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <ContentContainer>
        <Navbar />

        <Container>
          <Header>
            <Title>Entregas Registradas</Title>
          </Header>

          <FilterGroup>
            <Input
              type="text"
              name="name"
              placeholder="Nome do morador"
              value={filters.name}
              onChange={handleFilterChange}
            />
            <Input
              type="text"
              name="apartment"
              placeholder="Apartamento"
              value={filters.apartment}
              onChange={handleFilterChange}
            />
            <Input
              type="date"
              name="date"
              value={filters.date}
              onChange={handleFilterChange}
            />
          </FilterGroup>

          <DeliveryList>
            {filteredDeliveries.map((delivery) => (
              <DeliveryCard key={delivery.id}>
                <DeliveryInfo>
                  <strong>Morador:</strong> {delivery.resident.name}
                </DeliveryInfo>
                <DeliveryInfo>
                  <strong>Apartamento:</strong> {delivery.resident.apartment}
                </DeliveryInfo>
                <DeliveryInfo>
                  <strong>Locker:</strong> {delivery.lockerNumber}
                </DeliveryInfo>
                <DeliveryInfo>
                  <strong>Recebido em:</strong>{' '}
                  {new Date(delivery.receivedAt).toLocaleString()}
                </DeliveryInfo>
                {delivery.photoUrl && (
                  <Photo src={delivery.photoUrl} alt="Entrega" />
                )}
                {delivery.observation && (
                  <DeliveryInfo>
                    <strong>Observação:</strong> {delivery.observation}
                  </DeliveryInfo>
                )}

                {delivery.createdBy && (
                  <DeliveryInfo>
                    <strong>Recebido por:</strong> {delivery.createdBy.username}
                  </DeliveryInfo>
                )}
                <ModalButton onClick={() => setSelectedDelivery(delivery)}>
                  Editar
                </ModalButton>
              </DeliveryCard>
            ))}
          </DeliveryList>

          {selectedDelivery && (
            <EditDeliveryModal
              delivery={selectedDelivery}
              isOpen={!!selectedDelivery}
              onClose={() => setSelectedDelivery(null)}
              onSave={async (updated) => {
                try {
                  await api.put(`/deliveries/${selectedDelivery.id}`, {
                    apartment: updated.apartment,
                    observation: updated.observation
                  })

                  alert('Entrega atualizada com sucesso!')
                  fetchDeliveries()
                  setSelectedDelivery(null)
                } catch (error) {
                  console.error('Erro ao atualizar entrega:', error)
                  alert('Erro ao atualizar entrega.')
                }
              }}
            />
          )}
        </Container>
      </ContentContainer>
    </div>
  )
}

export default Deliveries
