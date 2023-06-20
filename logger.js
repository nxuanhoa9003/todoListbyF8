export default function (reducer) {
  return (prevState, action, args) => {
    console.group(action);
    console.log("prevState: ", prevState);
    console.log("action args: ", args);
    const nextState = reducer(prevState, action, args);
    console.log("nextState: ", nextState);
    console.groupEnd();
    return nextState;
  };
}
