import React, { Component, Fragment } from "react";
import { Divider, Icon } from "antd";
import MarketShareByExchWithData from "./MarketShareByExchWithData";
import MarketShareByTapeWithData from "./MarketShareByTapeWithData";

class MarketShare extends Component {
  render() {
    return (
      <Fragment>
        <Divider orientation="left">
          <Icon type="bar-chart" /> By Exchange
        </Divider>
        <MarketShareByExchWithData />
        <Divider orientation="left">
          <Icon type="bar-chart" /> By Tape
        </Divider>
        <MarketShareByTapeWithData />
      </Fragment>
    );
  }
}

export default MarketShare;
