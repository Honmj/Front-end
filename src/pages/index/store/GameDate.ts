import { GameObject } from '@eva/eva.js';

interface levelData {
  barrierNumber: number;
  row: number;
  col: number;
}
interface nodeList {
  obj: GameObject;
  [key: string]: any;
}

const store = {
  catPosition: [] as Array<number>,
  catRunning: false,
  level: 0,
  step: 0,
  barrierNumber: 15,
  gridNodeList: [[{}]] as Array<Array<nodeList>>,
};

const levelDatas: Array<levelData> = [
  {
    barrierNumber: 0,
    row: 0,
    col: 0,
  },
  {
    barrierNumber: 10,
    row: 7,
    col: 7,
  },
  {
    barrierNumber: 22,
    row: 8,
    col: 8,
  },
  {
    barrierNumber: 24,
    row: 9,
    col: 9,
  },
  {
    barrierNumber: 26,
    row: 10,
    col: 10,
  },
  {
    barrierNumber: 24,
    row: 10,
    col: 10,
  },
  {
    barrierNumber: 22,
    row: 10,
    col: 10,
  },
  {
    barrierNumber: 20,
    row: 10,
    col: 10,
  },
  {
    barrierNumber: 18,
    row: 10,
    col: 10,
  },
  {
    barrierNumber: 16,
    row: 10,
    col: 10,
  },
  {
    barrierNumber: 14,
    row: 10,
    col: 10,
  },
];

export { levelDatas, store };
