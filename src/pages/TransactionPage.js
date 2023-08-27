import styled from "styled-components"
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import AuthContext from "../contexts/AuthContext";
import { ThreeDots } from 'react-loader-spinner'

export default function TransactionsPage() {

  const { tipo } = useParams();
  const [formData, setFormData] = useState({ value: "", description: "" })
  const { authToken } = useContext(AuthContext);
  const [disabled, setDisabled] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (authToken === null) {
      navigate("/")
    }
  });

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  function handleSubmit(e) {
    e.preventDefault()

    const config = {
      headers: {
        "Authorization": `Bearer ${authToken}`
      }
    }

    const promisse = axios.post(`${process.env.REACT_APP_API_URL}/nova-transacao/${tipo}`, { value: Number(formData.value), description: formData.description }, config)
    setDisabled(true)

    promisse.then(() => {
      navigate("/home")
      setDisabled(false)
    })
    promisse.catch((error) => {
      setDisabled(false)
      alert(error.response.data)
    })

  }

  return (
    <TransactionsContainer>
      <h1>Nova {tipo}</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Valor" type="number" name="value" value={formData.value} onChange={handleChange} required />
        <input placeholder="Descrição" type="text" name="description" value={formData.description} onChange={handleChange} required />
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
        /> : `Salvar ${tipo}`}</button>
      </form>
    </TransactionsContainer>
  )
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
  button{
    display: flex;
    justify-content: center;
    align-items: center;
  }
`