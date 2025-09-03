import React, { useEffect, useState } from 'react'
import Sidebar from '../../components/Sidebar'
import api from '../../api/api'

import Navbar from '../../components/Navbar'
import {
  ContentContainer,
  Container,
  Header,
  Title,
  FilterGroup,
  Input,
  Select,
  TableContainer,
  Table,
  Th,
  Td,
  StatusTd,
  Photo,
  NoRecords
} from './styles'

interface DeliveryRecord {
  residentName: string
  apartment: string
  lockerNumber: string
  photoUrl?: string
  receivedAt: string | null
  collectedAt: string | null
  status: 'ACTIVE' | 'COLLECTED'
}

function History() {
  const [history, setHistory] = useState<DeliveryRecord[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('app_token')

    api
      .get('/history', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((res) => setHistory(res.data))
      .catch((err) => console.error('Erro ao buscar histórico:', err))
  }, [])

  const filtered = history.filter((item) => {
    const matchSearch =
      (item.residentName?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (item.apartment?.toLowerCase() || '').includes(search.toLowerCase())

    const matchStatus = statusFilter === '' || item.status === statusFilter

    return matchSearch && matchStatus
  })

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />

      <ContentContainer>
        <Navbar />
        <Container>
          <Header>
            <Title>Histórico de Encomendas</Title>
          </Header>

          <FilterGroup>
            <Input
              type="text"
              placeholder="Buscar por nome ou apartamento"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">Todos</option>
              <option value="ACTIVE">Ativas</option>
              <option value="COLLECTED">Coletadas</option>
            </Select>
          </FilterGroup>

          <TableContainer>
            <Table>
              <thead>
                <tr>
                  <Th>Nome</Th>
                  <Th>Apartamento</Th>
                  <Th>Locker</Th>
                  <Th>Recebida</Th>
                  <Th>Coletada</Th>
                  <Th>Status</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.length > 0 ? (
                  filtered.map((item, i) => (
                    <tr key={i}>
                      <Td>{item.residentName}</Td>
                      <Td>{item.apartment}</Td>
                      <Td>{item.lockerNumber}</Td>
                      <Td>
                        {item.receivedAt
                          ? new Date(item.receivedAt).toLocaleString()
                          : '-'}
                      </Td>
                      <Td>
                        {item.collectedAt
                          ? new Date(item.collectedAt).toLocaleString()
                          : '-'}
                      </Td>
                      <StatusTd status={item.status}>
                        {item.status === 'ACTIVE' ? 'Ativa' : 'Coletada'}
                      </StatusTd>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <Td colSpan={7}>
                      <NoRecords>Nenhum registro encontrado.</NoRecords>
                    </Td>
                  </tr>
                )}
              </tbody>
            </Table>
          </TableContainer>
        </Container>
      </ContentContainer>
    </div>
  )
}

export default History
