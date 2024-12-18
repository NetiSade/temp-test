import { createContext, useContext } from "react";

export type CounterState = {
  myCounter: number;
  setMyCounter: React.Dispatch<React.SetStateAction<number>>;
  siblingCounter: number;
  setSiblingCounter: React.Dispatch<React.SetStateAction<number>>;
};

export const CounterContext = createContext<CounterState>({
  myCounter: 0,
  setMyCounter: () => {},
  setSiblingCounter: () => {},
  siblingCounter: 0,
});

export const useCounterContext = () => useContext(CounterContext);
