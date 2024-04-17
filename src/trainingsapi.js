export const fetchTrainings = () =>{
    return fetch("https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings")
        .then(response =>{
            if (!response.ok)
                throw new Error("Error in fetch" + response.statusText);

        return response.json();
        })
}