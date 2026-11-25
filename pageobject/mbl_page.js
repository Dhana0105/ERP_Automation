export const mblLocators = {
    // ---------- navigation ----------
    mblLink: "(//nav[contains(@class,'flex-1 space-y-1')]//a)[3]",
    pageContainer: '.p-6',
    
    // ---------- rows ----------
    firstMblConfirmed: '(//div[contains(@class,"relative overflow-hidden")])[1]',
    firstMblDraft: '(//div[contains(@class,"relative overflow-hidden")])[1]',
    cancelBtn: 'role=button[name="Cancel"]',

      // ---------- MBL form ----------
  consoleType: "//span[(text())='Select type']",
  consoleMode: "//span[(text())='Select mode']",
  consolOperator: "//span[(text())='AllMasters']",
  containerType: "//span[(text())='20GP']",
  createMblBtn: 'role=button[name="Create MBL"]',
  carrier: "//span[text()='Select carrier']",
  vesselInput: 'role=textbox[name="Enter vessel name"]',
  voyageInput: 'role=textbox[name="Voyage no."]',
  cancelDraftBtn: '//button[normalize-space(text())="Cancel"]',
  updateDraftBtn: '(//button[contains(@class,"inline-flex items-center")])[3]',
    //hblupdateshipmentBtn: "//button[normalize-space(text())='Update Shipment']",
  draftSavedToast: (no) => `text=Draft ${no} saved to`,
  //poloption: "//div[normalize-space(text())='INNSA - Nhava Sheva']",
  //podoption: "//div[normalize-space(text())='USNYC - New York']",
  addCostChargeBtn: '//button[text()=" Charge"]',
  spinbuttonSecond: 'role=spinbutton >> nth=1',
  //------------------ confirm -------------------
  
  confirmMblBtn: '//button[normalize-space(text())="Confirm MBL"]',
  confirmMblvalue: '(//span[contains(@class,"font-semibold text-foreground")])[1]',
    // ---------- MBL details
  mblHeading: (no) => `role=heading[name="${no}"]`,
  mblDetailsText: (no) => `text=${no}View MBL details · Confirmed Delete Clone EditDetailsInvoiceHistory`,
  mblErrorMsg:'Element is not visible in MBL',
  mblNoErrorMsg:'MBL number is not visible'
  
}