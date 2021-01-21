import { useState, useCallback, useRef } from 'react';
import styled from 'styled-components';

import Draggable from './components/draggable';
import Box from './components/box';

const todoTest = [
  {
    id: '0',
    text: '코딩하기',
  },
  {
    id: '1',
    text: '책 읽기',
  },
  {
    id: '2',
    text: '일기 쓰기',
  },
  {
    id: '3',
    text: '병원 예약하기',
  },
  {
    id: '4',
    text: '장 보러 가기',
  },
];

function App() {
  return (
    <Container>
      <Draggable list={todoTest} />
    </Container>
  );
}

export default App;

const Container = styled.div`
  height: 100vh;
  padding: 10px;
  background-color: black;
`;
