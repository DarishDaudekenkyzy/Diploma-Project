import React from 'react'
import styles from './style'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Main, Login, Signup } from './pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App