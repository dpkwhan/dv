import React, { Component } from "react";
import autoBind from "react-autobind";
import MarketShareByTape from "./MarketShareByTape";
import data from "../data/market_share_by_tape.json";

class MarketShareByTapeWithData extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  formatData() {
    const chartData = { x: [], series: [] };
    chartData.x = data.year;

    Object.keys(data).forEach(key => {
      if (key === "year") return;
      const tape = key.slice(-1);
      console.log(key, tape);
      const dataPoints = { name: `Tape ${tape}`, data: data[key] };
      chartData.series.push(dataPoints);
    });
    return chartData;
  }

  render() {
    return <MarketShareByTape data={this.formatData()} />;
  }
}

export default MarketShareByTapeWithData;
