import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import MenuCalendar from 'components/menu-calendar/MenuCalendar';
import Dishes from 'components/dishes/Dishes';

function MenuRouter() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route path="/menu-calendar" component={MenuCalendar} />
        <Route path="/dishes" component={Dishes} />
        <Redirect from="/" to="/menu-calendar" />
      </Switch>
    </BrowserRouter>
  );
}

export default MenuRouter;
