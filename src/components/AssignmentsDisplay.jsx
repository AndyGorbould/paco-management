import React from 'react';

export default function AssignmentsDisplay({ pacoA, pacoB }) {
    if (!pacoA && !pacoB) return null;

    const renderAssignmentRows = (assignments) => {
        const roles = [
            { key: 'start', label: 'Start' },
            { key: 'lunchEarly', label: 'Lunch Early' },
            { key: 'lunchLate', label: 'Lunch Late' },
            { key: 'end', label: 'End' }
        ];

        return roles.map(({ key, label }) => (
            <div key={key} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                <span className="text-sm font-medium text-slate-500">{label}</span>
                <span className="text-sm font-semibold text-slate-900">
                    {assignments?.[key] || <span className="text-slate-400 italic">Unassigned</span>}
                </span>
            </div>
        ));
    };

    return (
        <div className="mt-12 bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden translate-y-0 transition-all duration-500 ease-out flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200">

            {/* PACO A Section */}
            <div className="flex-1 p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-700 font-bold text-sm">A</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">PACO A Kant Assignments</h3>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                    {renderAssignmentRows(pacoA)}
                </div>
            </div>

            {/* PACO B Section */}
            <div className="flex-1 p-6">
                <div className="flex items-center space-x-3 mb-6">
                    <div className="h-8 w-8 rounded-full bg-emerald-100 flex items-center justify-center">
                        <span className="text-emerald-700 font-bold text-sm">B</span>
                    </div>
                    <h3 className="text-lg font-bold text-slate-800">PACO B Kant Assignments</h3>
                </div>
                <div className="bg-slate-50 rounded-lg p-4">
                    {renderAssignmentRows(pacoB)}
                </div>
            </div>

        </div>
    );
}
