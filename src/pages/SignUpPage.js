import { Link } from "react-router-dom"
import styled from "styled-components"
import MyWalletLogo from "../components/MyWalletLogo"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { ThreeDots } from 'react-loader-spinner'

export default function SignUpPage() {
  const [confirmacaoSenha, setConfirmacaoSenha] = useState("")
  const [formData, setFormData] = useState({ name: "", email: "", password: "" })
  const [disabled, setDisabled] = useState(false)
  console.log(formData)

  const navigate = useNavigate()

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    if (formData.password !== confirmacaoSenha) {
      alert("As senhas devem ser iguais")
      return
    }

    const promisse = axios.post(`${process.env.REACT_APP_API_URL}/sign-up`, formData)
    setDisabled(true)
    promisse.then(() => {
      navigate("/")
      setDisabled(false)
    })
    promisse.catch((error) => {
      console.log(error)
      setDisabled(false)
      alert(error.response.data)
    })

  }

  return (
    <SingUpContainer>
      <form onSubmit={handleSubmit}>
        <MyWalletLogo />
        <input placeholder="Nome" type="text" name="name" value={formData.name} onChange={handleChange} />
        <input placeholder="E-mail" name="email" value={formData.email} onChange={handleChange} />
        <input placeholder="Senha" type="password" autocomplete="new-password" name="password" value={formData.password} onChange={handleChange} />
        <input placeholder="Confirme a senha" type="password" autocomplete="new-password" value={confirmacaoSenha} onChange={e => setConfirmacaoSenha(e.target.value)} required />
        <button type="submit" disabled={disabled}>{disabled ? <ThreeDots
          text
          height="30"
          width="80"
          radius="9"
          color="white"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClassName=""
          visible={true}
        /> : "Cadastrar"}</button>
      </form>

      <Link to="/">
        Já tem uma conta? Entre agora!
      </Link>
    </SingUpContainer>
  )
}

const SingUpContainer = styled.section`
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