import BasePage from './base.js'
import data from '../data/erp.json'
import { locators } from '../pageobject/erp_page.js'
const L = locators


class Erp extends BasePage {
    constructor(page) {
        super(page)
        this.mblNo = ''
        this.hblNo = ''
        this.consolUrl = ''
    }

    async pickCostHeading() {
        await this.waitAndClick(L.costHeadingCombobox)
        await this.waitAndClick(L.oceanFreight)
    }

    async mblcombobox() {
        await this.waitAndClick(L.consoleType)
        await this.waitAndClick(L.shipmentTypeOption(data.mbl.shipmentType))
        await this.waitAndClick(L.consoleMode )
        await this.waitAndClick(L.shipmentTypeOption(data.mbl.direction))
        await this.waitAndClick(L.consolOperator)
        await this.waitAndClick(L.shipmentTypeOption(data.mbl.masterType))
        await this.waitAndClick(L.carrier )
        await this.waitAndClick(L.shipmentTypeOption(data.mbl.carrier))
        await this.waitAndClick(L.polCombobox)
        await this.waitAndClick(L.shipmentTypeOption(data.mbl.poloption))
        await this.waitAndClick(L.podCombobox)
        await this.waitAndClick(L.shipmentTypeOption(data.mbl.podoption))
        await this.waitAndClick(L.containerType)
        await this.waitAndClick(L.shipmentTypeOption(data.mbl.containerType))
    }

    async hblcombobox(){
        await this.waitAndClick(L.shipmentMode)
        await this.waitAndClick(L.shipmentTypeOption(data.hbl.mode))
        await this.waitAndClick(L.incoterm)
        await this.waitAndClick(L.shipmentTypeOption(data.hbl.incoterm))
        await this.waitAndClick(L.movementType)
        await this.waitAndClick(L.shipmentTypeOption(data.hbl.service))
        await this.waitAndClick(L.freight)
        await this.waitAndClick(L.shipmentTypeOption(data.hbl.freightTerms))
        await this.waitAndClick(L.salesPerson)
        await this.waitAndClick(L.shipmentTypeOption(data.hbl.salesperson))
        await this.waitAndClick(L.polCombobox)
        await this.waitAndClick(L.shipmentTypeOption(data.mbl.poloption))
        await this.waitAndClick(L.podCombobox)
        await this.waitAndClick(L.shipmentTypeOption(data.mbl.podoption))
        await this.waitAndClick(L.packageType)
        await this.waitAndClick(L.shipmentTypeOption(data.hbl.packageType))
    }
    async hblfillfield(){
        await this.waitAndFill(L.commodityInput, data.hbl.commodity)
        await this.waitAndFill(L.hsCodeInput, data.hbl.hsCode)
        await this.waitAndFill(L.lengthInput,data.hbl.length)
        await this.waitAndFill(L.breadthInput,data.hbl.breadth)
        await this.waitAndFill(L.heightInput,data.hbl.height)
        await this.waitAndFill(L.weightPerPkgInput,data.hbl.weightPerPkg)
        await this.waitAndFill(L.noOfPkgsInput,data.hbl.noOfPkgs)
        await this.waitAndFill(L.cargoDetailsText,L.errorMessage)
    }

    async pickDate(d) {
        await this.waitAndClick(L.pickDateFirstBtn)
        for (let i = 0; i < d.nextMonth; i++) {
            await this.waitAndClick(L.nextMonthBtn)
        }
        await this.waitAndClick(d.nth ? L.dateCellNth(d.day, d.nth) : L.dateCell(d.day))
    }

    async readNumber(selector, pattern) {
        await this.isElementVisible(selector, L.errorMessage)
        const text = await this.page.locator(selector).first().textContent()
        const match = text.match(pattern)
        if (!match) throw new Error(`Could not parse number from toast text: ${text}`)
        return match[0]
    }

    // ---------- login ----------
    async login() {
        await this.open(data.urls.login)
        await this.waitAndFill(L.loginEmail, data.login.email)
        await this.waitAndFill(L.loginPassword, data.login.password)
        await this.waitAndClick(L.signInBtn)
        await this.page.waitForURL(url => !url.pathname.includes('login'))
    }
    // ---------- MBL: create draft ----------
    async createMblDraft() {
        await this.page.pause()
        await this.waitAndClick(L.mblLink)
        await this.page.waitForTimeout(2500)
        await this.waitAndClick(L.createMblBtn)     
        await this.mblcombobox()
        await this.waitAndFill(L.vesselInput, data.mbl.vessel)
        await this.waitAndFill(L.voyageInput, data.mbl.voyage)
       // ETD
        await this.pickDate(data.mbl.etd)
       // ETA
         await this.pickDate(data.mbl.eta)
        await this.waitAndClick(L.saveDraftBtn)
        await this.waitAndClick(L.cancelDraftBtn)
        const toast = this.page.locator('text=/Draft NSACS\\d+ saved/').first()
        await toast.waitFor({ state: 'visible', timeout: 15000 })
        const toastText = await toast.textContent()
        const mblMatch = toastText.match(/NSACS\d+/)
        if (mblMatch) this.mblNo = mblMatch[0]
        else this.mblNo = data.mblNo
    }

    // ---------- MBL: create draft ----------
    async createMblDraft() {
        await this.waitAndClick(L.mblLink)
        await this.waitAndClick(L.createMblBtn)      
        await this.mblcombobox()
        await this.waitAndFill(L.vesselInput, data.mbl.vessel)
        await this.waitAndFill(L.voyageInput, data.mbl.voyage)
        await this.pickDate(data.mbl.etd)
        await this.pickDate(data.mbl.eta)
        await this.waitAndClick(L.saveDraftBtn)
        // Capture MBL number from toast
        this.mblNo = await this.readNumber(L.draftSavedToast(''), /NSACS\d+/).catch(() => data.mblNo)
        if (!this.mblNo) this.mblNo = data.mblNo
        await this.waitAndClick(L.cancelBtn)
    }

    // ---------- MBL: open first draft ----------
    async openDraftMbl() {
        const tab = this.page.getByRole('tab', { name: 'Draft Shipments' })
        await tab.waitFor({ state: 'visible', timeout: 20000 })
        await tab.click()
        console.log('✅ Clicked Draft Shipments tab')

        // Wait for the list to actually render before clicking the first row.
        const firstDraft = this.page.locator('[role="tabpanel"]').locator('div.cursor-pointer, div[role="button"]').first()
        const draftCard = (await firstDraft.count()) > 0 ? firstDraft : this.page.locator(L.firstMblDraft).first()
        await draftCard.waitFor({ state: 'visible', timeout: 20000 })
        await draftCard.click()
        console.log('✅ Clicked first draft card')
        await this.page.waitForURL(/\/consol\//, { timeout: 20000 })
        this.consolUrl = await this.url()
        console.log(`✅ Now at ${this.consolUrl}`)
        await this.waitAndClick(L.editBtn)
        await this.isElementVisible(L.pageContainer, L.errorMessage)
    }
    // ---------- MBL: initial cost charges ----------   
    async addInitialCostCharges() {
        const c = data.initialCosts
        await this.waitAndClick(L.addCostChargeBtn)
        await this.pickCostHeading()
        await this.waitAndFill(L.spinbuttonSecond, c.first)
        await this.page.getByRole('combobox').filter({ hasText: 'Select Tax Mode' }).click()
        await this.page.getByRole('option', { name: data.gst }).click()
        await this.waitAndClick(L.updateDraftBtn)
        await this.waitAndClick(L.confirmBtn)
        await this.waitAndClick(L.confirmMblBtn)
    }

    // ---------- HBL: create ----------
    async createHbl() {
        await this.page.pause()
        await this.waitAndClick(L.hblLink)
        await this.waitAndClick(L.newHblBtn)
        await this.waitAndClick(L.lclTypeBtn)
        await this.hblcombobox()
        await this.waitAndClick(L.blTypeRadio)
         await this.waitAndClick(L.bookingPartyCombobox)
         await this.waitAndClick(L.suggestionsListbox)
         await this.waitAndClick(L.receivingPartyCombobox)
         await this.waitAndClick(L.suggestionsListbox)
         await this.hblfillfield()
        await this.isElementVisible(L.cargoDetailsText, L.errorMessage)
   }
    
    // ---------- HBL: revenue charges, save, confirm ----------
    async addRevenueChargesAndConfirm() {
        await this.page.pause()
        const r = data.revenue
        await this.waitAndClick(L.sellRevenueTab)
        await this.waitAndClick(L.addRevenueChargeBtn)//add only one revenue row
        await this.pickCostHeading()
        await this.waitAndClick(L.rateCellSpinbutton)
        await this.keyPress(L.rateCellSpinbutton, 'ArrowRight')
        await this.waitAndFill(L.rateCellSpinbutton, r.exchangeRate)
        await this.waitAndFill(L.spinbuttonFourth, r.first)
        await this.page.getByRole('combobox').filter({ hasText: 'Select Tax Mode' }).click()
        await this.page.getByRole('option', { name: data.gst }).click()
        await this.waitAndClick(L.saveDraftBtn)
        await this.waitAndClick(L.draftShipmentsTab)
        await this.waitAndClick(L.firstHblDraft)
        await this.waitAndClick(L.editBtn)
        await this.waitAndFill(L.hsCodeInput, data.hblhscode)
        await this.waitAndClick(L.hblupdateDraftBtn)
        await this.waitAndClick(L.editBtn)
        await this.waitAndClick(L.confirmBtn)
        await this.waitAndClick(L.confirmHblBtn)
        await this.page.getByRole('alertdialog').waitFor({ state: 'visible' })
    }

    async viewConfirmedMbl() {
        await this.waitAndClick(L.mblLink)

        const firstMblCard = this.page.locator(L.firstMblConfirmed)
        const mblNumber = firstMblCard.locator(L.confirmMblvalue)

        this.mblNo = (await mblNumber.innerText()).trim()
        console.log('Captured MBL Number:', this.mblNo)
        await this.waitAndClick(L.firstMblConfirmed)
        if (this.mblNo) {
            await this.isElementVisible(L.mblHeading(this.mblNo), L.errorMessage)
            await this.waitAndClick(L.mblDetailsText(this.mblNo))
        }
    }

    // ---------- HBL: attach first confirmed HBL to the MBL ----------
    async attachHblToMbl() {
        await this.waitAndClick(L.hblLink)
        await this.waitAndClick(L.firstHblConfirmed)
        await this.waitAndClick(L.editBtn)
        await this.waitAndClick(L.attachToMasterBtn)

        // Search using the dynamically captured MBL number
        await this.waitAndFill(L.mblSearchInput, this.mblNo)
        await this.waitAndClick(L.confirmlink(this.mblNo))

        await this.waitAndClick(L.updateShipmentBtn)

        console.log('Run Successfully....')
    }
    
}


export default Erp