import { useState, useCallback } from 'react';
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
  const [todoList, setTodoList] = useState(todoTest);

  const setTodo = useCallback(
    (value, index) => {
      const mapped = todoList.map((val, idx) =>
        idx !== index ? val : { id: val.id, text: value }
      );

      setTodoList(mapped);
    },
    [todoList]
  );

  const swapTodos = useCallback(
    (start, end) => {
      const mapped = todoList.map((val, idx, arr) => {
        if (idx === start) {
          return arr[end];
        }
        if (idx === end) {
          return arr[start];
        }
        return val;
      });
      setTodoList(mapped);
    },
    [todoList]
  );

  const renderBox = useCallback(() => {
    if (todoList.length === 0) {
      return null;
    }

    return todoList.map(({ id, text }, idx) => (
      <Box key={id} index={idx} value={text} onChange={setTodo} onSwap={swapTodos} />
    ));
  }, [todoList, setTodo, swapTodos]);

  return (
    <Container>
      <Draggable>{renderBox()}</Draggable>
    </Container>
  );
}

export default App;

const Container = styled.div`
  height: 100vh;
  padding: 10px;
  background-color: black;
`;
