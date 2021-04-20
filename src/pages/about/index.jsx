import React, { useState } from 'react'
import {Button,Input,Checkbox,Select} from 'antd'
import {
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
  useSetRecoilState
} from 'recoil';
import { 
  todoListState,
  todoListFilterState,
  filteredTodoListState,
  todoListCountState
 } from '@/store/todoListState';

const { Option } = Select; 
const  TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);

  const addItem = () => {
    setTodoList((oldTodoList) => [
      ...oldTodoList,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ]);
    setInputValue('');
  };

  const onChange = ({target: {value}}) => {
    setInputValue(value);
  };

  return (
    <div>
      <Input 
        type="text" 
        value={inputValue} 
        onChange={onChange} 
        style={{width: 200,marginRight: 5}} 
        placeholder="请输入待办事项"
      />
      <Button type="primary" onClick={addItem}>Add</Button>
    </div>
  );
}

// utility for creating unique Id
let id = 0;
const getId = () => {
  return id++;
}


function TodoItem({item}) {
  const [todoList, setTodoList] = useRecoilState(todoListState);
  const index = todoList.findIndex((listItem) => listItem === item);

  const editItemText = ({target: {value}}) => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      text: value,
    });

    setTodoList(newList);
  };

  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, index, {
      ...item,
      isComplete: !item.isComplete,
    });

    setTodoList(newList);
  };

  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, index);

    setTodoList(newList);
  };

  return (
    <div>
      <Input type="text" value={item.text} onChange={editItemText} style={{width:200}}/>
      <Checkbox 
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <Button onClick={deleteItem}>X</Button>
    </div>
  );
}

function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)];
}


function TodoListFilters() {
  const [filter, setFilter] = useRecoilState(todoListFilterState);

  const updateFilter = ({target:{value}}) => {
    setFilter(value);
  };

  return (
    <>
      筛选:
      <select value={filter} onChange={updateFilter}>
        <option value="all" >全部</option>
        <option value="completed">已完成</option>
        <option value="uncompleted">未完成</option>
      </select>
    </>
  );
}

function TodoListStats() {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted,
  } = useRecoilValue(todoListCountState);

  const formattedPercentCompleted = Math.round(percentCompleted * 100);

  return (
    <ul>
      <li>Total items: {totalNum}</li>
      <li>Items completed: {totalCompletedNum}</li>
      <li>Items not completed: {totalUncompletedNum}</li>
      <li>Percent completed: {formattedPercentCompleted}%</li>
    </ul>
  );
}

const About = () => {

  const [count, setCount] = useState(0)
  const todoList = useRecoilValue(filteredTodoListState);
  const clickHandle = () => setCount((pre)=> pre + 1);

  return (
    <div className="about">
      <header className="about-header">
        我是about
      </header>
      <main>
          {count}
          <div>
            <Button type="dashed" onClick={clickHandle}>++</Button>
          </div>
          <div>
            <TodoListStats />
            <TodoListFilters />
            <TodoItemCreator />

            {todoList.map((todoItem,index) => (
              <TodoItem key={todoItem.id} item={todoItem}/>
            ))} 
          </div>
      </main>
      <footer></footer>
    </div>
  )
}

export default About
