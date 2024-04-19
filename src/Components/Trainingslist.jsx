import { useEffect, useState } from 'react'
import { fetchTrainings } from '../trainingsapi';
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';
import { Button } from '@mui/material';
import { deleteTraining } from '../trainingsapi';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";

const handleDate = (params) =>{
    const formaattedDate = dayjs(params.value).format("DD.MM.YYYY / HH.mm")
    return formaattedDate
}


function Trainingslist(){
    const[trainings, setTrainings] = useState([]);
    
    const[colDef] = useState([
        {field:"date", filter: true,floatingFilter: true, valueFormatter: handleDate},
        {field:"duration", filter: true,floatingFilter: true},
        {field:"activity", filter: true,floatingFilter: true},
        {field:"customer.firstname", filter: true,floatingFilter: true},
        {field:"customer.lastname", filter: true,floatingFilter: true},
        {
            cellRenderer: params =>
            <Button
            size='small'
            color='error'
            onClick={() => handleDeleteTraining(params.data.id)}>Delete
            </Button>,
            width: 130
        }
    ])

    useEffect(() =>{
        handleTrainingsfetch();
    }, [])


    const handleTrainingsfetch = () =>{
        fetchTrainings()
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
    }

    const handleDeleteTraining = (id) => {
        deleteTraining(id)
        .catch(err => console.error(err))
        .then(() => handleTrainingsfetch())
    }
    
    return(
        <>
        <div className='ag-theme-material' style={{height: 600}}>
        <AgGridReact
            rowData={trainings}
            columnDefs={colDef}
            pagination={true}
            paginationAutoPageSize={true}
            suppressCellFocus={true}
        />
        </div>
        </>
    )
}
export default Trainingslist;