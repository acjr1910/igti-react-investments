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
    const totalRendimentsPercentage = this.calcRendimentsPercentage(firstReport, lastReport);
    const totalRendimentsValue = this.calcRendimentsValue(firstReport, lastReport);

    this.parsedData[fundId]['rendiments'] = {
      // TODO: cald right percentage
      percentage: totalRendimentsPercentage,
      value: totalRendimentsValue
    };
  };

  getParsedData = () => this.parsedData;

  sortReports = (reports) => reports.sort((a, b) => (a.month - b.month));

  calcRendimentsValue = (prevReport, report) => {
    return (prevReport.value > report.value ? prevReport.value - report.value : report.value - prevReport.value).toFixed(2)
  };

  calcRendimentsPercentage = (prevReport, report) => { 
    const prevReportValue = prevReport.value;
    const reportValue = report.value;
    const v1 = reportValue - prevReportValue;
    const v2 = prevReportValue + reportValue;
    const result = ((v1 / (v2 / 2)) * 100);
    return result.toFixed(2);
  }

  calcReportsRendiments = (fund) => {
    const reports = this.parsedData[fund]['reports'];
    const reportsWithRendiments = reports.map((report, index) => {
      if (report.month === 1) return report;
      const rendiment = this.calcRendimentsPercentage(reports[index - 1], report);
      return { ...report, rendiment };
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