import React, {useState, useCallback}from 'react'
import styles from './style'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { Main, Login, Signup, Myaccount, Admin, ReviewFormSubmission, FAQ } from './pages';
import CreateReview from './pages/CreateReview';
import CreateUniReview from './pages/CreateUniReview';
import ReviewInfo from './pages/ReviewInfo';
import SearchProfessorsPage from './pages/SearchProfessorsPage';
import UniReviewInfo from './pages/UniReviewInfo';

export const UserContext = React.createContext(null);

const App = () => {
  const [user, setUser] = useState(null);

  return (
      <BrowserRouter>
        <UserContext.Provider value={{ user: user, setUser: setUser }}>
          <Routes>  
            <Route path="/" element={<Main />} />
            <Route path="/search-professors" element={<SearchProfessorsPage />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/account" element={<Myaccount />}/>
            <Route path="/new-review" element={<CreateReview />}/>
            <Route path="/new-uni-review" element={<CreateUniReview />}/>
            <Route path="/review-info" element={<ReviewInfo />}/>
            <Route path="/uni-review-info" element={<UniReviewInfo />}/>
            <Route path="/admin" element={<Admin />}/>
            <Route path="/submit-form" element={<ReviewFormSubmission />}/>
            <Route path="/faq" element={<FAQ />}/>
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
  )
}

export default App