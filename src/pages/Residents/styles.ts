import styled from 'styled-components'
export const ActionsContainer = styled.div`
  position: absolute;
  top: 12px;
  right: 16px;
  display: flex;
  gap: 10px;
`

export const ActionButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #007bff;
  font-size: 16px;

  &:hover {
    color: #0056b3;
  }
`
export const Container = styled.main`
  padding: 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
`

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`

export const ResidentName = styled.h4`
  font-size: 18px;
  margin-bottom: 8px;
  color: #333;
`

export const ResidentInfo = styled.p`
  margin: 2px 0;
  color: #555;
  font-size: 15px;
`

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
`
export const ResidentList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: 70vh;
  overflow-y: auto;
  padding-right: 8px;
`

export const ResidentCard = styled.div`
  position: relative; /* Necessário para posicionar os ícones absolutos */
  background-color: #fff;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #007bff;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1);
  }
`

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`

export const ModalContent = styled.div`
  background-color: white;
  padding: 30px 25px;
  border-radius: 10px;
  width: 100%;
  max-width: 400px;
  position: relative;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
  overflow: hidden; /* recorta o header no raio do modal */
`

export const CloseButton = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: none;
  border: none;
  font-size: 18px;
  cursor: pointer;
  color: #888;
  transition: color 0.2s ease;

  &:hover {
    color: #444;
  }
`

export const Button = styled.button`
  padding: 10px 16px;
  background-color: #007bff;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s ease;
  margin-right: 20px;

  &:hover {
    background-color: #0056b3;
  }
`

export const ButtonCancelar = styled.button`
  padding: 10px 16px;
  background-color: #b0c4de;
  color: white;
  font-size: 14px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgb(154, 169, 187);
  }
`

export const ModalHeader = styled.header`
  background-color: #f0f0f0;
  padding: 16px 10px;
  /* use as MESMAS medidas do padding do ModalContent: top=30, sides=25 */
  margin: -30px -25px 16px -25px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border-bottom: 1px solid #ccc;

  position: relative;
  display: flex;
  align-items: center;
  min-height: 56px;

  h3 {
    margin: 0;
    font-size: 18px;
    line-height: 1.2;
    color: #333;
    font-weight: 600;
    padding-right: 48px; /* espaço pro X */
  }
`

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
`
export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`
export const Title = styled.h2`
  font-size: 24px;
  color: #333;
`

export const FilterInput = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
  width: 100%;
`
export const ModalContentTitle = styled.div`
  margin-bottom: 20px;
`

export const ModalContentBody = styled.div`
  margin-bottom: 20px;
`

export const ModalContentButton = styled.div`
  display: flex;
  justify-content: right;
`
export const DangerButton = styled(Button)`
  background-color: #dc3545;

  &:hover {
    background-color: #b02a37;
  }
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

export const ButtonSubmit = styled(ModalButton)`
  background-color: #007bff;
  color: #fff;

  &:hover {
    background-color: #0056b3;
  }
`
export const ButtonArea = styled.div`
  display: flex;
`
