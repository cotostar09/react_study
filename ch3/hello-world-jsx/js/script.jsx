let hw0 = React.createElement('h1', null, 'Hello world!')

      class HelloWorld extends React.Component{
        render(){
          console.log('isFrozen this.props'+Object.isFrozen(this.props))
          let hw;
          if (this.props.id != null ){
            hw = React.createElement('h1', this.props , 'Hello'+this.props.id+' world!')
          } else{
            hw = React.createElement('h1', null, 'Hello world! id = null')
          }
          let hw2 = React.createElement('h1', null, 'Hello world 2!')
          return React.createElement('div', null, hw, hw2)
        }
      }

      ReactDOM.render( <HelloWorld/>,
        document.getElementById('content')
      )