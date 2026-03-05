import React from 'react';
import './ApiStatusCard.css';

const StatusBadge = ({ label }) => (
    <div className="status-badge">
        <span className="checkmark-icon"></span>
        {label}
    </div>
);

const ClusterSection = ({ name, services }) => (
    <div className="cluster-section">
        <div className="cluster-name">{name}</div>
        <div className="status-grid">
            {services.map((service, index) => (
                <StatusBadge key={index} label={service} />
            ))}
        </div>
    </div>
);

const ApiStatusCard = () => {
    const services = ['Spark', 'Bulk Data', 'Data', 'JDBC', 'Cache'];

    return (
        <div className="api-status-card">
            <div className="api-status-header">
                <h2>API</h2>
                <span className="api-status-collapse">—</span>
            </div>
            <div className="api-status-content">
                <ClusterSection name="Cluster NJ" services={services} />
                <ClusterSection name="Cluster NY" services={services} />
            </div>
        </div>
    );
};

export default ApiStatusCard;
