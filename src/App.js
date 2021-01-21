import { useCallback, useState } from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';

import Draggable from './components/draggable';
import Header from './components/header';

const todoTest = [
  {
    id: uuidv4(),
    text: '코딩하기',
  },
  {
    id: uuidv4(),
    text: '책 읽기',
  },
  {
    id: uuidv4(),
    text: '일기 쓰기',
  },
  {
    id: uuidv4(),
    text: '병원 예약하기',
  },
  {
    id: uuidv4(),
    text: '장 보러 가기',
  },
];

function App() {
  const [todoList, setTodoList] = useState(todoTest);

  const handleCreate = useCallback(() => {
    const lastOne = todoList[todoList.length - 1];

    if (lastOne?.text?.trim() !== '') {
      setTodoList([...todoList, { id: uuidv4(), text: ' ' }]);
    }
  }, [todoList]);

  return (
    <Container>
      <Header title={'TODO'} onRightClick={handleCreate} />
      <Draggable list={todoList} setList={setTodoList} />
    </Container>
  );
}

export default App;

const Container = styled.div`
  height: 100vh;
  padding: 10px;
  background-color: black;
`;
