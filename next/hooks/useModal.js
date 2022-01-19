import { useState } from "react";

const useModal = (initialState = false) => {
  const [state, setState] = useState(initialState);
  function onHide(value = undefined) {
    setState(value === undefined ? false : value);
  }

  function onShow(value = undefined) {
    setState(value === undefined ? true : value);
  }
  return { state, onHide, onShow };
};

export default useModal;
