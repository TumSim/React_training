import { useEffect, useState } from 'react'
import { fetchCustomers, saveCustomer, updateCustomer, deleteCustomer } from '../customersapi';
import { newTraining } from '../trainingsapi';
import { AgGridReact } from 'ag-grid-react';

import NewCustomer from "../Components/Addcustomer";
import Editcustomer from './Editcustomer';
import AddNewTraining from './AddNewTraining';

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import { Button } from '@mui/material';


function CustomerList(){
    const[customers, setCustomers] = useState([]);
    
    const[colDef] = useState([
        {
            cellRenderer: params => <AddNewTraining data = {params.data} setNewTraining={setNewTraining} />
        },
        {field:"firstname", filter: true,floatingFilter: true},
        {field:"lastname", filter: true,floatingFilter: true},
        {field:"streetaddress", filter: true,floatingFilter: true},
        {field:"postcode", filter: true,floatingFilter: true},
        {field:"city", filter: true,floatingFilter: true},
        {field:"email", filter: true,floatingFilter: true},
        {field:"phone", filter: true,floatingFilter: true},
        {
            cellRenderer: params => <Editcustomer data={params.data} handleCustomerUpdate={handleCustomerUpdate} />,
            width: 130
        },
        {
            cellRenderer: params =>
            <Button
            size='small'
            color='error'
            onClick={() => customerDelete(params.data._links.customer.href)}>Delete
            </Button>,
            width: 130
        }
    ])

    useEffect(() =>{
        handleCustomerFetch();
    }, [])


    const setNewTraining = (training) => {
        newTraining(training)
        .catch(err => console.error(err))
    }

    const customerDelete = (url) => {
        deleteCustomer(url)
        .then(() => handleCustomerFetch())
    }

    const handleCustomerUpdate = (url, updatedCustomer) =>{
        updateCustomer(url, updatedCustomer)
        .then(() => handleCustomerFetch())
        .catch(err => console.error(err))
    }

    const handleCustomerFetch = () =>{
        fetchCustomers()
        .then(data => setCustomers(data._embedded.customers))
        .catch(err => console.error(err))
    }


    const handleCustomerSave = (customer) =>{
        saveCustomer(customer)
        .then(() => handleCustomerFetch())
        .catch(err => console.error(err))
    }

    return(
        <>
        <NewCustomer handleCustomerSave={handleCustomerSave}/>
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