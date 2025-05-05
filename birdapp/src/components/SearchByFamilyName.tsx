import { useState } from "react";

const SearchByFamilyName = () =>{
    //These three useStates are used for setting the name of the output, setting the value of what's being searched, and the search mode.
    const [birdNames, setbirdNames] = useState<string[]>([]);
    const [searchFamilyName, setSearchFamilyName] = useState("");
    
    //With this function, we return the data we want from the user's input
    const fetchbirdNames = async () => {
    try {
        //Attempting to fetch the bird data from the API. At the moment, we are using the scientific name to search for the bird.
        const response = await fetch(`https://nuthatch.lastelm.software/v2/birds?family=${searchFamilyName}`,{
            headers: {
                'API-Key': `${import.meta.env.VITE_BIRD_API_KEY}`, 
            },
        });
        setbirdNames([]); //To avoid bugged results, reset the names.
        console.log('Response Status:', response.status);
        console.log('Response Headers:', response.headers);
        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error Response Body:', errorText);
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Bird Data:', data);
        //We return from the API the data
        var namesToFill = data.entities.map((bird: { name: string }) => bird.name); //Data is mapped from bird object, stores it in namesToFill.
        setbirdNames(namesToFill);
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }


    }


    return(
        <div>
        <input
        type="text"
        placeholder="Enter Scientifiic Name for your bird!"
        onChange= {(e) => setSearchFamilyName(e.target.value)}
        />
        
        <button onClick={() => fetchbirdNames()}>Click me to search!</button>
        <h5>
            {birdNames.length > 0 //if there's anything in the array
            ? `${birdNames} is in the bird family tree!`  //show the bird.
            : "Please search for a valid bird"}
            </h5>
        </div>
    )
    
};

export default SearchByFamilyName;