import React, { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'

import { FaPlus, FaPlusCircle, FaUserCircle } from 'react-icons/fa'
const Nav = styled.nav`
  color: black;
  padding: 16px 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  ProfileIconn {
    color: #000;
  }
`

const ProfileIcon = styled.div`
  cursor: pointer;
  font-size: 24px;
  position: relative;
  color: #000;
`

const DropdownMenu = styled.ul`
  position: absolute;
  top: 60px;
  right: 24px;
  background: white;
  border-radius: 6px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.15);
  list-style: none;
  padding: 0;
  margin: 0;
  z-index: 10;
  width: 220px;
`

const DropdownItem = styled.li`
  padding: 12px 16px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
  color: #333;
  &:hover {
    background-color: #f5f5f5;
  }
  &:last-child {
    border-bottom: none;
  }
`

function Navbar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
  const FaUserIconn = FaUserCircle as unknown as React.FC
  const handleNavigate = (tab: string) => {
    navigate(`/profile?tab=${tab}`)
    setOpen(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('app_token')
    navigate('/login')
  }

  return (
    <Nav>
      <div ref={menuRef}>
        <ProfileIcon onClick={() => setOpen(!open)}>
          <FaUserIconn />
        </ProfileIcon>
        {open && (
          <DropdownMenu>
            <DropdownItem onClick={() => handleNavigate('profile')}>
              Perfil
            </DropdownItem>
            <DropdownItem onClick={() => handleNavigate('employees')}>
              Funcionários
            </DropdownItem>
            <DropdownItem onClick={() => handleNavigate('register')}>
              Cadastrar Funcionário
            </DropdownItem>
            <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
          </DropdownMenu>
        )}
      </div>
    </Nav>
  )
}

export default Navbar
