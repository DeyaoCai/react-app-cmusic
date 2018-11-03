import React, { Component } from 'react';
class ListItemPic extends Component {
  constructor(props){
    super(props);
    this.state = {isActive: true,};
    this.clickHandel = () => {
      this.setState({isActive: !this.state.isActive,});
    };
  };
  render() {
    return (
      <div className={"home-block" + (this.state.isActive ? " fold" : "")}>
        <div className="home-title"><span>{this.props.config.name}</span><i onClick={this.clickHandel}>{this.state.isActive ? "展开" : "收起"}</i></div>
        <ul className="home-list">{
          this.props.config.list.map((item, index)=> <li onClick={()=>{item.handelClick(item)}} className="home-list-item" key={index}>
            <img src={item.img}></img>
            {item.name}
          </li>)
        }</ul>
      </div>
    );
  }
}
export default ListItemPic;
