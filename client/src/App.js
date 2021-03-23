import React from 'react'
import { Route, Switch } from 'react-router-dom';
//인증 가능할 시에 인증
import Auth from './hoc/Auth';
import './styles/app.scss';
import Nav from './utils/Nav'

//admin
import Admin from './admin/Admin';
import Login from './admin/Login/Login';

//user
import Certification from './user/Certification/Certification';
import Map from './user/Mapsj/Map';

function App() {
  return (
    <div id="app" className="App">
  
      <Switch>
        <Route path="/admin" component={Admin} />
<<<<<<< Updated upstream
        <Route path="/login" component={Login} />
        <Route path="/user/certification" component={Certification} />
        <Route path="/user/map" component={Map} />
=======
        <Route path="/login" component={Auth(Login,false)} />
        <Route path="/register" component={Auth(RegisterPage,false)}/>
        <Route path="/mypage" component={Auth(Mypage,true)}/>
        <Route path="/signup" component={Auth(Register,false)}/>
        <Route path="/registerauth" component={Auth(RegisterAuth,false)}/>
        <Route path="/home" component={Auth(Home,true)}/>
        <Route path="/noticelist" component={Auth(UserNotice,true)}/>
        <Route path="/findpassword" component={Auth(FindPassword,false)}/>
        <Route path="/findresult" component={Auth(FindPasswordResult,false)}/>
>>>>>>> Stashed changes
      </Switch>
      <div style = "z-index:99;bottom:0px;left:0px;right:0px;position:absoulte !important; position:fixed"><Nav/></div>
    </div>
  )
}

export default App;