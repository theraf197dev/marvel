import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CreateComment from './CreateComment';
import { BACK_URL } from '../../constants';
import axios from 'axios';

describe('<CreateComment />', () => {
  test('call /users/comment servce successfully', () => {
    const back_url = BACK_URL.concat('/users/comment');
    const params = {
      "heroId": 1017100,
      "username": 'Rafa',
      "description": 'Lorem ipsum'
    };

    axios.post(back_url,{params})
      .then(res => {
        expect(res.data === true);
    });
  });
});