"use client";

import styled from "styled-components";

export const InputPlace = styled.div`
  width: 90%;
`;

export const Container = styled.div`
  @media print {
    display: none;
  }
  overflow-y: scroll;
`;

export const InputText = styled.input`
  width: 100%;
  height: 4vw;
  background-color: white;
  border: solid 1px #9e4b00;
  font-size: 1.3vw;
  padding-left: 1vw;
  outline: none;
  display: flex;
`;

export const InputPair = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
