const apiRequests = {
    apiGetRequest: (headers, cb, complaintType="") => {
        const FETCH_URL = !complaintType ? "/api/complaints/" : `/api/complaints/${complaintType}/`
        fetch(FETCH_URL, {
            headers: headers
        })
        .then(res => res.json())
        .then(json => cb(json, complaintType))
        .catch(console.error)
    },
    apiPostRequest: (headers, body, cb) => {
        fetch("/login/", {
           method: "POST",
           headers: headers,
           body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(json => {
            cb(json)
        })
        .catch(console.error)
    }
}

module.exports = apiRequests