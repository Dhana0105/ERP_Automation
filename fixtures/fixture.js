import {test as base} from '@playwright/test'
import Erp from '../pages/erp.js'
import schedule from '../pages/schedule.js'

const test = base.extend({
  erp: async({page},use)=>{
    await use(new Erp(page))
  },
  schedule:async({page},use)=>{
    //await use(new schedule(page))
  }

  // add relative pages like HBL, MBL and login
})
export default test
