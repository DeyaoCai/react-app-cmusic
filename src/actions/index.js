import cmusichome from "./cmusichome";

export default function makeActions(dispatch) {
  function _(str,val){dispatch(cmusichome[str](val));};
  const actionFn = {};
  Object.keys(cmusichome).forEach(item=> actionFn[item] = val => _(item,val));
  return actionFn;
}
