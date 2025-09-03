import styled from 'styled-components'

export const PageContainer = styled.div`
  display: flex;
`

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
`

export const MainContent = styled.div`
  flex: 1;
  padding: 40px;
  background-color: #f9f9f9;
`

export const Tabs = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
`

export const Tab = styled.button<{ active: boolean }>`
  background: ${({ active }) => (active ? '#007bff' : '#e0e0e0')};
  color: ${({ active }) => (active ? '#fff' : '#333')};
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
`

export const Section = styled.div`
  background: white;
  padding: 30px;
  border-radius: 8px;
  max-width: 1000px;
  margin: auto;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.06);
`

export const Title = styled.h2`
  margin-bottom: 30px;
`

export const FormRow = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`

export const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 6px;
`

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  width: 100%;
`

export const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 25px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  margin-right: 10px;

  &:hover {
    background-color: #0056b3;
  }
`

export const Card = styled.div`
  border-left: 4px solid #007bff;
  background: #fff;
  padding: 16px;
  margin-bottom: 16px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`

export const DeleteButton = styled.button`
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-weight: bold;
  cursor: pointer;
  float: right;
`
