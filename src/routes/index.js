import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Students from '~/pages/Students';
import CreateStudents from '~/pages/Students/Create';
import UpdateStudents from '~/pages/Students/Update';

import Plans from '~/pages/Plans';
import CreatePlans from '~/pages/Plans/Create';
import UpdatePlans from '~/pages/Plans/Update';

import Registrations from '~/pages/Registrations';
import CreateRegistrations from '~/pages/Registrations/Create';
import UpdateRegistrations from '~/pages/Registrations/Update';

import HelpOrders from '~/pages/HelpOrders';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/create" component={CreateStudents} isPrivate />
      <Route path="/students/update" component={UpdateStudents} isPrivate />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/create" component={CreatePlans} isPrivate />
      <Route path="/plans/update" component={UpdatePlans} isPrivate />

      <Route path="/registrations" exact component={Registrations} isPrivate />
      <Route
        path="/registrations/create"
        component={CreateRegistrations}
        isPrivate
      />
      <Route
        path="/registrations/update"
        component={UpdateRegistrations}
        isPrivate
      />

      <Route path="/help-orders" exact component={HelpOrders} isPrivate />
    </Switch>
  );
}
