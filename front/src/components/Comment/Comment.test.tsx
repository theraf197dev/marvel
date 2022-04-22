import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Comment from './Comment';

describe('<Comment />', () => {
  test('check if data shows properly', () => {
    const testData = {
      username: 'Rafa',
      description: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to`
    }

    const comment = render(<Comment username={testData.username} description={testData.description} />);
    
    const usernameE = comment.getByTestId("username");
    const descripitonE = comment.getByTestId("description");

    expect(usernameE.nodeValue === testData.username);
    expect(descripitonE.nodeValue === testData.description);
  });
});