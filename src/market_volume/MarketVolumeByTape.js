import React, { Component } from "react";
import PropTypes from "prop-types";
import autoBind from "react-autobind";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import numeral from "numeral";

class MarketVolumeByTape extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
    Highcharts.setOptions({
      lang: {
        decimalPoint: ".",
        thousandsSep: ","
      }
    });
  }

  render() {
    const options = {
      credits: {
        enabled: true,
        href:
          "http://markets.cboe.com/us/equities/market_statistics/historical_market_volume/",
        text: "Source: Cboe Global Markets"
      },
      chart: {
        height: 500,
        type: "area"
      },
      title: {
        text: "Market Volume by Tape"
      },
      xAxis: {
        categories: this.props.data.x
      },
      yAxis: {
        title: {
          text: "Market Volume (billion shares)"
        },
        labels: {
          formatter: function() {
            return this.value / 1e9 + "b";
          }
        }
      },
      legend: {
        enabled: true
      },
      tooltip: {
        shared: true,
        followPointer: true,
        formatter: function() {
          return this.points.reduce(function(s, point) {
            return `${s}<br/>${point.series.name}: ${numeral(point.y / 1e9).format("0,0")}b`;
          }, `<b>Year ${this.x}</b>`);
        }
      },
      plotOptions: {
        area: {
          stacking: "normal",
          marker: {
            enabled: false,
            symbol: "circle",
            radius: 2,
            states: {
              hover: {
                enabled: true
              }
            }
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

MarketVolumeByTape.propTypes = {
  data: PropTypes.object.isRequired
};

export default MarketVolumeByTape;
