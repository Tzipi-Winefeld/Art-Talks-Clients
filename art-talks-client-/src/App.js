import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Gallery from './components/Gallery Homepage';
import Discussion from './components/PictureDiscussionPage'; 

const App = () => {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Gallery />} /> 
            <Route path="/discussion/:id" element={<Discussion />} /> 
            </Routes>
        </Router>
    );
};

export default App;
