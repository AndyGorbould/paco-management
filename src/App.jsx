import React, { useState } from 'react';
import StaffAssignmentPage from './components/StaffAssignmentPage';
import AssignmentsDisplay from './components/AssignmentsDisplay';

function App() {
  const [activeTab, setActiveTab] = useState('leader');
  const [savedAssignments, setSavedAssignments] = useState(null);

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      {/* Tab Navigation */}
      <div className="bg-white border-b border-slate-200 shadow-sm sticky top-0 z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-indigo-600">PACO Manager</span>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <button
                  onClick={() => setActiveTab('leader')}
                  className={`${activeTab === 'leader'
                      ? 'border-indigo-500 text-slate-900'
                      : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors`}
                >
                  Team Leader View
                </button>
                <button
                  onClick={() => setActiveTab('worker')}
                  className={`${activeTab === 'worker'
                      ? 'border-indigo-500 text-slate-900'
                      : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                    } inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors`}
                >
                  Worker View
                </button>
              </div>
            </div>

            {/* Mobile Tab Select (shown only on small screens) */}
            <div className="sm:hidden flex items-center">
              <select
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
              >
                <option value="leader">Team Leader View</option>
                <option value="worker">Worker View</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main>
        {activeTab === 'leader' ? (
          <StaffAssignmentPage
            savedAssignments={savedAssignments}
            onSaveAssignments={setSavedAssignments}
          />
        ) : (
          <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Today's Assignments</h1>
              <p className="mt-2 text-slate-600">Current shift allocations for both PACO Kant sections</p>
            </div>
            {savedAssignments ? (
              <AssignmentsDisplay
                pacoA={savedAssignments.pacoA}
                pacoB={savedAssignments.pacoB}
              />
            ) : (
              <div className="text-center py-12 bg-white rounded-xl border border-slate-200 shadow-sm">
                <svg className="mx-auto h-12 w-12 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-slate-900">No Assignments Yet</h3>
                <p className="mt-1 text-sm text-slate-500">The Team Leader has not published today's assignments.</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
