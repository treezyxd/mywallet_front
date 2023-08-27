import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage.jsx"
import SignInPage from "./pages/SignInPage.jsx"
import SignUpPage from "./pages/SignUpPage.jsx"
import TransactionsPage from "./pages/TransactionPage.jsx"
import AuthContext from "./contexts/AuthContext.jsx"
import { useState } from "react"

export default function App() {
  const [authToken, setAuthToken] = useState(null);
  const [username, setUsername] = useState(null);

  return (
    <AuthContext.Provider value={{ authToken, setAuthToken, username, setUsername }}>
      <PagesContainer>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignInPage />} />
            <Route path="/cadastro" element={<SignUpPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
          </Routes>
        </BrowserRouter>
      </PagesContainer>
    </AuthContext.Provider>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`