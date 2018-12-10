
    import React from 'react';
    import "./Tab.css";
    import ctools from "ctools";
    const {getClass} = ctools;
    export default function(props){const {config,setIndex} = props;
        const { list, index,} = config;
        return (<div className="vuc-tab"><i style={{left: index.x*100/list.length + 25 +"%"}}></i>{
            list.map((item,i) => (<span key={i} className={getClass({active: index.x === i})} onClick={()=>setIndex(i)}>{item.name}</span>))
        }</div>)
    }

