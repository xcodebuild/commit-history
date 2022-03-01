import { D3Selection } from "../types";

interface DrawLegendConfig {
  items: {
    color: string;
    text: string;
  }[];
  strokeColor: string;
  backgroundColor: string;
}

const drawLegend = (
  selection: D3Selection,
  { items, strokeColor, backgroundColor }: DrawLegendConfig
) => {
  const legendXPadding = 7;
  const legendYPadding = 6;
  const xkcdCharWidth = 7;
  const xkcdCharHeight = 20;
  const colorBlockWidth = 8;

  const legend = selection.append("svg");
  const backgroundLayer = legend.append("svg");
  const textLayer = legend.append("svg");
  let maxTextLength = 0;

  items.forEach((item, i) => {
    // draw color dot
    textLayer
      .append("rect")
      .style("fill", item.color)
      .attr("width", colorBlockWidth)
      .attr("height", colorBlockWidth)
      .attr("rx", 2)
      .attr("ry", 2)
      .attr("filter", "url(#xkcdify)")
      .attr("x", 8 + legendXPadding)
      .attr("y", 17 + xkcdCharHeight * i);
    // draw text
    textLayer
      .append("text")
      .style("font-size", "15px")
      .style("fill", strokeColor)
      .attr("x", 8 + legendXPadding + colorBlockWidth + 6)
      .attr("y", 17 + xkcdCharHeight * i + 8)
      .text(item.text);

    maxTextLength = Math.max(item.text.length, maxTextLength);
  });

  let bboxWidth =
    maxTextLength * (xkcdCharWidth + 0.5) + colorBlockWidth + legendXPadding;
  // Because there is no `getBBox` method in nodejs env,
  // we have to use it after validate function existed.
  if (textLayer.node()?.getBBox) {
    bboxWidth = textLayer.node()?.getBBox().width as number;
  }
  const backgroundWidth = Math.max(
    bboxWidth + legendXPadding * 2,
    maxTextLength * xkcdCharWidth + colorBlockWidth + legendXPadding * 2 + 6
  );
  const backgroundHeight = items.length * xkcdCharHeight + legendYPadding * 2;

  // add background
  backgroundLayer
    .append("rect")
    .style("fill", backgroundColor)
    .attr("fill-opacity", 0.85)
    .attr("stroke", strokeColor)
    .attr("stroke-width", 2)
    .attr("rx", 5)
    .attr("ry", 5)
    .attr("filter", "url(#xkcdify)")
    .attr("width", backgroundWidth)
    .attr("height", backgroundHeight)
    .attr("x", 8)
    .attr("y", 5);
};

export default drawLegend;
