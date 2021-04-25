import React from 'react';
import { IoAddSharp, IoChevronBackSharp, IoCloseSharp } from "react-icons/io5";
import { HiOutlineRefresh } from "react-icons/hi";
import '../styles/top_bar.scss';

const TopBar = ({left, center, right, lfunc, rfunc, size}) => {
    const getLeft = () => {
        if(left==="back") {
            return(
                <div className="back" onClick={lfunc}>
                    <IoChevronBackSharp />
                </div>
            );
        } else if(left==="null") {
            return(
                <div className="null"></div>
            );
        } else if(left==="cancel") {
            return(
                <div className="cancel" onClick={lfunc}>
                    <p>취소</p>
                </div>
            );
        }
    }

    const getRight = () => {
        if(right==="cancel") {              //x표시
            return(
                <div className="cancel" onClick={rfunc}>
                    <IoCloseSharp />
                </div>
            );
        } else if(right==="plus") {         //+표시
            return(
                <div className="plus" onClick={rfunc}>
                    <IoAddSharp />
                </div>
            );
        } else if(right==="create") {
            return(
                <div className="create" onClick={rfunc}>
                    <p>등록</p>
                </div>
            );
        } else if(right==="refresh") {      //새로고침
            return(
                <div className="refresh" onClick={rfunc}>
                    <HiOutlineRefresh />
                </div>
            );
        } else if(right==="null") {
            return(
                <div className="null"></div>
            );
        }
    }
    
    return (
        <header className="topBar" id={size}>  {/* size param(small or big)에 따라서 css결정 */}
            
            {/* left option : {back, null, cancel} */}
            <div className="left">
                {getLeft()}
            </div>

            {/* center option : {title}, {date, null} */}
            <div className="center">
                <p>{center.title}</p>
                {center.data!==null ?
                    <p className="data">
                        {center.data}
                    </p>
                : 
                    null
                }
            </div>

            {/* right option : {cancel, plus, create, null} */}
            <div className="right">
                {getRight()}
            </div>

        </header>
    );
};

export default TopBar;