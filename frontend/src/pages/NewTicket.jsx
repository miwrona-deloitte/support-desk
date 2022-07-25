import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { createTicket, reset } from '../features/tickets/ticketSlice';
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButton';

function NewTicket() {
    const user = useSelector(state => state.auth);
    const { isLoading, isError, isSuccess, message } = useSelector(state => state.ticket);

    const [name] = useState(user.name);
    const [email] = useState(user.emil);
    const [product, setProduct] = useState('iPhone');
    const [description, setDescription] = useState('description ...');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (isError) {
            toast.error(message);
        }

        if (isSuccess) {
            dispatch(reset());
            navigate('/tickets');
        }
        dispatch(reset());
    }, [dispatch, isError, isSuccess, navigate, message]);

    const onSubmit = e => {
        e.preventDefault();
        dispatch(createTicket({ product, description }));
    };

    if (isLoading) {
        return <Spinner />;
    }
    return (
        <>
            <BackButton url='/' />
            <section className='heaading'>
                <h1>Create New Ticket</h1>
                <p>Pleaase fill out the form below</p>
            </section>

            <section className='form'>
                <div className='form-group'>
                    <label htmlFor='name'>Customer Name</label>
                    <input type='text' className='form-control' value={name} />
                </div>
                <div className='form-group'>
                    <label htmlFor='email'>Customer Email</label>
                    <input type='text' className='form-control' value={email} />
                </div>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <label htmlFor='product'>Product</label>
                        <select name='product' id='product' value={product} onChange={e => setProduct(e.target.value)}>
                            <option value='iPhone'>iPhone</option>
                            <option value='MacBook Pro'>Macbook Pro</option>
                            <option value='iMac'>iMac</option>
                            <option value='iPad'>iPad</option>
                        </select>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='description'>Description of the issue</label>
                        <textarea
                            id='description'
                            name='description'
                            className='form-control'
                            placeholder='Description'
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        ></textarea>
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-block'>Submit</button>
                    </div>
                </form>
            </section>
        </>
    );
}

export default NewTicket;
