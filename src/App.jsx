import { useState, useEffect } from 'react';
import './App.css';
import { dateArray, strategyArray } from './data.js';

function App() {
  const [selectedView, setSelectedView] = useState('Bullish');
  const [selectedDate, setSelectedDate] = useState(dateArray[0]);
  const [strategies, setStrategies] = useState([]);
  const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);

  useEffect(() => {
    const currentView = strategyArray.find(
      (view) => view.View === selectedView
    );
    const currentStrategies = currentView?.Value[selectedDate] || [];

    const strategyCounts = currentStrategies.reduce((acc, strategy) => {
      acc[strategy] = (acc[strategy] || 0) + 1;
      return acc;
    }, {});

    setStrategies(Object.entries(strategyCounts));
  }, [selectedView, selectedDate]);

  return (
    <div className="app">
      <div className="toggle-container">
        {['Bullish', 'Bearish', 'RangeBound', 'Volatile'].map((view) => (
          <button
            key={view}
            className={`toggle-btn ${selectedView === view ? 'active' : ''}`}
            onClick={() => setSelectedView(view)}
          >
            {view}
          </button>
        ))}
      </div>

      {/* <select
        className="date-dropdown"
        value={selectedDate}
        onChange={(e) => setSelectedDate(e.target.value)}
      >
        {dateArray.map((date) => (
          <option key={date} value={date}>
            {date}
          </option>
        ))}
      </select> */}

      <div className="custom-dropdown">
        <button
          className="dropdown-toggle"
          onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
        >
          {selectedDate}
          <span className={`arrow ${isDateDropdownOpen ? 'open' : ''}`}>▼</span>
        </button>

        {isDateDropdownOpen && (
          <div className="dropdown-options">
            {dateArray.map((date) => (
              <div
                key={date}
                className={`option ${selectedDate === date ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedDate(date);
                  setIsDateDropdownOpen(false);
                }}
              >
                {date}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="strategies-container">
        {strategies.length > 0 ? (
          strategies.map(([name, count]) => (
            <div key={name} className="strategy-card">
              <h3>{name}</h3>
              <p>
                {count} {count === 1 ? 'Strategy' : 'Strategies'}
              </p>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <p>There are no strategies for</p>
            <p>
              <strong>{selectedDate}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
