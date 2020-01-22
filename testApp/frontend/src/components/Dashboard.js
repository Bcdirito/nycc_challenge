import React, { Component } from 'react'
import DistrictInfoBanner from "./DistrictInfoBanner"
import CaseTable from "./CaseTable"
import "../stylesheets/dashboard.css"

const {apiGetRequest} = require("../utils/apiCalls")

export default class Dashboard extends Component {
    state = {
        cases: [],
        openCases: 0,
        closedCases: 0,
        topComplaint: "",
        headers: {
            "Content-Type": "application/json",
            "Access": "application/json",
            "Authorization": localStorage.ccToken
        }
    }

    componentDidMount = () => {
        apiGetRequest(this.state.headers, this.updateData)
        apiGetRequest(this.state.headers, this.updateData, "openCases")
        apiGetRequest(this.state.headers, this.updateData, "closedCases")
        apiGetRequest(this.state.headers, this.updateData, "topComplaints")
    }

    updateData = (data, key) => {
        if (key === "topComplaints") this.setState({...this.state, topComplaint: data[0]["complaint_type"]})
        else if (key === "openCases" || key === "closedCases") this.setState({...this.state, [key]: data.length})
        else this.setState({...this.state, cases: [...data]})
    }

    render() {
        return (
            <div className="dashboard">
                <CaseTable data={this.state.cases}/>
                <DistrictInfoBanner open={this.state.openCases} closed={this.state.closedCases} top={this.state.topComplaint} /> 
            </div>
        )
    }
}
