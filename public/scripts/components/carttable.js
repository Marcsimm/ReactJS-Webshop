var Carttable = React.createClass({

  getInitialState: function(e) {
   return {data: []}
  },
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
    componentDidMount: function() {
        this.loadDataFromServer();
      },
      DeleteItem: function(_id) {
        $.ajax({
          url: 'http://localhost:3000/delete/' + _id,
          type: 'DELETE',
          success: function(result) {
        window.location.reload();
      }
    });
          },
          UpdateItem: function(_id) {
            var input = this.refs.myInput;
            var quantity = {quantity: input.value};
                      $.ajax({
                        url: 'http://localhost:3000/update/' + _id,
                        type: 'PUT',
                        cache: false,
                        data: quantity,
                        success: function (data) {
                          window.location.reload();
                        }.bind(this),
                        error: function (xhr, status, err) {
                          console.error('http://localhost:3000',status, err.toString());
                        }.bind(this)
                      });
        },
              CountTotal: function() {
              var total = 0;
              this.state.data.forEach(function(item, index) {
                total += item.price * item.quantity;
              });

              return total;
            },

      render: function(){

     return(

       <table className="table table-hover">
              <thead>
                  <tr>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th className="text-center">Price</th>
                      <th className="text-center">Total</th>
                      <th> </th>
                  </tr>
              </thead>
              <tbody>
              {this.state.data.map((item) => {
          return (
                  <tr key={item._id}>
                      <td className="col-sm-8 col-md-6">
                      <div className="media">
                          <div className="media-body">
                              <h4 className="media-heading"><a href={item.url}>{item.title}</a></h4>
                          </div>
                      </div></td>
                      <td className="col-sm-1 col-md-1" styles="text-align: center">
                      <input ref="myInput" type="number" name="quantity" min="1" max="10" defaultValue={item.quantity}  className="form-control"/>
                      </td>
                      <td className="col-sm-1 col-md-1 text-center"><strong>{item.price}:-</strong></td>
                      <td className="col-sm-1 col-md-1 text-center"><strong>{item.price * item.quantity}:-</strong></td>
                      <td className="actions" data-th="">
								<button className="btn btn-info btn-sm" onClick={this.UpdateItem.bind(this,item._id)}><i className="fa fa-refresh"></i></button>
								<button className="btn btn-danger btn-sm" onClick={this.DeleteItem.bind(this,item._id)}><i className="fa fa-trash-o"></i></button>
							</td>
                  </tr>
                );
                       })}
                  <tr>
                      <td>   </td>
                      <td>   </td>
                      <td>   </td>
                      <td><h3>Total</h3></td>
                      <td className="text-right"><h3><strong>{this.CountTotal()}:-</strong></h3></td>
                  </tr>
                  <tr>
                      <td>   </td>
                      <td>   </td>
                      <td>   </td>
                      <td>
                      <a type="button" className="btn btn-default" href="http://localhost:3000/">
                          <span className="glyphicon glyphicon-shopping-cart"></span> Continue Shopping
                      </a></td>
                      <td>
                      <a type="button" className="btn btn-success" href="http://localhost:3000/order">
                          <span className="glyphicon glyphicon-shopping-cart"></span> Checkout
                      </a></td>
                  </tr>
              </tbody>
          </table>

      );

  }

});
