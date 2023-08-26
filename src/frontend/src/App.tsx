
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Components } from './components';

const queryClient = new QueryClient()

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
        <Components />
    </QueryClientProvider>
  );
}

export default App;
