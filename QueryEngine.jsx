import React from 'react';
import './QueryEngine.css';

const QueryStatus = ({ running, failed, oom }) => (
    <div className="query-sub-card">
        <h3 className="sub-card-title">Query Status</h3>
        <div className="status-row">
            <span className="status-label">Running</span>
            <span className="status-value">{running}</span>
        </div>
        <div className="status-row">
            <span className="status-label">Failed</span>
            <span className="status-value failed">{failed}</span>
        </div>
        <div className="status-row">
            <span className="status-label">OoM</span>
            <span className="status-value">{oom}</span>
        </div>
    </div>
);

const ExecutionLatency = ({ latency }) => (
    <div className="query-sub-card center-content">
        <h3 className="sub-card-title">Execution Laten...</h3>
        <div className="latency-value">{latency}</div>
    </div>
);

const ClusterStatus = ({ activeNodes, freeMemory }) => (
    <div className="query-sub-card">
        <h3 className="sub-card-title">Cluster Status</h3>
        <div className="status-row">
            <span className="status-label">Active Nodes</span>
            <span className="status-value">{activeNodes}</span>
        </div>
        <div className="status-row">
            <span className="status-label">Free Memory</span>
            <span className="status-value">{freeMemory}</span>
        </div>
    </div>
);

const ClusterSection = ({ clusterName, data }) => (
    <div className="cluster-section">
        <h4 className="cluster-label">{clusterName}</h4>
        <div className="cluster-cards">
            <QueryStatus {...data.queryStatus} />
            <ExecutionLatency latency={data.latency} />
            <ClusterStatus {...data.clusterStatus} />
        </div>
    </div>
);

const QueryEngine = () => {
    const njData = {
        queryStatus: { running: 0, failed: 0.01, oom: 0 },
        latency: '1.44 Sec',
        clusterStatus: { activeNodes: 100, freeMemory: '11.93 TiB' }
    };

    const nyData = {
        queryStatus: { running: 0, failed: 0.01, oom: 0 },
        latency: '1.44 Sec',
        clusterStatus: { activeNodes: 100, freeMemory: '11.93 TiB' }
    };

    return (
        <div className="query-engine-container">
            <div className="query-engine-header">
                <h2 className="query-engine-title">Query Engine</h2>
                <span className="minimize-icon">−</span>
            </div>
            <div className="query-engine-clusters">
                <ClusterSection clusterName="Cluster NJ" data={njData} />
                <ClusterSection clusterName="Cluster NY" data={nyData} />
            </div>
        </div>
    );
};

export default QueryEngine;
