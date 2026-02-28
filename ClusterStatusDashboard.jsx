import React from 'react';
import './ClusterStatusDashboard.css';

const SuccessIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#38a169" strokeWidth="2" />
        <polyline points="8 12 11 15 16 9" stroke="#38a169" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const WarningIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#d69e2e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
);

const ErrorIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e53e3e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>
);

const StatusItem = ({ label, value, type }) => {
    const isCheckmark = value === 'checkmark';

    return (
        <div className="csd-status-item">
            <span className="csd-status-label">{label}</span>
            <span className={`csd-status-value ${type || ''}`}>
                {isCheckmark ? (
                    <div className="csd-status-indicator">
                        <SuccessIcon />
                    </div>
                ) : (
                    value
                )}
            </span>
        </div>
    );
};

const StatusCard = ({ title, items, hasWarning, hasError }) => {
    return (
        <div className="csd-status-card">
            <div style={{ position: 'relative' }}>
                <h3>{title}</h3>
                {hasWarning && <div className="csd-warning-icon"><WarningIcon /></div>}
                {hasError && <div className="csd-error-icon-top"><ErrorIcon /></div>}
            </div>
            <div className="csd-status-list">
                {items.map((item, index) => (
                    <StatusItem key={index} {...item} />
                ))}
            </div>
        </div>
    );
};

const ClusterStatusDashboard = () => {
    const njStatus = [
        { label: 'Cluster HV1 Status', value: '74%', type: 'error' },
        { label: 'Cluster HV2 Status', value: 'checkmark', type: 'success' },
        { label: 'SMB Status', value: 'checkmark', type: 'success' }
    ];

    const njDetails = [
        { label: 'Zookeeper', value: '05 / 05' },
        { label: 'Broker', value: '16 / 16' },
        { label: 'Schema Registry', value: '02 / 02' },
        { label: 'Connect', value: '06 / 06' },
        { label: 'Connectors', value: '33 / 33' },
        { label: '-', value: '-' }
    ];

    const nyStatus = [
        { label: 'Cluster HV1 Status', value: '58%', type: 'error' },
        { label: 'Cluster HV2 Status', value: 'checkmark', type: 'success' },
        { label: 'SMB Status', value: 'checkmark', type: 'success' }
    ];

    const nyDetails = [
        { label: 'Zookeeper', value: '05 / 05' },
        { label: 'Broker', value: '16 / 16' },
        { label: 'Schema Registry', value: '02 / 02' },
        { label: 'Connect', value: '06 / 06' },
        { label: 'Connectors', value: '33 / 33' },
        { label: '-', value: '-' }
    ];

    return (
        <div className="csd-dashboard">
            <div className="csd-container">
                <div className="csd-header">
                    <div className="csd-header-text">
                        <h2>Messaging - Kafka</h2>
                        <p>Any help info for cluster can be specified here</p>
                    </div>
                    <div className="csd-actions">
                        <div className="csd-badge error">
                            <span>!</span> 1
                        </div>
                        <div className="csd-badge warning">
                            <span>!</span> 1
                        </div>
                        <div style={{ fontSize: '20px', color: '#718096', cursor: 'pointer', paddingBottom: '10px' }}>—</div>
                    </div>
                </div>

                <div className="csd-grid">
                    <div className="csd-section">
                        <div className="csd-group-title">Cluster NJ</div>
                        <div className="csd-cards-wrapper">
                            <StatusCard title="Cluster Status" items={njStatus} hasWarning={true} />
                            <StatusCard title="Cluster Details" items={njDetails} />
                        </div>
                    </div>
                    <div className="csd-section">
                        <div className="csd-group-title">Cluster NY</div>
                        <div className="csd-cards-wrapper">
                            <StatusCard title="Cluster Status" items={nyStatus} hasError={true} />
                            <StatusCard title="Cluster Details" items={nyDetails} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ClusterStatusDashboard;
