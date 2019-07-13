import React, { Component } from "react";
import { Steps, Button, Row, Col } from "antd";
import styled from "styled-components";
import Calendar from "../components/Calendar";

const Step = Steps.Step;

const RegRuleStyled = styled.div`
  .steps-content {
    margin-top: 16px;
    border: 1px dashed #e9e9e9;
    border-radius: 6px;
    background-color: #fafafa;
    min-height: 200px;
    text-align: left;
    padding-top: 10px;
    padding-left: 10px;
  }

  .steps-action {
    margin: 24px 5px 0px 5px;
  }

  .steps-action .right {
    float: right;
  }
`;

const steps = [
  {
    title: "NYSEFeesForMOC",
    content: (
      <div>
        <Row type="flex" justify="start">
          <Col span={4}>
            <Calendar
              month="January"
              day={8}
              dow="Monday"
              style={{ width: 60, height: 60 }}
            />
          </Col>
          <Col span={20}>
            <h3>NYSE Lowered its Fees for MOC Orders</h3>
            <ul>
              <li />
              <li />
            </ul>
          </Col>
        </Row>
      </div>
    )
  },
  {
    title: "CboeMarketClose",
    content: (
      <div>
        <Row type="flex" justify="start">
          <Col span={4}>
            <Calendar
              month="January"
              day={17}
              dow="Wednesday"
              style={{ width: 60, height: 60 }}
            />
          </Col>
          <Col span={20}>
            <h3>SEC Approved Cboe Market Close</h3>
            <ul>
              <li>
                Cboe introduces a closing match process for non-BZX listed
                securities
              </li>
              <li>
                Cboe seeks to match buy and sell MOC orders at the official
                primary closing price
              </li>
              <li>The cutoff time is 3:35pm EST</li>
              <li>
                Competitively priced compared with the primary listing market
                closing auction rates
              </li>
            </ul>
          </Col>
        </Row>
      </div>
    )
  },
  // News release: https://www.sec.gov/news/press-release/2018-43
  // Public comments: https://www.sec.gov/comments/s7-05-18/s70518.htm
  {
    title: "TransactionFeePilot",
    content: (
      <div>
        <Row type="flex" justify="start">
          <Col span={4}>
            <Calendar
              month="March"
              day={14}
              dow="Wednesday"
              style={{ width: 60, height: 60 }}
            />
          </Col>
          <Col span={20}>
            <h3>SEC Voted to Conduct a Transaction Fee Pilot in NMS Stocks</h3>
            <ul>
              <li>
                Overwhelmingly supported by assert managers, pension funds and
                other constituencies
              </li>
              <li>
                The Proposal was opposed by both NYSE and Nasdaq since they
                believe this will harm investors and public company issuers
              </li>
              <li>
                Cboe Global Markets also opposes the Proposal and questions
                SEC's logic and legal authority to impose federal price controls
              </li>
              <li>IEX supports this Proposal</li>
            </ul>
          </Col>
        </Row>
      </div>
    )
  },
  {
    title: "NYSETapeC",
    content: (
      <div>
        <Row type="flex" justify="start">
          <Col span={4}>
            <Calendar
              month="April"
              day={9}
              dow="Monday"
              style={{ width: 60, height: 60 }}
            />
          </Col>
          <Col span={20}>
            <h3>NYSE Started to Trade Tape C</h3>
            <ul>
              <li />
              <li />
            </ul>
          </Col>
        </Row>
      </div>
    )
  },
  {
    title: "NYSENational",
    content: (
      <div>
        <Row type="flex" justify="start">
          <Col span={4}>
            <Calendar
              month="May"
              day={21}
              dow="Monday"
              style={{ width: 60, height: 60 }}
            />
          </Col>
          <Col span={20}>
            <h3>NYSE National Relaunched</h3>
            <ul>
              <li>
                NSX was acquired by NYSE in January 2017 and ceased operations
                on February 1, 2017
              </li>
              <li>
                Relaunched as a fully electronic market with taker-maker fee
                schedule
              </li>
              <li>Can trade Tape A, B and C stocks</li>
              <li />
            </ul>
          </Col>
        </Row>
      </div>
    )
  },
  {
    title: "NYSETapeAFee",
    content: (
      <div>
        <Row type="flex" justify="start">
          <Col span={4}>
            <Calendar
              month="August"
              day={1}
              dow="Wednesday"
              style={{ width: 60, height: 60 }}
            />
          </Col>
          <Col span={20}>
            <h3>NYSE Introduced an Additional Credit for Tape A Securities</h3>
            <ul>
              <li />
              <li />
            </ul>
          </Col>
        </Row>
      </div>
    )
  },
  {
    title: "CboeMarketClose",
    content: (
      <div>
        <Row type="flex" justify="start">
          <Col span={4}>
            <Calendar
              month="August"
              day={20}
              dow="Monday"
              style={{ width: 60, height: 60 }}
            />
          </Col>
          <Col span={20}>
            <h3>Cboe Market Close (CMC) Launched</h3>
            <ul>
              <li />
              <li />
            </ul>
          </Col>
        </Row>
      </div>
    )
  }
];

class RegRule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0
    };
  }

  next() {
    const current = this.state.current + 1;
    this.setState({ current });
  }

  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
  }

  render() {
    const { current } = this.state;

    return (
      <RegRuleStyled>
        <div>
          <Steps current={current}>
            {steps.map(item => (
              <Step key={item.title} />
            ))}
          </Steps>
          <div className="steps-content">{steps[current].content}</div>
          <div className="steps-action">
            <Button
              disabled={current === 0}
              type="primary"
              onClick={() => this.prev()}
            >
              Previous
            </Button>
            <Button
              className="right"
              disabled={current === steps.length - 1}
              type="primary"
              onClick={() => this.next()}
            >
              Next
            </Button>
          </div>
        </div>
      </RegRuleStyled>
    );
  }
}

export default RegRule;
