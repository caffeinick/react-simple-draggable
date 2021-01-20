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
  const [todoList, setTodoList] = useState(todoTest);
  const startIndex = useRef(-1);

  const setTodo = useCallback(
    (value, index) => {
      const mapped = todoList.map((val, idx) =>
        idx !== index ? val : { id: val.id, text: value }
      );

      setTodoList(mapped);
    },
    [todoList]
  );

  const handleStart = useCallback((index) => {
    startIndex.current = index;
  }, []);

  const handleEnd = useCallback((index) => {
    startIndex.current = -1;
  }, []);

  const swapTodos = useCallback(
    (index) => {
      console.log(startIndex, index);

      const { reducedList } = todoList.reduce(
        (prev, cur, idx, arr) => {
          if (idx === startIndex.current) {
            return prev;
          }

          if (idx === index) {
            prev.reducedList.push(arr[startIndex.current]);
            return prev;
          }

          prev.reducedList.push(cur);
          return prev;
        },
        { reducedList: [] }
      );

      setTodoList(reducedList);
    },
    [todoList]
  );

  const insertSpace = useCallback(
    (index) => {
      console.log(`from ${startIndex.current} to ${index}`);

      if (index === startIndex.current || index === startIndex.current + 1) {
        return;
      }

      if (todoList[index].isSpace) {
        return;
      }

      const filtered = todoList.filter((todo) => !todo.isSpace);

      const front = filtered.slice(0, index);
      const back = filtered.slice(index);

      console.log(filtered.length, todoList.length);
      if (index < startIndex.current) {
        startIndex.current += 1;
      } else if (filtered.length < todoList.length) {
        startIndex.current += 1;
      }

      setTodoList([...front, { id: '123123', text: '', isSpace: true }, ...back]);
    },
    [todoList]
  );

  const renderBox = useCallback(() => {
    if (todoList.length === 0) {
      return null;
    }

    return todoList.map(({ id, text }, idx) => (
      <Box
        key={id}
        index={idx}
        value={text}
        onChange={setTodo}
        onSwap={swapTodos}
        onSpace={insertSpace}
        onStart={handleStart}
        onEnd={handleEnd}
      />
    ));
  }, [todoList, setTodo, swapTodos, insertSpace, handleStart, handleEnd]);

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
