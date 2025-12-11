import {BrowserRouter, Routes, Route} from 'react-router-dom';
import { CreateWorkflow } from './components/CreateWorkflow';
import '@xyflow/react/dist/style.css';
 
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/create-workflow" element={<CreateWorkflow/>} />
      </Routes>
    </BrowserRouter>
  );
}