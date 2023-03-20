import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

const mutationCache = new MutationCache({
  onSettled(data, error, variables, context, mutation) {
    // set global error ----
  },
  onError: (error, _variables, _context, mutation) => {
    // set global error ----
    if (mutation.options.onError) return;

    // any error handling code...
  }
});

const queryClient = new QueryClient({ mutationCache })

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>,
)
