import React, { Component } from 'react'
import DistrictInfoBanner from "./DistrictInfoBanner"
import CaseTable from "./CaseTable"
import "../stylesheets/dashboard.css"

const {apiGetRequest} = require("../utils/apiCalls")

export default class Dashboard extends Component {
    state = {
        districtCases: true,
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

    
    componentDidUpdate = (prevProps, prevState) => {
        if (prevState.districtCases !== undefined && prevState.districtCases !== this.state.districtCases) {
            if (this.state.districtCases === true) apiGetRequest(this.state.headers, this.updateData)
            else apiGetRequest(this.state.headers, this.updateData, "constituentComplants")
        }
    }

    toggleCases = () => {
        this.setState({...this.state, districtCases: !this.state.districtCases})
    }

    updateData = (data, key) => {
        if (key === "topComplaints") this.setState({...this.state, topComplaint: data[0]["complaint_type"]})
        else if (key === "openCases" || key === "closedCases") this.setState({...this.state, [key]: data})
        else this.setState({...this.state, cases: [...data]}, () => console.log(this.state))
    }

    renderButton = () => {
        if (this.state.districtCases === true) return <button className="toggleButton" onClick={() => this.toggleCases()}>Constituents' Cases</button>
        else return <button className="toggleButton" onClick={() => this.toggleCases()}>District Cases</button>
    }

    render() {
        return (
            <div className="dashboard">
                <h1>{this.state.districtCases === true ? "Cases in My District" : "Cases Made by My Constituents"} {this.renderButton()}</h1>
                <CaseTable data={this.state.cases}/>
                {this.state.districtCases === true ? <DistrictInfoBanner open={this.state.openCases} closed={this.state.closedCases} top={this.state.topComplaint} /> : null} 
            </div>
        )
    }
}
