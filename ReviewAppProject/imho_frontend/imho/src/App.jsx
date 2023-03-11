import React, {useState, useCallback}from 'react'
import styles from './style'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Main, Login, Signup, Myaccount } from './pages';
import SearchPage from './pages/SearchPage';
// import CreateReview from './pages/CreateReview';

export const UserContext = React.createContext(null);

const App = () => {
  const [user, setUser] = useState(null);

  return (
      <BrowserRouter>
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
          <Routes>  
            <Route path="/" element={<Main />} />
            <Route path="/search/:searchInput" element={<SearchPage />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Myaccount />}/>
            {/* <Route path="/new-review" element={<CreateReview />}/> */}
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
  )
}

export default App