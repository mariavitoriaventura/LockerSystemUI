import styled from 'styled-components'

export const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  margin-top: 20px;
`

export const LockerGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 10px;
  max-width: 800px;
  margin: auto;
`

export const LockerBox = styled.div<{ status: 'FREE' | 'OCCUPIED' }>`
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 15px;
  text-align: center;
  background-color: ${(props) =>
    props.status === 'OCCUPIED' ? '#5b80b1ff' : '#B0C4DE'};
  color: ${(props) => (props.status === 'OCCUPIED' ? '#fff' : '#778899')};
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.05);
  }
`

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ModalContent = styled.div`
  background: white;
  padding: 50px;
  border-radius: 10px;

  max-width: calc(100vw - 48px);
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.25);
`
export const ModalHeader = styled.header`
  background-color: #f0f0f0;
  padding: 20px 24px;
  margin: -50px -50px 20px -50px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid #ccc;

  /* garante que o X posicionado absoluto se baseie no header */
  position: relative;

  /* evita quebra de linha do título e centraliza verticalmente */
  display: flex;
  align-items: center;
  min-height: 56px; /* altura confortável pro alvo de toque */

  h3 {
    margin: 0;
    font-size: 18px;
    line-height: 1.2; /* evita “empurrar” o X pra baixo */
    color: #333;
    font-weight: 600;
    padding-right: 48px; /* reserva espaço para o X */
  }
`
export const ModalContentDetails = styled.div`
  background-color: #f5f5f5;
  padding: 30px;
  margin-top: 20px;
`
export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
`
export const ModalButton = styled.button`
  background-color: #29298a;
  color: white;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 10px;
  margin-right: 10px;

  &:hover {
    background-color: #191970;
  }
`

export const CancelButton = styled(ModalButton)`
  background-color: #e0e0e0;
  color: #333;

  &:hover {
    background-color: #cfcfcf;
  }
`
export const StyledInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  box-sizing: border-box; /* <-- impede overflow */
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`

export const StyledTextarea = styled.textarea`
  width: 100%;
  min-height: 90px;
  padding: 10px 12px;
  margin-top: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  resize: vertical;
  box-sizing: border-box;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`

export const LockNumberTitle = styled.h2``

export const FormContent = styled.div`
  margin-top: 20px;
`
export const ErrorText = styled.p`
  color: #d32f2f;
  min-height: 1.2em;

  overflow-wrap: anywhere;
`
export const ErrorBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: #d32f2f1a;
  padding: 12px;
  border-radius: 10px;
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
