import React, { useEffect, useState} from 'react'; 
import { Route, Routes} from "react-router-dom";
import Bookmarks from './Bookmarks.js';
import Resources from './Resources.js';
import Header from './Header.js';
import RouterPage from './RouterPage.js';


function App() {
  const [kykidsData, setData] = useState([]);
  useEffect(()=> {
    fetch("kykids.json")
    .then( (data) => data.json())
    .then( (json) => {
        console.log("response", json);
        setData(json);

        
    })
  }, [])
  let allSectionIds = kykidsData.map((object) => object.sectionId)

  let homeSectionIds= ["mission", "members"] 
  let activitiesSectionIds =["programs", "AtHome", "kids-and-parents", "kidAdventures"]
  let childcareSectionIds = ["childcare", "poviders"]
  let preschoolSectionIds = ["HeadstartSection", "PublicPreschool", "PrivatePreschool"]
  let supportSectionIds = ["whatToDo", "AddressConcerns", "newParents", "therapy", "caregivers" ]
  let donateSectionIds= ["funding"] 
  let otherSectionIds = []


  for(let object of allSectionIds){
      if (otherSectionIds.indexOf(object)===-1 && homeSectionIds.indexOf(object)===-1 && activitiesSectionIds.indexOf(object)===-1 && childcareSectionIds.indexOf(object)===-1 && preschoolSectionIds.indexOf(object)===-1 && supportSectionIds.indexOf(object)===-1 && donateSectionIds.indexOf(object)===-1){
        otherSectionIds.push(object);
      }
  }

  console.log("OTHERIDs", otherSectionIds);






  return (
    <div>
      <Routes>
        <Route path ="/" element ={<Resources data = {kykidsData} sectionIds = {homeSectionIds} headerText="We believe in putting families first" />} />

        <Route path ="/activities" element ={<Resources data = {kykidsData} sectionIds = {activitiesSectionIds} headerText="Activities" />} />

        <Route path ="/childcare" element ={<Resources data = {kykidsData} sectionIds = {childcareSectionIds} headerText="Childcare" />} />
        
        <Route path ="/preschool" element ={<Resources data = {kykidsData} sectionIds = {preschoolSectionIds} headerText="Preschool" />} />

        <Route path ="/support" element ={<Resources data = {kykidsData} sectionIds = {supportSectionIds} headerText="Support" />} />

        <Route path ="/bookmarks" element ={<Bookmarks data = {kykidsData} headerText="Bookmarks" />} />

        <Route path ="/other" element ={<Resources data = {kykidsData} sectionIds = {otherSectionIds} headerText="Other" />} />
        
        <Route path ="/donate" element ={<Resources data = {kykidsData} sectionIds = {donateSectionIds} headerText="Donate" />} />

        <Route path ="/page/:programId" element = {<RouterPage data = {kykidsData} headerText= "More" />} />

        <Route path ="/test/" element = {<RouterPage data = {kykidsData} />} />
        

        <Route path ="*" element ={<Header name="Page Not Found" />} />
      </Routes>
    </div>
  );
}

export default App;