import { useState } from "react";

const SearchByFamilyName = () =>{
    //These three useStates are used for setting the name of the output, setting the value of what's being searched, and the search mode.
    const [birdName, setBirdName] = useState("");
    const [searchFamilyName, setSearchFamilyName] = useState("");
    
    //With this function, we return the data we want from the user's input
    const fetchBirdName = async () => {
    try {
        //Attempting to fetch the bird data from the API. At the moment, we are using the scientific name to search for the bird.
        const response = await fetch(`https://nuthatch.lastelm.software/v2/birds?family=${searchFamilyName}`,{
            headers: {
                'API-Key': `${import.meta.env.VITE_BIRD_API_KEY}`, 
            },
        });
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
        setBirdName(data|| 'Unknown bird');
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
        
        <button onClick={() => fetchBirdName()}>Click me to search!</button>
        <h5>
            {birdName !== "" 
            ? `${birdName.entities[0].name} is your bird's common name!` 
            : "Please search for a valid bird"}
            </h5>
        </div>
    )
    
};

export default SearchByFamilyName;