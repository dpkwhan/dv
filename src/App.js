import React from "react";
import autoBind from "react-autobind";
import { Layout, Menu, Icon, Row, Col } from "antd";
import logo from "./svg/logo.svg";
import Summary from "./components/Summary";
import MarketShareOverallWithData from "./market_volume/MarketShareOverallWithData";
import MarketShareNYSETapeCWithData from "./market_volume/MarketShareNYSETapeCWithData";
import MarketShareNYSENationalWithData from "./market_volume/MarketShareNYSENationalWithData";
import MarketVolumeByTapeWithData from "./market_volume/MarketVolumeByTapeWithData";

import VIXDailyCloseWithData from "./market_quality/VIXDailyCloseWithData";

import RegRule from "./market_events/RegRule";
import Todo from "./components/Todo";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

const menu = {
  MarketVolume: {
    MarketShare: {
      title: "Market Share",
      icon: "area-chart",
      component: MarketShareOverallWithData
    },
    NYSETapeC: {
      title: "NYSE Tape C",
      icon: "line-chart",
      component: MarketShareNYSETapeCWithData
    },
    NYSENational: {
      title: "NYSE National",
      icon: "bar-chart",
      component: MarketShareNYSENationalWithData
    },
    MarketVolume: {
      title: "Market Volume",
      icon: "bar-chart",
      component: MarketVolumeByTapeWithData
    },
    OddLot: { title: "Odd-Lot Volume", icon: "bar-chart", component: Todo }
  },
  DarkLiquidity: {
    ATSVolume: { title: "ATS Volume", icon: "pie-chart", component: Todo },
    NonATSVolume: {
      title: "Non-ATS Volume",
      icon: "pie-chart",
      component: Todo
    },
    BlockVolume: { title: "Block Volume", icon: "pie-chart", component: Todo }
  },
  AuctionVolume: {
    CloseVolume: { title: "Close Volume", icon: "pie-chart", component: Todo },
    CloseByADV: { title: "Close By ADV", icon: "pie-chart", component: Todo },
    OpenVolume: { title: "Open Volume", icon: "pie-chart", component: Todo },
    AroundOpen: { title: "Around Open", icon: "pie-chart", component: Todo },
    AroundClose: { title: "Around Close", icon: "pie-chart", component: Todo },
    BMC: { title: "Bats MC", icon: "pie-chart", component: Todo }
  },
  MarketQuality: {
    VIX: {
      title: "Volatility",
      icon: "pie-chart",
      component: VIXDailyCloseWithData
    },
    Spread: { title: "Spread", icon: "pie-chart", component: Todo },
    QueueLength: { title: "Queue Length", icon: "pie-chart", component: Todo },
    TurnoverTime: { title: "Turnover Time", icon: "pie-chart", component: Todo }
  },
  MarketEvents: {
    RegRule: { title: "Reg Rules", icon: "schedule", component: RegRule },
    People: { title: "On the Move", icon: "user", component: Todo }
  }
};

let i = 1;
Object.entries(menu).forEach(([name, submenu]) => {
  Object.entries(submenu).forEach(([name, item]) => {
    item.key = "" + i;
    i++;
  });
});

class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    autoBind(this);
    this.state = {
      openKeys: [],
      collapsed: false,
      component: null,
      showTOC: true
    };
  }

  toggle() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  handleMenuItemClick(selectedStatName) {
    this.setState({ showTOC: false });
    Object.entries(menu).map(([name, submenu]) => {
      return Object.entries(submenu).map(([statName, item]) => {
        if (statName === selectedStatName) {
          this.setState({ component: item.component });
        }
        return null;
      });
    });
  }

  rootSubmenuKeys = ["sub1", "sub2", "sub3", "sub4", "sub5", "sub6"];

  onOpenChange(openKeys) {
    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    );
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : []
      });
    }
  }

  goHome() {
    this.setState({ showTOC: true, comopent: null, openKeys: [] });
  }

  render() {
    const mv = menu.MarketVolume;
    const dl = menu.DarkLiquidity;
    const av = menu.AuctionVolume;
    const mq = menu.MarketQuality;
    const me = menu.MarketEvents;

    return (
      <div>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo" onClick={this.goHome}>
              <div>
                <Icon type="bars" />
                <b>{" Menu"}</b>
              </div>
            </div>
            <Menu
              theme="dark"
              mode="inline"
              openKeys={this.state.openKeys}
              onOpenChange={this.onOpenChange}
            >
              <SubMenu
                key="sub1"
                title={
                  <span>
                    <Icon type="heart" />
                    <span>Market Volume</span>
                  </span>
                }
              >
                {Object.entries(mv).map(([name, item]) => (
                  <Menu.Item
                    key={item.key}
                    onClick={() => this.handleMenuItemClick(name)}
                  >
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                  </Menu.Item>
                ))}
              </SubMenu>

              <SubMenu
                key="sub2"
                title={
                  <span>
                    <Icon type="star" />
                    <span>Dark Liquidity</span>
                  </span>
                }
              >
                {Object.entries(dl).map(([name, item]) => (
                  <Menu.Item
                    key={item.key}
                    onClick={() => this.handleMenuItemClick(name)}
                  >
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                  </Menu.Item>
                ))}
              </SubMenu>

              <SubMenu
                key="sub3"
                title={
                  <span>
                    <Icon type="eye" />
                    <span>Auction Volume</span>
                  </span>
                }
              >
                {Object.entries(av).map(([name, item]) => (
                  <Menu.Item
                    key={item.key}
                    onClick={() => this.handleMenuItemClick(name)}
                  >
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                  </Menu.Item>
                ))}
              </SubMenu>

              <SubMenu
                key="sub4"
                title={
                  <span>
                    <Icon type="eye" />
                    <span>Market Quality</span>
                  </span>
                }
              >
                {Object.entries(mq).map(([name, item]) => (
                  <Menu.Item
                    key={item.key}
                    onClick={() => this.handleMenuItemClick(name)}
                  >
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                  </Menu.Item>
                ))}
              </SubMenu>

              <SubMenu
                key="sub5"
                title={
                  <span>
                    <Icon type="eye" />
                    <span>Market Events</span>
                  </span>
                }
              >
                {Object.entries(me).map(([name, item]) => (
                  <Menu.Item
                    key={item.key}
                    onClick={() => this.handleMenuItemClick(name)}
                  >
                    <Icon type={item.icon} />
                    <span>{item.title}</span>
                  </Menu.Item>
                ))}
              </SubMenu>
            </Menu>
          </Sider>
          <Layout>
            <Header style={{ background: "#fff", padding: 0 }}>
              <Row type="flex">
                <Col span={8} order={3} justify="end">
                  <img
                    className="right"
                    src={logo}
                    alt="Logo"
                    style={{ width: 100, height: 50 }}
                  />
                </Col>
                <Col span={8} order={2} justify="center">
                  <span>
                    <b>
                      <font size="5">Data Visualized</font>
                    </b>
                  </span>
                </Col>
                <Col span={8} order={1}>
                  <Icon
                    className="trigger"
                    type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
                    onClick={this.toggle}
                  />
                </Col>
              </Row>
            </Header>

            <Row>
              <Content
                style={{
                  margin: "24px 16px",
                  padding: 24,
                  background: "#fff",
                  minHeight: 600
                }}
              >
                {this.state.showTOC ? (
                  <Summary />
                ) : this.state.component ? (
                  <this.state.component />
                ) : null}
              </Content>
            </Row>
          </Layout>
        </Layout>
        <div
          style={{
            textAlign: "center",
            verticalAlign: "middle",
            lineHeight: "40px"
          }}
        >
          <Icon type="copyright" /> 2019 David Han
        </div>
      </div>
    );
  }
}

export default App;
