import { Provider } from 'react-redux'
import React from 'react'
import { GlobalCss } from './styles'
import { BrowserRouter } from 'react-router-dom'

import RoutesMain from './routes'

function App() {
  return (
    // <Provider store={undefined} children={undefined}>
    <BrowserRouter>
      <GlobalCss />
      <div className=""> </div>
      <RoutesMain />
    </BrowserRouter>
    // </Provider>
  )
}

export default App
