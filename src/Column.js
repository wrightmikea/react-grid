/* @flow */
var React = require('react/addons');
var PropTypes = React.PropTypes;

/**
 * Component that defines the attributes of table column.
 */
var Column = React.createClass({
  //statics: {
  //  __TableColumn__: true
  //},

  propTypes: {
    /**
     * The horizontal alignment of the table cell content.
     */
    //align: PropTypes.oneOf(['left', 'center', 'right']),

    /**
     * className for each of this column's data cells.
     */
    //cellClassName: PropTypes.string,

    /**
     * The cell renderer that returns React-renderable content for table cell.
     * ```
     * function(
     *   cellData: any,
     *   cellDataKey: string,
     *   rowData: object,
     *   rowIndex: number,
     *   columnData: any,
     *   width: number
     * ): ?$jsx
     * ```
     */
    cellRenderer: PropTypes.func,

    /**
     * The getter `function(string_cellDataKey, object_rowData)` that returns
     * the cell data for the `cellRenderer`.
     * If not provided, the cell data will be collected from
     * `rowData[cellDataKey]` instead. The value that `cellDataGetter` returns
     * will be used to determine whether the cell should re-render.
     */
    //cellDataGetter: PropTypes.func,

    /**
     * The key to retrieve the cell data from the data row. Provided key type
     * must be either `string` or `number`. Since we use this
     * for keys, it must be specified for each column.
     */
    key: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]).isRequired,

    /**
     * The cell renderer that returns React-renderable content for table column
     * header.
     * ```
     * function(
     *   label: ?string,
     *   cellDataKey: string,
     *   columnData: any,
     *   rowData: array<?object>,
     *   width: number
     * ): ?$jsx
     * ```
     */
    //headerRenderer: PropTypes.func,

    /**
     * The cell renderer that returns React-renderable content for table column
     * footer.
     * ```
     * function(
     *   label: ?string,
     *   cellDataKey: string,
     *   columnData: any,
     *   rowData: array<?object>,
     *   width: number
     * ): ?$jsx
     * ```
     */
    //footerRenderer: PropTypes.func,

    /**
     * Bucket for any data to be passed into column renderer functions.
     */
    //columnData: PropTypes.object,

    /**
     * The column's header label.
     */
    label: PropTypes.string,

    /**
     * The pixel width of the column.
     */
    width: PropTypes.number.isRequired,

    /**
     * If this is a resizable column this is its minimum pixel width.
     */
    //minWidth: PropTypes.number,

    /**
     * If this is a resizable column this is its maximum pixel width.
     */
    //maxWidth: PropTypes.number,

    /**
     * The grow factor relative to other columns. Same as the flex-grow API
     * from http://www.w3.org/TR/css3-flexbox/. Basically, take any available
     * extra width and distribute it proportionally according to all columns'
     * flexGrow values. Defaults to zero (no-flexing).
     */
    //flexGrow: PropTypes.number,

    /**
     * Whether the column can be resized with the
     * FixedDataTableColumnResizeHandle. Please note that if a column
     * has a flex grow, once you resize the column this will be set to 0.
     */
    //isResizable: PropTypes.bool,
  },

  render(): ?ReactElement{
    // if (__DEV__) {
    //   throw new Error(
    //     'Component <Column /> should never render'
    //   );
    // }
    return null;
  },
});

//Also need to export classes
//essentially this is just because we need it for flow
//maybe better to not use a react component for column at all?
class FixedTableColumn {
  cellRenderer: ?(cellData: any,
      cellDataKey: string,
      rowData: any,
      rowIndex: number,
      columnData: any,
      width: number) => ReactElement;

  key: (string | number);


  label: ?string;

  /**
  * The pixel width of the column.
  */
  width: number;
}
//adds on our own props
class ColumnType extends FixedTableColumn {
  locked: boolean;
  left: number;
}
module.exports = { Column , ColumnType };