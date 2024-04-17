import { useEffect, useState } from 'react'
import { fetchTrainings } from '../trainingsapi';
import { AgGridReact } from 'ag-grid-react';
import dayjs from 'dayjs';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";


function Trainingslist(){
    const[trainings, setTrainings] = useState([]);
    
    const[colDef] = useState([
        {field:"date", filter: true,floatingFilter: true, valueFormatter: params => handleDate(params.valueFormatter)},
        {field:"duration", filter: true,floatingFilter: true},
        {field:"activity", filter: true,floatingFilter: true},
        {field:"customer.firstname", filter: true,floatingFilter: true},
        {field:"customer.lastname", filter: true,floatingFilter: true},
    ])

    useEffect(() =>{
        handleTrainingsfetch();
    }, [])

    const handleDate = (date) =>{
        const formaattedDate = dayjs(date).format("DD-MM-YYYY")
        return formaattedDate
}


    const handleTrainingsfetch = () =>{
        fetchTrainings()
        .then(data => setTrainings(data))
        .catch(err => console.error(err))
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