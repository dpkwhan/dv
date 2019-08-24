import React, { Component } from "react";
import ReactDOM from "react-dom";
import echarts from "echarts";
import numeral from "numeral";
import isEqual from "lodash/isEqual";
import macarons from "../components/macarons";

class MarketShareByYearExch extends Component {
  createChart(props) {
    this.chart = echarts.init(ReactDOM.findDOMNode(this), "macarons");
    if (!props) {
      return null;
    }
    const options = this.makeChartOptions(props);
    this.chart.setOption(options);
  }

  makeChartOptions(props) {
    const { legendData, xAxisData, series } = props.data;
    const style = "display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px";
    const colorSpan = color => `<span style="${style};background-color:${color}"></span>`;

    return {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          animation: true,
        },
        // Reference: https://stackoverflow.com/questions/39714502/echarts3-baidu-colored-round-in-tooltip
        formatter: function(params) {
          let rez = `<p>${params[0].axisValue}</p>`;
          rez += "<table>";
          params.forEach(item => {
            const colorEle = colorSpan(item.color);
            const pct = numeral(item.data).format("0.00%");
            const xx = `<tr><td>${colorEle} ${item.seriesName}:</td><td style="text-align:right;padding-left:5px">${pct}</td></tr>`;
            rez += xx;
          });
          rez += "</table>";
          return rez;
        },
      },
      legend: {
        top: 0,
        left: "center",
        itemWidth: 15,
        data: legendData,
      },
      toolbox: {
        show: true,
        feature: {
          magicType: {
            show: true,
            type: ["line", "bar", "stack", "tiled"],
            title: {
              line: "Line Chart",
              bar: "Bar Chart",
              stack: "Stacked",
              tiled: "Tiled",
            },
          },
          restore: { show: true, title: "Restore" },
          saveAsImage: {
            show: true,
            title: "Save As Image",
            type: "png",
            name: "market-share-by-year-exchange",
          },
        },
        orient: "vertical",
        iconStyle: {
          normal: {
            textPosition: "left",
            textAlign: "right",
          },
          emphasis: {
            textPosition: "left",
            textAlign: "right",
          },
        },
        top: "middle",
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          boundaryGap: true,
          data: xAxisData,
        },
      ],
      yAxis: [
        {
          type: "value",
          max: "dataMax",
          axisLabel: {
            formatter: function(value, index) {
              return numeral(value).format("0%");
            },
          },
        },
      ],
      series,
    };
  }

  componentDidMount() {
    echarts.registerTheme("macarons", macarons);
    this.createChart(this.props);
    window.onresize = () => {
      this.chart.resize();
    };
  }

  componentWillUnmount() {
    this.chart.dispose();
  }

  shouldComponentUpdate(nextProps, nextState) {
    // the component never updates and instead uses
    // willreceiveprops in order to reset the data on the chart
    return false;
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.data, this.props.data)) {
      this.chart.dispose();
      this.createChart(nextProps);
    }
  }

  render() {
    return <div style={{ height: "500px", width: "100%" }} />;
  }
}

export default MarketShareByYearExch;
