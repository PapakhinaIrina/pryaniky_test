import { TGridElement } from 'shared/pages/table/types';

const baseWidth = 20;

export const getGridColumns = (grid: TGridElement[]) => {
  if(!grid) return [];
  const obj = {...grid[0]};
  const keysObject = Object.keys(obj);
  keysObject.unshift('number');
  return keysObject.map((el, i) => {
    return {
      field: el,
      headerName: el === 'number' ? '№ п/п' : el.charAt(0).toUpperCase() + el.slice(1),
      width: el.length * baseWidth,
    };
  });
};