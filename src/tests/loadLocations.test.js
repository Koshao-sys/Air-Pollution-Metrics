import React from 'react';
import { Provider } from 'react-redux';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';
import configureMockStore from 'redux-mock-store';
import Home from '../components/Home';

const mockStore = configureMockStore([]);

describe('Home component', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      location: {
        locations: [
          {
            name: 'London',
            lat: 51.5074,
            lon: -0.1278,
            country: 'GB',
            state: 'England',
          },
          {
            name: 'Berlin',
            lat: 52.5200,
            lon: 13.4050,
            country: 'DE',
            state: 'Germany',
          },
        ],
        isLoading: false,
        error: '',
      },
    });
  });

  test('renders Application correctly', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Home />
        </BrowserRouter>
      </Provider>,
    );
    expect(screen.getByText(/London/i)).toBeInTheDocument();
    expect(screen.getByText(/Berlin/i)).toBeInTheDocument();
  });
});
