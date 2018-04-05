import React, {Component} from 'react';

class Toolbar extends Component {
  constructor(props) {
    super(props);

    this.getSelectionText = this.getSelectionText.bind(this);
  }

  //https://stackoverflow.com/questions/5379120/get-the-highlighted-selected-text
  getSelectionText() {
    var text = "";
    var activeEl = document.activeElement;
    var activeElTagName = activeEl ? activeEl.tagName.toLowerCase() : null;
    if (
      (activeElTagName === "textarea") || (activeElTagName === "input" &&
      /^(?:text|search|password|tel|url)$/i.test(activeEl.type)) &&
      (typeof activeEl.selectionStart === "number")
    ) {
        text = activeEl.value.slice(activeEl.selectionStart, activeEl.selectionEnd);
    } else if (window.getSelection) {
        text = window.getSelection().toString();
    }
    console.log(text);
    return text;
  }

  render() {
    return(
      <div className="ui menu">
        <a className="item" onClick={this.getSelectionText}><i className="bold icon"></i></a>
        <a className="item" onClick={this.getSelectionText}><i className="italic icon"></i></a>
        <a className="item" onClick={this.getSelectionText}><i className="underline icon"></i></a>
      </div>
    );
  }
}

export default Toolbar;
