import { useContext } from 'react';
import { RsiContext } from '../components/Providers.js';

const useRsi = () => useContext(RsiContext);

export { useRsi };
