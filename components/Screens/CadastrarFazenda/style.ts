"use client";

import styled from "styled-components";
import {motion} from "framer-motion";

export const Container = styled.div`
  width: 100%;
  height: 260vw;
  background-color: #e0e0e0;
  flex-direction: column;
  overflow: hidden;
`;

export const GreenBackground = styled.div`
  width: 100%;
  height: 30vw;
  background-color: #9e4b00;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const RegisterPainel = styled.div`
  width: 100%;
  height: 50vw;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
`;

export const WhiteBackground = styled.div`
  width: 80%;
  height: 70vw;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-left-radius: 0.5vw;
  border-top-right-radius: 0.5vw;
  padding-left: 5vw;
  padding-right: 5vw;
  padding-bottom: 7vw;
`;

export const Title = styled.div`
  width: 100%;
  margin-top: 6vw;
`;

export const Input = styled.input`
  width: 100%;
  height: 4vw;
  background-color: white;
  border-radius: 0.5vw;
  font-size: 1.3vw;
  padding-left: 1vw;
  outline: none;
  display: flex;
`;

export const InputData = styled.div`
  width: 100%;
`;

export const TextBox = styled.textarea`
  width: 60%;
  height: 10vw;
`;

export const TitleContent = styled.div`
  width: 55%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const Content = styled.div`
  width: 100%;
  margin-top: 40vw;
`;
export const ScreenOne = styled(motion.form)`
  width: 100%;
  margin-top: -25vw;
  position: absolute;
`;

export const ScreenTwo = styled(motion.form)`
  width: 100%;
  margin-top: -15vw;
  position: absolute;
`;

export const ScreenThree = styled(motion.form)`
  width: 100%;
  margin-top: 40vw;
  position: absolute;
`;

export const InputPlace = styled.div`
  width: 45%;
`;

export const InputPair = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ButtonPanel = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 10vw;
  margin-top: 23.7vw;
`;
export const GrayBackground = styled.div`
  width: 90%;
  height: 20vw;
  background-color: #d6d6d6;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0.1vw 0.1vw 0.6vw #d6d6d6;
  border-bottom-left-radius: 0.5vw;
  border-bottom-right-radius: 0.5vw;
`;
export const Payment = styled(motion.div)`
  width: 100%;
  margin-top: 35vw;
  position: absolute;
`;
export const CreditCard = styled.div`
  width: 100%;
  margin-bottom: 1vw;
  display: flex;
`;
