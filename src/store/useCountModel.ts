import React, { useState, useEffect } from 'react';
import { createModel } from 'hox';

export interface IlistItem {
  id: number;
  text: string;
  isComplete: boolean;
}

const useTodoListState = () => {
  const [list, setList] = useState<IlistItem[]>([]);
  const [filterList, setFilterList] = useState<IlistItem[]>([]);
  const [dataCounter, setDataCounter] = useState({
    totalNum: 0,
    totalCompletedNum: 0,
    totalUncompletedNum: 0,
    percentCompleted: 0,
  });

  const addItem = (item: IlistItem) => {
    setList([...list, item]);
  };

  const deleteItem = (index: number) => {
    const newList = [...list.slice(0, index), ...list.slice(index + 1)];
    setList(newList);
  };

  const editItem = (index: number, newValue: IlistItem) => {
    const newList = [...list.slice(0, index), newValue, ...list.slice(index + 1)];
    setList(newList);
  };

  const getFilterList = (filter: string) => {
    switch (filter) {
      case 'completed':
        const completedList = list.filter((item) => item.isComplete);
        setFilterList(completedList);
        break;
      case 'uncompleted':
        const uncompletedList = list.filter((item) => !item.isComplete);
        setFilterList(uncompletedList);
        break;
      default:
        setFilterList(list);
    }
  };
  const count = () => {
    const totalNum = list.length;
    const totalCompletedNum = list.filter((item) => item.isComplete).length;
    const totalUncompletedNum = totalNum - totalCompletedNum;
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum;
    const data = {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    };
    setDataCounter(data);
  };
  useEffect(() => {
    setFilterList(list);
    count();
  }, [list]);

  return {
    list,
    filterList,
    dataCounter,
    addItem,
    deleteItem,
    editItem,
    getFilterList,
  };
};
const useTodoListStateModel = createModel(useTodoListState);

export { useTodoListStateModel };
