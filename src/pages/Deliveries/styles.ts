import styled from 'styled-components'

export const Container = styled.main`
  padding: 20px;
  flex: 1;
`

export const Header = styled.div`
  margin-bottom: 24px;
`

export const Title = styled.h2`
  font-size: 24px;
  color: #333;
`

export const FilterGroup = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`

export const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
  flex: 1;
  min-width: 200px;
`

export const DeliveryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const DeliveryCard = styled.div`
  background-color: #fff;
  padding: 16px 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-left: 4px solid #007bff;
`

export const DeliveryInfo = styled.p`
  margin: 4px 0;
  color: #555;
  font-size: 15px;
`

export const Photo = styled.img`
  margin-top: 10px;
  max-width: 200px;
  border-radius: 4px;
  border: 1px solid #ccc;
`
export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
`
