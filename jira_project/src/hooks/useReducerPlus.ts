import React, { useReducer } from "react";

export default function useReducerPlus<T extends object>(initialStateObject:T) {
  const [state, dispatch] = useReducer((state:T, update:Partial<T>) => {
    if (update) {
      return {
        ...state,
        ...update,
      };
    }
    return state 
  }, initialStateObject|| {});

  return [state, dispatch] as const;
}

