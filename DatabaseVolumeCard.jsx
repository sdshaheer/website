import React, { useState } from 'react';
import './DatabaseVolumeCard.css';

const DatabaseVolumeCard = () => {
    const [selectedDate, setSelectedDate] = useState('2025-01-10');

    return (
        <div className="database-volume-container">
            <div className="db-card-header">
                <h2>Database, Volume Dip/Surge</h2>
                <span className="header-toggle">—</span>
            </div>

            <div className="db-card-content">
                {/* ORaaS Database Card */}
                <div className="sub-card oraas-card">
                    <div className="sub-card-header">
                        <h3>ORaaS Database</h3>
                        <div className="icon-clock">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <polyline points="12 6 12 12 16 14"></polyline>
                            </svg>
                        </div>
                    </div>
                    <div className="stats-grid">
                        <div className="stat-item">
                            <span className="stat-label">Session</span>
                            <span className="stat-value">2208</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Version</span>
                            <span className="stat-value">19.0.0.0.0</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Health</span>
                            <span className="stat-value text-muted">Loremipsum</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Status</span>
                            <span className="stat-value text-muted">Loremipsum</span>
                        </div>
                    </div>
                </div>

                {/* Volume Dip/Surge Card */}
                <div className="sub-card volume-card">
                    <div className="sub-card-header">
                        <h3>Volume Dip/Surge</h3>
                        <div className="date-picker-mock">
                            <span className="date-label">Date</span>
                            <div className="date-input-container">
                                <input
                                    type="date"
                                    className="date-input-field"
                                    value={selectedDate}
                                    onChange={(e) => setSelectedDate(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="volume-stats-container">
                        <div className="source-main">
                            <span className="source-label">Source :</span>
                            <span className="source-value underline">1863</span>
                        </div>
                        <div className="volume-metrics-grid">
                            <div className="v-metric-item normal">
                                <span className="v-label">Normal :</span>
                                <span className="v-value">1600</span>
                            </div>
                            <div className="v-metric-item surge">
                                <span className="v-label">Surge :</span>
                                <span className="v-value">83</span>
                            </div>
                            <div className="v-metric-item no-data">
                                <span className="v-label">No Data :</span>
                                <span className="v-value">45</span>
                            </div>
                            <div className="v-metric-item dip">
                                <span className="v-label">Dip :</span>
                                <span className="v-value">135</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DatabaseVolumeCard;
