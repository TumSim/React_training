export const fetchTrainings = () =>{
    return fetch("https://customerrestservice-personaltraining.rahtiapp.fi/gettrainings")
        .then(response =>{
            if (!response.ok)
                throw new Error("Error in fetch" + response.statusText);

        return response.json();
        })
}

export const newTraining = (training) =>{
    return fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings", {
        method: "POST",
        headers: {"content-type":"application/json"},
        body: JSON.stringify(training)
    })
    .then(response =>{
        if (!response.ok)
            throw new Error("Error when adding new training" + response.statusText)
        return response.json();
    })
}

export const deleteTraining = (id) =>{
    if (window.confirm("Are you sure?")) {
        return fetch(`https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/${id}`, {method: "DELETE"})
        .then(response => {
            if (!response.ok)
                throw new Error("Error when deleting training" + response.statusText)
            return response.json();
        })
    }
}