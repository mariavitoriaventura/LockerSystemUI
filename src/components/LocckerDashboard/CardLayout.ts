import styled from 'styled-components'

export const CardContainer = styled.div`
  background: #fff;
  border-radius: 12px;

  width: 480px;
`

export const SectionTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 20px;
`

export const Description = styled.p`
  background-color: #f5f7fa;
  padding: 24px;
  border-radius: 8px;
  font-size: 15px;
  margin-bottom: 20px;
`

export const ProgressBar = styled.div`
  background-color: #eee;
  border-radius: 8px;
  height: 10px;
  margin: 8px 0;
  overflow: hidden;
`

export const ProgressFill = styled.div<{ percent: number }>`
  height: 100%;
  background-color: #e53935;
  width: ${({ percent }) => percent}%;
  transition: width 0.3s ease;
`

export const DetailItem = styled.p`
  margin: 6px 0;
  font-size: 15px;
  strong {
    font-weight: 600;
  }
`

export const PriorityBadge = styled.span<{ level: string }>`
  color: ${({ level }) => (level === 'High' ? 'orange' : '#444')};
  font-weight: 600;
`
export const DetailsBox = styled.div`
  padding: 0px;
  border-radius: 8px;
  margin-top: 10px;
`

export const DetailRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 10px;
    font-size: 15px;
    border: 1px solid #e0e0e0;
    margin-bottom: 10px;
    background-color: #f5f7fa;
    border-radius: 5px;
}

 

`
