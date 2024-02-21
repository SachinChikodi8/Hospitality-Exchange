
import React,{useState}from 'react';

import { NavLink } from 'react-router-dom';

const BookRoom1 = () => {
    const [user, setUser] = useState({
        name: "", email: "", phone: ""
    });
    let name, value;

    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }
    
    const PostData = async (e) => {
        e.preventDefault();

        const { name, email, phone } = user;

    }

    return (
        <>
            <section className='bookroom'>
                <div className='container mt-5'>
                    <h2 className='form-title'>BookRoom</h2>
                    <form method='POST' className='bookroom-form' id='bookroom-form'>
                    
                        <div className='from-group'>
                            <input type='text' name='name' id='name' autoComplete='off'
                                value={user.name}
                                onChange={handleInputs}
                                placeholder='Your Name' />
                        </div>

                        <div className='from-group'>
                            <input type='text' name='email' id='email' autoComplete='off'
                                value={user.email}
                                onChange={handleInputs}
                                placeholder='Your email' />
                        </div>

                        <div className='from-group'>
                            <input type='number' name='phone' id='phone' autoComplete='off'
                                value={user.phone}
                                onChange={handleInputs}
                                placeholder='Your Phone Number' />
                        </div>

                        <div className='from-group from-button'>
                            <input type='submit' name='book' id='book' className='form-submit'
                                value='bookroom' onClick={PostData}
                            />
                        </div>

                    </form>
                </div>
            </section>
        </>
    )
}
