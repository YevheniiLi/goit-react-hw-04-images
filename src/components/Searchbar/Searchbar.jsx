import { useState } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import { Header, Form, FormButton, FormInput } from './Searchbar.styled';

export const Searchbar = ({onSubmit}) => {
 
const [searchName, setSearchName] = useState('');


  const handleNameChange = e => {
    setSearchName(e.target.value);
  };

  const submitForm = e => { 
    e.preventDefault();
    if (searchName.trim() === '') {
      toast.warn('Please enter a request', {
        theme: 'colored',
      });
      return;
    }

    onSubmit(searchName);
    setSearchName('');
  };

 

  
    return (
      <Header>
        <Form onSubmit={submitForm}>
          <FormButton type="submit" className="button">
            <ImSearch style={{ width: 20, height: 20 }} />
          </FormButton>

          <FormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchName}
            onChange={handleNameChange}
          />
        </Form>
      </Header>
    );
  }

  Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };