import React, { useEffect, useState } from 'react'
import { Button,Input,Checkbox } from 'antd'
import {useHistory} from 'react-router-dom'
import { useTodoListStateModel,IlistItem } from '@/store/useCountModel'


let id = 0;
const getId = () => {
  return id++;
}
const  TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState('');
  const listState = useTodoListStateModel();

  const addItem = () => {
    listState.addItem({
      id: getId(),
      text: inputValue,
      isComplete: false,
    })
    setInputValue('');
  }
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

function TodoItem({item}) {
  const listModel = useTodoListStateModel();
  const index = listModel.list.findIndex((listItem:IlistItem) => listItem === item);

  const editItemText = ({target: {value}}) => {
    listModel.editItem(index,{
      ...item,
      text: value,
    })
  }

  const toggleItemCompletion = () => {
    listModel.editItem(index,{
      ...item,
      isComplete: !item.isComplete,
    })
  }

  const deleteItem = () => {
    listModel.deleteItem(index);
  };

  useEffect(()=>{
    return ()=>{

    }
  },[])
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

function TodoListFilters() {
  const listModel = useTodoListStateModel();

  const updateFilter = ({target:{value}}) => {
    listModel.getFilterList(value);
  };

  return (
    <>
      筛选:
      <select defaultValue="all" onChange={updateFilter}>
        <option value="all" >全部</option>
        <option value="completed">已完成</option>
        <option value="uncompleted">未完成</option>
      </select>
    </>
  );
}

function TodoListStats() {
  const listModel = useTodoListStateModel();
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted
  } = listModel.dataCounter;

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

function Index() {
  const [count, setCount] = useState()
  const todoList = useTodoListStateModel();
  const history = useHistory();
  return (
    <div className="about">
      <header className="about-header">
        我是todoList页
      </header>
      <main>
          <div>
            <TodoListStats />
            <TodoListFilters />
            <TodoItemCreator />

            {todoList.filterList.map((todoItem,index) => (
              <TodoItem key={todoItem.id} item={todoItem}/>
            ))} 
          </div>
        
      </main>
      <footer>
        <Button type="primary" onClick={()=> history.push ("/about")}>to about</Button>
      </footer>
    </div>
  )
}

export default Index
