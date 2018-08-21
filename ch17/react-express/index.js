/**
 * 서버파일
 * 의존 모듈 불러오기 : express 및 관련된 플러그인 등 의존 모듈을 불러온다.
 * 설정: 사용할 템플릿 엔진을 지정하는 등 설정을 입력한다.
 * 미들웨어 : 유효성 검사, 인증, 압축 등 모든 수신 요청에 대해 수행할 공통의 통작을 정의한다.
 * 라우팅 : /accounts, /users 등 서버에서 서리할 URL과 동작을 정의한다.
 * 실행 : HTTP 또는 HTTPS 서버를 실행한다.
 */

const fs = require('fs')
const express = require('express')        //모듈 불러오기
const app = express()
const errorHandler = require('errorhandler')
const http = require('http')
const https = require('https')

const httpPort = 3000
const httpsPort = 443


//babel-register 라이브러리를 통해서 JSX를 변환하지 않고 require로 바로 불러 올 수 있게 설정
const React = require('react')
require('babel-register')({
  presets: [ 'react' ]
})
const ReactDOMServer = require('react-dom/server')

//About 컴포넌트를 불러오고 React 객체를 생성.
const About = React.createFactory(require('./components/about.jsx'))  

app.set('view engine', 'hbs')       //설정 입력 use Hadlebars (탬플릿 언어)

//라우팅 정의 ( 이 프로젝트에서는 순수한 미들웨어를 사용하지 않는다. )
app.get('/', (request, response, next) => {
  response.send('Hello!')
})


app.get('/about', (request, response, next) => {
  const aboutHTMl = ReactDOMServer.renderToString(About())      //React 마크업이 포함된 HTML 문자열 생성
  response.render('abouts', {about: aboutHTMl})                  //React HTML 문자열을 Handlebars 탬플릿인 about.hbs로 전달
})

// app.get('/about', (request, response, next) => {
//   response.send(`<div>
//   <a href="http://Node.University" target="_blank">Node.University</a>
//    is home to top-notch Node education which brings joy to JavaScript engineers.
// </div>`)
//})

app.all('*', (request, response, next) => {
  response.status(404).send('Not found... <br/>did you mean to go to <a href = "/about">/about</a> instead?')
})


app.use((error, request, response, next) => {
  console.error(request.url, error)
  response.send('Wonderful, something went wrong...')
})

//오류 처리 정의 ( 미들웨어 사용 )
app.use(errorHandler)


//HTTP 서버 실행
http.createServer(app)
  .listen(httpPort, ()=>{
    console.log(`HTTP server is listening on ${httpPort}`)
  })


try {
  const options = {
    key: fs.readFileSync('./server.key'),
    cert: fs.readFileSync('./server.crt')
  }
} catch (e) {
  console.warn('Cannot start HTTPS. \nCreate server.key and server.crt for HTTPS.')
}
if (typeof options != 'undefined')
//HTTPS 서버 실행
  https.createServer(app, options)
    .listen(httpsPort, ()=>{
      console.log(`HTTPS server is listening on ${httpsPort}`)
    })
