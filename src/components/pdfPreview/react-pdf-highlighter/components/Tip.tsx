import React, { Component } from "react";

import "../style/Tip.css";

interface State {
  compact: boolean;
  text: string;
}

interface Props {
  onConfirm: (comment: { text: string}) => void;
  onOpen: () => void;
  onUpdate?: () => void;
}

export class Tip extends Component<Props, State> {
  state: State = {
    compact: true,
    text: "",
  };

  // for TipContainer
  componentDidUpdate(nextProps: Props, nextState: State) {
    const { onUpdate } = this.props;

    if (onUpdate && this.state.compact !== nextState.compact) {
      onUpdate();
    }
  }

  render() {
    const { onConfirm, onOpen } = this.props;
    const { compact, text} = this.state;

    return (
      <div className="Tip">
        {compact ? (
          <div className="Tip__compact"
            onClick={() => {
              onOpen();     //打开上部的tip
              this.setState({ compact: false });
            }}
          >
            Add highlight
          </div>
        ) : (
          <form
            className="Tip__card"
      
            onSubmit={(event) => {
              event.preventDefault();
              onConfirm({ text });
            }}
          >
            <div>
              <textarea
                placeholder="Your comment"
                autoFocus
                value={text}
                onChange={(event) =>{
                  console.log("text--", event.target.value)
                  this.setState({ text: event.target.value })
                }
                }
                ref={(node) => {
                  if (node) {
                    node.focus();
                  }
                }}
              />
           
            </div>

            <div>
              <input type="submit" value="Save" />
            </div>
          </form>
        )}
      </div>
    );
  }
}

export default Tip;
