import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from "react-router-dom";
import Route from './Routes/Route.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import TravelProvider from './Provider/TravelProvider.jsx';
import EntertainmentProvider from './Provider/EntertainmentProvider.jsx';
import { store } from './app/store.js';
import { Provider } from 'react-redux';


const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <EntertainmentProvider>
            <TravelProvider>
              <RouterProvider router={Route} />
              <ToastContainer />
            </TravelProvider>
          </EntertainmentProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
)
