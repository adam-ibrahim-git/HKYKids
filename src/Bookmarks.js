import React, { useEffect, useState } from 'react';
import './Resources.css'
import Header from './Header.js';

//data = {kykidsData} sectionGid = {bookmarkGids} headerText="Bookmarks"
function Bookmarks(props) {
    let uniqueTitles = []

    const storedIds = JSON.parse(localStorage.getItem('ids')) || [];
    const [ids, setIds] = useState(storedIds);

    useEffect(() => {

        localStorage.setItem('ids', JSON.stringify(ids));
        console.log(storedIds);
    }, [ids])


    const UpdateStorage = (gid) => {
        setIds(() => ids.filter((id) => id !== gid))
    }





    for (let object of props.data) {
        for (let gid of ids) {
            if (object.gid === gid && uniqueTitles.indexOf(object.sectionTitle) === -1) {
                uniqueTitles.push(object.sectionTitle);
            }
        }
    }

    return (
        <div className="Resources">
            <Header name={props.headerText} />
            <div className = "cardContainer">
            <div class="splitResources">
                {ids.map((gid, index) => (
                    <>
                        {props.data
                            .filter((item) => item.gid === gid)
                            .map((filteredItem) => (
                                <>
                                    {
                                        Object.hasOwn(filteredItem, 'links') || Object.hasOwn(filteredItem, 'logo') ?
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
                                                <span className="bookmarks"><button onClick={() => UpdateStorage(filteredItem.gid)}><img src="../imgs/bookmark.png"/></button></span>

                                            </div>
                                            :
                                            <div className="onlyText">
                                                {Object.hasOwn(filteredItem, 'description') && filteredItem.description != "" ?
                                                    <span className="text">
                                                        {filteredItem.description.map((desc) => (<p>{desc}</p>))}
                                                    </span> : null}
                                            </div>
                                    }
                                </>
                            ))}
                    </>
                )
                )}
                </div>
            </div>
        </div>
    );

}

export default Bookmarks;