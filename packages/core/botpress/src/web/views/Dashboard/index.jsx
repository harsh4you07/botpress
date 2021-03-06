import React from 'react'
import { Panel, Grid, Row, Col, ControlLabel, Tooltip, OverlayTrigger, Link } from 'react-bootstrap'

import classnames from 'classnames'
import axios from 'axios'
import _ from 'lodash'

import ContentWrapper from '~/components/Layout/ContentWrapper'
import PageHeader from '~/components/Layout/PageHeader'
import ModulesComponent from '~/components/Modules'
import InformationComponent from '~/components/Information'
import HeroComponent from '~/components/Hero'

import { fetchModules } from '~/actions'

export default class DashboardView extends React.Component {
  state = {
    loading: true,
    popularModules: [],
    featuredModules: []
  }

  componentDidMount() {
    this.queryAllModules().finally(() => this.setState({ loading: false }))
  }

  queryAllModules() {
    return axios.get('/api/module/all').then(result =>
      this.setState({
        popularModules: _.filter(result.data, m => m.popular),
        featuredModules: _.filter(result.data, m => m.featured)
      })
    )
  }

  refresh = () => this.queryAllModules()

  renderPopularModules() {
    return (
      <Panel>
        <Panel.Heading>Popular modules</Panel.Heading>
        <Panel.Body>
          <ModulesComponent modules={this.state.popularModules} refresh={this.refresh} />
        </Panel.Body>
      </Panel>
    )
  }

  renderFeaturedModules() {
    return (
      <Panel>
        <Panel.Heading>Featured modules</Panel.Heading>
        <Panel.Body>
          <ModulesComponent modules={this.state.featuredModules} refresh={this.refresh} />
        </Panel.Body>
      </Panel>
    )
  }

  render() {
    if (this.state.loading) {
      return null
    }
    return (
      <ContentWrapper>
        <PageHeader>
          <span> Dashboard</span>
        </PageHeader>
        <Grid fluid className={'bp-dashboard'}>
          <Row>
            <Col sm={12} md={8}>
              <InformationComponent />
            </Col>
            <Col xs={12} sm={8} md={4} smOffset={2} mdOffset={0}>
              <HeroComponent />
            </Col>
          </Row>
          <Row>
            <Col sm={12} md={6}>
              {this.renderPopularModules()}
            </Col>
            <Col sm={12} md={6}>
              {this.renderFeaturedModules()}
            </Col>
          </Row>
        </Grid>
      </ContentWrapper>
    )
  }
}
