import React, { Component, Fragment } from "react";
import autoBind from "react-autobind";
import { Radio } from "antd";
import MarketShareByYearExch from "./MarketShareByYearExch";
import marketShareByYearExch from "../data/market_share_by_year_exch.json";

const groupBy = {
  cboe: ["CBOE", "CBOE BYX", "CBOE BZX", "CBOE EDGA", "CBOE EDGX"],
  nasdaq: ["NASDAQ", "NASDAQ BX", "NASDAQ ISE", "NASDAQ PSX"],
  nyse: ["NYSE", "NYSE American", "NYSE Arca", "NYSE Chicago", "NYSE National"],
  inverted: ["CBOE BYX", "CBOE EDGA", "NASDAQ BX"],
  iex: ["IEX"],
  trf: ["TRF"],
};

const isInGroup = (exch, group) => {
  if (group === "all") return true;
  const groupMembers = groupBy[group];
  return groupMembers.includes(exch);
};

class MarketShareByYearExchWithData extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
    this.state = { group: "all", chartData: this.filterData("all") };
  }

  onGroupSelection(e) {
    const group = e.target.value;
    this.setState({ group, chartData: this.filterData(group) });
  }

  filterData(group) {
    const chartData = { xAxisData: marketShareByYearExch.year, legendData: [], series: [] };
    Object.keys(marketShareByYearExch).forEach(key => {
      if (key === "year") return;
      const name = key;
      if (isInGroup(name, group)) {
        const dataPoints = {
          name,
          type: "bar",
          barMaxWidth: 50,
          stack: "mktShare",
          itemStyle: { normal: { areaStyle: { type: "default" } } },
          data: marketShareByYearExch[name],
        };
        chartData.legendData.push(name);
        chartData.series.push(dataPoints);
      }
    });
    return chartData;
  }

  render() {
    const { group, chartData } = this.state;

    return (
      <Fragment>
        <div align="right" style={{ marginBottom: 30 }}>
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
        <MarketShareByYearExch data={chartData} />
      </Fragment>
    );
  }
}

export default MarketShareByYearExchWithData;
