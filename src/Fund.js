import React from 'react';

function Profit({ report }) {
  return (
  <div>
    <div>{report.month}</div>
    <div>{report.value.toFixed(2)}</div>
    {report.rendiment && <div>{report.rendiment}%</div>}
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