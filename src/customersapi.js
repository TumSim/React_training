export const fetchCustomers = () =>{
    return fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers")
        .then(response =>{
            if (!response.ok)
                throw new Error("Error in fetch" + response.statusText);

        return response.json();
        })
}


export const saveCustomer = (customer) => {
    return fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers", {
        method: "POST",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify(customer)
    })
    .then(response => {
        if(!response.ok)
            throw new Error("Error when adding new customer: " + response.statusText)

        return response.json();
    })
}

export const updateCustomer = (url, updatedCustomer) =>{
    return fetch(url, {
        method: "PUT",
        headers: {"content-type":"application/json"},
        body: JSON.stringify(updatedCustomer)
    })
    .then(response =>{
        if(!response.ok)
            throw new Error("Error when updating" + response.statusText)
        return response.json();
    })
}

export const deleteCustomer = (url) =>{
    if (window.confirm("Are you sure?")) {
        return fetch(url, {method: "DELETE"})
        .then(response => {
            if (!response.ok)
                throw new Error("Error when deleting customer" + response.statusText)
            return response.json();
        })
    }
}