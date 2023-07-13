// Write your code here
import {Component} from 'react'

import './index.css'

class DigitalTimer extends Component {
  constructor() {
    super()
    this.state = {
      isTimer: false,
      timeLimitInMinutes: 25,
      timePassedInSeconds: 0,
    }
  }

  clearTimer = () => {
    clearInterval(this.intervalId)
    console.log('clear')
    this.setState({isTimer: false})
  }

  incrementTimePassed = () => {
    console.log('timer started')

    const {timePassedInSeconds, timeLimitInMinutes} = this.state
    const isComplete = timePassedInSeconds === timeLimitInMinutes * 60
    if (isComplete) {
      this.setState({timePassedInSeconds: 0, timeLimitInMinutes: 0})
      this.clearTimer()
    } else {
      this.setState(pre => ({timePassedInSeconds: pre.timePassedInSeconds + 1}))
    }
  }

  increaseTimer = () => {
    const {isTimer} = this.state

    if (!isTimer)
      this.setState(pre => ({timeLimitInMinutes: pre.timeLimitInMinutes + 1}))
  }

  decreaseTimer = () => {
    const {isTimer} = this.state
    const {timeLimitInMinutes} = this.state
    if (!isTimer && timeLimitInMinutes > 0)
      this.setState(pre => ({timeLimitInMinutes: pre.timeLimitInMinutes - 1}))
  }

  playOrPaused = () => {
    console.log('hi')
    const {isTimer, timeLimitInMinutes, timePassedInSeconds} = this.state

    const isComplete = timePassedInSeconds === timeLimitInMinutes * 60

    if (isComplete) this.setState({timePassedInSeconds: 0})

    if (isTimer) this.clearTimer()
    else {
      this.intervalId = setInterval(this.incrementTimePassed, 1000)

      this.setState(pre => ({...pre, isTimer: !pre.isTimer}))
    }
  }

  reset = () => {
    console.log('hello')
    this.clearTimer()
    this.setState({
      timePassedInSeconds: 0,
      timeLimitInMinutes: 25,
    })
  }

  getTime = () => {
    const {timeLimitInMinutes, timePassedInSeconds} = this.state
    const timeLeft = timeLimitInMinutes * 60 - timePassedInSeconds
    const sec = timeLeft % 60
    const min = Math.floor(timeLeft / 60)

    return {s: sec, m: min}
  }

  render() {
    const {timeLimitInMinutes, isTimer} = this.state
    const {s, m} = this.getTime()

    const sec = s > 9 ? `${s}` : `0${s}`

    const min = m > 9 ? `${m}` : `0${m}`

    const mode = isTimer ? 'Pause' : 'Start'
    const status = isTimer ? 'Running' : 'Paused'

    const iconUrl = isTimer
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const alt = isTimer ? 'pause icon' : 'play icon'
    return (
      <div className="main">
        <h1>Digital Timer</h1>
        <div>
          <div className="row">
            <div className="watch row">
              <div className="main-display col">
                <h1>
                  {min}:{sec}
                </h1>
                <p>{status}</p>
              </div>
            </div>
            <div className="col">
              <div className="row">
                <div className="row">
                  <div>
                    <button type="button" onClick={this.playOrPaused}>
                      <img src={iconUrl} alt={alt} />
                      {mode}
                    </button>
                  </div>
                </div>
                <div className="row">
                  <div>
                    <button type="button" onClick={this.reset}>
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                        alt="reset icon"
                      />
                      Restart
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <p>Set Timer Limit</p>
                <div className="row">
                  <div>
                    <button type="button" onClick={this.decreaseTimer}>
                      -
                    </button>
                  </div>
                  <p className="set-timer">{timeLimitInMinutes}</p>
                  <div>
                    <button type="button" onClick={this.increaseTimer}>
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
