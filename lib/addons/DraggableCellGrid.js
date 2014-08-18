/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
"use strict";

var React               = require('react');
var PropTypes           = React.PropTypes;
var BaseGrid            = require('../Grid');
var DraggableCell                = require('./cells/DraggableCell');

var CopyPasteGrid = React.createClass({

  propTypes : {
    onCellChanged : React.PropTypes.func.isRequired
  },

  render: function() {
    var cellRenderer = (
      <DraggableCell
        selected={this.state.selected}
        dragged={this.state.dragged}
        onSelect={this.onSelect}
        onClick={this.onSelect}
        handleDragStart={this.handleDragStart}
        handleDragEnter={this.handleDragEnter}
        />
    );
    return this.transferPropsTo(
      <BaseGrid cellRenderer={cellRenderer} />
    )
  },

  getInitialState: function() {
    return {selected : {idx : 0, rowIdx : 0}, dragged : null};
  },

  onSelect: function(selected) {
    var idx = selected.idx;
    var rowIdx = selected.rowIdx;
    if (
      idx >= 0
      && rowIdx >= 0
      && idx < this.props.columns.length
      && rowIdx < this.props.length
    ) {
      this.setState({selected: selected});
    }
  },

  handleDragStart(dragged){
    var idx = dragged.idx;
    var rowIdx = dragged.rowIdx;
    if (
      idx >= 0
      && rowIdx >= 0
      && idx < this.props.columns.length
      && rowIdx < this.props.length
    ) {
      this.setState({dragged: dragged});
    }
  },

  handleDragEnter(row){
    var dragged = this.state.dragged;
    dragged.overRowIdx = row;
    this.setState({dragged : dragged});
  }
})


module.exports = CopyPasteGrid;