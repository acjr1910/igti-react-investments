import React from 'react';
import Data from './db/investments.json';
import InvestmentsParser from './parsers/Investments';
import Fund from './Fund';

function getFunds() {
  const investments = new InvestmentsParser(Data).parse().getParsedData();
  return investments;
}

function getReports() {
  const reports = [];
  const investments = getFunds();
  for (let fund in investments) {
    reports.push(<Fund data={investments[fund]} key={investments[fund]['id']} />);
  }
  return reports;
}

function Funds() {
  const Reports = () => getReports();
  return (
    <div>
     <Reports />
    </div>
  )
}

export default Funds