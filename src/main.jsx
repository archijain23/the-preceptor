import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router';
import { router } from './router';
import './styles.css';

const root = createRoot(document.getElementById('app'));
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
