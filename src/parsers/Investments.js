export default class Investiments {
  constructor(data) {
    this.data = { ...data };
    this.parsedData = {};
    for (let investment of this.data.investments) {
      this.parsedData[investment.id] = { ...investment, reports: [] }
    }
  }

  setFundReports = (fundId, reports) => this.parsedData[fundId]['reports'] = reports;

  setFundTotalRendiments = (fundId, { firstReport, lastReport }) => {
    const totalRendimentsPercentage = this.calcChangePercentage(firstReport, lastReport);
    const totalRendimentsValue = this.calcDiff(firstReport, lastReport);

    this.parsedData[fundId]['rendiments'] = {
      percentage: totalRendimentsPercentage,
      value: totalRendimentsValue
    };
  };

  getParsedData = () => this.parsedData;

  sortReports = (reports) => reports.sort((a, b) => (a.month - b.month));

  calcDiff = (prevReport, report) => {
    return (prevReport.value > report.value ? prevReport.value - report.value : report.value - prevReport.value).toFixed(2)
  };

  calcDiffPercentage = (prevReport, report) => { 
    const prevReportValue = prevReport.value;
    const reportValue = report.value;
    const v1 = reportValue - prevReportValue;
    const v2 = (prevReportValue + reportValue) / 2;
    const result = Math.ceil(((v1 / v2) * 100));
    return result.toFixed(2);
  }

  calcChangePercentage = (prevReport, report) => { 
    const v1  = prevReport.value;
    const v2 = report.value;
    const diff = v1 > v2 ? v1 - v2 : v2 - v1;
    const result = ((diff / v1) * 100);
    return result.toFixed(2);
  }

  calcReportsRendiments = (fund) => {
    const reports = this.parsedData[fund]['reports'];
    const reportsWithRendiments = reports.map((report, index) => {
      if (report.month === 1) return report;
      const rendiment = this.calcDiffPercentage(reports[index - 1], report);
      return { ...report, rendiment: new Intl.NumberFormat('pt-BR').format(rendiment) };
    })
    return reportsWithRendiments;
  }
  parse = () => {
    for (let report of this.sortReports(this.data.reports)) {
      this.parsedData[report.investmentId]['reports'].push(report);
    }
    for (let fund in this.parsedData) {
      const reports = this.parsedData[fund]['reports'];
      const firstReport = reports[0];
      const lastReport = reports[reports.length - 1]
      this.setFundReports(fund, this.calcReportsRendiments(fund));
      this.setFundTotalRendiments(fund, { firstReport, lastReport })
    }
    return this;
  }
}