import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import AuthContext from "../contexts/AuthContext.jsx";
import axios from "axios";
import Transaction from "./Transaction.jsx";



export default function Transactions() {

  const { authToken } = useContext(AuthContext);
  const [transacoes, setTransacoes] = useState([])
  const [saldo, setSaldo] = useState(0)

  function formatarNumero(numero) {
    return numero.toFixed(2).replace('.', ',');
  }

  useEffect(() => {
    const config = {
      headers: {
        "Authorization": `Bearer ${authToken}`
      }
    }


    const requisicao = axios.get(`${process.env.REACT_APP_API_URL}/transacoes`, config);

    requisicao.then(resposta => {
      setTransacoes(resposta.data.reverse());
      let saldoAtual = 0
      for (let i = 0; i < resposta.data.length; i++) {
        if (resposta.data[i].type === "entrada") {
          saldoAtual = saldoAtual + resposta.data[i].value
        }
        else if (resposta.data[i].type === "saida") {
          saldoAtual = saldoAtual - resposta.data[i].value
        }
      }
      setSaldo(saldoAtual)
    });
  });

  return (
    <TransactionsContainer>
      <ul>
        {transacoes.map(transacao => (
          <Transaction
            value={transacao.value}
            description={transacao.description}
            date={transacao.date}
            type={transacao.type}
          />
        ))}
      </ul>

      <article>
        <strong>Saldo</strong>
        <Value saldo={saldo}>{formatarNumero(saldo)}</Value>
      </article>
    </TransactionsContainer>
  )
}


const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
  ul{
    max-height: 90%;
    overflow-y: auto;
  }
`

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.saldo >= 0 ? "green" : "red")};
`