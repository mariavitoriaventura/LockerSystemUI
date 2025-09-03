import { createGlobalStyle } from 'styled-components'

export const Colors = {
  white: '#FFF',
  ligthWhite: '#F5F5F5',
  ligthOrgange: '#FFF8F2',
  ligthYellow: '#FFEBD9',
  darkYellow: '#ffcfa3',
  red: '#E66767'
}

export const breakpoints = {
  desktop: '1024px',
  tablet: '768px'
}

export const GlobalCss = createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: Roboto, sans-serif;
  }

  body{
    background-color: ${Colors.ligthWhite};

  }

  .container{
    max-width: 1024px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    justify-content: center;

    @media (max-width: ${breakpoints.desktop}) {
      max-width: 80%;
    }
  }
`
