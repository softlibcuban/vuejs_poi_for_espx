import Vue from "vue";
import Router from "vue-router";

import layout from '@/layout/TestLayout'


import dashboard from '@/views/Dashboard'

Vue.use(Router);

export default new Router({
    routes: [
      {
        path: "/",
        component: layout,
        children: [
          {
            path: "",
            component: dashboard,
            meta: {
              breadcrumb: "Escritorio"
            }
          }
        ]
      }
    ]
  });
  