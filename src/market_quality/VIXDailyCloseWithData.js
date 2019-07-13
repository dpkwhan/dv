import React, { Component } from "react";
import autoBind from "react-autobind";
import moment from "moment";
import VIXDailyClose from "./VIXDailyClose";
import data from "./data/vix_daily_close";

class VIXDailyCloseWithData extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  formatData() {
    const dataPoints = { name: "VIX Daily Close", data: [] };
    for (const d of data) {
      const x = moment(d.date, "YYYY.MM.DD").valueOf();
      const y = d.close;
      dataPoints.data.push([x, y]);
    }
    const chartData = [dataPoints];
    return chartData;
  }

  render() {
    return <VIXDailyClose data={this.formatData()} />;
  }
}

export default VIXDailyCloseWithData;
