import React, { useState, useEffect } from 'react';
import AssignmentsDisplay from './AssignmentsDisplay';

const TEAM_MEMBERS = ['Andy', 'Brahim', 'Emin', 'Gyulten', 'Peter'];
const SHIFT_ROLES = [
  { id: 'start', label: 'Start' },
  { id: 'lunchEarly', label: 'Lunch Early' },
  { id: 'lunchLate', label: 'Lunch Late' },
  { id: 'end', label: 'End' }
];

export default function StaffAssignmentPage({ savedAssignments, onSaveAssignments }) {
  const [pacoA, setPacoA] = useState({
    start: '',
    lunchEarly: '',
    lunchLate: '',
    end: ''
  });

  const [pacoB, setPacoB] = useState({
    start: '',
    lunchEarly: '',
    lunchLate: '',
    end: ''
  });

  // Sync state if assignments were already saved (e.g., navigating back to Leader view)
  useEffect(() => {
    if (savedAssignments) {
      if (savedAssignments.pacoA) setPacoA(savedAssignments.pacoA);
      if (savedAssignments.pacoB) setPacoB(savedAssignments.pacoB);
    }
  }, [savedAssignments]);

  const handlePacoAChange = (field, value) => {
    setPacoA(prev => ({ ...prev, [field]: value }));
  };

  const handlePacoBChange = (field, value) => {
    setPacoB(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSaveAssignments({
      pacoA: { ...pacoA },
      pacoB: { ...pacoB }
    });
  };

  const renderSection = (title, state, onChange) => (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden mb-8 transition-all hover:shadow-md">
      <div className="bg-slate-50 border-b border-slate-200 px-6 py-4">
        <h2 className="text-xl font-bold text-slate-800">{title}</h2>
      </div>
      <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {SHIFT_ROLES.map(({ id, label }) => (
          <div key={id} className="flex flex-col space-y-2">
            <label htmlFor={`${title}-${id}`} className="text-sm font-semibold text-slate-700">
              {label}
            </label>
            <div className="relative">
              <select
                id={`${title}-${id}`}
                value={state[id]}
                onChange={(e) => onChange(id, e.target.value)}
                className="w-full appearance-none rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all duration-200"
              >
                <option value="" disabled>Select Staff</option>
                {TEAM_MEMBERS.map(member => (
                  <option key={member} value={member}>{member}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">
            Staff Assignments
          </h1>
          <p className="text-lg text-slate-600">
            Allocate daily shifts for PACO Kant teams
          </p>
        </div>

        {renderSection("PACO A Kant", pacoA, handlePacoAChange)}
        {renderSection("PACO B Kant", pacoB, handlePacoBChange)}

        <div className="mt-8 flex justify-center">
          <button
            className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
            onClick={handleSave}
          >
            Save Assignments
          </button>
        </div>

        {savedAssignments && (
          <AssignmentsDisplay
            pacoA={savedAssignments.pacoA}
            pacoB={savedAssignments.pacoB}
          />
        )}
      </div>
    </div>
  );
}
