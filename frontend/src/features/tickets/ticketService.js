import axios from 'axios';

const API_URL = '/api/tickets/';

export const createTicket = async (ticketData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL, ticketData, config);

    return response.data;
};

export const getTickets = async token => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL, config);

    return response.data;
};

export const reset = () => {};

const ticketService = {
    createTicket,
    getTickets,
};

export default ticketService;
