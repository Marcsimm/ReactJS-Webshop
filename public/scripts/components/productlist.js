var ProductsList = React.createClass({

loadDataFromServer: function() {
      $.ajax({
        url: this.props.url,
        dataType: 'json',
        cache: false,
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
        var products = this.state.data.map(function(product) {
            return (
              <li key={product._id}>
                <Product data={product} />
              </li>
            )
        });

        return (
          <ul className="clearfix">
            {products}
          </ul>
        );
    }
});
