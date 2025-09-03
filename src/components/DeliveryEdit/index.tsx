import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { MdClose } from 'react-icons/md'

interface Resident {
  id: number
  name: string
  apartment: string
}

interface Delivery {
  id: number
  lockerNumber: number
  receivedAt: string
  photoUrl?: string
  observation?: string
  resident: Resident
}

interface DeliveryEditModalProps {
  isOpen: boolean
  onClose: () => void
  delivery: Delivery
  onSave: (updated: { apartment: string; observation: string }) => void
}
export const ModalButton = styled.button`
  background-color: #29298a;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 16px;

  &:hover {
    background-color: #191970;
  }
`
export const ModalHeader = styled.header`
  background-color: #f0f0f0;
  padding: 16px 20px;
  margin: -24px -24px 16px -24px; /* “cola” no topo e laterais do modal */
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  border-bottom: 1px solid #ccc;

  position: relative;
  display: flex;
  align-items: center;
  min-height: 56px; /* alvo confortável */

  h3 {
    margin: 0;
    font-size: 18px;
    line-height: 1.2;
    color: #333;
    font-weight: 600;
    padding-right: 48px; /* evita sobreposição com o X */
  }
`

export const CancelButton = styled.button`
  background-color: #ccc;
  color: #333;
  border: none;
  padding: 12px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  margin-left: 10px;
  margin-top: 16px;

  &:hover {
    background-color: #999;
  }
`

export const StyledInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  margin-top: 10px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  box-sizing: border-box;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const ModalContent = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 24px;
  max-width: 500px;
  width: 90%;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  position: relative;
`

const StyledTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical;
`
export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 12px;

  appearance: none;
  border: 0;
  background: transparent;
  cursor: pointer;

  width: 36px;
  height: 36px;
  border-radius: 8px;

  display: grid;
  place-items: center;

  color: #666;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:hover {
    background-color: #e9e9e9;
    color: #333;
  }
  &:focus-visible {
    outline: 2px solid #7aa7ff;
    outline-offset: 2px;
  }
`
const DeliveryEditModal: React.FC<DeliveryEditModalProps> = ({
  isOpen,
  onClose,
  delivery,
  onSave
}) => {
  const [apartment, setApartment] = useState('')
  const [observation, setObservation] = useState('')

  useEffect(() => {
    if (delivery) {
      setApartment(delivery.resident.apartment || '')
      setObservation(delivery.observation || '')
    }
  }, [delivery])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ apartment, observation })
  }

  const MdCloseIcon = MdClose as unknown as React.FC

  if (!isOpen) return null

  return (
    <ModalBackdrop onClick={onClose}>
      <ModalContent
        onClick={(e: { stopPropagation: () => any }) => e.stopPropagation()}
      >
        <ModalHeader>
          <h3>Editar Entrega</h3>

          <CloseButton aria-label="Fechar" title="Fechar" onClick={onClose}>
            <MdCloseIcon />
          </CloseButton>
        </ModalHeader>

        <form onSubmit={handleSubmit}>
          <StyledInput
            type="text"
            value={apartment}
            onChange={(e: {
              target: { value: React.SetStateAction<string> }
            }) => setApartment(e.target.value)}
            placeholder="Apartamento"
            required
          />
          <StyledTextarea
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder="Observações"
          />
          <ModalButton type="submit">Salvar Alterações</ModalButton>
          <CancelButton type="button" onClick={onClose}>
            Cancelar
          </CancelButton>
        </form>
      </ModalContent>
    </ModalBackdrop>
  )
}

export default DeliveryEditModal
