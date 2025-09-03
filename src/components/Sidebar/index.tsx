import React from 'react'
import { NavLink } from 'react-router-dom'
import { Aside, List, ListItem, StyledNavLink, Title } from './styles'

const Sidebar = () => {
  return (
    <Aside>
      <Title>Menu</Title>
      <List>
        <ListItem>
          <StyledNavLink to="/dashboard">Dashboard</StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink to="/residents">Moradores</StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink to="/deliveries">Encomendas</StyledNavLink>
        </ListItem>
        <ListItem>
          <StyledNavLink to="/history">Histórico</StyledNavLink>
        </ListItem>
      </List>
    </Aside>
  )
}

export default Sidebar
