import React, { Component } from "react";
import autoBind from "react-autobind";
import moment from "moment";
import MarketShareNYSENational from "./MarketShareNYSENational";
import data from "../data/market_share_nyse_national.json";

class MarketShareNYSENationalWithData extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  formatData() {
    const dataPoints = { name: "NYSE National", data: [] };
    for (const d of data) {
      const x = moment(d.week, "YYYY.MM.DD").valueOf();
      const y = 100 * d.mktShare;
      dataPoints.data.push([x, y]);
    }
    const chartData = [dataPoints];

    return chartData;
  }

  render() {
    return <MarketShareNYSENational data={this.formatData()} />;
  }
}

export default MarketShareNYSENationalWithData;
