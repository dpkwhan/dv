import React, { Component } from "react";
import PropTypes from "prop-types";
import autoBind from "react-autobind";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class MarketShare extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  render() {
    const pointFormat = "</br>{series.name}: {point.y:, .2f}%";
    const format = "{value: ." + this.props.decimal + "f}%";

    const options = {
      credits: {
        enabled: true,
        href:
          "http://markets.cboe.com/us/equities/market_statistics/historical_market_volume/",
        text: "Source: Cboe Global Markets"
      },
      chart: {
        height: 500,
        type: "column"
      },
      title: {
        text: "Market Share by Exchange"
      },
      xAxis: {
        categories: this.props.data.x,
        title: {
          text: "Year"
        }
      },
      yAxis: {
        title: {
          text: "Market Share (%)"
        },
        labels: {
          format
        },
        max: this.props.yAxisMax || null
      },
      legend: {
        enabled: true
      },
      tooltip: {
        shared: false,
        useHTML: true,
        headerFormat: "<b>Year {point.key}</b><table>",
        pointFormat,
        footerFormat: "</table>",
        followPointer: true
      },
      plotOptions: {
        column: {
          stacking: "normal",
          marker: {
            enabled: false
          }
        }
      },
      series: this.props.data.series
    };

    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    );
  }
}

MarketShare.propTypes = {
  data: PropTypes.object.isRequired
};

export default MarketShare;