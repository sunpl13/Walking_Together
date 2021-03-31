import React from 'react';
import { IoAddSharp, IoChevronBackSharp, IoCloseSharp } from "react-icons/io5";
import '../styles/top_bar.scss';

const TopBar = ({left, center, right, size}) => {
    return (
        <div className="topBar" id={size}>  {/* size param(small or big)에 따라서 css결정 */}
            
            {/* left option : {back, null, cancel} */}
            <div className="left">
                {() => {
                    if(left==="back") {
                        return(
                            <div className="back">
                                <IoChevronBackSharp />
                            </div>
                        );
                    } else if(left==="null") {
                        return(
                            <div className="null"></div>
                        );
                    } else if(left==="cancel") {
                        return(
                            <div className="cancel">
                                <p>취소</p>
                            </div>
                        );
                    }
                }}
            </div>

            {/* center option : {title}, {date, null} */}
            <div className="center">
                <p>{center.title}</p>
                {() => {
                    if(center.data!==null) {
                        return(
                            <p className="data">
                                {center.data}
                            </p>
                        );
                    } 
                }}

            </div>

            {/* right option : {cancel, plus, create, null} */}
            <div className="right">
                {() => {
                    if(right==="cancel") {
                        return(
                            <div className="cancel">
                                <IoCloseSharp />
                            </div>
                        );
                    } else if(right==="plus") {
                        return(
                            <div className="plus">
                                <IoAddSharp />
                            </div>
                        );
                    } else if(right==="create") {
                        return(
                            <div className="create">
                                <p>등록</p>
                            </div>
                        );
                    } else if(right==="null") {
                        return(
                            <div className="null"></div>
                        );
                    }
                }}
            </div>

        </div>
    );
};

export default TopBar;