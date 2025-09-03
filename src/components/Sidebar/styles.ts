import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

export const Aside = styled.aside`
  width: 200px;
  background: rgba(19, 28, 80, 1);
  padding: 20px;
  height: 100vh;
  box-shadow: 4px 0 8px rgba(93, 80, 124, 0.1);
  color: #fff;
`
export const Title = styled.h2`
  margin-bottom: 50px;
`
export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`

export const ListItem = styled.li`
  margin-bottom: 12px;
`

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #fff;
  display: block;
  padding: 10px 15px;
  border-left: 4px solid transparent;
  transition: all 0.2s ease-in-out;

  &.active {
    border-left: 4px solid #b0c4de;
    background-color: #ffffff70;
    font-weight: bold;
  }

  &:hover {
    background-color: #b0c4de70;
  }
`
