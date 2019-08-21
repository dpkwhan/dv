import React, { Component, Fragment } from "react";
import { Divider, Icon } from "antd";
import MarketShareByYearExchWithData from "./MarketShareByYearExchWithData";
import MarketShareByTapeWithData from "./MarketShareByTapeWithData";

class MarketShare extends Component {
  render() {
    return (
      <Fragment>
        <Divider orientation="left">
          <Icon type="bar-chart" /> By Exchange
        </Divider>
        <MarketShareByYearExchWithData />
        <Divider orientation="left">
          <Icon type="bar-chart" /> By Tape
        </Divider>
        <MarketShareByTapeWithData />
      </Fragment>
    );
  }
}

export default MarketShare;
