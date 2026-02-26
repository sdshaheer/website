# website

import React from 'react';

// 1. CENTRALIZED HARD-CODED DATA
const DASHBOARD_DATA = {
  header: {
    title: "Inbound(2)",
    subtitle: "The state of requests Production support team is handling. Any help text can be specified here",
    critical: 6,
    warning: 4
  },
  mqs: {
    title: "MQs",
    topCards: [
      { type: 'status', label: 'Solace', icon: '⏰', items: ['NAM', 'EMEA', 'APAC', 'Japan'], alert: 'SSL Expiring on..' },
      { type: 'status', label: 'KaaS', items: ['Zookeeper', 'Broker', 'Schema Registry'] },
      { type: 'data', label: 'MQ Source', rows: [['Source', '532'], ['Feed', '83'], ['MQs', '83']] }
    ],
    inbound: { label: "MQs Inbound", total: "12345678", pending: 5, failed: 3, arrived: 6, potBreach: 5, slaBreach: 0, arrivedSla: 1 }
  },
  files: {
    title: "Files",
    topCards: [
      { type: 'data', label: 'Files Source', rows: [['Source', '11029'], ['Feed', '12102'], ['Files', '10029']] },
      { type: 'status', label: 'IBM Connect Dir...', items: ['Status Monitor', 'Connection Ma...', 'Process Manager'] },
      { type: 'watcher', label: 'File Watcher', usage: '26.28%' }
    ],
    inbound: { label: "Files Inbound", total: "12345678", pending: 5, failed: 3, arrived: 6, potBreach: 5, slaBreach: 0, arrivedSla: 1 }
  }
};

// 2. MAIN COMPONENT
export default function MonitoringDashboard() {
  return (
    <div style={styles.page}>
      <div style={styles.mainContainer}>
        
        {/* Header Section */}
        <header style={styles.headerFlex}>
          <div>
            <h1 style={styles.mainTitle}>{DASHBOARD_DATA.header.title}</h1>
            <p style={styles.mainSubtitle}>{DASHBOARD_DATA.header.subtitle}</p>
          </div>
          <div style={styles.headerAlerts}>
            <HeaderBadge color="#e11d48" bg="#fff1f2" border="#fecdd3" count={DASHBOARD_DATA.header.critical} />
            <HeaderBadge color="#d97706" bg="#fffbeb" border="#fef3c7" count={DASHBOARD_DATA.header.warning} />
            <span style={styles.minusIcon}>−</span>
          </div>
        </header>

        {/* Content Body */}
        <div style={styles.bodyFlex}>
          <ColumnSection data={DASHBOARD_DATA.mqs} />
          <ColumnSection data={DASHBOARD_DATA.files} />
        </div>

        {/* Footer Tabs */}
        <footer style={styles.footerFlex}>
          <div style={{ ...styles.tab, color: '#1a73e8', borderBottom: '3px solid #1a73e8' }}>Cluster NJ</div>
          <div style={{ ...styles.tab, color: '#8b949e' }}>Cluster NY</div>
        </footer>
      </div>
    </div>
  );
}

// 3. REUSABLE COMPONENTS
const ColumnSection = ({ data }) => (
  <div style={styles.columnWrapper}>
    <h2 style={styles.columnHeading}>{data.title}</h2>
    
    {/* Top Row of Individual White Cards */}
    <div style={styles.flexRow}>
      {data.topCards.map((card, idx) => (
        <div key={idx} style={styles.cardBase}>
          {card.type === 'status' && <StatusCardContent {...card} />}
          {card.type === 'data' && <DataCardContent {...card} />}
          {card.type === 'watcher' && <WatcherCardContent {...card} />}
        </div>
      ))}
    </div>

    {/* INBOUND WHITE CARD CONTAINER (Exactly like your screenshot) */}
    <div style={styles.inboundWhiteCard}>
      <div style={styles.inboundHeader}>
        <span style={styles.boldTextSmall}>{data.inbound.label}</span>
        <span style={styles.ingestedText}>{data.inbound.total} :Messages Ingested</span>
      </div>
      
      {/* Internal Colored Metric Bar */}
      <div style={styles.metricBarContainer}>
        {/* Pending: Ice Blue */}
        <div style={{ ...styles.barSeg, backgroundColor: '#e9f1fb', flex: 2.2 }}>
          <div style={styles.segHeader}><span>Pending</span> <u style={styles.underlineBold}>{data.inbound.pending}</u></div>
          <div style={styles.segFooter}>
            <div style={styles.statBox}>Potential Breach<br/><u style={styles.underlineBold}>{data.inbound.potBreach}</u></div>
            <div style={styles.statBox}>SLA Breach<br/><b>{data.inbound.slaBreach}</b></div>
          </div>
        </div>
        {/* Failed: Rose Pink */}
        <div style={{ ...styles.barSeg, backgroundColor: '#fdf0f1', flex: 1, borderLeft: '1.5px solid #fff', borderRight: '1.5px solid #fff' }}>
          <div style={styles.segHeader}><span>Failed</span></div>
          <div style={styles.failedValue}><u>{data.inbound.failed}</u></div>
        </div>
        {/* Arrived: Mint Green */}
        <div style={{ ...styles.barSeg, backgroundColor: '#f0f7f3', flex: 2.2 }}>
          <div style={styles.segHeader}><span>Arrived</span> <u style={styles.underlineBold}>{data.inbound.arrived}</u></div>
          <div style={{ ...styles.segFooter, justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>SLA Breach<br/><u style={{ ...styles.underlineBold, color: '#a65f1a' }}>{data.inbound.arrivedSla}</u></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Sub-Card Contents ---
const StatusCardContent = ({ label, items, icon, alert }) => (
  <>
    <div style={styles.cardHeaderFlex}>
      <span>{label}</span> {icon && <span style={{ color: '#f59e0b' }}>{icon}</span>}
    </div>
    {items.map(item => (
      <div key={item} style={styles.rowFlex}>
        <span>{item}</span> <span style={{ color: '#22c55e' }}>✔️</span>
      </div>
    ))}
    {alert && <div style={styles.orangeAlert}>{alert}</div>}
  </>
);

const DataCardContent = ({ label, rows }) => (
  <>
    <div style={styles.cardHeaderFlex}>{label}</div>
    {rows.map(([lbl, val]) => (
      <div key={lbl} style={styles.rowFlex}>
        <span>{lbl}</span> <span style={{ fontWeight: '600' }}>{val}</span>
      </div>
    ))}
  </>
);

const WatcherCardContent = ({ label, usage }) => (
  <>
    <div style={styles.cardHeaderFlex}>{label}</div>
    <div style={styles.rowFlex}><span>Service</span><span style={{ color: '#22c55e' }}>✔️</span></div>
    <div style={styles.rowFlex}><span>Scheduler</span><span style={{ color: '#f59e0b' }}>⚠️</span></div>
    <div style={styles.rowFlex}><span>NAS Health</span><span style={{ color: '#22c55e' }}>✔️</span></div>
    <div style={{ ...styles.rowFlex, borderTop: '1px solid #f0f2f5', marginTop: '4px', paddingTop: '4px' }}>
      <span>NAS Usage</span><span style={{ color: '#22c55e', fontWeight: 'bold' }}>{usage}</span>
    </div>
    <div style={styles.orangeAlert}>One or more file...</div>
  </>
);

const HeaderBadge = ({ color, bg, border, count }) => (
  <div style={{ backgroundColor: bg, border: `1px solid ${border}`, padding: '4px 10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
    <span style={{ color, fontSize: '12px' }}>⚠️</span>
    <span style={{ color, fontWeight: '700', fontSize: '14px' }}>{count}</span>
  </div>
);

// 4. STYLES (FLEXBOX FOCUS)
const styles = {
  page: { padding: '30px', backgroundColor: '#f8f9fa', minHeight: '100vh', fontFamily: 'Inter, system-ui, sans-serif' },
  mainContainer: { maxWidth: '1250px', margin: '0 auto', backgroundColor: '#fff', borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', border: '1px solid #eef0f2', overflow: 'hidden' },
  headerFlex: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 30px' },
  mainTitle: { margin: 0, fontSize: '20px', fontWeight: '500' },
  mainSubtitle: { margin: '4px 0 0', fontSize: '12px', color: '#8b949e' },
  headerAlerts: { display: 'flex', gap: '10px', alignItems: 'center' },
  minusIcon: { fontSize: '24px', color: '#ccc', cursor: 'pointer', paddingBottom: '12px', marginLeft: '10px' },
  bodyFlex: { display: 'flex', gap: '20px', padding: '0 30px 30px' },
  columnWrapper: { flex: 1, backgroundColor: '#f6f8fa', padding: '20px', borderRadius: '16px', border: '1px solid #eef0f2' },
  columnHeading: { fontSize: '16px', fontWeight: '600', marginBottom: '18px', color: '#333' },
  flexRow: { display: 'flex', gap: '12px' },
  
  // STANDARD SUB-CARD
  cardBase: { flex: 1, backgroundColor: '#fff', border: '1px solid #eef0f2', borderRadius: '16px', padding: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)', display: 'flex', flexDirection: 'column', minHeight: '150px' },
  
  // THE INBOUND WHITE CARD CONTAINER
  inboundWhiteCard: { backgroundColor: '#fff', border: '1px solid #eef0f2', borderRadius: '16px', marginTop: '20px', padding: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' },
  inboundHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', padding: '0 4px' },
  boldTextSmall: { fontSize: '13px', fontWeight: '700' },
  ingestedText: { fontSize: '11px', color: '#8b949e' },
  
  // INTERNAL COLORED BAR
  metricBarContainer: { display: 'flex', height: '80px', borderRadius: '12px', overflow: 'hidden' },
  barSeg: { padding: '10px 15px', display: 'flex', flexDirection: 'column' },
  segHeader: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700', color: '#444' },
  segFooter: { display: 'flex', justifyContent: 'space-between', marginTop: 'auto', fontSize: '10px', color: '#666' },
  statBox: { flex: 1 },
  underlineBold: { fontWeight: '800', textDecoration: 'underline' },
  failedValue: { textAlign: 'center', marginTop: '10px', color: '#d93025', fontSize: '18px', fontWeight: '800' },

  cardHeaderFlex: { display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700', marginBottom: '10px', color: '#333' },
  rowFlex: { display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#555', marginBottom: '5px' },
  orangeAlert: { backgroundColor: '#f59e0b', color: '#fff', fontSize: '10px', padding: '6px 10px', borderRadius: '8px', marginTop: 'auto', fontWeight: '600' },
  
  footerFlex: { display: 'flex', gap: '30px', padding: '15px 30px', borderTop: '1px solid #f0f2f5' },
  tab: { fontSize: '13px', fontWeight: '700', cursor: 'pointer', paddingBottom: '4px' }
};
