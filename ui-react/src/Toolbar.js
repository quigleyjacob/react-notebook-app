import React, {Component} from 'react';

class Toolbar extends Component {
  constructor(props) {
    super(props);
  }

  boldText() {
    document.execCommand('bold',false,null)
  }
  italicizeText() {
    document.execCommand('italic',false,null)
  }
  underlineText() {
    document.execCommand('underline',false,null)
  }

  render() {
    return(
      <div className="ui menu">
        <a className="item" onClick={this.boldText}><i className="bold icon"></i></a>
        <a className="item" onClick={this.italicizeText}><i className="italic icon"></i></a>
        <a className="item" onClick={this.underlineText}><i className="underline icon"></i></a>
      </div>
    );
  }
}

export default Toolbar;
