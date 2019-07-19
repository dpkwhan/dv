import React, { Component } from "react";
import PropTypes from "prop-types";
import autoBind from "react-autobind";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

class MarketShareNYSENational extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
    Highcharts.setOptions({ global: { useUTC: false } });
  }

  render() {
    const pointFormat = "</br>{series.name}: {point.y:, .2f}%";

    const options = {
      credits: {
        enabled: true,
        href:
          "http://markets.cboe.com/us/equities/market_statistics/historical_market_volume/",
        text: "Source: Cboe Global Markets"
      },
      chart: {
        type: "column"
      },
      title: {
        text: "NYSE National Market Share"
      },
      xAxis: {
        type: "datetime",
        gridLineDashStyle: "dash",
        gridLineWidth: 1,
        title: {
          text: "Week"
        },
        labels: {
          format: "{value: %Y-%m-%d}"
        }
      },
      yAxis: {
        title: {
          text: "Market Share (%)"
        },
        labels: {
          format: "{value: .1f}%"
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        shared: false,
        useHTML: true,
        headerFormat: "<b>{point.key}</b><table>",
        pointFormat,
        footerFormat: "</table>",
        followPointer: true
      },
      // plotOptions: {
      //   line: {
      //     marker: {
      //       fillColor: '#FFFFFF',
      //       radius: 5,
      //       lineWidth: 2,
      //       lineColor: null // inherit from series
      //     },
      //   }
      // },
      series: this.props.data
    };

    return (
      <div>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    );
  }
}

MarketShareNYSENational.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default MarketShareNYSENational;
