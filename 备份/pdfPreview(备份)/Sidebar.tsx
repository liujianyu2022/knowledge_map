import React from "react";

import type { IHighlight } from "./react-pdf-highlighter";

interface Props {
  highlights: Array<IHighlight>;    //存放全部的标注对象
  resetHighlights: () => void;
  toggleDocument: () => void;   //这是切换pdf文章的函数，pdf文件放在test-highlighter中
  cancelHighlight: (highlights: Array<IHighlight>) => void;
  updateEdit: (highlightId: string, highlights: Array<IHighlight>) => void
}


// 通过点击 sidebar 的标注，跳转到相应的位置
// highlight: {content: {…}, position: {…}, comment: {…}, id: '8245652131754351'}   
// 根据每一个highlight的id号，去更改url路径，定位到该highlight    浏览器会自动定位到#锚的位置  滚动到页面可视区域内
// http://localhost:3000/react-pdf-highlighter/#highlight-812807243318874
// #号是用来指导浏览器动作的，对服务器端完全无用。所以，HTTP请求中不包含#。
// 单单改变#后的内容，浏览器只会滚动到相应位置，不会重新加载网页
// 在第一个#后面出现的任何字符，都会被浏览器解读为位置标识符。这意味着，这些字符都不会被发送到服务器端。
const updateHash = (highlight: IHighlight) => {
  document.location.hash = `highlight-${highlight.id}`;
};



export function Sidebar({ highlights, toggleDocument, resetHighlights, cancelHighlight, updateEdit }: Props) {

  
  function goToHighlighter(highlight: IHighlight) {
    console.log(highlight)
    updateHash(highlight)
  }

  function editHighlight(highlight: IHighlight){
    highlight.isEdit = !highlight.isEdit
    // updateEdit()
  }

  function saveEdit(event: React.SyntheticEvent){
    //@ts-ignore
    console.log(event.target.value)
  }

  function cancelHighlighter(highlight: IHighlight) {

    updateHash(highlight);    //先跳转到该highlight

    setTimeout(() => {
      // let key: boolean = confirm("make sure you want to cancel it")

      // if (!key) return

      highlights = highlights.filter((item) => {
        return item.id !== highlight.id
      })

      cancelHighlight(highlights)
    }, 1000)
  }

  return (
    <div className="sidebar" style={{ width: "20vw" }}>

      {/*每一个li 就是一条标注 */}

      <ul className="sidebar__highlights">

        {highlights.map((highlight, index) => (

          <li key={highlight.id} className="sidebar__highlight" >

            <div>

              {/*  这是自己标注的内容 */}
              {highlight.isEdit ? <input defaultValue={highlight.comment.text} onChange={(event)=>saveEdit(event)} /> : <strong>{highlight.comment.text}</strong>}   

              {/* 针对文字的标注 */}
              {highlight.content.text ? (
                <blockquote style={{ marginTop: "0.5rem" }}>
                  {`${highlight.content.text.slice(0, 90).trim()} …`}
                </blockquote>

              ) : null}

              {/* 针对 image 的标注 */}
              {highlight.content.image ? (
                <div className="highlight__image" style={{ marginTop: "0.5rem" }} >
                  <img src={highlight.content.image} alt={"Screenshot"} />
                </div>
              ) : null}
            </div>

            <div className="highlight__location" style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <div> <button onClick={() => goToHighlighter(highlight)}>转到</button> </div> &nbsp;
              <div> <button onClick={() => editHighlight(highlight)}>{highlight.isEdit ? '保存':'编辑'}</button> </div> &nbsp;
              <div> <button onClick={() => cancelHighlighter(highlight)} disabled={false}>取消高亮</button> </div> &nbsp;
              <div style={{ fontSize: "16px" }}> Page {highlight.position.pageNumber} </div>
            </div>
          </li>
        ))}

      </ul>

      <div style={{ padding: "1rem" }}>
        <button onClick={toggleDocument}>切换PDF文档</button>
      </div>

      {highlights.length > 0 ? (
        <div style={{ padding: "1rem" }}>
          <button onClick={resetHighlights}>重新设置标注</button>
        </div>
      ) : null}
    </div>
  );
}
