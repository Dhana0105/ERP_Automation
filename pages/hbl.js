import BasePage from './base.js'
import data from '../data/erp.json'
import { commonLocators } from '../pageobject/common_page.js'
import { hblLocator } from '../pageobject/hbl_page.js'
const H = hblLocator
const C = commonLocators

class HBL extends BasePage {
    constructor(page) {
        super(page)
        this.hblNo = ''
        this.consolUrl = ''
        this.mblNo = '' 
    }
    async pickCostHeading() {
        await this.waitAndClick(C.costHeadingCombobox)
        await this.waitAndClick(C.oceanFreight)
    }
    async hblcombobox() {
        await this.waitAndClick(H.shipmentMode)
        await this.waitAndClick(C.shipmentTypeOption(data.hbl.mode))
        await this.waitAndClick(H.incoterm)
        await this.waitAndClick(C.shipmentTypeOption(data.hbl.incoterm))
        await this.waitAndClick(H.movementType)
        await this.waitAndClick(C.shipmentTypeOption(data.hbl.service))
        await this.waitAndClick(H.freight)
        await this.waitAndClick(C.shipmentTypeOption(data.hbl.freightTerms))
        await this.waitAndClick(H.salesPerson)
        await this.waitAndClick(C.shipmentTypeOption(data.hbl.salesperson))
        await this.waitAndClick(C.polCombobox)
        await this.waitAndClick(C.shipmentTypeOption(data.mbl.poloption))
        await this.waitAndClick(C.podCombobox)
        await this.waitAndClick(C.shipmentTypeOption(data.mbl.podoption))
        await this.waitAndClick(H.packageType)
        await this.waitAndClick(C.shipmentTypeOption(data.hbl.packageType))
    }
    async hblfillfield() {
        await this.waitAndFill(H.commodityInput, data.hbl.commodity)
        await this.waitAndFill(H.hsCodeInput, data.hbl.hsCode)
        await this.waitAndFill(H.lengthInput, data.hbl.length)
        await this.waitAndFill(H.breadthInput, data.hbl.breadth)
        await this.waitAndFill(H.heightInput, data.hbl.height)
        await this.waitAndFill(H.weightPerPkgInput, data.hbl.weightPerPkg)
        await this.waitAndFill(H.noOfPkgsInput, data.hbl.noOfPkgs)
        
    }

    async pickDate(d) {
        await this.waitAndClick(C.pickDateFirstBtn)
        for (let i = 0; i < d.nextMonth; i++) {
            await this.waitAndClick(C.nextMonthBtn)
        }
        await this.waitAndClick(d.nth ? C.dateCellNth(d.day, d.nth) : C.dateCell(d.day))
    }

    async readNumber(selector, pattern) {
        await this.isElementVisible(selector, H.errorMsg)
        const text = await this.page.locator(selector).first().textContent()
        const match = text.match(pattern)
        if (!match) throw new Error(`Could not parse number from toast text: ${text}`)
        return match[0]
    }

    // ---------- HBL: create ----------
    async createHbl() {
        await this.waitAndClick(H.hblLink)
        await this.waitAndClick(H.newHblBtn)
        await this.waitAndClick(H.lclTypeBtn)
        await this.hblcombobox()
        await this.waitAndClick(H.blTypeRadio)
        await this.waitAndClick(H.bookingPartyCombobox)
        await this.waitAndClick(H.suggestionsListbox)
        await this.waitAndClick(H.receivingPartyCombobox)
        await this.waitAndClick(H.suggestionsListbox)
        await this.hblfillfield()
        await this.isElementVisible(H.cargoDetailsText, H.cargoErrorMsg)
    }

    // ---------- HBL: revenue charges
    async addRevenueChargesAndConfirm() {
        const r = data.revenue
        await this.waitAndClick(H.sellRevenueTab)
        await this.waitAndClick(H.addRevenueChargeBtn) // add only one revenue row
        await this.pickCostHeading()
        await this.waitAndClick(H.rateCellSpinbutton)
        await this.keyPress(H.rateCellSpinbutton, 'ArrowRight')
        await this.waitAndFill(H.rateCellSpinbutton, r.exchangeRate)
        await this.waitAndFill(H.spinbuttonFourth, r.first)
        await this.page.getByRole('combobox').filter({ hasText: 'Select Tax Mode' }).click()
        await this.page.getByRole('option', { name: data.gst }).click()
        await this.waitAndClick(C.saveDraftBtn)
        await this.waitAndClick(H.draftShipmentsTab)
        await this.waitAndClick(H.firstHblDraft)
        await this.waitAndClick(C.editBtn)
        await this.waitAndFill(H.hsCodeInput, data.hblhscode)
        await this.waitAndClick(H.hblupdateDraftBtn)
        await this.waitAndClick(C.editBtn)
        await this.waitAndClick(C.confirmBtn)
        await this.waitAndClick(H.confirmHblBtn)
        //await this.page.getByRole('alertdialog').waitFor({ state: 'visible' })
    }

    // ---------- HBL: attach first confirmed HBL to the MBL ----------
    async attachHblToMbl() {
        await this.waitAndClick(H.hblLink)
        await this.waitAndClick(H.firstHblConfirmed)
        await this.waitAndClick(C.editBtn)
        await this.waitAndClick(H.attachToMasterBtn)       
        await this.waitAndFill(H.mblSearchInput, this.mblNo)
        await this.waitAndClick(H.numberText(this.mblNo))
        await this.waitAndClick(H.updateShipmentBtn)
        console.log('Run Successfully....')
    }
}

export default HBL


