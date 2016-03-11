var Product = React.createClass({
  addtocart: function(e) {
              e.preventDefault();
              $.ajax({
                url: 'http://localhost:3000/addtocart',
                type: 'POST',
                cache: false,
                data: this.props.data,
                success: function (data) {
                history.go(0);
                }.bind(this),
                error: function (xhr, status, err) {
                  console.error('http://localhost:3000',status, err.toString());
                }.bind(this)
              });
},
    render: function() {

        var data = this.props.data;

        return (
          <div className="item  col-xs-4 col-lg-4">
              <div className="thumbnail">
                  <div className="caption">
                      <h4 className="group inner list-group-item-heading"><a href={data.url}>{data.title}</a></h4>
                      <div className="row">
                          <div className="col-xs-12 col-md-6">
                              <p className="lead">
                                  {data.price}:-</p>
                          </div>
                          <div className="col-xs-12 col-md-6">
                             <button type="button" className="btn btn-success" onClick={this.addtocart}>Add to cart</button>
                         </div>
                      </div>
                  </div>
              </div>
          </div>
        );
    }
});
