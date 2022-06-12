import React from 'react';

const MONTHS = {
  1: 'jan',
  2: 'fev',
  3: 'mar',
  4: 'abr',
  5: 'mai',
  6: 'jun',
  7: 'jul',
  8: 'ago',
  9: 'set',
  10: 'out',
  11: 'nov',
  12: 'dez'
};

function Profit({ report }) {
  return (
  <div className='profit'>
    <div>{MONTHS[report.month]}/{report.year}</div>
    <div>{report.value.toFixed(2)}</div>
    <div>{report.rendiment || 0}%</div>
  </div>)
}

function Profits({ reports }) {
  return reports.map((report) => <Profit report={report} />);
}

function Fund({ data }) {
  return (
    <div>
      <h2>{data.description}</h2>
      <h3>Rendimento total: R$ {data.rendiments.value} ({data.rendiments.percentage}%)</h3>
      <Profits reports={data.reports} />
    </div>
  )
}

export default Fund