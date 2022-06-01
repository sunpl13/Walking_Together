import React from "react";
import { Route, Switch } from "react-router-dom";
import Auth from "../hoc/Auth";
import TopBar from "../utils/TopBar";

//user
import RegisterPage from "../user/register/RegisterPage";
import Register from "../user/register/Register";
import RegisterAuth from "../user/register/RegisterAuth";
import FindPassword from "../user/find/FindPassword";
import FindPasswordResult from "../user/find/FindPasswordResult";
import MemberStipulation from "../user/register/MemberStipulation";
import InfoStipulation from "../user/register/InfoStipulation";
import LocationStipulayion from "../user/register/LocationStipulation";
import Activity from "../user/Activity/Activity";
import CreateActivity from "../user/Activity/CreateActivity";
import ActivityRegister from "../user/Activity/ActivityRegister";

const User1 = () => {
  return (
    <div>
      <TopBar/>
      <div id="user1Route">
        <Switch>
          <Route path="/user1/register" component={Auth(RegisterPage,false)}/>
          <Route path="/user1/signup" component={Auth(Register,false)}/>
          <Route path="/user1/registerauth" component={Auth(RegisterAuth,false)}/>
          <Route path="/user1/findpassword" component={Auth(FindPassword,false)}/>
          <Route path="/user1/findresult" component={Auth(FindPasswordResult,false)}/>
          <Route path="/user1/memberstipulation" component={Auth(MemberStipulation,false)}/>
          <Route path="/user1/infostipulation" component={Auth(InfoStipulation,false)}/>
          <Route path="/user1/locationstipulation" component={Auth(LocationStipulayion,false)}/>
          <Route path="/user1/activity" component={Auth(Activity,true)}/>
          <Route path="/user1/createactivity" component={Auth(CreateActivity,true)}/>
          <Route path="/user1/activity-register" component={Auth(ActivityRegister, true)}/>
        </Switch>
      </div>
    </div>
  );
};

export default User1;