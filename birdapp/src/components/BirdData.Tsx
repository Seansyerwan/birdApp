import React from "react";
import { useState } from "react";
import SearchByFamilyName from "./searchByFamilyName";


const LookUpBird = () =>{
    //These three useStates are used for setting the name of the output, setting the value of what's being searched, and the search mode.
    const [birdName, setBirdName] = useState("");
    const [selectedSearchMode, setSelectedSearchMode] = useState("family");
    //With this function, we return the data we want from the user's input

    return(
        <div>
            {/*Getting user input for their birds*/}
            <label>Select search type!</label>
            <select value={selectedSearchMode} multiple={true} onChange={(e) => 
                {const chosenOptions = [...e.target.selectedOptions].map(option => option.value);
                setSelectedSearchMode(e.target.value)}}>
                <option value="common">Common Name</option>
                <option value="scientific">Scientific Name</option>
            </select>
        <SearchByFamilyName/>
        </div>
    )
};

export default LookUpBird;