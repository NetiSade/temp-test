import { View, Text } from "react-native";
import {
  CounterContext,
  useCounterContext,
} from "../context/counterContext/state";
import { useEffect, useState } from "react";

const Parent = () => {
  const [myCounter, setMyCounter] = useState(0);
  const [siblingCounter, setSiblingCounter] = useState(0);

  return (
    <CounterContext.Provider
      value={{ myCounter, setMyCounter, setSiblingCounter, siblingCounter }}
    >
      <View>
        <ChildView childNum={0} initValue={0} />
        <ChildView childNum={1} initValue={3} />
      </View>
    </CounterContext.Provider>
  );
};

type useThrottledParams = {
  callback: () => void;
  msInterval: number;
  onClear?: () => void;
};

const useThrottled = ({
  callback,
  msInterval,
  onClear,
}: useThrottledParams) => {
  useEffect(() => {
    const interval = setInterval(() => {
      callback();
    }, msInterval);

    return () => {
      clearInterval(interval);
      onClear?.();
    };
  }, []);
};

type CounterViewProps = {
  childNum: number;
  initValue: number;
};

const ChildView = (props: CounterViewProps) => {
  const { setMyCounter, setSiblingCounter, myCounter, siblingCounter } =
    useCounterContext();

  useEffect(() => {
    if (props.childNum === 0) {
      setMyCounter(props.initValue);
    } else {
      setSiblingCounter(props.initValue);
    }
  }, [props.initValue]);

  useThrottled({
    callback: () => {
      if (props.childNum === 0) {
        setMyCounter((val) => val + 1);
      } else {
        setSiblingCounter((val) => val + 1);
      }
    },
    msInterval: 1000,
  });

  const [brotherCounter, setBrotherCounter] = useState(0);

  useThrottled({
    callback: () => {
      setBrotherCounter((val: number) => {
        return props.childNum === 0 ? siblingCounter : myCounter;
      });
    },
    msInterval: 3000,
    onClear: () => {
      console.log("clear");
    },
  });

  const counterToDisplay = props.childNum === 0 ? myCounter : siblingCounter;

  return (
    <View>
      <View>
        <Text>{counterToDisplay}</Text>
      </View>
      <View>
        <Text>{brotherCounter}</Text>
      </View>
    </View>
  );
};

export default Parent;
