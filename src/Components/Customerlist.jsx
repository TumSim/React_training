import { useEffect, useState } from 'react'
import { fetchCustomers } from '../customersapi';
import { AgGridReact } from 'ag-grid-react';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";


function CustomerList(){
    const[customers, setCustomers] = useState([]);
    
    const[colDef] = useState([
        {field:"firstname", filter: true,floatingFilter: true},
        {field:"lastname", filter: true,floatingFilter: true},
        {field:"streetaddress", filter: true,floatingFilter: true},
        {field:"postcode", filter: true,floatingFilter: true},
        {field:"city", filter: true,floatingFilter: true},
        {field:"email", filter: true,floatingFilter: true},
        {field:"phone", filter: true,floatingFilter: true}
    ])

    useEffect(() =>{
        handleCustomerFetch();
    }, [])


    const handleCustomerFetch = () =>{
        fetchCustomers()
        .then(data => setCustomers(data._embedded.customers))
        .catch(err => console.error(err))
    }

    return(
        <>
        <div className='ag-theme-material' style={{height: 600}}>
        <AgGridReact
            rowData={customers}
            columnDefs={colDef}
            pagination={true}
            paginationAutoPageSize={true}
            suppressCellFocus={true}
        />
        </div>
        </>
    )
}
export default CustomerList;