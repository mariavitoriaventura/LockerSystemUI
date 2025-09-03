import styled from 'styled-components'

export const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
`

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

export const Select = styled.select`
  padding: 10px;
  font-size: 16px;
  border-radius: 6px;
  border: 1px solid #ccc;
`

export const TableContainer = styled.div`
  overflow-x: auto;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

export const Th = styled.th`
  background-color: #f3f4f6;
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  color: #555;
`

export const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  color: #555;
`

export const StatusTd = styled(Td)<{ status: string }>`
  color: ${({ status }) => (status === 'ACTIVE' ? '#ca8a04' : '#16a34a')};
  font-weight: 600;
`

export const Photo = styled.img`
  height: 48px;
  border-radius: 4px;
  object-fit: cover;
  margin: 0 auto;
`

export const NoRecords = styled.p`
  text-align: center;
  margin-top: 1rem;
  color: #777;
`
