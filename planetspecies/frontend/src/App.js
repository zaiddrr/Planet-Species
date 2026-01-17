// import React from 'react';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import EventsPage from './Eventspage';
// import NewsletterPage from './NewsletterPage';
// import ErrorBoundary from './ErrorBoundary';

// function App() {
//   return (
//     <ErrorBoundary>
//       <Router>
//         <Routes>
//           <Route path="/" element={<EventsPage />} />
//           <Route path="/events" element={<EventsPage />} />
//           <Route path="/newsletter" element={<NewsletterPage />} />
//         </Routes>
//       </Router>
//     </ErrorBoundary>
//   );
// }

// export default App;




// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import EventsPage from './Eventspage';
import NewsletterPage from './NewsletterPage';
import ContactPage from './ContactPage'; // NEW
import ErrorBoundary from './ErrorBoundary';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          <Route path="/" element={<EventsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/newsletter" element={<NewsletterPage />} />
          <Route path="/contact" element={<ContactPage />} /> {/* NEW */}
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;






