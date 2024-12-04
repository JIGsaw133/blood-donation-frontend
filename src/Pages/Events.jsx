// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Events.css';

function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [modalMode, setModalMode] = useState('add');
    const [currentEvent, setCurrentEvent] = useState({});

    // Fetch events on component mount
    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get('http://bloodbanck-env.eba-b4m3cerm.us-east-1.elasticbeanstalk.com/api/events');
            setEvents(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch events", error);
            setLoading(false);
        }
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            Event_ID: events.length + 1,
            Event_Name: currentEvent.Event_Name,
            Date: currentEvent.Date,
            Location: currentEvent.Location,
            Organizer: currentEvent.Organizer,
            Participant_Count: currentEvent.Participant_Count
        };

        try {
            if (modalMode === 'add') {
                await axios.post('http://bloodbanck-env.eba-b4m3cerm.us-east-1.elasticbeanstalk.com/api/events', formData);
            } else {
                await axios.put(`http://bloodbanck-env.eba-b4m3cerm.us-east-1.elasticbeanstalk.com/api/events/${currentEvent.Event_ID}`, formData);
            }
            fetchEvents(); // Refresh the list after adding/editing
            setShowModal(false); // Close modal
            setCurrentEvent(null); // Reset current event
        } catch (error) {
            console.error("Failed to submit event", error);
        }
    };

    const handleDeleteEvent = async (id) => {
        if (window.confirm("Are you sure you want to delete this event?")) {
            try {
                await axios.delete(`http://bloodbanck-env.eba-b4m3cerm.us-east-1.elasticbeanstalk.com/api/events/${id}`);
                fetchEvents();
            } catch (error) {
                console.error("Failed to delete event", error);
            }
        }
    };


    return (
        <div className="events-container">
            <h1>Events</h1>
            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:8}}>
                <button className="add-button" onClick={() => { setModalMode('add');  setShowModal(true); }}>Add</button>
        
                <table className="events-table">
                    
                    <thead>
                        <tr>
                            <th>Event Name</th>
                            <th>Date</th>
                            <th>Location</th>
                            <th>Organizer</th>
                            <th>Participant Count</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {events.map((event) => (
                            <tr key={event["Event_ID"]}>
                            <td>{event["Event_Name"]}</td>
                            <td>{new Date(event.Date).toLocaleDateString()}</td>
                            <td>{event.Location}</td>
                            <td>{event.Organizer}</td>
                            <td>{event["Participant_Count"]}</td>
                                <td>
                                    <button className="edit-button" onClick={() => { setModalMode('edit'); setCurrentEvent(event); setShowModal(true); }}>Edit</button>
                                    <button className="delete-button" onClick={() => handleDeleteEvent(event.Event_ID)}>Delete</button>
                                </td>
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
                        <h2>{modalMode === 'add' ? 'Add Event' : 'Edit Event'}</h2>
                        <form onSubmit={handleFormSubmit}>
                            <label>
                                Title:
                                <input type="text" value={currentEvent.Event_Name} onChange={(e) => setCurrentEvent({...currentEvent, Event_Name: e.target.value})} required />
                            </label>
                            <br />
                            <label>
                                Date:
                                <input type="date" value={currentEvent.Date} onChange={(e) => setCurrentEvent({...currentEvent, Date: e.target.value})} required />
                            </label>
                            <br />
                            <label>
                                Location:
                                <input type="text" value={currentEvent.Location} onChange={(e) => setCurrentEvent({...currentEvent, Location: e.target.value})} required />
                            </label>
                            <label>
                                Organizer:
                                <input type="text" value={currentEvent.Organizer} onChange={(e) => setCurrentEvent({...currentEvent, Organizer: e.target.value})} required />
                            </label>
                            <label>
                                Participant Count:
                                <input type="number" value={currentEvent.Participant_Count} onChange={(e) => setCurrentEvent({...currentEvent, Participant_Count: e.target.value})} required />
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

export default Events;