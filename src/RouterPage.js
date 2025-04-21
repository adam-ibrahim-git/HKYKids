import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Link, useParams }
    from "react-router-dom"; import './Resources.css'
//import Header from './Header.js'; <Header name={programId} />

/* props.data */

function RouterPage(props) {

    const { programId } = useParams();
    console.log("ProgramID", programId);

    return (
        <div className="moreInfoPage">
            
            <div className="splitResources">
                <>
                    {props.data
                        .filter((item) => item.gid === programId)
                        .map((filteredItem) => (
                            <>
                                            <div className="oneProgram">
                                                    
                                                    {Object.hasOwn(filteredItem, 'links') ?
                                                        <span className="links">
                                                            {filteredItem.links.map((link) => <a href={link.link}><button target="_blank">{link.text}</button></a>)}
                                                        </span> : null}
                                                    {Object.hasOwn(filteredItem, 'description') && filteredItem.description != "" ?
                                                        <span className="text">
                                                            {filteredItem.description.map((desc) => (<p>{desc}</p>))}
                                                        </span> : null}

                                                    {Object.hasOwn(filteredItem, 'logo') ?
                                                        <span className="logo"> <img src={filteredItem.logo} alt={filteredItem.sectionTitle} /> </span>
                                                        : null}
                                                    {Object.hasOwn(filteredItem, 'links') ?
                                                        <span className="siteLink">
                                                            {<a href={filteredItem.links[0].link}><button target="_blank">{/* share image */}</button></a>}
                                                        </span> : null}
                                                        
                                                    <span className="routerLink">
                                                        <a href={"#/page/" + filteredItem.gid}><button target="_blank">{/* info image*/}</button></a>
                                                    </span>
                                                        {/*<span className="bookmarks"><button onClick={() => UpdateStorage(filteredItem.gid)}><img src="../imgs/bookmark.png"/></button></span>*/}

                                                </div>

                            </>
                        ))
                    }
                </>


            </div>
        </div>

    );

}

export default RouterPage;