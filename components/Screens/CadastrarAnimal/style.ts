"use client";

import styled from "styled-components";

export const Container = styled.form`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
`;
export const InputPair = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;
export const InputPlace = styled.div`
  width: 90%;
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
export const SelectBox = styled.select`
  width: 100%;
  height: 4vw;
  background-color: white;
  border-radius: 0.5vw;
  border: solid 1px #9e4b00;
  font-size: 1.7vw;
  padding-left: 1vw;
  overflow-y: scroll;
`;
