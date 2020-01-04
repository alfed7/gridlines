import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import buildGridSvg from './svgBuilder';

const GridLines = React.forwardRef((props, ref) => {
  const {component='div', cellWidth=60, cellHeight, lineColor='#ccc', strokeWidth=2, dashArray='0', 
    cellWidth2, cellHeight2, lineColor2='#ddd', strokeWidth2=1, dashArray2='0', ...rest} = props;
  const [bg, setBg] = useState('');
  const h = cellHeight || cellWidth;
  const h2 = cellHeight2 || cellWidth2;
  const ComponentProp = component;
  useEffect(() => {
    setBg(buildGridSvg(cellWidth, h, lineColor, strokeWidth, dashArray, 
      cellWidth2, h2, lineColor2, strokeWidth2, dashArray2));
  }, [cellWidth, h, lineColor, strokeWidth, dashArray, cellWidth2, h2, lineColor2, strokeWidth2, dashArray2]);
  return <ComponentProp ref={ref} {...rest} style={{backgroundImage: bg}}/>
});

GridLines.propTypes = {
  component: PropTypes.elementType,
  cellWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cellHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lineColor: PropTypes.string,
  strokeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  dashArray: PropTypes.string,
  cellWidth2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cellHeight2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lineColor2: PropTypes.string,
  strokeWidth2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  dashArray2: PropTypes.string,
};

export default GridLines;
