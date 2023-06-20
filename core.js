export default function html([first, ...strings], ...values) {
  return values
    .reduce((acc, cur) => [...acc, cur, strings.shift()], [first])
    .filter((item) => (item && item !== true) || item === 0)
    .join("");
}

export function createStore(reducer) {
  let state = reducer();
  const roots = new Map();
  function render() {
    for (const [root, component] of roots) {
      const outPut = component();
      root.innerHTML = outPut;
    }
  }
  return {
    attach(component, root) {
      roots.set(root, component);
      render();
    },

    connect(selector = (state) => state) {
      return (component) =>
        (props, ...args) =>
          component(Object.assign({}, props, selector(state), ...args));
    },

    dispatch(action, ...args) {
      state = reducer(state, action, args);
      render();
    },
  };
}