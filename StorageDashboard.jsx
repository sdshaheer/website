import React from 'react';
import './StorageDashboard.css';

const StatusItem = ({ label, value, status, isPercentage, customColor }) => {
    const getStatusIcon = () => {
        switch (status) {
            case 'success':
                return (
                    <svg className="status-icon success" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                );
            case 'warning':
                return (
                    <svg className="status-icon warning" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                        <line x1="12" y1="9" x2="12" y2="13"></line>
                        <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                );
            case 'danger':
                return (
                    <svg className="status-icon danger" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                    </svg>
                );
            case 'diamond':
                return (
                    <svg className="status-icon danger" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="5" y="5" width="14" height="14" transform="rotate(45 12 12)"></rect>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                )
            default:
                return null;
        }
    };

    const valueStyle = {
        color: customColor || (isPercentage ? '#d97706' : 'inherit'),
        fontWeight: isPercentage ? 'bold' : 'normal'
    };

    return (
        <div className="status-item">
            <span className="status-label">{label}</span>
            <div className="status-value-container">
                <span className="status-value" style={valueStyle}>{value}</span>
                {status && <span className="status-icon-wrapper">{getStatusIcon()}</span>}
            </div>
        </div>
    );
};

const TechStatusCard = ({ title, items, children }) => {
    return (
        <div className="tech-card">
            <h3 className="tech-title">{title}</h3>
            <div className="tech-items-container">
                {items.map((item, index) => (
                    <StatusItem key={index} {...item} />
                ))}
            </div>
            {children}
        </div>
    );
};

const AlertIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
        <line x1="12" y1="9" x2="12" y2="13"></line>
        <line x1="12" y1="17" x2="12.01" y2="17"></line>
    </svg>
);

const StorageDashboard = () => {
    const njClusterData = {
        hadoop: [
            [
                { label: 'Health', value: '', status: 'success' },
                { label: 'Utilization', value: '74%', isPercentage: true },
                { label: 'Storage Capacity', value: '39/74 PIB' },
            ],
            [
                { label: 'Namenode', value: '', status: 'diamond' },
                { label: 'HBase', value: '', status: 'warning' },
                { label: 'Hive', value: '', status: 'warning' },
                { label: 'Zookeeper', value: '', status: 'warning' },
            ]
        ],
        elastic: [
            { label: 'Health', value: '74%', isPercentage: true },
            { label: 'Data node', value: '27/27' },
            { label: 'Kibana', value: '01/09' },
            { label: 'Cluster capacity', value: '123456' },
        ],
        gemfire: [
            { label: 'Health', value: '68%', isPercentage: true },
            { label: 'Regions', value: '132' },
            { label: 'Clients', value: '20/20' },
            { label: 'capacity', value: '123456' },
        ]
    };

    const nyClusterData = {
        hadoop: [
            { label: 'Health', value: '', status: 'success' },
            { label: 'Utilization', value: '74%', isPercentage: true },
            { label: 'Storage Capacity', value: '39/74 PIB' },
            { label: 'File directory', value: '132.39Mn' },
            { label: 'Namenode', value: '', status: 'diamond' },
            { label: 'HBase', value: '', status: 'warning' },
            { label: 'Hive', value: '', status: 'warning' },
            { label: 'Zookeeper', value: '', status: 'warning' },
            { label: 'Hue', value: '', status: 'warning' },
        ],
        elastic: [
            { label: 'Health', value: '74%', isPercentage: true },
            { label: 'Data node', value: '27/27' },
            { label: 'Kibana', value: '01/09' },
            { label: 'Cluster capacity', value: '123456' },
        ],
        gemfire: [
            { label: 'Health', value: '68%', isPercentage: true },
            { label: 'Regions', value: '132' },
            { label: 'Clients', value: '20/20' },
            { label: 'capacity', value: '123456' },
        ]
    };

    return (
        <div className="storage-dashboard">
            <div className="dashboard-header">
                <h1 className="header-title">Storage–Hadoop, Elastic, GemFire</h1>
                <span className="header-dash">—</span>
            </div>

            <div className="clusters-grid">
                {/* NJ Cluster */}
                <div className="cluster-section cluster-nj">
                    <span className="cluster-label">Cluster NJ</span>
                    <div className="tech-cards-container">
                        <div className="tech-card hadoop-card nj-hadoop">
                            <h3 className="tech-title">Hadoop</h3>
                            <div className="tech-items-flex-container">
                                <div className="tech-list-left">
                                    {njClusterData.hadoop[0].map((item, index) => (
                                        <StatusItem key={index} {...item} />
                                    ))}
                                </div>
                                <div className="tech-list-right">
                                    {njClusterData.hadoop[1].map((item, index) => (
                                        <StatusItem key={index} {...item} />
                                    ))}
                                </div>
                            </div>
                            <div className="alert-banner">
                                <AlertIcon />
                                <span>Cluster is in bad and concerning health</span>
                            </div>
                        </div>
                        <TechStatusCard title="Elastic" items={njClusterData.elastic} />
                        <TechStatusCard title="GemFire" items={njClusterData.gemfire} />
                    </div>
                </div>

                {/* NY Cluster */}
                <div className="cluster-section cluster-ny">
                    <span className="cluster-label">Cluster NY</span>
                    <div className="tech-cards-container">
                        <TechStatusCard title="Hadoop" items={nyClusterData.hadoop}>
                            <div className="alert-banner mini">
                                <AlertIcon />
                                <span>Cluster is in bad and concernin...</span>
                            </div>
                        </TechStatusCard>
                        <TechStatusCard title="Elastic" items={nyClusterData.elastic} />
                        <TechStatusCard title="GemFire" items={nyClusterData.gemfire} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StorageDashboard;
