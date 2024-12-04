// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Transfusions.css'; // Import the CSS file

function Transfusions() {
    const [transfusions, setTransfusions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [currentTransfusion, setCurrentTransfusion] = useState({ });

    // Fetch transfusions on component mount
    useEffect(() => {
        fetchTransfusions();
    }, []);

    const fetchTransfusions = async () => {
        try {
            const response = await axios.get('http://bloodbanck-env.eba-b4m3cerm.us-east-1.elasticbeanstalk.com/api/transfusions');
            setTransfusions(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch transfusions", error);
            setLoading(false);
        }
    };

    const handleAddTransfusion = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://bloodbanck-env.eba-b4m3cerm.us-east-1.elasticbeanstalk.com/api/transfusions', currentTransfusion);
            fetchTransfusions(); // Refresh the list after adding
            setShowModal(false); // Close modal
            setCurrentTransfusion({  }); // Reset form
        } catch (error) {
            console.error("Failed to add transfusion", error);
        }
    };

    return (
        <div className="transfusions-container">
            <h1>Transfusions</h1>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:8}}>
                <button className="add-button" onClick={() => {setShowModal(true); }}>Add</button>
                <table className="transfusions-table">
                    <thead>
                        <tr>
                        <th>Recipient Name</th>
                        <th>Recipient Contact</th>
                        <th>Date</th>
                        <th>Quantity</th>
                        </tr>
                    </thead>
                    <tbody>
                        {transfusions.map((transfusion) => (
                            <tr key={transfusion["Transfusion_ID"]}>
                            <td>{transfusion["Recipient_Name"]}</td>
                            <td>{transfusion["Recipient_Contact"]}</td>
                            <td>{new Date(transfusion.Date).toLocaleDateString()}</td>
                            <td>{transfusion.Quantity}</td>
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
                        <h2>{'Add Transfusion'}</h2>
                        <form onSubmit={handleAddTransfusion}>
                            <label>
                            Recipient Name:
                                <input type="text" value={currentTransfusion.patient} onChange={(e) => setCurrentTransfusion({...currentTransfusion, patient: e.target.value})} required />
                            </label>
                            <br />
                            <label>
                                Date:
                                <input type="date" value={currentTransfusion.date} onChange={(e) => setCurrentTransfusion({...currentTransfusion, date: e.target.value})} required />
                            </label>
                            <br />
                            <label>
                            Recipient Contact:
                                <input type="text" value={currentTransfusion.bloodType} onChange={(e) => setCurrentTransfusion({...currentTransfusion, bloodType: e.target.value})} required />
                            </label>
                            <label>
                            Quantity:
                                <input type="text" value={currentTransfusion.quantity} onChange={(e) => setCurrentTransfusion({...currentTransfusion, quantity: e.target.value})} required />
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

export default Transfusions;