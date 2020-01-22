import React from "react"
import "../stylesheets/caseTable.css"

const CaseTable = (props) => {
    const tableHeaders = ["Unique Key", "District", "Open Date", "Complaint Type", "Descriptor", "Zip", "Borough", "City", "Council District", "Community Board", "Close Date"]

    const generateCells = (data) => {
        return data.map(item => {
            const {unique_key, account, opendate, complaint_type, descriptor, zip, borough, city, council_dist, community_board, closedate} = item
            return (
                <tr className="caseItem" key={unique_key}>
                    <td>{unique_key}</td>
                    <td>{account}</td>
                    <td>{opendate}</td>
                    <td>{complaint_type}</td>
                    <td>{descriptor}</td>
                    <td>{zip}</td>
                    <td>{borough}</td>
                    <td>{city}</td>
                    <td>{council_dist}</td>
                    <td>{community_board}</td>
                    <td>{closedate}</td>
                </tr>
            )
        })
    }

    const generateHeader = (arr) => {
        return arr.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }

    return (
        <div id="caseTableContainer">
            <table id="caseTable">
                <thead>
                    <tr>{generateHeader(tableHeaders)}</tr>
                </thead>
                <tbody>  
                    {generateCells(props.data)}
                </tbody>
            </table>
        </div>
    )
}

export default CaseTable