/********************************************************************************
* WEB322 – Assignment 02
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecacollege.ca/about/policies/academic-integrity-policy.html
*
* Name: Siya Khanna Student ID: 145964227 Date: 02/02/2024
*
********************************************************************************/

// TESTING CODE //

// const setData = require("../data/setData");
// const themeData = require("../data/themeData");

// var sets = [];

// // The use of this function is to initialize the sets of array by adding the copies of the setData content
// function Initialize() 
// {
//     sets = [];

//     setData.forEach((set) => 
//     {
//         const themeId = set.theme_id;
//         const themeObject = themeData.find((theme) => theme.id === themeId);

//         if (themeObject) 
//         {
//             const newSet = 
//             {
//                 ...set,
//                 theme: themeObject.name
//             };
//             sets.push(newSet);
//         }
//     });
// }

// // The use of this function is to simply return all the set of the arrAys 
// function getAllSets() 
// {
//     return sets;
// }

// //The use of this fucntion is to return the "sets" of content from the "sets" of the 
// //declared arrays in which "set_num" values matches with the "setNum" parameter
// function getSetByNum(setNum) 
// {
//     return sets.find((set) => set.set_num === setNum);
// }

// //The use of this fucntion is to return the "sets" of content from the "sets" of the declared arrays in which "themes" 
// //values matches with the "themes" parameter whose theme property contains the given theme (case-insensitive)
// function getSetsByTheme(theme) 
// {
//     const lowerCaseTheme = theme.toLowerCase();
//     return sets.filter((set) => set.theme.toLowerCase().includes(lowerCaseTheme));
// }

// module.exports = 
// {
//     Initialize,
//     getAllSets,
//     getSetByNum,
//     getSetsByTheme,
// };


// REFACTORED CODE

const setData = require("../data/setData");
const themeData = require("../data/themeData");

var sets = [];

// The use of this function is to initialize the sets of array by adding the copies of the setData content
function Initialize() 
{
  return new Promise((resolve) => 
  {
    sets = setData.map((set) => 
    {
      const themeMatch = themeData.find((theme) => theme.id === set.theme_id);
      return {
        ...set,
        theme: themeMatch ? themeMatch.name : "Unknown Theme",
      };
    });
    resolve();
  });
}

// The use of this function is to simply return all the set of the arrays 
function getAllSets() 
{
  return new Promise((resolve) => 
  {
    resolve(sets);
  });
}

// The use of this fucntion is to return the "sets" of content from the "sets" of the 
// declared arrays in which "set_num" values matches with the "setNum" parameter
function getSetByNum(setNum) 
{
  return new Promise((resolve, reject) => 
  {
    const foundSet = sets.find((set) => set.set_num === setNum);
    if (foundSet) 
    {
      resolve(foundSet);
    } 
    
    else 
    {
      reject("Unable to find requested set");
    }
  });
}

// The use of this fucntion is to return the "sets" of content from the "sets" of the declared arrays in which "themes" 
// values matches with the "themes" parameter whose theme property contains the given theme (case-insensitive)
function getSetsByTheme(theme) 
{
  return new Promise((resolve, reject) => 
  {
    const searchTerm = theme.toLowerCase();
    const filteredSets = sets.filter((set) =>
      set.theme.toLowerCase().includes(searchTerm)
    );

    if (filteredSets.length > 0) 
    {
      resolve(filteredSets);
    } 
    
    else 
    {
      reject("Unable to find requested sets");
    }
  });
}

module.exports = 
{
  Initialize,
  getAllSets,
  getSetByNum,
  getSetsByTheme,
};
