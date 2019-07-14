import React, { Component, Fragment } from "react";
import autoBind from "react-autobind";
import { Radio } from "antd";
import MarketShareByExch from "./MarketShareByExch";
import data from "../data/market_share_by_exch.json";

const groupBy = {
  cboe: ["CBOE", "CBOE BYX", "CBOE BZX", "CBOE EDGA", "CBOE EDGX"],
  nasdaq: ["NASDAQ", "NASDAQ BX", "NASDAQ ISE", "NASDAQ PSX"],
  nyse: ["NYSE", "NYSE American", "NYSE Arca", "NYSE Chicago", "NYSE National"],
  inverted: ["CBOE BYX", "CBOE EDGA", "NASDAQ BX"],
  iex: ["IEX"],
  trf: ["TRF"]
};

const isInGroup = (exch, group) => {
  if (group === "all") return true;
  const groupMembers = groupBy[group];
  return groupMembers.includes(exch);
};

class MarketShareByExchWithData extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
    this.state = {
      group: "all",
      data: this.formatData(data, "all"),
      yAxisMax: 100
    };
  }

  onGroupSelection = e => {
    const group = e.target.value;
    this.setState({
      group,
      data: this.formatData(data, group),
      yAxisMax: group === "all" ? 100 : null
    });
  };

  formatData(data, group) {
    const chartData = { x: [], series: [] };
    const byYear = {};
    const byExch = {};
    for (const d of data) {
      if (isInGroup(d.sym, group)) {
        if (!byExch.hasOwnProperty(d.sym)) byExch[d.sym] = [];
        if (!byYear.hasOwnProperty(d.year)) byYear[d.year] = 0;
        byExch[d.sym].push(d);
        byYear[d.year] = byYear[d.year] + d.mktShare;
      }
    }

    // Get distinct year and sort them ascendingly
    chartData.x = Object.keys(byYear).sort();

    Object.keys(byExch)
      .sort()
      .forEach(exch => {
        const items = byExch[exch];
        const dataPoints = { name: exch, data: [] };
        chartData.x.forEach((year, i) => {
          let v = 0;
          items.forEach(item => {
            if (item.year === +year) {
              v = item.mktShare;
            }
          });
          dataPoints.data[i] = 100 * v;
        });
        chartData.series.push(dataPoints);
      });

    let maxMktShare = 0;
    Object.keys(byYear).forEach(year => {
      if (byYear[year] > maxMktShare) maxMktShare = byYear[year];
    });
    chartData.decimals = maxMktShare < 0.06 ? 1 : 0;

    return chartData;
  }

  render() {
    const { group, data, yAxisMax } = this.state;

    return (
      <Fragment>
        <div align="right">
          <Radio.Group onChange={this.onGroupSelection} value={group}>
            <Radio value="all">All</Radio>
            <Radio value="cboe">CBOE</Radio>
            <Radio value="nasdaq">NASDAQ</Radio>
            <Radio value="nyse">NYSE</Radio>
            <Radio value="inverted">Inverted</Radio>
            <Radio value="iex">IEX</Radio>
            <Radio value="trf">Off-market</Radio>
          </Radio.Group>
        </div>

        <MarketShareByExch data={data} yAxisMax={yAxisMax} />
      </Fragment>
    );
  }
}

export default MarketShareByExchWithData;