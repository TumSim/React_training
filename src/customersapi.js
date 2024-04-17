export const fetchCustomers = () =>{
    return fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers")
        .then(response =>{
            if (!response.ok)
                throw new Error("Error in fetch" + response.statusText);

        return response.json();
        })
}