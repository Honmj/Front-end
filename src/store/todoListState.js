import {
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';



const todoListState = atom({
    key: 'todoListState',
    default:[],
  });

  const todoListFilterState = atom({
    key: 'todoListFilterState',
    default: 'all',
  });

  const filteredTodoListState = selector({
    key: 'filteredTodoListState',
    get: ({get}) => {
      const filter = get(todoListFilterState);
      const list = get(todoListState);
  
      switch (filter) {
        case 'completed':
          return list.filter((item) => item.isComplete);
        case 'uncompleted':
          return list.filter((item) => !item.isComplete);
        default:
          return list;
      }
    },
  });
  
  const todoListCountState = selector({
    key: 'todoListCountState',
    get: ({get}) => {
      const todoList = get(filteredTodoListState);
      const totalNum = todoList.length;
      const totalCompletedNum = todoList.filter((item) => item.isComplete).length;
      const totalUncompletedNum = totalNum - totalCompletedNum;
      const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;

      return {
        totalNum,
        totalCompletedNum,
        totalUncompletedNum,
        percentCompleted
      }
    }

  })

  export {
      todoListState,
      todoListFilterState,
      filteredTodoListState,
      todoListCountState
  }
