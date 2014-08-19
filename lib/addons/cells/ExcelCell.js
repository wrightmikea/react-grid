/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React                = require('react/addons');
var BaseCell             = require('../../Cell');
var SelectableMixin      = require('./mixins/SelectableMixin');
var EditableMixin        = require('./mixins/EditableMixin');
var CopyableMixin    = require('./mixins/CopyableMixin');
var DraggableMixin   = require('./mixins/DraggableMixin');
var MixinHelper          = require('../utils/MixinHelper');
var KeyboardHandlerMixin = require('./mixins/KeyboardHandlerMixin');
var PropTypes            = React.PropTypes;
var cx                   = React.addons.classSet;
var cloneWithProps       = React.addons.cloneWithProps;

var ExcelCell = React.createClass({

  mixins : MixinHelper.mix([KeyboardHandlerMixin, SelectableMixin, EditableMixin, DraggableMixin, CopyableMixin ]),

  render: function() {
    return this.transferPropsTo(
      <BaseCell
        className={this.getCellClass()}
        onKeyDown={this.onKeyDown}
        onClick={this.onClick}
        handleDragStart={this.handleDragStart}
        onDragEnter={this.handleDragEnter}
        onDragEnd={this.props.handleDragEnd}
      />)
  }

})

module.exports = ExcelCell;