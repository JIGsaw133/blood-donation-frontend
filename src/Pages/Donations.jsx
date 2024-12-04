import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Donations.css'; // Import the CSS file

function Donations() {
    const [donations, setDonations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [donorId, setDonorId] = useState('');
    const [amount, setAmount] = useState('');
    const [donorBloodType, setDonorBloodType] = useState('');
    const [donorLastDonationDate, setDonorLastDonationDate] = useState('');

    // Fetch donations on component mount
    useEffect(() => {
        fetchDonations();
    }, []);

    const fetchDonations = async () => {
        try {
            const response = await axios.get('http://bloodbanck-env.eba-b4m3cerm.us-east-1.elasticbeanstalk.com/api/donations');
            setDonations(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch donations", error);
            setLoading(false);
        }
    };

    const handleAddDonation = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://bloodbanck-env.eba-b4m3cerm.us-east-1.elasticbeanstalk.com/api/donations', { Donation_ID:donorId, Donor_ID:donorId,Blood_Type:donorBloodType,Quantity: amount,Date: donorLastDonationDate });
            fetchDonations(); // Refresh the list after adding
            setShowModal(false); // Close modal
            setDonorId('');
            setAmount('');
        } catch (error) {
            console.error("Failed to add donation", error);
        }
    };

    return (
        <div className="donations-container">
            <h1>Donations</h1>
            <button className="add-donation-button" onClick={() => setShowModal(true)}>Add Donation</button>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <table className="donations-table">
                    <thead>
                        <tr>
                        <th>Donation ID</th>
                        <th>Donor ID</th>
                        <th>Blood Type</th>
                        <th>Quantity</th>
                        <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map((donation) => (
                            <tr key={donation.id}>
                                <td>{donation["Donation_ID"]}</td>
                                <td>{donation["Donor_ID"]}</td>
                                <td>{donation["Blood_Type"]}</td>
                                <td>{donation.Quantity}</td>
                                <td>{new Date(donation.Date).toLocaleDateString()}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>Add Donation</h2>
                        <form onSubmit={handleAddDonation}>
                            <label>
                                Donor ID:
                                <input
                                    type="text"
                                    value={donorId}
                                    onChange={(e) => setDonorId(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Blood Type:
                                <input
                                    type="text"
                                    value={donorBloodType}
                                    onChange={(e) => setDonorBloodType(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Date:
                                <input
                                    type="date"
                                    value={donorLastDonationDate}
                                    onChange={(e) => setDonorLastDonationDate(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Amount:
                                <input
                                    type="text"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    required
                                />
                            </label>
                            <button type="submit">Add</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Donations;