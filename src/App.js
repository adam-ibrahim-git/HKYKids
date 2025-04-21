import React, { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Papa from 'papaparse';
import Bookmarks from './Bookmarks.js';
import Resources from './Resources.js';
import Header from './Header.js';

function App() {
  const [kykidsData, setData] = useState([]);

  useEffect(() => {
    fetch("kykids.csv")
      .then(response => response.text())  // Get CSV file as text
      .then(csvText => {
        // Parse CSV text into objects; header: true uses first row as keys
        const results = Papa.parse(csvText, { header: true });

        // Process each item to transform the data as needed
        const processedData = results.data.map((item, index) => {
          // Process the 'link' field into an array of objects [{link: , text: },{}]
          let processedLinks = [];
          for (let i = 1; i < 6; i++) {
            if (item[`link ${i}`]) {
              const linkObject = {
                link: item[`link ${i}`].trim(),
                text: item[`link ${i} text`].trim() || ""
              };
              processedLinks.push(linkObject);
            }
          }

          // Process the 'logo' field: Prepend "imgs/" if it's not there already.
          let processedLogo = item.logo;
          if (processedLogo && !processedLogo.startsWith("imgs/")) {
            processedLogo = "imgs/" + processedLogo;
          }

          // Process the 'description' field: Make in an array of paragraphs if it contains new lines.
          let processedDescription = [];

          if (item.description) {
            // Replace literal "\n" with actual newlines, then split, trim, filter
            processedDescription = item.description
              .replace(/\\n/g, "\n")
              .split("\n")
              .map(line => line.trim())
              .filter(line => line.length);
          }

          return {
            ...item,
            links: processedLinks,
            logo: processedLogo,
            description: processedDescription,
          };
        });

        // Update state with the transformed data
        console.log("Processed data:", processedData);
        setData(processedData);
      })
  }, [])

  let allSectionIds = kykidsData.map((object) => object.sectionId)

  let homeSectionIds = ["mission", "members"]
  let activitiesSectionIds = ["programs", "AtHome", "kids-and-parents", "kidAdventures"]
  let childcareSectionIds = ["childcare", "poviders"]
  let preschoolSectionIds = ["HeadstartSection", "PublicPreschool", "PrivatePreschool"]
  let supportSectionIds = ["whatToDo", "AddressConcerns", "newParents", "therapy", "caregivers"]
  let donateSectionIds = ["funding"]
  let otherSectionIds = []

  for (let object of allSectionIds) {
    if (otherSectionIds.indexOf(object) === -1 && homeSectionIds.indexOf(object) === -1 && activitiesSectionIds.indexOf(object) === -1 && childcareSectionIds.indexOf(object) === -1 && preschoolSectionIds.indexOf(object) === -1 && supportSectionIds.indexOf(object) === -1 && donateSectionIds.indexOf(object) === -1) {
      otherSectionIds.push(object);
    }
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Resources data={kykidsData} sectionIds={homeSectionIds} headerText="We believe in putting families first" />} />

        <Route path="/activities" element={<Resources data={kykidsData} sectionIds={activitiesSectionIds} headerText="Activities" />} />

        <Route path="/childcare" element={<Resources data={kykidsData} sectionIds={childcareSectionIds} headerText="Childcare" />} />

        <Route path="/preschool" element={<Resources data={kykidsData} sectionIds={preschoolSectionIds} headerText="Preschool" />} />

        <Route path="/support" element={<Resources data={kykidsData} sectionIds={supportSectionIds} headerText="Support" />} />

        <Route path="/bookmarks" element={<Bookmarks data={kykidsData} headerText="Bookmarks" />} />

        <Route path="/other" element={<Resources data={kykidsData} sectionIds={otherSectionIds} headerText="Other" />} />

        <Route path="/donate" element={<Resources data={kykidsData} sectionIds={donateSectionIds} headerText="Donate" />} />


        <Route path="*" element={<Header name="Page Not Found" />} />
      </Routes>
    </div>
  );
}

export default App;

/* Finished:

<Header />
<Home />
<Other />

To work on:
<Activities data = {kykidsData} sectionIds = {programSectionIds}  />
<Menu />
*/