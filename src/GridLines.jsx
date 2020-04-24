import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import buildGridSvg from "./svgBuilder";

const GridLines = React.forwardRef((props, ref) => {
  const {
    component = "div",
    className,
    scale = 1,
    cellWidth = 60,
    cellHeight,
    lineColor = "#ccc",
    strokeWidth = 2,
    dashArray = "0",
    cellWidth2,
    cellHeight2,
    lineColor2 = "#ddd",
    strokeWidth2 = 1,
    dashArray2 = "0",
    format,
    orientation,
    children,
    ...rest
  } = props;
  const [bg, setBg] = useState("");
  const h = cellHeight || cellWidth;
  const h2 = cellHeight2 || cellWidth2;
  const ComponentProp = component;

  useEffect(() => {
    setBg(
      buildGridSvg(
        cellWidth,
        h,
        lineColor,
        strokeWidth,
        dashArray,
        cellWidth2,
        h2,
        lineColor2,
        strokeWidth2,
        dashArray2,
        scale,
        format,
        orientation
      )
    );
  }, [
    cellWidth,
    h,
    lineColor,
    strokeWidth,
    dashArray,
    cellWidth2,
    h2,
    lineColor2,
    strokeWidth2,
    dashArray2,
    format,
    orientation,
    scale,
  ]);

  return (
    <ComponentProp
      className={className}
      ref={ref}
      style={{
        backgroundImage: bg,
      }}
      {...rest}
    >
      {children}
    </ComponentProp>
  );
});

GridLines.propTypes = {
  className: PropTypes.string,
  component: PropTypes.elementType,
  cellWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cellHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  format: PropTypes.string,
  orientation: PropTypes.string,
  lineColor: PropTypes.string,
  strokeWidth: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  dashArray: PropTypes.string,
  cellWidth2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  cellHeight2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  lineColor2: PropTypes.string,
  strokeWidth2: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  scale: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  dashArray2: PropTypes.string,
};

export default GridLines;
