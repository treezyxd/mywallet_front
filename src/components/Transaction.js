import styled from "styled-components"

export default function Transaction(props) {

    function formatarNumero(numero) {
        return numero.toFixed(2).replace('.', ',');
    }

    return (
        <ListItemContainer>
            <div>
                <span>{props.date}</span>
                <strong>{props.description}</strong>
            </div>
            <Value color={props.type}>{formatarNumero(props.value)}</Value>
        </ListItemContainer>
    )
}

const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "entrada" ? "green" : "red")};
`

const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`