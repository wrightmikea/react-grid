var ReactGrid = require('../build/ReactGrid');
var getRows   = require('./getRows');
var QuickStartDescription = require('./components/QuickStartDescription')

var columns = [
{
  key: 'id',
  name: 'ID'
},
{
  key: 'title',
  name: 'Title'
},
{
  key: 'count',
  name: 'Count'
}
]

module.exports = React.createClass({

  render:function(){
    return(
      <div>
        <QuickStartDescription title="A Simple Example"/>
        <ReactGrid rows={getRows(0,100)} columns={columns}/>
      </div>
      )
  }

});
