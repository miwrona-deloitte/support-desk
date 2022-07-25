import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getTickets, reset } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

const Tickets = () => {
    const { tickets, isLoading, isSuccess } = useSelector(state => state.tickets);

    const dispatch = useDispatch();

    // to trigger this on unmount
    useEffect(() => {
        return () => {
            if (isSuccess) {
                dispatch(reset());
            }
        };
    }, [dispatch, isSuccess]);

    useEffect(() => {
        dispatch(getTickets());
    }, [dispatch]);
    if (isLoading) {
        return <Spinner />;
    }

    return (
        <>
            <BackButton url='/' />
            <h1>Tickets</h1>
        </>
    );
};

export default Tickets;
