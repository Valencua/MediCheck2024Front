import React, { createContext, useState, useContext } from 'react';
const EventsContext = createContext();

export function EventsProvider({ children }) {
    const [events, setEvents] = useState(null);

    return (
        <EventsContext.Provider value={{ events, setEvents }}>
            {children}
        </EventsContext.Provider>
    );
}

export function useEvents() {
    return useContext(EventsContext);
}