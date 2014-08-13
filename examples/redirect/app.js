/** @jsx React.DOM */
var React = require('react');
var Router = require('../../index');
var Route = Router.Route;
var Routes = Router.Routes;
var Redirect = Router.Redirect;
var Link = Router.Link;

var App = React.createClass({
  render: function() {
    return (
      <div className="App">
        <Link to="abc">abc</Link><br />
        <Link to="def">def</Link><br />
        <Link to="ghi">ghi</Link><br />
        <Link to="jkl">jkl</Link><br />
        <Link to="mno">mno</Link><br />
        <Link to="pqr">pqr</Link><br />
        <Link to="stu">stu</Link><br />
        <Link to="vwx">vwx</Link><br />
        <div>
          {this.props.activeRouteHandler() || <div>Home</div>}
        </div>
      </div>
    );
  }
});

var build = function(name) {
  return React.createClass({
    statics: {
      willTransitionTo: function(transition, props) {
        console.log('willTransitionTo called in ' + name + ' while transitioning to ' + transition.path);

        if (transition.path === '/abc/mno')
          Router.replaceWith('pqr');
          //transition.redirect('pqr');
      }
    },
    render: function(){
      return (
        <div>
          <p>{name}</p>
          {this.props.activeRouteHandler()}
        </div>
      );
    }
  });
};

var routes = (
  <Routes>
    <Route path='/' handler={App}>
      <Route name='abc' path='/abc' handler={build('abc')}>
        <Redirect from='abc' to='def' />
        <Route name='def' path='/abc/def' handler={build('def')} />
        <Route name='ghi' path='/abc/ghi' handler={build('ghi')} />
        <Route name='jkl' path='/abc/jkl' handler={build('jkl')} />
        <Route name='mno' path='/abc/mno' handler={build('mno')}>
          <Route name='pqr' path='/abc/mno/pqr' handler={build('pqr')} />
          <Route name='stu' path='/abc/mno/stu' handler={build('stu')} />
          <Route name='vwx' path='/abc/mno/vwx' handler={build('vwx')} />
        </Route>
      </Route>
    </Route>
  </Routes>
);

React.renderComponent(routes, document.getElementById('example'));
