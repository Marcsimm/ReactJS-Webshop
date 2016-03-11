var CartDropDown = React.createClass({

  loadDataFromServer: function() {
        $.ajax({
          url: this.props.url,
          dataType: 'json',
          success: function(data) {
            this.setState({data: data});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
          }.bind(this)
        });
      },
      getInitialState: function() {
       return {data: []};
     },
      componentDidMount: function() {
          this.loadDataFromServer();
        },

  render: function() {

  {this.state.data.map((item) => {})}
return(

  <ul className="nav navbar-nav navbar-right">
    <li className="dropdown">
      <a href="http://localhost:3000/cart"> <span className="glyphicon glyphicon-shopping-cart"></span>{this.state.data.length}- Items<span></span></a>
    </li>
  </ul>
  );
}
});
