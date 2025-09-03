import React from 'react'
import Sidebar from '../../components/Sidebar'
import LockersDashboard from '../../components/LocckerDashboard'
import { styled } from 'styled-components'
import Navbar from '../../components/Navbar'
const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100vh;
`
function Dashboard() {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <ContentContainer>
        <Navbar />
        <main style={{ padding: '20px', flex: 1 }}>
          <LockersDashboard />
        </main>
      </ContentContainer>
    </div>
  )
}

export default Dashboard
