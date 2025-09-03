import React, { useState, useEffect } from 'react'
import api from '../../api/api'
import { Resident } from '../../models/Resident'

function Residents() {
  const [residents, setResidents] = useState<Resident[]>([])

  useEffect(() => {
    api
      .get('/residents')
      .then((response: { data: React.SetStateAction<Resident[]> }) => {
        console.log('API DATA:', response.data)
        setResidents(response.data)
      })
      .catch((error: any) => console.error('Erro ao buscar moradores:', error))
  }, [])

  console.log(residents)
  return (
    <div>
      <h1>Moradores</h1>
      <ul>
        {residents.map((resident) => (
          <li key={resident.id}>
            {resident.name} - {resident.apartment}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Residents
