import React, { Component } from "react";
import PropTypes from "prop-types";
import autoBind from "react-autobind";
import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";

class VIXDailyClose extends Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
  }

  render() {
    console.log(this.props.data);

    const options = {
      rangeSelector: {
        selected: 1
      },

      title: {
        text: "VIX Close"
      },

      series: this.props.data
    };

    return (
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          constructorType={"stockChart"}
        />
      </div>
    );
  }
}

VIXDailyClose.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default VIXDailyClose;
