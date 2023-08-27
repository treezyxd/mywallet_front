import styled from "styled-components"
import { Link } from "react-router-dom"
import MyWalletLogo from "../components/MyWalletLogo.jsx"
import { useNavigate } from "react-router-dom";
import AuthContext from "../contexts/AuthContext.jsx";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { ThreeDots } from 'react-loader-spinner'

export default function SignInPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [disabled, setDisabled] = useState(false)
  const { setUsername, setAuthToken } = useContext(AuthContext);

  useEffect(verificarSessao);

  function verificarSessao() {
    const token = localStorage.getItem("token");
    const name = localStorage.getItem("name");
    if (token && name) {
      setAuthToken(token)
      setUsername(name)
      navigate("/home")
    }
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault()

    const promisse = axios.post(`${process.env.REACT_APP_API_URL}/sign-in`, formData)
    setDisabled(true)

    promisse.then((res) => {
      console.log(res)
      setAuthToken(res.data.token)
      setUsername(res.data.name)
      navigate("/home")
      localStorage.setItem("token", `${res.data.token}`);
      localStorage.setItem("name", `${res.data.name}`);
      setDisabled(false)
    })
    promisse.catch((error) => {
      setDisabled(false)
      alert(error.response.data)
    })
  }

  return (
    <SingInContainer>
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input placeholder="E-mail" type="email" name="email" onChange={handleChange} value={formData.email} required />
        <input placeholder="Senha" type="password" name="password" autocomplete="new-password" onChange={handleChange} value={formData.password} required />
        <button type="submit" disabled={disabled} >{disabled ? <ThreeDots
          text
          height="30"
          width="80"
          radius="9"
          color="white"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        /> : "Entrar"}</button>
      </form>

      <Link to="/cadastro">
        Primeira vez? Cadastre-se!
      </Link>
    </SingInContainer >
  )
}

const SingInContainer = styled.section`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button{
    display: flex;
    justify-content: center;
    align-items: center;
  }
  a{
    margin-top: 10px;
  }
`