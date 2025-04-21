import React, { useEffect, useState } from 'react';
import './Resources.css'
import Header from './Header.js';


/* props.data, props.sectionIds, props.headerText*/

function Resources(props) {

    let uniqueTitles = []
    console.log("props.data", props.data);

    const storedIds = JSON.parse(localStorage.getItem('ids')) || [];
    const [ids, setIds] = useState(storedIds)
  
    useEffect(() => {
        
        localStorage.setItem('ids', JSON.stringify(ids));
        console.log(storedIds);
    }, [ids])

    for (let object of props.data) {
        for (let id of props.sectionIds) {
            if (object.sectionId === id && uniqueTitles.indexOf(object.sectionTitle) === -1) {
                uniqueTitles.push(object.sectionTitle);
            }
        }
    }


  const UpdateStorage = (gid) => {
    let exists = false;
    for (let id of ids) {
        if (gid == id) {
            exists = true;
        }
    }
    if (exists == false) {
        console.log("UPDATE STORAGE RUNNING")
        setIds([...ids, gid])
        gid = ''
    }
}



    console.log("uniqueTitles", uniqueTitles)
    console.log("props", props.data)

    return (
        <div className="Resources">
            <Header name={props.headerText} />
            <div class="splitResources">
                {props.sectionIds.map((id, index) => (
                    <>
                        <div className="uniqueTitle"><h2>{uniqueTitles[index]}</h2></div>
                        <div className = "cardContainer">
                            {props.data
                                .filter((item) => item.sectionId === id)
                                .map((filteredItem) => (
                                    <>
                                            {Object.hasOwn(filteredItem, 'links') || Object.hasOwn(filteredItem, 'logo') ?
                                                
                                                
                                                <div className="oneProgram">
                                                    
                                                    {/* Commented out links, will move to router page */}
                                                    {/* {Object.hasOwn(filteredItem, 'links') ?
                                                        <span className="links">
                                                            {filteredItem.links.map((link) => <a href={link.link}><button target="_blank">{link.text}</button></a>)}
                                                        </span> : null} */}
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
                        </div>
                    </>
                )
                )}

            </div>
        </div>
    );

}

export default Resources;