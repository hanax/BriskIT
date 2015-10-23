var Ticket = React.createClass({
  handleClick: function() {
    $(this.refs.desc).toggle('fast');
    $(this.refs.btnHelp).toggle('fast');
  },
  submitHelp: function() {
    takeRequest(this.props.ticketObj);
    //ticketsBox.getTickets();
    $(this.refs.curTicket).fadeOut();
    updateMyRequestNumber();
  },
  render: function() {
    return (
      <div className="prob" onClick={this.handleClick} ref="curTicket">
        <div className="wrapper">
          <div className="title"> {this.props.title} </div>
          <div className="desc" ref="desc">
            <span className="fa fa-quote-left"> </span>
            <span> {this.props.desc} </span>
            <span className="fa fa-quote-right"></span>
          </div>
          <div className="tag adobe"></div>
          <div className="tag software"></div>
          <div className="request-bottom">
            <div className="requester"> 
              <span className="fa fa-user"></span>
              <span>{this.props.author}</span>
            </div>
            <div className="request-time">
              <span className="fa fa-clock-o"></span>
              <span>{this.props.time}</span>
            </div>
          </div>
        </div>
        <div className="btn-help" ref="btnHelp" onClick={this.submitHelp}></div>
      </div>
    );
  }
});

var TicketList = React.createClass({
  render: function() {
    var ticketNodes = this.props.tickets.map(function(ticket, index) {
      return (
        <Ticket 
          author={ticket.get("requester")} 
          title={ticket.get("title")} 
          time={ticket.get("createdAt").toString().substring(0, 10)} 
          desc={ticket.get("requestMessage")} 
          ticketObj={ticket}
          key={index}>
        </Ticket>
      );
    });
    return (
      <div className="ticket-list">
        {ticketNodes}
      </div>
    );
  }
});

var TicketsBox = React.createClass({
  // mixins: [ParseReact.Mixin], // Enable query subscriptions

  // observe: function() {
  //   return {
  //     tickets: new Parse.Query(Parse.Object.extend("Request")).equalTo("taken", 0)
  //   };
  // },

  getInitialState: function() {
    return {data: []};
  },

  getTickets: function() {
    console.log("regetting.....");
    var openRequests = Parse.Object.extend("Request");
    var query = new Parse.Query(openRequests);
    var _this = this;

    query.equalTo("taken", 0);
    query.find({
      success: function(data) {
        console.log("Successfully retrieved " + data.length + " requests.");
        _this.setState({data: data});
      },
      error: function(error) {
        alert("Error: " + error.code + " " + error.message);
      }
    });
  },

  componentDidMount: function() {
    this.getTickets();
  },

  render: function() {
    return (
      <div className="probs">
        <TicketList tickets={this.state.data} />
      </div>
    );
  }
});

var ticketsBox = ReactDOM.render(
  <TicketsBox />,
  document.getElementsByClassName('right-probs')[0]
);

var updateTicket = function() {
  ticketsBox.getTickets();
}

window.updateTicket = updateTicket;