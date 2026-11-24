// import { expect } from '@playwright/test'
// import BasePage from './base.js'
// import {
//   loginTypeLabel, loginEmailInput, loginPasswordInput, signInBtn, logoutSvg,
//   scheduleLink, addScheduleBtn, polLabel, podLabel, containerLabel,
//   vesselInput, voyageInput, serviceNameInput, chooseDateBtn,
//   originCfsNameLabel, originCfsClosingtimeInput, destinationCfsNameLabel,
//   chooseTimeTextbox, okBtn, addScheduleForPolInlandBtn, addScheduleForPodInlandBtn,
//   inlandPolMenu, inlandPodMenu, applyBtn, closeBtn, saveScheduleBtn, yesBtn,
//   editScheduleRow, rateListitem, rateLink, addRateBtn,
//   rateOcfsInput, rateOdocInput, rateOgbeCbmInput, rateMrOcfsInput, rateMrOdocInput,
//   rateFInput, rateFgbeCbmInput, rateMrfInput, rateRddcInput, rateDcfsInput,
//   rateDdoInput, rateDgbeCbmInput, rateMrDcfsInput, rateMrDdoInput, rateMrDcfsDdoInput,
//   rateDlfInput, rateOrInput, rateOcommrInput, calculateRateBtn, viewIlPredictedPriceBtn,
//   destinationIlpBtn, confirmBtn,
//   erpEmailInput, erpPasswordInput, erpSignInBtn, erpMblLink,
//   erpBuyCostTab, erpSellRevenueTab,
//   dashboardLink, selectOriginCombobox, selectDestinationCombobox, viewServicesBtn,
//   ownHblBtn, directMasterBlBtn, prepaidBtn, collectBtn, checkboxDemo, ddcCheckbox,
//   continueToBookBtn, packageTypeLabel, cargoLengthInput, cargoBreadthInput,
//   cargoHeightInput, cargoRadiusInput, weightPerPackageTextbox, noOfPackagesTextbox,
//   commodityTextbox, hsnCodeTextbox, confirmCheckbox, continueBtn,
//   actualShipperNameTextbox, yesCheckbox, seaWaybillCheckbox, originalCheckbox,
//   uploadFileText, packagingFileInput, confirmBookingBtn, closeBtn2,
//   viewDetailsBtn, backBtn
// } from '../pageobject/schedule_page.js'
// import data from '../data/schedule_value.json'

// class Schedule extends BasePage {
//   constructor(page) {
//     super(page)
//   }

//   // The page-object values are plain text/labels (e.g. 'Sign In'), not CSS.
//   // BasePage.waitAndClick/waitAndFill treat them as CSS, so override here with the smart versions.
//   async waitAndClick(selector) { await this.smartLocator(selector, 'click').click() }
//   async waitAndFill(selector, text) { await this.smartLocator(selector, 'fill').fill(text) }

//   async openLoginPage() {
//     await this.open(data.qaUrl)
//   }

//   // ---------- LOGIN ----------
//   async loginAs(role) {
//     let email, password
//     if (role === 'admin') {
//       email = data.adminEmail; password = data.adminPassword
//     } else if (role === 'user') {
//       email = data.userEmail; password = data.userPassword
//     } else {
//       email = data.loginEmail; password = data.loginPassword
//     }
//     await this.waitAndSelectOption(loginTypeLabel, data.loginType)
//     await this.waitAndFill(loginEmailInput, email)
//     await this.waitAndFill(loginPasswordInput, password)
//     await this.waitAndClick(signInBtn)
//   }

//   async logout() {
//     await this.waitAndClick(logoutSvg) // NOTE: first <svg> on the page - give the logout icon a data-testid if possible
//   }

//   // ---------- SCHEDULE CREATION ----------
//   async createSchedule() {
//     await this.waitAndClick(scheduleLink)
//     await this.waitAndClick(addScheduleBtn)
//     await this.waitAndSelectOption(polLabel, data.pol)
//     await this.waitAndSelectOption(podLabel, data.pod)
//     await this.waitAndSelectOption(containerLabel, data.container)
//     await this.waitAndFill(vesselInput, data.vessel)
//     await this.waitAndFill(voyageInput, data.voyage)
//     await this.waitAndFill(serviceNameInput, data.serviceName)

//     // dates
//     const pickDate = async (index, day) => {
//       await this.page.getByRole('button', { name: chooseDateBtn }).nth(index).click()
//       await this.page.getByRole('gridcell', { name: day, exact: true }).click()
//     }
//     await pickDate(0, data.date1)
//     await pickDate(1, data.date2)
//     await pickDate(2, data.date3)
//     await pickDate(3, data.date4)
//     // last one: previous 4 buttons are renamed once a date is picked, so only one exact match remains
//     await this.page.getByRole('button', { name: chooseDateBtn, exact: true }).click()
//     await this.page.getByRole('gridcell', { name: data.date5, exact: true }).click()

//     await this.waitAndSelectOption(originCfsNameLabel, data.originCfsName)
//     await this.page.locator(originCfsClosingtimeInput).click()
//     await this.page.locator('div').filter({ hasText: 'Select time--:--' }).nth(1).click()
//     await this.waitAndClick(okBtn)

//     await this.waitAndSelectOption(destinationCfsNameLabel, data.destinationCfsName)
//     await this.page.getByRole('textbox', { name: chooseTimeTextbox, exact: true }).click()
//     await this.page.locator('div').filter({ hasText: 'Select time--:--' }).nth(1).click()
//     await this.waitAndClick(okBtn)

//     // inland POL
//     // FIX: the old code clicked "Select All" twice (option, then text) which toggles it back OFF.
//     await this.waitAndClick(addScheduleForPolInlandBtn)
//     await this.page.getByRole('option', { name: data.inlandPolOption }).click()
//     await this.page.keyboard.press('Escape') // close the multi-select menu
//     await this.waitAndClick(applyBtn)
//     await this.waitAndClick(closeBtn)

//     // inland POD
//     // FIX: the old code clicked "Select All" (inlandPolOption) and THEN "chicago", which de-selects chicago.
//     await this.waitAndClick(addScheduleForPodInlandBtn)
//     await this.page.getByRole('option', { name: data.inlandPodOption }).click()
//     await this.page.keyboard.press('Escape')
//     await this.waitAndClick(applyBtn)
//     await this.waitAndClick(closeBtn)

//     await this.waitAndClick(saveScheduleBtn)
//     await this.waitAndClick(yesBtn)
//   }

//   // ---------- RATE MANAGEMENT ----------
//   async addRate() {
//     // TODO: these first steps come from codegen and are fragile (empty cell, unnamed img).
//     await this.page.getByRole('cell').filter({ hasText: /^$/ }).first().click()
//     await this.page.getByText('#' + data.scheduleNo).first().click()
//     await this.page.locator('div').filter({ hasText: editScheduleRow }).nth(1).press('ControlOrMeta+c')
//     await this.page.locator('div').filter({ hasText: editScheduleRow }).nth(4).click()
//     await this.page.getByRole('img').click()
//     await this.page.getByRole('listitem').filter({ hasText: rateListitem }).click()
//     await this.waitAndClick(rateLink)
//     await this.waitAndClick(addRateBtn)
//     await this.page.locator('.MuiInputBase-root').click()
//     await this.page.getByRole('option', { name: data.scheduleNo }).click()

//     await this.waitAndFill(rateOcfsInput, data.rateOcfs)
//     await this.waitAndFill(rateOdocInput, data.rateOdoc)
//     await this.waitAndFill(rateOgbeCbmInput, data.rateOgbeCbm)
//     await this.waitAndFill(rateMrOcfsInput, data.rateMrOcfs)
//     await this.waitAndFill(rateMrOdocInput, data.rateMrOdoc)
//     await this.waitAndFill(rateFInput, data.rateF)
//     await this.waitAndFill(rateFgbeCbmInput, data.rateFgbeCbm)
//     await this.waitAndFill(rateMrfInput, data.rateMrf)
//     await this.waitAndFill(rateRddcInput, data.rateRddc)
//     await this.waitAndFill(rateDcfsInput, data.rateDcfs)
//     await this.waitAndFill(rateDdoInput, data.rateDdo)
//     await this.waitAndFill(rateDgbeCbmInput, data.rateDgbeCbm)
//     await this.waitAndFill(rateMrDcfsInput, data.rateMrDcfs)
//     await this.waitAndFill(rateMrDdoInput, data.rateMrDdo)
//     await this.waitAndFill(rateMrDcfsDdoInput, data.rateMrDcfsDdo)

//     // TODO: unnamed textbox - will throw a strict-mode error if more than one textbox is on screen
//     await this.page.getByRole('textbox').fill(data.rateTextbox)

//     await this.waitAndFill(rateDlfInput, data.rateDlf)
//     await this.waitAndFill(rateOrInput, data.rateOr)
//     await this.waitAndFill(rateOcommrInput, data.rateOcommr)

//     await this.waitAndClick(calculateRateBtn)
//     await this.waitAndClick(viewIlPredictedPriceBtn)
//     // TODO: hashed CSS-module class (_header_1lfjj_5) changes on every front-end build
//     await this.page.locator('._header_1lfjj_5 > svg > path').click()
//     await this.waitAndClick(destinationIlpBtn)
//     await this.page.getByRole('img').click()
//     await this.waitAndClick(confirmBtn)
//     await this.waitAndClick(yesBtn)
//   }

//   // ---------- APPROVE RATE (ADMIN) ----------
//   // Test must already be logged in as admin (no logout/login inside the method any more)
//   async approveRate() {
//     await this.page.getByRole('listitem').filter({ hasText: rateListitem }).click()
//     await this.waitAndClick(rateLink)
//     await this.page.getByRole('cell', { name: 'Approve' }).click()
//     await expect(this.page.getByRole('heading', { name: 'Preview Rate' })).toBeVisible()
//     await this.page.getByRole('button', { name: 'Approve' }).click()
//     await this.waitAndClick(yesBtn)
//   }

//   // ---------- BOOKING — OWN HB/L (NH-A → NY) ----------
//   async bookOwnHbl() {
//     await this.page.getByRole('combobox', { name: selectOriginCombobox }).click()
//     await this.page.getByRole('combobox', { name: selectOriginCombobox }).fill(data.originNha)
//     await this.page.getByText(data.originNhaText).click()
//     await this.page.getByRole('combobox', { name: selectDestinationCombobox }).click()
//     await this.page.getByRole('combobox', { name: selectDestinationCombobox }).fill(data.destinationNewYork)
//     await this.page.getByText(data.destinationNewYorkText).click()
//     await this.waitAndClick(viewServicesBtn)
//     await this.clickText('Vessel' + data.vessel)
//     await this.waitAndClick(ownHblBtn)
//     await this.waitAndClick(prepaidBtn)

//     await this.page.getByRole('checkbox', { name: checkboxDemo }).first().check()
//     await this.page.getByRole('checkbox', { name: checkboxDemo }).nth(2).check()
//     await this.page.getByRole('checkbox', { name: checkboxDemo }).nth(4).check()
//     await this.page.locator(ddcCheckbox).first().check()
//     await this.waitAndClick(continueToBookBtn)

//     // cargo details 1 — pallet
//     await this.waitAndSelectOption(packageTypeLabel, data.packageTypePallet)
//     await this.waitAndFill(cargoLengthInput, data.cargoLength)
//     await this.waitAndFill(cargoBreadthInput, data.cargoBreadth)
//     await this.waitAndFill(cargoHeightInput, data.cargoHeight)
//     await this.waitAndFill(weightPerPackageTextbox, data.cargoWeight)
//     await this.waitAndFill(noOfPackagesTextbox, data.cargoNoOfPackages)
//     await this.waitAndFill(commodityTextbox, data.cargoCommodity)
//     await this.waitAndFill(hsnCodeTextbox, data.cargoHsnCode)
//     await this.page.getByRole('checkbox', { name: confirmCheckbox }).check()
//     await this.waitAndClick(continueBtn)

//     // shipper
//     await this.clickText('NameManoin')
//     await this.waitAndFill(actualShipperNameTextbox, data.actualShipperName)
//     await this.page.getByRole('checkbox', { name: yesCheckbox }).check()
//     await this.waitAndClick(continueBtn)

//     // parties
//     await this.clickText('Goodspriya@gamil.com+12345678Namepriyaus')
//     await this.waitAndClick(continueBtn)
//     await this.clickText('Trusttwin@gmail.com+17890173NametwinuS')
//     await this.waitAndClick(continueBtn)

//     // upload
//     await this.clickText(uploadFileText)
//     await this.page.locator(packagingFileInput).setInputFiles(data.fileDeliveryOrder)
//     await this.waitAndClick(continueBtn)

//     // verify charges (real assertions now)
//     await this.verifyTexts([
//       'Origin Handling$260$260$',
//       'Ocean Freight$565$565$',
//       'Destination Handling$420$420$',
//       'DDC $141$141$',
//       'Origin DOC Fee$15$',
//       'Release Fee$100$',
//       'DCFS Doc Charge $85$',
//       'ams$25$',
//       'Booking Fee$',
//       'Prepaid Total$',
//       'Grand Total (5.0 CBM)$'
//     ])

//     await this.waitAndClick(confirmBookingBtn)
//     await this.waitAndClick(yesBtn)
//     await this.waitAndClick(closeBtn2)
//   }

//   // ---------- BOOKING — DIRECT MBL (BLR → NY) ----------
//   async bookDirectMasterBlrToNy() {
//     await this.waitAndClick(dashboardLink)
//     await this.page.getByRole('combobox', { name: selectOriginCombobox }).click()
//     await this.page.getByRole('combobox', { name: selectOriginCombobox }).fill(data.originBan)
//     await this.page.getByRole('option', { name: 'inblr7 (bangalore port) via' }).click()
//     await this.page.getByRole('combobox', { name: selectDestinationCombobox }).click()
//     await this.page.getByRole('combobox', { name: selectDestinationCombobox }).fill('new')
//     await this.page.getByRole('option', { name: 'usnyc (new york)' }).click()
//     await this.waitAndClick(viewServicesBtn)
//     await this.clickText('Vessel' + data.vessel)
//     await this.waitAndClick(directMasterBlBtn)
//     await this.waitAndClick(collectBtn)

//     await this.page.getByRole('checkbox', { name: checkboxDemo }).first().check()
//     await this.page.getByRole('checkbox', { name: checkboxDemo }).nth(3).check()
//     await this.page.getByRole('checkbox', { name: checkboxDemo }).nth(5).check()

//     await this.page.locator('div').filter({ hasText: 'Shipment Detailsbangalore' }).nth(1).click()
//     await this.verifyTexts([
//       'Origin Handling$52$52$',
//       'Ocean Freight$113$113$',
//       'Destination Handling$84$84$',
//       'DDC$28.1$28.1$',
//       'Origin DOC Fee$15$',
//       'DO Fee$100$',
//       'DCFS Doc Charge$85$'
//     ])
//     await this.clickText('Charges BreakupInland')
//     await this.verifyTexts(['AMS$25$', 'Booking Fee$'])
//     await this.waitAndClick(continueToBookBtn)

//     // cargo details 2 — barrels
//     await this.clickText('Non Stackable')
//     await this.waitAndSelectOption(packageTypeLabel, data.packageTypeBarrels)
//     await this.waitAndFill(cargoRadiusInput, data.cargoRadius)
//     await this.waitAndFill(weightPerPackageTextbox, data.cargoWeight3)
//     await this.waitAndFill(noOfPackagesTextbox, data.cargoNoOfPackages3)
//     await this.waitAndFill(commodityTextbox, data.cargoCommodity3)
//     await this.waitAndFill(hsnCodeTextbox, data.cargoHsnCode3)
//     await this.page.getByRole('checkbox', { name: confirmCheckbox }).check()
//     await this.waitAndClick(continueBtn)

//     // shipper 2 — sea waybill
//     await this.clickText('SarapakaMano@allmasters.ai+918856358727NameManoin')
//     await this.waitAndFill(actualShipperNameTextbox, data.actualShipperName2)
//     await this.page.getByRole('checkbox', { name: seaWaybillCheckbox }).check()
//     await this.waitAndClick(continueBtn)

//     await this.clickText(uploadFileText)
//     await this.page.locator(packagingFileInput).setInputFiles(data.fileDeliveryOrder)
//     await this.waitAndClick(continueBtn)

//     // verify charges
//     await this.verifyTexts([
//       'Start$281Current$',
//       'Origin Haulage$',
//       'Origin Handling$520$520$',
//       'Origin DOC Fee$15$',
//       'ams$25$',
//       'Booking Fee$',
//       'Ocean Freight$1130$1130$',
//       'Destination Handling$840$840$',
//       'DDC$281$281$',
//       'DCFS Doc Charge $85$',
//       'DO Fee$100$',
//       'Collect Total$',
//       'Grand Total (10.0 CBM)$'
//     ])

//     await this.waitAndClick(confirmBookingBtn)
//     await this.waitAndClick(yesBtn)
//     await this.waitAndClick(closeBtn2)
//   }

//   // ---------- VIEW BOOKING DETAILS ----------
//   async viewBookingDetails(bookingId) {
//     await this.page.getByRole('heading', { name: bookingId }).click()
//     await this.page.getByRole('button', { name: viewDetailsBtn }).first().click()
//     await this.verifyTexts([
//       'Origin Haulage$',
//       'Origin Handling$520$360$',
//       'Origin DOC Fee$15$',
//       'ams$25$',
//       'Booking Fee$',
//       'Prepaid Total$',
//       'Ocean Freight$1130$1130$',
//       'Destination Handling$840$840$',
//       'DDC$281$281$',
//       'DCFS Doc Charge $85$',
//       'DO Fee$100$',
//       'Collect Total$',
//       'Grand Total (10.0 CBM)$'
//     ])
//     await this.waitAndClick(backBtn)
//   }

//   // ---------- BOOKING — DIRECT MBL (BLR → CHI) ----------
//   async bookDirectMasterBlrToChi() {
//     await this.waitAndClick(dashboardLink)
//     await this.page.getByRole('combobox', { name: selectOriginCombobox }).click()
//     await this.page.getByRole('combobox', { name: selectOriginCombobox }).fill(data.originBan)
//     await this.page.getByRole('option', { name: 'inblr7 (bangalore port) via' }).click()
//     await this.page.getByRole('combobox', { name: selectDestinationCombobox }).click()
//     await this.page.getByRole('combobox', { name: selectDestinationCombobox }).fill(data.destinationChicago)
//     await this.page.getByRole('option', { name: 'uschi (chicago) via - new york' }).click()
//     await this.waitAndClick(viewServicesBtn)
//     await this.clickText('Vessel' + data.vessel)
//     await this.waitAndClick(directMasterBlBtn)
//     await this.waitAndClick(prepaidBtn)

//     await this.page.getByRole('checkbox', { name: checkboxDemo }).nth(1).check()

//     await this.page.locator('div').filter({ hasText: 'Shipment Detailsbangalore' }).nth(1).click()
//     await this.verifyTexts([
//       'Origin Haulage$',
//       'Destination IPI$',
//       'Origin Handling$52$36$',
//       'Ocean Freight$113$113$',
//       'Destination Handling$73$73$',
//       'DDC$28.1$28.1$'
//     ])
//     await this.waitAndClick(continueToBookBtn)

//     // cargo details 3 — skids
//     await this.waitAndSelectOption(packageTypeLabel, data.packageTypeSkids)
//     await this.waitAndFill(cargoLengthInput, data.cargoLength)
//     await this.waitAndFill(cargoBreadthInput, data.cargoBreadth)
//     await this.waitAndFill(cargoHeightInput, data.cargoHeight)
//     await this.waitAndFill(weightPerPackageTextbox, data.cargoWeight2)
//     await this.waitAndFill(noOfPackagesTextbox, data.cargoNoOfPackages2)
//     await this.waitAndFill(commodityTextbox, data.cargoCommodity2)
//     await this.waitAndFill(hsnCodeTextbox, data.cargoHsnCode2)
//     await this.page.getByRole('checkbox', { name: confirmCheckbox }).check()
//     await this.waitAndClick(continueBtn)
//     await this.waitAndClick(backBtn)

//     // overview
//     await this.verifyTexts([
//       'Overviewof your bookingTotal',
//       'Total Volume 8 CBM',
//       'Total Gross weight 8000 kg',
//       '(OWS: 25% will be applicable)',
//       'Total No. of Packages',
//       'Chargeable Volume 8 CBM (',
//       '(Booking Fees : 50$)'
//     ])
//     await this.waitAndClick(continueBtn)

//     // shipper 3 — original BL
//     // FIX: removed the codegen noise (Alt-click + repeated check/uncheck toggling)
//     await this.clickText('SarapakaMano@allmasters.ai+918856358727NameManoin')
//     await this.waitAndFill(actualShipperNameTextbox, data.actualShipperName3)
//     await this.page.getByRole('checkbox', { name: originalCheckbox }).check()
//     await this.waitAndClick(continueBtn)

//     await this.clickText(uploadFileText)
//     await this.page.locator(packagingFileInput).setInputFiles(data.fileGst)
//     await this.waitAndClick(continueBtn)

//     // verify
//     await this.verifyTexts([
//       'Total Gross Weight8000Kg',
//       'Total Volume8.0 CBM',
//       'Origin Haulage$',
//       'Destination IPI$',
//       'Prepaid W/M ChargesStartCurrentPredicted',
//       'Origin Handling$ 0$ 0$',
//       'Ocean Freight$ 0$ 0$',
//       'Origin DOC Fee$15$',
//       'ams$25$',
//       'Booking Fee$',
//       'Prepaid Total$',
//       'DDC$225$225$',
//       'Destination Handling$1904$',
//       'OWS$476$',
//       'DCFS Doc Charge $85$',
//       'DO Fee$100$',
//       'CC Fee $',
//       'Collect Total$',
//       'Grand Total (8.0 CBM)$'
//     ])

//     await this.waitAndClick(confirmBookingBtn)
//     await this.waitAndClick(yesBtn)
//     await this.waitAndClick(closeBtn2)
//   }

//   // ---------- BOOKING — DIRECT MBL (NH-A → CHI) ----------
//   async bookDirectMasterNhaToChi() {
//     await this.page.goto(data.qaDashboardUrl)
//     await this.page.getByRole('combobox', { name: selectOriginCombobox }).click()
//     await this.page.getByRole('combobox', { name: selectOriginCombobox }).fill(data.originNha)
//     await this.page.getByRole('option', { name: 'innsa (nhava sheva)' }).click()
//     await this.page.getByRole('combobox', { name: selectDestinationCombobox }).click()
//     await this.page.getByRole('combobox', { name: selectDestinationCombobox }).fill(data.destinationChicago)
//     await this.page.getByRole('option', { name: 'uschi (chicago) via - new york' }).click()
//     await this.waitAndClick(viewServicesBtn)
//     await this.clickText('Vessel' + data.vessel)
//     await this.waitAndClick(directMasterBlBtn)
//     await this.waitAndClick(collectBtn)

//     await this.page.locator('div').filter({ hasText: 'Shipment Detailsnhava' }).nth(1).click()
//     await this.verifyText('Start$290Current$239Predicted$')
//     await this.page.getByRole('checkbox', { name: checkboxDemo }).nth(1).check()
//     await this.page.getByRole('checkbox', { name: checkboxDemo }).nth(3).check()
//     await this.page.getByRole('checkbox', { name: checkboxDemo }).nth(5).check()

//     await this.page.locator('div').filter({ hasText: 'Shipment Detailsnhava' }).nth(1).click()
//     await this.verifyTexts([
//       'Origin Handling$52$24$',
//       'Ocean Freight$113$113$',
//       'Destination Handling$73$50$',
//       'DDC$28.1$28.1$'
//     ])
//     await this.waitAndClick(continueToBookBtn)

//     // cargo details 4 — rolls
//     await this.clickText('Non Stackable')
//     await this.waitAndSelectOption(packageTypeLabel, data.packageTypeRolls)
//     await this.waitAndFill(cargoRadiusInput, data.cargoRadius)
//     await this.waitAndFill(weightPerPackageTextbox, data.cargoWeight4)
//     await this.waitAndFill(noOfPackagesTextbox, data.cargoNoOfPackages4)
//     await this.waitAndFill(commodityTextbox, data.cargoCommodity4)
//     await this.waitAndFill(hsnCodeTextbox, data.cargoHsnCode4)
//     await this.page.getByRole('checkbox', { name: confirmCheckbox }).check()
//     await this.waitAndClick(continueBtn)

//     // shipper 4 — sea waybill
//     await this.clickText('SarapakaMano@allmasters.ai+918856358727NameManoin')
//     await this.waitAndFill(actualShipperNameTextbox, data.actualShipperName4)
//     await this.page.getByRole('checkbox', { name: seaWaybillCheckbox }).check()
//     await this.waitAndClick(continueBtn)

//     await this.clickText(uploadFileText)
//     await this.page.locator(packagingFileInput).setInputFiles(data.fileGst)
//     await this.waitAndClick(continueBtn)

//     // verify
//     await this.verifyTexts([
//       'Total Gross Weight1400Kg',
//       'Total Volume12.7 CBM',
//       'Origin DOC Fee$15$',
//       'ams$25$',
//       'Booking Fee$',
//       'Prepaid Total$',
//       'Destination IPI$',
//       'Origin Handling$660$305$',
//       'Ocean Freight$1435$1435$',
//       'Destination Handling$927$635$',
//       'DDC$357$357$',
//       'DCFS Doc Charge $85$',
//       'DO Fee$100$',
//       'CC Fee $',
//       'Collect Total$',
//       'Grand Total (12.7 CBM)$'
//     ])

//     await this.waitAndClick(confirmBookingBtn)
//     await this.waitAndClick(yesBtn)
//     await this.waitAndClick(closeBtn2)
//   }

//   // ---------- ERP VERIFICATION ----------
//   // Logs in to the ERP site itself (the test must NOT call loginAs on the QA site first)
//   async verifyInErp() {
//     await this.page.goto(data.erpUrl)
//     await this.waitAndFill(erpEmailInput, data.erpEmail)
//     await this.waitAndFill(erpPasswordInput, data.erpPassword)
//     await this.waitAndClick(erpSignInBtn)
//     await this.waitAndClick(erpMblLink)
//     await this.page.getByRole('button', { name: data.erpMblName }).click()
//     await expect(this.page.getByRole('heading', { name: data.scheduleNo })).toBeVisible()
//     await this.page.getByRole('tab', { name: erpBuyCostTab }).click()
//     await this.page.getByRole('tab', { name: erpSellRevenueTab }).click()
//     await this.page.goto(data.erpConsolUrl)
//     await this.page.goto(data.erpShipmentUrl)
//     await this.page.getByRole('tab', { name: erpBuyCostTab }).click()
//     await expect(this.page.getByRole('tabpanel', { name: erpBuyCostTab })).toBeVisible()
//   }
// }

// export default Schedule