import { useEffect, useState } from 'react'
import { fetchCustomers } from '../customersapi';
import { AgGridReact } from 'ag-grid-react';

import NewCustomer from "../Components/Addcustomer";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from '@mui/material';


function CustomerList(){
    const[customers, setCustomers] = useState([]);
    
    const[colDef] = useState([
        {field:"firstname", filter: true,floatingFilter: true},
        {field:"lastname", filter: true,floatingFilter: true},
        {field:"streetaddress", filter: true,floatingFilter: true},
        {field:"postcode", filter: true,floatingFilter: true},
        {field:"city", filter: true,floatingFilter: true},
        {field:"email", filter: true,floatingFilter: true},
        {field:"phone", filter: true,floatingFilter: true},
        {
            cellRenderer: params =>
            <Button
            size='small'
            color='error'
            onClick={() => deleteCustomer(params.data._links.customer.href)}>Delete
            </Button>,
            width: 150
        }
    ])

    useEffect(() =>{
        handleCustomerFetch();
    }, [])

    const deleteCustomer = (url) =>{
        if (window.confirm("Are you sure?")) {
            fetch(url, {method: "DELETE"})
            .then(response => {
                if (!response.ok)
                    throw new Error("Error when deleting customer" + response.statusText)
                return response.json();
            })
            .then(() => handleCustomerFetch())
        }
    }


    const handleCustomerFetch = () =>{
        fetchCustomers()
        .then(data => setCustomers(data._embedded.customers))
        .catch(err => console.error(err))
    }

    const saveCustomer = (customer) => {
        fetch("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers", {
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
        .then(() => handleCustomerFetch())
        .catch(err => console.error(err))
    }

    return(
        <>
        <NewCustomer saveCustomer={saveCustomer}/>
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