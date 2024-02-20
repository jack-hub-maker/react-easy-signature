import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import Signature from './index';

describe('<Signature />', () => {
  it('render Signature with dumi', () => {
    const msg = 'dumi';

    render(<Signature title={msg} />);
    expect(screen.queryByText(msg)).toBeInTheDocument();
  });
});
