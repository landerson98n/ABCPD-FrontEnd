import styled from 'styled-components'

export const Container = styled.div`
  width: 100%;
  background-color: white;
  display: none;
  padding: 1vw;
  justify-content: center;
  align-items: center;
  @page {
    size: landscape;
  }
  @media print {
    display: block;
  }
`

export const Border = styled.div`
  width: 92%;
  background-color: white;
  height: 80vh;
  border: solid 4px black;
  display: flex;
  justify-content: start;
  align-items: start;
  flex-direction: column;
  padding: 5vw;
`
