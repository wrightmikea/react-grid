/**
 * @jsx React.DOM
 * @copyright Prometheus Research, LLC 2014
 */
'use strict';

var React            = require('react/addons');
var cx               = React.addons.classSet;
var cloneWithProps   = React.addons.cloneWithProps;
var SimpleTextEditor = require('../../editors/SimpleTextEditor');
var PropTypes        = React.PropTypes;
var MixinHelper      = require('../../utils/MixinHelper');
var SelectableMixin  = require('./SelectableMixin');
var KeyboardHandlerMixin = require('./KeyboardHandlerMixin');

var EditableMixin = MixinHelper.createDependency({

  KeyboardHandlerMixin : KeyboardHandlerMixin,

  SelectableMixin : SelectableMixin

  }).assignTo({

    propTypes : {
        onCommit : PropTypes.func.isRequired
    },

    canEdit:function(){
      return (this.props.column.editor != null) || this.props.column.editable;
    },


    getEditor:function(){

      var editorProps = {height : this.props.height, onPressEscape : this.onPressEscape,  onCommit : this.onCommit, initialKeyCode : this.props.selected.initialKeyCode, editorRowMetaData : this.getEditorRowMetaData()};
      var customEditor = this.props.column.editor;
      if(customEditor && React.isValidElement(customEditor)){
        //return custom column editor or SimpleEditor if none specified
        return cloneWithProps(customEditor, editorProps);
      }else{
        return cloneWithProps(SimpleTextEditor(), editorProps);
      }
    },

    getEditorRowMetaData:function(){
      //clone row data so editor cannot actually change this
      var columnName = this.props.column.ItemId;
      //convention based method to get corresponding Id or Name of any Name or Id property
      if(typeof this.props.column.getEditorRowMetaData === 'function'){
        return this.props.column.getEditorRowMetaData(this.props.rowData);
      }
    },

    getFormatter:function(){
      var col = this.props.column;
      if(this.isActive()){
        return this.getEditor();
      }else{
        return this.props.column.formatter;
      }
    },

    onCommit:function(commit){
      var rowIdx = this.props.rowIdx;
      var idx = this.props.idx;
      var cellKey = this.props.column.key;
      this.props.onCommit({cellKey: cellKey, rowIdx: this.props.filterRowIdx || rowIdx, value : commit.value, keyCode : commit.key, changed : commit});
    },

    checkFocus: function() {
      if (this.isSelected() && !this.isActive()) {
        this.getDOMNode().focus();
      }
    },

    onClick:function() {
      if(!this.isActive()){
        var rowIdx = this.props.rowIdx;
        var idx = this.props.idx;
        this.props.onClick({rowIdx: rowIdx, idx: idx});
      }

    },

    onDoubleClick:function() {
      var rowIdx = this.props.rowIdx;
      var idx = this.props.idx;
      this.props.onClick({rowIdx: rowIdx, idx: idx, active : this.canEdit()});
    },

    setActive:function(keyPressed){
      var rowIdx = this.props.rowIdx;
      var idx = this.props.idx;
      if(this.props.column.key === 'select-row' && this.props.column.onRowSelect){
        this.props.column.onRowSelect(rowIdx);
      }
      else if(this.canEdit() && !this.isActive()){
        this.props.onSetActive({idx: idx, rowIdx: rowIdx, active : true, initialKeyCode : keyPressed});
      }
    },

    setInactive:function(){
      if(this.canEdit() && this.isActive()){
        var rowIdx = this.props.rowIdx;
        var idx = this.props.idx;
        this.props.onSetActive({idx: idx, rowIdx: rowIdx, active : false});
      }
    },

    isActive:function(){
      return this.isSelected() && this.props.selected.active === true;
    },

    onPressEnter:function(e){
      this.setActive(e.key);
    },

    onPressDelete:function(e){
      this.setActive(e.key);
    },

    onPressEscape:function(e){
      this.setInactive(e.key);
    },

    onPressBackspace:function(e){
      this.setActive(e.key);
    },

    onPressChar:function(e){
      if(this.isKeyPrintable(e.keyCode)){
        this.setActive(e.keyCode);
      }
    }
});



module.exports = EditableMixin;
