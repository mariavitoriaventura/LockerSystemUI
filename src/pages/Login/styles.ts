import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
`

export const LoginBox = styled.div`
  background: white;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
`

export const Title = styled.h1`
  margin-bottom: 24px;
  text-align: center;
  font-size: 28px;
  color: #333;
`

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  padding-right: 40px;
  margin-bottom: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  font-size: 16px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`

export const InputWrapper = styled.div`
  position: relative;
`

export const EyeIcon = styled.div`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #888;
`

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`

export const ErrorMessage = styled.p`
  color: red;
  margin-top: 10px;
  text-align: center;
`
