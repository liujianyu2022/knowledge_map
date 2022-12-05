import React, { Component } from "react";

import { Rnd } from "react-rnd";

import { getPageFromElement } from "../lib/pdfjs-dom";

import "../style/AreaHighlight.css";

import type { LTWHP, ViewportHighlight } from "../types";

interface Props {
  highlight: ViewportHighlight;
  onChange: (rect: LTWHP) => void;
  onClick: ()=> void;
  isScrolledTo: boolean;
}


// 这是标记某个区域的
export class AreaHighlight extends Component<Props> {
  render() {
    const { highlight, onChange, isScrolledTo, onClick, ...otherProps } = this.props;

    return (
      <div className={`AreaHighlight ${isScrolledTo ? "AreaHighlight--scrolledTo" : ""}`}>
        <Rnd className="AreaHighlight__part"

          onDragStop={(_, data) => {    //当停止拖动的时候触发的回调
            console.log("onDragStop--")

            const boundingRect: LTWHP = {
              ...highlight.position.boundingRect,
              top: data.y,
              left: data.x,
            };

            onChange(boundingRect);
          }}

          onResizeStop={(_mouseEvent, _direction, ref, _delta, position) => {
            console.log("onResizeStop--")
            
            const boundingRect: LTWHP = {
              top: position.y,
              left: position.x,
              width: ref.offsetWidth,
              height: ref.offsetHeight,
              pageNumber: getPageFromElement(ref)?.number || -1,
            };

            onChange(boundingRect);
          }}

          position={{
            x: highlight.position.boundingRect.left,
            y: highlight.position.boundingRect.top,
          }}

          size={{
            width: highlight.position.boundingRect.width,
            height: highlight.position.boundingRect.height,
          }}

          onClick={onClick}

          {...otherProps}
        />
      </div>
    );
  }
}

export default AreaHighlight;
