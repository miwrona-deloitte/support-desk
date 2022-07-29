import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTicket, closeTicket } from '../features/tickets/ticketSlice';
import { getNotes, reseta as notesReset } from '../features/notes/noteSlice';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import NoteItem from '../components/NoteItem';

function Ticket() {
    const { ticket, isLoading, isSuccess, isError, message } = useSelector(state => state.tickets);
    const { notes, isLoading: notesIsLoading } = useSelector(state => state.notes);

    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { ticketId } = useParams();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        dispatch(getTicket(ticketId));
        dispatch(getNotes(ticketId));
        // eslint-disable-next-line
    }, [isError, message, ticketId]);

    const onTicketClose = () => {
        dispatch(closeTicket(ticketId));
        toast.success('Ticket Closed');
        navigate('/tickets');
    };

    if (isLoading || notesIsLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h3>Something went wrong</h3>;
    }

    return (
        <div className='ticket-page'>
            <div className='ticket-header'>
                <header className='ticket-page'>
                    <BackButton url='/tickets' />
                    <h2>
                        Ticket ID: {ticket._id}
                        <span className={`status status-${ticket.status}`}>{ticketId.status}</span>
                    </h2>
                    <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}</h3>
                    <h3>{ticket.product}</h3>
                    <hr />
                    <div className='ticket-desc'>
                        <h3>Description of issue</h3>
                        <p>{ticket.description}</p>
                    </div>
                    <h2>Notes: </h2>
                </header>
                {notes.map(note => (
                    <NoteItem key={note._id} note={note} />
                ))}
                {ticket.status !== 'closed' && (
                    <button className='btn btn-block btn-danger' onClick={onTicketClose}>
                        Close Ticket
                    </button>
                )}
            </div>
        </div>
    );
}

export default Ticket;
