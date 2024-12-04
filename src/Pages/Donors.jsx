import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Donors.css'; // Import the CSS file

function Donors() {
    const [donors, setDonors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [donorName, setDonorName] = useState('');
    const [donorAge, setDonorAge] = useState('');
    const [donorGender, setDonorGender] = useState('');
    const [donorInfo, setDonorInfo] = useState('');
    const [donorBloodType, setDonorBloodType] = useState('');
    const [donorLastDonationDate, setDonorLastDonationDate] = useState('');
    const [donorMedicalHistory, setDonorMedicalHistory] = useState('');
    const [donorEligibilityStatus, setDonorEligibilityStatus] = useState('');


    // Fetch donors on component mount
    useEffect(() => {
        fetchDonors();
    }, []);

    const fetchDonors = async () => {
        try {
            const response = await axios.get('http://bloodbanck-env.eba-b4m3cerm.us-east-1.elasticbeanstalk.com/api/donors');
            setDonors(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch donors", error);
            setLoading(false);
        }
    };

    const handleAddDonor = async (event) => {
        event.preventDefault();
        try {
            await axios.post('http://bloodbanck-env.eba-b4m3cerm.us-east-1.elasticbeanstalk.com/api/donors', { Name: donorName, Blood_Type: donorBloodType, Age: donorAge,Gender: donorGender, Contact_Info: donorInfo, Last_Donation_Date: donorLastDonationDate, Medical_History: donorMedicalHistory, Eligibility_Status: donorEligibilityStatus });
            fetchDonors(); // Refresh the list after adding
            setShowModal(false); // Close modal
            setDonorName('');
            setDonorBloodType('');
        } catch (error) {
            console.error("Failed to add donor", error);
        }
    };

    return (
        <div className="donors-container">
            <h1>Donors</h1>
            <button className="add-donor-button" onClick={() => setShowModal(true)}>Add Donor</button>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <table className="donors-table">
                    <thead>
                        <tr>
                            <th>Donor ID</th>
                            <th>Name</th>
                            <th>Age</th>
                            <th>Gender</th>
                            <th>Blood Type</th>
                            <th>Contact Info</th>
                            <th>Last Donation Date</th>
                            <th>Medical History</th>
                            <th>Eligibility Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {donors.map((donor) => (
                            <tr key={donor.Donor_ID}>
                                <td>{donor.Donor_ID}</td>
                                <td>{donor.Name}</td>
                                <td>{donor.Age}</td>
                                <td>{donor.Gender}</td>
                                <td>{donor.Blood_Type}</td>
                                <td>{donor.Contact_Info}</td>
                                <td>{donor.Last_Donation_Date.slice(1,10)}</td>
                                <td>{donor.Medical_History}</td>
                                <td>{donor.Eligibility_Status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setShowModal(false)}>&times;</span>
                        <h2>Add Donor</h2>
                        <form onSubmit={handleAddDonor}>
                            <label >
                                Name:
                                <input
                                    type="text"
                                    value={donorName}
                                    onChange={(e) => setDonorName(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Age:
                                <input
                                    type="text"
                                    value={donorAge}
                                    onChange={(e) => setDonorAge(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Gender:
                                <input
                                    type="text"
                                    value={donorGender}
                                    onChange={(e) => setDonorGender(e.target.value)}
                                    required
                                />
                            </label>
                            <label>
                                Contact_Info:
                                <input
                                    type="text"
                                    value={donorInfo}
                                    onChange={(e) => setDonorInfo(e.target.value)}
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
                                Last Donation Date:
                                <input
                                    type="date"
                                    value={donorLastDonationDate}
                                    onChange={(e) => {
                                        setDonorLastDonationDate(e.target.value)
                                        const lastDonationDate = new Date(e.target.value);
                                        const today = new Date();
                                        const diffTime = Math.abs(today - lastDonationDate);
                                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                                        if (diffDays >= 90) {
                                            setDonorEligibilityStatus(1);
                                        } else {
                                            setDonorEligibilityStatus(0);
                                        }
                                    }}
                                    required
                                />
                            </label>
                            <label>
                                Medical History:
                                <input
                                    type="text"
                                    value={donorMedicalHistory}
                                    onChange={(e) => setDonorMedicalHistory(e.target.value)}
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

export default Donors;