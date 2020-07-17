import React from 'react'
import {
  Layout,
  Row,
  Col,
  Tabs,
} from 'antd'
import { CaretRightFilled } from '@ant-design/icons';
import DayCollectionView from '../DayCollectionView'
import StatisticsView from '../StatisticsView'
import Store from '../../core/Store'
import './style.css'

const { Header, Footer, Content } = Layout
const { TabPane } = Tabs


export default class Main extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }
  

  render() {
    const dayCollection = Store.get('dayCollection')

    let lastEvent = null
    let packageName = null
    let packageVersion = null
    try {
      lastEvent = dayCollection.getLastDay().getLastEvent()
      packageName = lastEvent.packageName + ' '
      packageVersion = 'v' + lastEvent.packageVersion
    } catch(e) {}

    
    
    return (
      <Layout>
        <Header
          style={{
            padding: 0
          }}
        >
          <Row>
            <Col xs={0} sm={0} md={1} lg={3} xl={4} />

            <Col xs={12} sm={12} md={11} lg={9} xl={8}>
              <div className="header-devclock-title">
                <CaretRightFilled/>Devclock
              </div>
              
            </Col>


            <Col xs={12} sm={12} md={11} lg={9} xl={8}>
              <div className="header-devclock-package-info">
                {packageName}{packageVersion}
              </div>
            </Col>


            <Col xs={0} sm={0} md={1} lg={3} xl={4} />
          </Row>
        </Header>

        <Content>
          <Row>
            <Col xs={0} sm={0} md={1} lg={3} xl={4} />

            <Col xs={24} sm={24} md={22} lg={18} xl={16}>
              <Tabs defaultActiveKey="1" centered>
                <TabPane tab="Statistics" key="1">
                  <StatisticsView/>
                </TabPane>
                <TabPane tab="Daily reports" key="2">
                  <DayCollectionView/>
                </TabPane>
              </Tabs>
                
            </Col>
            <Col xs={0} sm={0} md={1} lg={3} xl={4} />
          </Row>
        </Content>
        
        <Footer>
          
        </Footer>
      </Layout>
    )
  }
}
