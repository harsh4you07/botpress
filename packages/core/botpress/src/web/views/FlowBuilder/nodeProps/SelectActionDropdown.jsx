import React, { Component } from 'react'
import Select from 'react-select'
import _ from 'lodash'
import classnames from 'classnames'
import Highlighter from 'react-highlight-words'

const style = require('./actionDropdown.scss')

export default class SelectActionDropdown extends Component {
  renderOption = option => {
    const highlight = txt => <Highlighter searchWords={[this._inputValue]} textToHighlight={txt} />

    if (option.metadata) {
      const category = option.metadata.category ? (
        <span className={style.category}>{highlight(option.metadata.category)} –</span>
      ) : null
      const title = option.metadata.title ? (
        <span className={style.title}>{highlight(option.metadata.title)}</span>
      ) : null

      return (
        <div>
          <span>
            {category}
            {title}
            <span className={style.name}>–> {highlight(option.label)}</span>
          </span>
        </div>
      )
    }

    return highlight(option.label)
  }

  render() {
    const options = this.props.options.map(x => ({
      label: x.name,
      value: x.name,
      metadata: x.metadata
    }))

    return (
      <Select
        onInputChange={inputValue => (this._inputValue = inputValue)}
        onChange={this.props.onChange}
        options={options}
        value={this.props.value}
        optionRenderer={this.renderOption}
      />
    )
  }
}
