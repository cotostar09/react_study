class Clock extends React.Component {

  constructor(props) {
    super(props)
    this.launchClock()
    this.state = {currentTime: 'test'}
  }   //생성자

  launchClock() {
    setInterval(()=> {
      console.log('Updating time...')
      this.setState({
        currentTime: (new Date()).toLocaleString() 
      })
    }, 1000)    //1초에 한번씩 실행
  }             //시간 재설정

  render() {
    console.log('Rendering Clock...')
    return <div>{this.state.currentTime}</div>
  }
} //상태 랜더링