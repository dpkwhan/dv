import React, { Component } from "react";
import autoBind from "react-autobind";
import MarketVolumeByTape from "./MarketVolumeByTape";
import data from "../data/market_volume_by_tape.json";

class MarketVolumeByTapeWithData extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  formatData() {
    const chartData = { x: [], series: [] };
    const years = [];
    const byTape = { A: [], B: [], C: [] };
    for (const d of data) {
      years.push(d.year);
      byTape.A.push(d.tapeAShares);
      byTape.B.push(d.tapeBShares);
      byTape.C.push(d.tapeCShares);
    }

    chartData.x = years;

    Object.keys(byTape)
      .sort()
      .forEach(tape => {
        const dataPoints = { name: `Tape ${tape}`, data: byTape[tape] };
        chartData.series.push(dataPoints);
      });
    return chartData;
  }

  render() {
    return <MarketVolumeByTape data={this.formatData()} {...this.props} />;
  }
}

export default MarketVolumeByTapeWithData;
