import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import Transactions from "../components/Transactions"
import { useContext, useEffect } from "react"
import AuthContext from "../contexts/AuthContext"
import ButtonsAddTransaction from "../components/ButtonsAddTransaction"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function HomePage() {

  const { setAuthToken, authToken, setUsername, username } = useContext(AuthContext);
  const navigate = useNavigate()
  console.log(authToken)


  useEffect(() => {
    if (authToken === null) {
      navigate("/")
    }
  });

  function logOut() {

    const config = {
      headers: {
        "Authorization": `Bearer ${authToken}`
      }
    }

    const promisse = axios.post(`${process.env.REACT_APP_API_URL}/logout`, {}, config);

    promisse.then(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("name")
      setAuthToken(null)
      setUsername(null)
      navigate("/")
    })
    promisse.catch((error) => {
      alert(error.response.data)
    })

  }

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {username}</h1>
        <BiExit onClick={logOut} />
      </Header>

      <Transactions />

      <ButtonsAddTransaction />

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`