
    import React from 'react';
    import "./Place.css";
    export default function(props){
        const {config} = props;
        const {funcList} = config;
        return (<div className="vuc-place">
            {funcList.map((item, index) => (<span key={index} onClick={item.onClick}>{item.tabConf.name}</span>))}
        </div>)
    }

