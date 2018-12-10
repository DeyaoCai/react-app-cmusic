
    import React from 'react';
    import ctools from "ctools";

    import "./Icon.css";
    export  default  function(props){
        function handerclick(e){
            props.handerclick && props.handerclick(e);
            e.stopPropagation();
            e.preventDefault();
        }
        const wrapClass = ctools.getClass("vuc-icon","iconfont",props.icon && ("icon-"+props.icon));
        return (<div className={wrapClass} onClick={handerclick}></div>)
    }

