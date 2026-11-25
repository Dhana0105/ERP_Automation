import BasePage from './base.js'
import MBL from './mbl.js'
import HBL from './hbl.js'
import data from '../data/erp.json'
import { loginLocators } from '../pageobject/login_page.js'
const D = loginLocators

class Erp extends BasePage {
    constructor(page) {
        super(page)
        this.mbl = new MBL(page)
        this.hbl = new HBL(page)
    }

        async login() {
        await this.open(data.url.login)
        await this.waitAndFill(D.loginEmail, data.login.email)
        await this.waitAndFill(D.loginPassword, data.login.password)
        await this.waitAndClick(D.signInBtn)
        await this.waitForPageLoad()
    }

    async createMblDraft() 
    { 
        return this.mbl.createMblDraft() 
    }
    async openDraftMbl() 
    { 
        return this.mbl.openDraftMbl() 
    }
    async addInitialCostCharges() 
    { 
        return this.mbl.addInitialCostCharges() 
    }
    async viewConfirmedMbl() 
    { 
        return this.mbl.viewConfirmedMbl() 

    }

  
    async createHbl() 
    { 
        return this.hbl.createHbl() 
    }
    async addRevenueChargesAndConfirm() 
    { 
        return this.hbl.addRevenueChargesAndConfirm() 
    }
    async attachHblToMbl() {
            this.hbl.mblNo = this.mbl.mblNo
        return this.hbl.attachHblToMbl()
    }
}

export default Erp