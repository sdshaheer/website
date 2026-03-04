import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import './ControlsDashboard.css';

const CircularProgress = ({ percentage, color = '#22c55e', size = 70 }) => {
    const options = {
        chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            height: size,
            width: size,
            margin: [0, 0, 0, 0],
            spacing: [0, 0, 0, 0]
        },
        title: { text: null },
        credits: { enabled: false },
        tooltip: { enabled: false },
        plotOptions: {
            pie: {
                innerSize: '90%',
                borderWidth: 0,
                startAngle: 0,
                endAngle: 360,
                center: ['50%', '50%'],
                size: '100%',
                dataLabels: { enabled: false },
                states: { hover: { enabled: false } }
            }
        },
        series: [{
            name: 'Status',
            data: [
                { y: percentage * 0.7, color: '#22c55e' }, // Green segment
                { y: percentage * 0.15, color: '#3b82f6' }, // Blue segment
                { y: percentage * 0.15, color: '#f59e0b' }, // Orange segment
                { y: 100 - percentage, color: '#e5e7eb' }    // Remaining track
            ],
            enableMouseTracking: false
        }]
    };

    return (
        <div className="circular-progress-wrapper" style={{ position: 'relative', width: size, height: size }}>
            <HighchartsReact highcharts={Highcharts} options={options} />
            <div className="percentage-label" style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                fontSize: '11px',
                fontWeight: '700',
                color: '#111827',
                textAlign: 'center'
            }}>
                {percentage}%
            </div>
        </div>
    );
};

const ControlCard = ({ title, percentage, color }) => {
    return (
        <div className="control-small-card">
            <span className="control-card-title">{title}</span>
            <CircularProgress percentage={percentage} color={color} size={70} />
        </div>
    );
};

const ControlsDashboard = () => {
    const njControls = [
        { title: 'Unity', percentage: 99.28, color: '#22c55e' },
        { title: 'Inter Platform', percentage: 96.2, color: '#3b82f6' },
        { title: 'EOD Marker', percentage: 90.4, color: '#22c55e' },
    ];

    const commonControls = [
        { title: 'Hashkey', percentage: 99.28, color: '#22c55e' },
        { title: 'Volume', percentage: 96.2, color: '#f59e0b' },
    ];

    const nyControls = [
        { title: 'Unity', percentage: 99.28, color: '#22c55e' },
        { title: 'Inter Platform', percentage: 96.2, color: '#3b82f6' },
        { title: 'EOD Mar...', percentage: 90.4, color: '#22c55e' },
    ];

    return (
        <div className="controls-dashboard-main">
            <div className="controls-header">
                <h2 className="controls-title">Controls</h2>
                <span className="controls-minimize">−</span>
            </div>

            <div className="controls-sections-container">
                {/* Cluster NJ */}
                <div className="controls-group">
                    <span className="group-label">Cluster NJ</span>
                    <div className="group-cards-wrapper">
                        {njControls.map((control, index) => (
                            <ControlCard key={index} {...control} />
                        ))}
                    </div>
                </div>

                {/* Common Controls */}
                <div className="controls-group">
                    <span className="group-label">Common Controls</span>
                    <div className="group-cards-wrapper">
                        {commonControls.map((control, index) => (
                            <ControlCard key={index} {...control} />
                        ))}
                    </div>
                </div>

                {/* Cluster NY */}
                <div className="controls-group">
                    <span className="group-label">Cluster NY</span>
                    <div className="group-cards-wrapper">
                        {nyControls.map((control, index) => (
                            <ControlCard key={index} {...control} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ControlsDashboard;
