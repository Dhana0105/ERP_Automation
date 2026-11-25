import BasePage from './base.js'
import data from '../data/erp.json'
import { commonLocators } from '../pageobject/common_page.js'
import { mblLocators } from '../pageobject/mbl_page.js'
const M = mblLocators
const C = commonLocators

class MBL extends BasePage {
    constructor(page) {
        super(page)
        this.mblNo = ''
        this.consolUrl = ''
    }
    async pickCostHeading() {
        await this.waitAndClick(C.costHeadingCombobox)
        await this.waitAndClick(C.oceanFreight)
    }

    async mblcombobox() {
        await this.waitAndClick(M.consoleType)
        await this.waitAndClick(C.shipmentTypeOption(data.mbl.shipmentType))
        await this.waitAndClick(M.consoleMode)
        await this.waitAndClick(C.shipmentTypeOption(data.mbl.direction))
        await this.waitAndClick(M.consolOperator)
        await this.waitAndClick(C.shipmentTypeOption(data.mbl.masterType))
        await this.waitAndClick(M.carrier)
        await this.waitAndClick(C.shipmentTypeOption(data.mbl.carrier))
        await this.waitAndClick(C.polCombobox)
        await this.waitAndClick(C.shipmentTypeOption(data.mbl.poloption))
        await this.waitAndClick(C.podCombobox)
        await this.waitAndClick(C.shipmentTypeOption(data.mbl.podoption))
        await this.waitAndClick(M.containerType)
        await this.waitAndClick(C.shipmentTypeOption(data.mbl.containerType))
    }

    async pickDate(d) {
        await this.waitAndClick(C.pickDateFirstBtn)
        for (let i = 0; i < d.nextMonth; i++) {
            await this.waitAndClick(C.nextMonthBtn)
        }
        await this.waitAndClick(d.nth ? C.dateCellNth(d.day, d.nth) : C.dateCell(d.day))
    }

    async readNumber(selector, pattern) {
        await this.isElementVisible(selector, M.mblErrorMessage)
        const text = await this.page.locator(selector).first().textContent()
        const match = text.match(pattern)
        if (!match) throw new Error(`Could not parse number from toast text: ${text}`)
        return match[0]
    }

    
    async createMblDraft() {
        await this.waitAndClick(M.mblLink)
        await this.page.waitForTimeout(2500)
        await this.waitAndClick(M.createMblBtn)
        await this.mblcombobox()
        await this.waitAndFill(M.vesselInput, data.mbl.vessel)
        await this.waitAndFill(M.voyageInput, data.mbl.voyage)
        await this.pickDate(data.mbl.etd)
        await this.pickDate(data.mbl.eta)
        await this.waitAndClick(C.saveDraftBtn)
        const toast = this.page.locator('text=/Draft NSACS\\d+ saved/').first()
        await toast.waitFor({ state: 'visible', timeout: 15000 })
        const toastText = await toast.textContent()
        const mblMatch = toastText.match(/NSACS\d+/)
        this.mblNo = mblMatch ? mblMatch[0] : data.mblNo
        await this.waitAndClick(M.cancelDraftBtn)
    }

    // ---------- MBL: open first draft ----------
    async openDraftMbl() {
        const tab = this.page.getByRole('tab', { name: 'Draft Shipments' })
        await tab.waitFor({ state: 'visible', timeout: 20000 })
        await tab.click()
        await this.waitAndClick(M.firstMblDraft)
        // const firstDraft = this.page.locator('[role="tabpanel"]').locator('div.cursor-pointer, div[role="button"]').first()
        // const draftCard = (await firstDraft.count()) > 0 ? firstDraft : this.page.locator(M.firstMblDraft).first()
        // await draftCard.waitFor({ state: 'visible'})
        // await draftCard.click()
        await this.page.waitForURL(/\/consol\//)
        this.consolUrl = await this.url()
        await this.waitAndClick(C.editBtn)
        await this.isElementVisible(M.pageContainer, M.mblErrorMsg)
    }

    // ---------- MBL: initial cost charges ----------
    async addInitialCostCharges() {
        const c = data.initialCosts
        await this.waitAndClick(M.addCostChargeBtn)
        await this.pickCostHeading()
        await this.waitAndFill(M.spinbuttonSecond, c.first)
        await this.page.getByRole('combobox').filter({ hasText: 'Select Tax Mode' }).click()
        await this.page.getByRole('option', { name: data.gst }).click()
        await this.waitAndClick(M.updateDraftBtn)
        await this.waitAndClick(C.confirmBtn)
        await this.waitAndClick(M.confirmMblBtn)
    }

    async viewConfirmedMbl() {
        await this.waitAndClick(M.mblLink)
        const firstMblCard = this.page.locator(M.firstMblConfirmed)
        const mblNumber = firstMblCard.locator(M.confirmMblvalue)
        this.mblNo = (await mblNumber.innerText()).trim()
        console.log('Captured MBL Number:', this.mblNo)
        await this.waitAndClick(M.firstMblConfirmed)
        if (this.mblNo) {
            await this.isElementVisible(M.mblHeading(this.mblNo), M.mblNoErrorMsg)
            await this.waitAndClick(M.mblDetailsText(this.mblNo))
        }
    }
}

export default MBL