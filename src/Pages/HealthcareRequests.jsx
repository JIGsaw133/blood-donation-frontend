// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HealthcareRequests.css'; // Import the CSS file

function HealthcareRequests() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentRequest, setCurrentRequest] = useState(null);
    const [modalMode, setModalMode] = useState('add'); // 'add' or 'edit'

    // Fetch requests on component mount
    useEffect(() => {
        fetchRequests();
    }, []);

    const fetchRequests = async () => {
        try {
            const response = await axios.get('http://bloodbanck-env.eba-b4m3cerm.us-east-1.elasticbeanstalk.com/api/requests');
            setRequests(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch requests", error);
            setLoading(false);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            Requester_Name: currentRequest.Requester_Name,
            Blood_Type: currentRequest.Blood_Type,
            Urgency_Level: currentRequest.Urgency_Level,
            Quantity: currentRequest.Quantity,
            Requester_Contact: currentRequest.Requester_Contact,
            Status: currentRequest.Status || 'Pending' 
        };

        try {
            if (modalMode === 'add') {
                await axios.post('http://bloodbanck-env.eba-b4m3cerm.us-east-1.elasticbeanstalk.com/api/requests', formData);
            } else {
                await axios.put(`http://bloodbanck-env.eba-b4m3cerm.us-east-1.elasticbeanstalk.com/api/requests/${currentRequest.Request_ID}`, formData);
            }
            fetchRequests(); // Refresh the list after adding/editing
            setShowModal(false); // Close modal
            setCurrentRequest(null); // Reset current request
        } catch (error) {
            console.error("Failed to submit request", error);
        }
    };

    const handleDeleteRequest = async (id) => {
        if (window.confirm("Are you sure you want to delete this request?")) {
            try {
                await axios.delete(`http://bloodbanck-env.eba-b4m3cerm.us-east-1.elasticbeanstalk.com/api/requests/${id}`);
                fetchRequests();
            } catch (error) {
                console.error("Failed to delete request", error);
            }
        }
    };

    return (
        <div className="healthcare-requests-container">
            <h1>Healthcare Requests</h1>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:8}}>
                <button className="add-button" onClick={() => { setModalMode('add'); setCurrentRequest({}),setShowModal(true); }}>Add</button>
                <table className="requests-table">
                    <thead>
                    <tr>
                        <th>Blood Type</th>
                        <th>Quantity</th>
                        <th>Requester Name</th>
                        <th>Requester Contact</th>
                        <th>Urgency Level</th>
                        <th>Status</th>
                        <th>Edit Actions</th>
                        <th>Delete Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                        {requests.map((request) => (
                            <tr key={request["Request_ID"]}>
                            <td>{request["Blood_Type"]}</td>
                            <td>{request.Quantity}</td>
                            <td>{request["Requester_Name"]}</td>
                            <td>{request["Requester_Contact"]}</td>
                            <td>{request["Urgency_Level"]}</td>
                            <td>{request.Status}</td>
                                <td>
                                    <button className="edit-button" onClick={() => { setModalMode('edit'); setCurrentRequest(request); setShowModal(true); }}>Edit</button>
            
                                </td>
                                <td><button className="delete-button" onClick={() => handleDeleteRequest(request.Request_ID)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            )}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>{modalMode === 'add' ? 'Add Request' : 'Edit Request'}</h2>
                        <form onSubmit={handleFormSubmit}>
                            <label>
                            Requester Name:
                                <input type="text" value={currentRequest.Requester_Name} onChange={(e) => setCurrentRequest({...currentRequest, Requester_Name: e.target.value})} required />
                            </label>
                            <br />
                            <label>
                                Blood Type:
                                <input type="text" value={currentRequest.Blood_Type} onChange={(e) => setCurrentRequest({...currentRequest, Blood_Type: e.target.value})} required />
                            </label>
                            <br />
                            <label>
                            Urgency Level:
                                <input type="text" value={currentRequest.Urgency_Level} onChange={(e) => setCurrentRequest({...currentRequest, Urgency_Level: e.target.value})} required />
                            </label>
                            <br />
                            <label>
                                Quantity:
                                <input type="number" value={currentRequest.Quantity} onChange={(e) => setCurrentRequest({...currentRequest, Quantity: e.target.value})} required />
                            </label>
                            <br />
                            <label>
                            Requester Contact:
                                <input type="text" value={currentRequest.Requester_Contact} onChange={(e) => setCurrentRequest({...currentRequest, Requester_Contact: e.target.value})} required />
                            </label>
                            <br />
                            <button type="submit" className="submit-button">Submit</button>
                            <button type="button" className="cancel-button" onClick={() => setShowModal(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default HealthcareRequests;