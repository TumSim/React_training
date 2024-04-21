import axios from "axios"
import * as FileSaver from "file-saver"
import * as XLSX from "xlsx"
import { useEffect, useState } from "react"
import Button from '@mui/material/Button';


function ExportFile(){

    const [data, setData] = useState("")
    const [exceldata, setExceldata] = useState([])

const ExportDataFromApi = () => {
    axios.get("https://customerrestservice-personaltraining.rahtiapp.fi/api/customers")
    .then(response => {
        setData(response.data._embedded.customers);
    })
    .catch(error => console.error('Error fetching customers:', error));
}

const createExcel = () =>{
    const fileName = 'apidata';
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";
    const Heading = [
        ["Firstname", "Lastname", "Streetaddress", "Postcode", "City", "Email", "Phone"]
    ];
    const ws = XLSX.utils.json_to_sheet(exceldata, { origin: 'A2', skipHeader: true });
    XLSX.utils.sheet_add_aoa(ws, Heading, { origin: 'A1' });
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const filedata = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(filedata, fileName + fileExtension);
}

useEffect(() => {
    if (data != "") {
        data.map((apidata) => {
            const rowData = [apidata.firstname, apidata.lastname, apidata.streetaddress, apidata.postcode, apidata.city, apidata.email, apidata.phone]
            setExceldata(prevState => [...prevState, rowData])
        })
    }
}, [data])

useEffect(() => {
    if (exceldata.length > 0) {
        createExcel()
    }

}, [exceldata])

    return (
        <div>
            <Button variant="contained" onClick={ExportDataFromApi}>Export to Excel</Button>
        </div>

    )
}

export default ExportFile