import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './SparkDashboard.css';

const SparkDashboard = () => {
    const sharedOptions = {
        chart: {
            backgroundColor: 'transparent',
            style: { fontFamily: "'Inter', sans-serif" },
            spacing: [5, 5, 5, 5]
        },
        title: { text: null },
        credits: { enabled: false },
        legend: { enabled: false },
        yAxis: {
            title: { text: null },
            gridLineColor: '#f1f5f9',
            labels: { style: { color: '#94a3b8', fontSize: '9px' } }
        },
        xAxis: {
            lineColor: '#e2e8f0',
            tickColor: '#e2e8f0',
            labels: { style: { color: '#94a3b8', fontSize: '9px' } }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                borderWidth: 0,
                borderRadius: 0,
                groupPadding: 0.1,
                pointPadding: 0.1
            },
            series: { marker: { symbol: 'circle', radius: 2.5 } }
        }
    };

    const clusterData = {
        NJ: {
            jobCount: {
                categories: ['00.00', '04.00', '08.00', '12.00'],
                series: [
                    { type: 'column', name: 'S1', data: [1100, 1500, 1400, 1100], color: '#edb24a' },
                    { type: 'column', name: 'S2', data: [700, 800, 750, 650], color: '#60a5fa' },
                    { type: 'column', name: 'S3', data: [500, 600, 800, 600], color: '#3d7548' },
                    { type: 'spline', name: 'Mean', data: [400, 2700, 2600, 2300], color: '#f97316', lineWidth: 1.5 }
                ]
            },
            jobDuration: {
                series: [
                    { type: 'column', name: 'Yarn', data: [280, 220, 250, 350], color: '#1e293b' },
                    { type: 'column', name: 'Non-Yarn', data: [150, 180, 320, 300], color: '#3b82f6' },
                    { type: 'column', name: 'Users', data: [50, 60, 40, 50], color: '#60a5fa' },
                    { type: 'line', name: 'Trend', data: [400, 600, 750, 980], color: '#edb24a', dashStyle: 'ShortDash', marker: { enabled: false }, lineWidth: 1 }
                ]
            },
            metrics: { running: '1234', submitted: '123,564', cpu: '35%', ram: '43%' }
        },
        NY: {
            jobCount: {
                categories: ['00.00', '04.00', '08.00', '12.00'],
                series: [
                    { type: 'column', name: 'S1', data: [1100, 1500, 1400, 1100], color: '#edb24a' },
                    { type: 'column', name: 'S2', data: [700, 800, 750, 650], color: '#60a5fa' },
                    { type: 'column', name: 'S3', data: [500, 600, 800, 600], color: '#3d7548' },
                    { type: 'spline', name: 'Mean', data: [400, 2700, 2600, 2300], color: '#f97316', lineWidth: 1.5 }
                ]
            },
            jobDuration: {
                series: [
                    { type: 'column', name: 'Yarn', data: [250, 200, 280, 320], color: '#1e293b' },
                    { type: 'column', name: 'Non-Yarn', data: [180, 150, 350, 280], color: '#3b82f6' },
                    { type: 'column', name: 'Users', data: [60, 50, 50, 60], color: '#60a5fa' },
                    { type: 'line', name: 'Trend', data: [380, 480, 620, 780], color: '#edb24a', dashStyle: 'ShortDash', marker: { enabled: false }, lineWidth: 1 }
                ]
            },
            metrics: { running: '1234', submitted: '123,564', cpu: '35%', ram: '43%' }
        }
    };

    const getOptions = (type, data) => {
        if (type === 'jobCount') {
            return { ...sharedOptions, chart: { ...sharedOptions.chart, height: 220 }, xAxis: { ...sharedOptions.xAxis, categories: data.categories }, series: data.series };
        }
        if (type === 'jobDuration') {
            return { ...sharedOptions, chart: { ...sharedOptions.chart, height: 220 }, series: data.series };
        }
        if (type === 'pie') {
            return {
                ...sharedOptions,
                chart: {
                    ...sharedOptions.chart,
                    height: 85,
                    width: 135,
                    type: 'pie',
                    padding: [0, 0, 0, 0],
                    spacing: [5, 5, 5, 5]
                },
                plotOptions: {
                    pie: {
                        innerSize: '0%',
                        size: '70%',
                        borderWidth: 0,
                        dataLabels: {
                            enabled: true,
                            format: '{point.percentage:.0f}%',
                            distance: 12,
                            connectorWidth: 1,
                            style: { fontSize: '10px', fontWeight: '600' }
                        }
                    }
                },
                series: [{
                    data: data.map(point => ({
                        ...point,
                        dataLabels: {
                            style: { color: point.color }
                        }
                    }))
                }]
            };
        }
        return {};
    };

    const ClusterSection = ({ id, name, data }) => (
        <div className="cluster-section">
            <div className="cluster-header-text">Cluster {name}</div>
            <div className="charts-top-row">
                <div className="chart-white-card">
                    <span className="chart-title-main">Job Count Trend - All</span>
                    <HighchartsReact highcharts={Highcharts} options={getOptions('jobCount', data.jobCount)} />
                    <div style={{ textAlign: 'center' }}><span className="chart-subtitle-small">Job hour window (EST) with Mean</span></div>
                </div>
                <div className="chart-white-card">
                    <div className="chart-header-internal">
                        <span className="chart-title-main">Cumulative Job Duration</span>
                        <span className="chart-subtitle-small">Job types with duration</span>
                    </div>
                    <HighchartsReact highcharts={Highcharts} options={getOptions('jobDuration', data.jobDuration)} />
                    <div className="legend-row-bottom" style={{ justifyContent: 'center' }}>
                        <div className="legend-dot-item"><div className="dot-sq" style={{ background: '#1e293b' }}></div> Yarn</div>
                        <div className="legend-dot-item"><div className="dot-sq" style={{ background: '#3b82f6' }}></div> Non-Yarn</div>
                        <div className="legend-dot-item"><div className="dot-sq" style={{ background: '#60a5fa' }}></div> Users</div>
                    </div>
                </div>
            </div>

            <div className="bottom-white-card">
                <div className="node-status-part">
                    <span className="node-status-label">Node Status</span>
                    {id === 'NJ' ? (
                        <>
                            <div className="status-row-inner">
                                <div className="status-labels-line">
                                    <span>Yarn Node</span>
                                    <span className="status-val-group">
                                        <span style={{ color: '#3d7548' }}>51%</span> &nbsp;&nbsp;
                                        <span style={{ color: '#edb24a' }}>20%</span> &nbsp;&nbsp;
                                        <span style={{ color: '#800000' }}>35%</span>
                                    </span>
                                </div>
                                <div className="health-bar-container">
                                    <div className="bar-segment h" style={{ width: '51%' }}></div>
                                    <div className="bar-segment u" style={{ width: '20%' }}></div>
                                    <div className="bar-segment d" style={{ width: '35%' }}></div>
                                </div>
                            </div>
                            <div className="status-row-inner" style={{ marginBottom: 0 }}>
                                <div className="status-labels-line">
                                    <span>Edge Node</span>
                                    <span className="status-val-group">
                                        <span style={{ color: '#3d7548' }}>34%</span> &nbsp;&nbsp;
                                        <span style={{ color: '#edb24a' }}>66%</span>
                                    </span>
                                </div>
                                <div className="health-bar-container">
                                    <div className="bar-segment h" style={{ width: '34%' }}></div>
                                    <div className="bar-segment u" style={{ width: '66%' }}></div>
                                </div>
                            </div>
                            <div className="legend-row-bottom">
                                <div className="legend-dot-item"><div className="dot-sq h"></div> Healthy</div>
                                <div className="legend-dot-item"><div className="dot-sq u"></div> Unhealthy</div>
                                <div className="legend-dot-item"><div className="dot-sq d"></div> Decommissioned</div>
                            </div>
                        </>
                    ) : (
                        <div className="pie-viz-set">
                            <div className="pie-unit-box">
                                <HighchartsReact highcharts={Highcharts} options={getOptions('pie', [{ y: 95, color: '#3d7548' }, { y: 3, color: '#edb24a' }, { y: 2, color: '#800000' }])} />
                                <span className="pie-caption">Yarn Node</span>
                            </div>
                            <div className="pie-unit-box">
                                <HighchartsReact highcharts={Highcharts} options={getOptions('pie', [{ y: 78, color: '#3d7548' }, { y: 19, color: '#edb24a' }, { y: 3, color: '#800000' }])} />
                                <span className="pie-caption">Edge Node</span>
                            </div>
                            <div className="legend-row-bottom" style={{ gap: '10px' }}>
                                <div className="legend-dot-item"><div className="dot-sq h"></div> Healthy</div>
                                <div className="legend-dot-item"><div className="dot-sq u"></div> Unhealthy</div>
                                <div className="legend-dot-item"><div className="dot-sq d" style={{ backgroundColor: '#800000' }}></div> Decommissioned</div>
                            </div>
                        </div>
                    )}
                </div>

                <div className="vertical-separator"></div>

                <div className="metrics-listing-part">
                    <div className="metric-row-item"><span className="metric-lbl">Running Apps</span><span className="metric-val-num">{data.metrics.running}</span></div>
                    <div className="metric-row-item"><span className="metric-lbl">Submitted Apps</span><span className="metric-val-num">{data.metrics.submitted}</span></div>
                    <div className="metric-row-item"><span className="metric-lbl">CPU</span><span className="metric-val-num">{data.metrics.cpu}</span></div>
                    <div className="metric-row-item"><span className="metric-lbl">RAM</span><span className="metric-val-num">{data.metrics.ram}</span></div>
                </div>
            </div>
        </div>
    );

    return (
        <div className="spark-dashboard">
            <div className="dashboard-header">
                <h2>Processing - Spark on Yarn(Cloudera)</h2>
                <div className="header-actions">—</div>
            </div>
            <div className="cluster-grid">
                <ClusterSection id="NJ" name="NJ" data={clusterData.NJ} />
                <ClusterSection id="NY" name="NY" data={clusterData.NY} />
            </div>
        </div>
    );
};

export default SparkDashboard;
