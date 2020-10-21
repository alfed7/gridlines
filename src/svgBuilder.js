import { Base64 } from "js-base64";
import { getPageSize } from "./pageSizes";

function getWidthAndHeight(pageSize, scale) {
  const k = 1;
  if (pageSize)
    return { width: pageSize[0] * k * scale, height: pageSize[1] * k * scale };
  return null;
}

function buildLine(
  size,
  lineColor,
  strokeWidth,
  dashArray,
  offset = 0,
  isVertical = false
) {
  let cell = isVertical
    ? `<line x1='${offset}' y1='0' x2='${offset}' y2='${size}'`
    : `<line x1='0' y1='${offset}' x2='${size}' y2='${offset}'`;
  cell += ` style='stroke:${lineColor};stroke-width:${strokeWidth};stroke-dasharray="${dashArray}"' />`;
  return cell;
}
function buildCell(w, h, lineColor, strokeWidth, dashArray) {
  return (
    buildLine(h, lineColor, strokeWidth, dashArray, 0, true) +
    buildLine(w, lineColor, strokeWidth, dashArray, 0, false)
  );
}
function buildPage(w, h, page, pat) {
  if (!page) return pat;

  const p = `<defs>
  <pattern id="Pattern" x="0" y="0" width="${w}" height="${h}" patternUnits="userSpaceOnUse">
    ${pat}
  </pattern>
</defs>
<rect fill="url(#Pattern)" stroke="black" width="${page.width}" height="${page.height}"/>
`;
  return p;
}
function buildGridSvg(
  w,
  h,
  lineColor,
  strokeWidth,
  dashArray,
  w2,
  h2,
  lineColor2,
  strokeWidth2,
  dashArray2,
  scale,
  format,
  orientation
) {
  const page = getWidthAndHeight(getPageSize(format, orientation), scale);
  w = w * scale;
  h = h * scale;
  w2 = w2 * scale;
  h2 = h2 * scale;
  const cell1 = buildCell(w, h, lineColor, strokeWidth, dashArray);
  let cell2 = "";
  if (w2 && h2) {
    for (let offset = w2; offset < w; offset += w2) {
      cell2 += buildLine(h, lineColor2, strokeWidth2, dashArray2, offset, true);
    }
    for (let offset = h2; offset < h; offset += h2) {
      cell2 += buildLine(
        w,
        lineColor2,
        strokeWidth2,
        dashArray2,
        offset,
        false
      );
    }
  }
  const pat = buildPage(w, h, page, `${cell1}${cell2}`);

  const svgW = page ? page.width : w,
    svgH = page ? page.height : h;
  var svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${svgW}' height='${svgH}'>${pat}</svg>`;
  var svg64 = Base64.encode(svg); //window.btoa(svg);
  var s = `url('data:image/svg+xml;base64,${svg64}')`;
  return s;
}

export default buildGridSvg;
