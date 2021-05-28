import axios from 'axios';
import Fetch from './Fetch';
import { render,waitFor } from '@testing-library/react';

jest.mock('axios');

describe('fetchData', ()=> {
    it('fetches successfully data from an API', async () => {
        const data ={
            data: {
                greeting: "hello",
                url: 'testurl',
                title: 'testtitle',
                date: 'testdate',
                explanation: 'testexplanation'
            } 
        };

        axios.get.mockImplementationOnce(() => Promise.resolve(data));

        const { getByTestId } = render(<Fetch url={'/testing'} />);

        expect(getByTestId('loading')).toHaveTextContent('Loading data...');

        const resolvedTitle = await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
        expect(getByTestId('resolvedtitle')).toHaveTextContent('testtitle - testdate');
    });

    it('fetches erroneously data from an API', async () => {
        const errorMessage = 'Network Error';
     
        axios.get.mockImplementationOnce(() =>
          Promise.reject(new Error(errorMessage)),
        );
    
        await expect(axios.get).rejects.toThrow(errorMessage);
    });
})

