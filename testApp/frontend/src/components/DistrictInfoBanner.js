import React from "react"
import "../stylesheets/districtInfoBanner.css"

const DistrictInfoBanner = (props) => {
    return (
        <div className="districtInfo">
            <span>Open Cases: {props.open}</span><span>Closed Cases: {props.closed}</span><span>Top Complaint Type: {props.top}</span>
        </div>
    )
}

export default DistrictInfoBanner