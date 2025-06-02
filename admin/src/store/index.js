// Import configureStore() from Redux toolkit:
import { configureStore } from '@reduxjs/toolkit'

// Import books reducer:
import reducerData from './reducer'

// Create Redux store:
export const store = configureStore({
    reducer: {
        reducerData
    }
})
