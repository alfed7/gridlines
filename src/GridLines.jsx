import React, { useEffect, useState, useMemo } from "react";
import PropTypes from "prop-types";
import buildGridSvg from "./svgBuilder";
import { getPageSize } from "./pageSizes";

function getWidthAndHeight(pageSize, scale) {
  const k = 1.5;
  if (pageSize)
    return { width: pageSize[0] * k * scale, height: pageSize[1] * k * scale };
  return {};
}
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

  const [pageSize, setPageSize] = useState(null);

  const widthHeight = useMemo(() => getWidthAndHeight(pageSize, scale), [
    pageSize,
    scale,
  ]);

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
        scale
      )
    );

    if (format) {
      setPageSize(getPageSize(format, orientation));
    }
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

  console.log(children);
  return (
    <ComponentProp
      className={className}
      ref={ref}
      style={
        format
          ? {
              //display: "flex",
              //flexDirection: "column",
              //width: "100%",
              background: "#eee",
              padding: "1em",
            }
          : {
              backgroundImage: bg,
            }
      }
      {...rest}
    >
      {format ? (
        <div
          //className={className}
          style={{
            ...widthHeight,
            background: "white",
            backgroundImage: bg,
            boxShadow: "2px 2px 5px 0px rgba(0, 0, 0, 0.5)",
          }}
        >
          {children}
        </div>
      ) : (
        children
      )}
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
