import { render } from "react-dom";

import React, { Component } from "react";
import autosize from "autosize";

class TextArea extends Component {
  componentDidMount() {
    this.textarea.focus();
    autosize(this.textarea);
  }
  render() {
    const style = {
      maxHeight: "200vh",
      resize: "none",
      padding: "9px",
      minWidth: "100%"
    };
    return (
      <div>
        <textarea
          className="shadow-sm border-0"
          id = {this.props.id}
          onChange = {()=>{this.props.setNormalInput(document.getElementById(this.props.id).value)}}
          style={style}
          ref={c => (this.textarea = c)}
          placeholder="type some text"
          rows={1}
          defaultValue=""
        />
      </div>
    );
  }
}

export default TextArea
