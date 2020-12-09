import React from 'react';

class Page extends React.Component {
  render() {
    return (
      <div className="font-body min-h-screen">
          {this.props.children}
      </div>
    );
  }
}

export default Page;