import React, { useContext } from 'react';
import { EntertainmentContext } from '../../Provider/EntertainmentProvider';

const useEntertainmentData = () => {

    const entertainmentData = useContext(EntertainmentContext)
    return entertainmentData;
};

export default useEntertainmentData;