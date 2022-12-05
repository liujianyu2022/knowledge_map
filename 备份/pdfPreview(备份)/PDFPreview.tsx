import React, { Component } from "react";

import { PdfLoader, PdfHighlighter, Tip, Highlight, Popup, LTWHP } from "./react-pdf-highlighter";

import type { IHighlight, NewHighlight } from "./react-pdf-highlighter";

import { testHighlights as _testHighlights } from "./test-highlights";

import { Spinner } from "./Spinner";

import { Sidebar } from "./Sidebar";

import "./style/PDFPreview.css";

// Array中的每一条就是一个hightlight
const testHighlights: Record<string, Array<IHighlight>> = _testHighlights;

interface State {
  url: string;
  highlights: Array<IHighlight>;
}


// generate the id when adding a new highlight
// Math.random()  [0, 1)
const getNextId = () => String(Math.random()).slice(2);


// document.location.hash -> '#highlight-812807243318874'  就是把url中#后面的内容返回
const parseIdFromHash = () => document.location.hash.slice("#highlight-".length);

//  ???
const resetHash = () => {
  document.location.hash = "";
};


// show the tip if someone put the mouse into the highligt


const HighlightPopup = ({ comment }: { comment: { text: string } }) =>
  comment.text ? (
    <div className="Highlight__popup_outer">

      <div className="Highlight__popup">{ comment.text }</div>

    </div>
  ) : null;





const PRIMARY_PDF_URL = "https://arxiv.org/pdf/1708.08021.pdf";
const SECONDARY_PDF_URL = "https://arxiv.org/pdf/1604.02480.pdf";


// location 对象重写了toString方法  location.toString() 方法返回包含整个URL的USVString。它是Location.href的只读版本。
// search 属性是一个可读可写的字符串，可设置或返回当前 URL 的查询部分（问号 ? 之后的部分）
// ????????????????
const searchParams = new URLSearchParams(document.location.search);
const initialUrl = searchParams.get("url") || PRIMARY_PDF_URL;

console.log("searchParams--", searchParams)   // {}
console.log("searchParams--", searchParams.get("url"))    // null


class PDFPreview extends Component<{}, State> {

  state = {
    url: initialUrl,
    highlights: testHighlights[initialUrl] ? [...testHighlights[initialUrl]] : [],    // 得到的是静态数据
  };

  resetHighlights = () => {
    this.setState({
      highlights: [],
    });
  };


  // 这是切换文章用的
  toggleDocument = () => {
    const newUrl = this.state.url === PRIMARY_PDF_URL ? SECONDARY_PDF_URL : PRIMARY_PDF_URL;

    this.setState({
      url: newUrl,
      highlights: testHighlights[newUrl] ? [...testHighlights[newUrl]] : [],
    });
  };



  scrollViewerTo = (highlight: any) => { };

  scrollToHighlightFromHash = () => {           // 切换到指定的标注
    console.log("scrollToHighlightFromHash-----")
    
    const highlight = this.getHighlightById(parseIdFromHash());

    if (highlight) {
      this.scrollViewerTo(highlight);
    }
  };

  componentDidMount() {
    window.addEventListener("hashchange", this.scrollToHighlightFromHash, false);
  }

  getHighlightById(id: string) {
    const { highlights } = this.state;

    return highlights.find((highlight) => highlight.id === id);
  }


  // 点击 save 按钮后的回调函数
  addHighlight(highlight: NewHighlight){
    const { highlights } = this.state;

    console.log("Saving highlight", highlight);

    this.setState({
      highlights: [{ ...highlight, id: getNextId() }, ...highlights],
    });
  }

  // highlight: {content: {…}, position: {…}, comment: {…}, id: '8245652131754351'}  
  updateHighlight(highlightId: string, position: Object, content: Object) {
    this.setState({
      highlights: this.state.highlights.map((h) => {
        const { id, position: originalPosition, content: originalContent, ...rest } = h;   // 解构原有的hightlight
        return id === highlightId ? { id, position: { ...originalPosition, ...position }, content: { ...originalContent, ...content }, ...rest } : h;
      }),
    });
  }

  //这是用于取消标注的函数, 在Sidebar组件中调用
  cancelHighlight = (highlights: Array<IHighlight>) => {
    this.setState({ highlights })
  }

  updateEdit = ()=>{
    this.setState({})
  }

  // 这是标注区域的点击函数
  highlightClick = () => {
    console.log("hello")
  }

  // 对于标注区域，右键的时候需要弹出tip，以对其进行修改
  highlightContextMenu = (rect: LTWHP) => {
    console.log("ContextMenu")
  }

  render() {
    const { url, highlights } = this.state;

    return (
      // 注意： pdf-preview 这个div的父元素必须设置高度才可以
      <div className="pdf-preview" style={{ display: "flex", height: "100%" }}>

        <Sidebar highlights={highlights} resetHighlights={this.resetHighlights} toggleDocument={this.toggleDocument} cancelHighlight={this.cancelHighlight} updateEdit={this.updateEdit } />

        <div style={{ height: "100%", width: "80vw", position: "relative" }} >

          <PdfLoader url={url} beforeLoad={<Spinner />}>
            {
              (pdfDocument) => (

                <PdfHighlighter pdfDocument={pdfDocument} enableAreaSelection={(event) => event.altKey}

                  onScrollChange={resetHash}

                  // pdfScaleValue="page-width"

                  scrollRef={(scrollTo) => {
                    this.scrollViewerTo = scrollTo;
                    this.scrollToHighlightFromHash();
                  }}


                  // 当选择完成，弹出上部 add_highlight
                  onSelectionFinished={(position, content, hideTipAndSelection, transformSelection) => {

                    console.log("transformSelection---", transformSelection)

                    return (
                      <Tip 
                        onOpen={transformSelection}   // 打开上部的tip
                        onConfirm={(comment) => {
                          this.addHighlight({ content, position, comment });
                          hideTipAndSelection();
                        }}
                      />
                    )
                  }}

                  // highlightTransform 这个函数返回 JSX.Element
                  highlightTransform={(highlight, index, setTip, hideTip, viewportToScaled, screenshot, isScrolledTo) => {
                    
                    // const isTextHighlight = !Boolean( highlight.content && highlight.content.image );

                    const component = (
                      <Highlight
                        isScrolledTo={isScrolledTo}
                        position={highlight.position}
                        comment={highlight.comment}
                        onClick={this.highlightClick}
                      />
                    );


                    return (

                      <Popup
                        popupContent={<HighlightPopup {...highlight} />}

                        onMouseOver={(popupContent1) => {    // 当鼠标划过被标识的内容时，弹出tip
                          setTip(highlight, (highlight) => popupContent1)     // popContent 就是  MouseMonitor组件的实例
                        }
                        }

                        onMouseOut={hideTip}   //当鼠标划过后，影藏tip

                        key={index}

                        children={component}    // 负责在图中展示标注本身
                      />
                    );
                  }}

                  highlights={highlights}
                />
              )}
          </PdfLoader>
        </div>
      </div>
    );
  }
}

export default PDFPreview;
