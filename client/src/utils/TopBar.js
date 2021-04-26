import React from 'react';
import {useSelector} from 'react-redux';
import { IoAddSharp, IoChevronBackSharp, IoCloseSharp } from "react-icons/io5";
import { HiOutlineRefresh } from "react-icons/hi";
import '../styles/top_bar.scss';

const TopBar = () => {
    const topbar = useSelector(state => state.topbar); //left, center, right, lfunc, rfunc, size

    const getLeft = () => {
        if(topbar.left==="back") {
            return(
                <div className="back" onClick={topbar.lfunc}>
                    <IoChevronBackSharp />
                </div>
            );
        } else if(topbar.left==="null") {
            return(
                <div className="null"></div>
            );
        } else if(topbar.left==="cancel") {
            return(
                <div className="cancel" onClick={topbar.lfunc}>
                    <p>취소</p>
                </div>
            );
        }
    }

    const getRight = () => {
        if(topbar.right==="cancel") {              //x표시
            return(
                <div className="cancel" onClick={topbar.rfunc}>
                    <IoCloseSharp />
                </div>
            );
        } else if(topbar.right==="plus") {         //+표시
            return(
                <div className="plus" onClick={topbar.rfunc}>
                    <IoAddSharp />
                </div>
            );
        } else if(topbar.right==="create") {
            return(
                <div className="create" onClick={topbar.rfunc}>
                    <p>등록</p>
                </div>
            );
        } else if(topbar.right==="refresh") {      //새로고침
            return(
                <div className="refresh" onClick={topbar.rfunc}>
                    <HiOutlineRefresh />
                </div>
            );
        } else if(topbar.right==="null") {
            return(
                <div className="null"></div>
            );
        }
    }
    
    return (
        <header className="topBar" id={topbar.size}>  {/* size param(small or big)에 따라서 css결정 */}
            
            {/* left option : {back, null, cancel} */}
            <div className="left">
                {getLeft()}
            </div>

            {/* center option : {title}, {date, null} */}
            <div className="center">
                <p>{topbar.center.title}</p>
                {topbar.center.data!==null ?
                    <p className="data">
                        {topbar.center.data}
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