import React from 'react'
import {
  Layout,
  Row,
  Col,
  
} from 'antd'
import { CaretRightFilled } from '@ant-design/icons';
import DayCollectionView from '../DayCollectionView'
import './style.css'

const { Header, Footer, Content } = Layout


export default class Main extends React.Component {

  constructor(props) {
    super(props)
    this.state = {}
  }
  

  render() {
    
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
              project name
            </Col>


            <Col xs={0} sm={0} md={1} lg={3} xl={4} />
          </Row>
        </Header>

        <Content>
          <Row>
            <Col xs={0} sm={0} md={1} lg={3} xl={4} />

            <Col xs={24} sm={24} md={22} lg={18} xl={16}>
              <DayCollectionView/>
            </Col>
            <Col xs={0} sm={0} md={1} lg={3} xl={4} />
          </Row>
        </Content>
        
        <Footer>
          Footer
        </Footer>
      </Layout>
    )
  }
}
