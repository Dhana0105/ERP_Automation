export const locators = {
  // ---------- login ----------
  loginEmail: 'role=textbox[name="Email address"]',
  loginPassword: 'role=textbox[name="••••••••••"]',
  signInBtn: 'role=button[name="Sign In"]',

  shipmentTypeOption: (name) => `role=option[name="${name}"]`,


  // ---------- navigation ----------
  mblLink: "(//nav[contains(@class,'flex-1 space-y-1')]//a)[3]",
  hblLink: '//a[@title="HBL"]',
  draftShipmentsTab: '(//button[@role="tab"])[2]',
  shipmentBtn: (name) => `role=button[name="${name}"]`,
  editBtn: 'role=button[name="Edit"]',
  confirmedCellFirst: 'role=cell[name="Confirmed"] >> nth=0',
  pageContainer: '.p-6',
  htmlRoot: 'html',
  body: 'body',

  // ---------- rows ----------
  firstMblConfirmed: '(//div[contains(@class,"relative overflow-hidden")])[1]',
  firstMblDraft: '(//div[contains(@class,"relative overflow-hidden")])[1]',
  firstHblConfirmed: '(//td[contains(@class,"px-4 py-3")])[1]',
  firstHblDraft: '//*[@id="root"]/div[2]/div/main/div/div[3]/div[1]/table/tbody/tr[1]',

  // ---------- common form controls ----------
  option: (name) => `role=option[name="${name}"]`,
  listbox: 'role=listbox',
  suggestionsListbox: 'role=listbox[name="Suggestions"]',
  polCombobox: "//button[contains(.,'Search POL...')]",
  podCombobox: "//span[text()='Search POD...']",
  pickDateFirstBtn: 'role=button[name="Pick a date"] >> nth=0',
  nextMonthBtn: 'role=button[name="Go to next month"]',
  dateCell: (day) => `role=gridcell[name="${day}"]`,
  dateCellNth: (day, n) => `role=gridcell[name="${day}"] >> nth=${n}`,
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
  saveDraftBtn: 'role=button[name="Save Draft"]',
  cancelDraftBtn: '//button[normalize-space(text())="Cancel"]',
  updateDraftBtn: '(//button[contains(@class,"inline-flex items-center")])[3]',
  hblupdateDraftBtn: '//button[text()="Update Draft"]',
  hblupdateshipmentBtn: "//button[normalize-space(text())='Update Shipment']",
  draftSavedToast: (no) => `text=Draft ${no} saved to`,
  poloption: "//div[normalize-space(text())='INNSA - Nhava Sheva']",
  podoption: "//div[normalize-space(text())='USNYC - New York']",


  // ---------- charges (cost / revenue) ----------
  addCostChargeBtn: '//button[text()=" Charge"]',
  unitShipment: '//span[text()="Shipment"]',
  taxMode: "//span[text()='Select Tax Mode']",
  addRevenueChargeBtn: 'role=button[name="Add Revenue Charge"]',
  costHeadingCombobox: '//span[text()="Cost Heading"]',
  oceanFreight: '//span[text()="Ocean Freight"]',
  shipmentCombobox: '//span[text()="Shipment"]',
  CBM: '(//button[@data-state="closed"]//span)[2]',
  shipmentComboboxSecond: '[role="combobox"]:has-text("Shipment") >> nth=1',
  spinbuttonSecond: 'role=spinbutton >> nth=1',
  amountField: '(//input[@inputmode="decimal"])[2]',
  spinbuttonFourth: 'role=spinbutton >> nth=3',
  rateCellSpinbutton: 'role=cell[name="₹ 1"] >> role=spinbutton',
  tableAmount: (row) => `tr:nth-child(${row}) > td:nth-child(7) > .flex`,
  buyCostTabpanel: 'role=tabpanel[name="Buy / Cost (4)"]',
  sellRevenueTab: '//button[normalize-space(text())="Sell / Revenue"]',

  // ---------- confirm ----------
  confirmBtn: 'role=button[name="Confirm"]',
  confirmMblDialog: (no) => `role=alertdialog[name="Confirm MBL ${no}?"]`,
  confirmMblBtn: '//button[normalize-space(text())="Confirm MBL"]',
  mblConfirmedToast: (no) => `text=MBL ${no} confirmed`,
  confirmHblDialog: (no) => `role=alertdialog[name="Confirm HBL ${no}?"]`,
  confirmHblBtn: 'role=button[name="Confirm HBL"]',
  confirmlink: (no) => `(//div[contains(@class,"flex w-full")][contains(.,"${no}")])[1]`,
  confirmMblvalue: '(//span[contains(@class,"font-semibold text-foreground")])[1]fv',

  // ---------- HBL form ----------
  newHblBtn: 'role=button[name="New HBL"]',
  lclTypeBtn: '//p[normalize-space(text())="LCL – Less than Container"]',
  shipmentMode: "//span[text()='Sea Export']",
  incoterm: "//span[normalize-space(text())='Select incoterm']",
  movementType: "//span[text()='Select movement']",
  freight: "//span[text()='Select freight term']",
  salesPerson: "//span[text()='Select sales person']",
  packageType: "//span[text()='Cartons']",
  blTypeRadio: 'role=radio[name="Forwarder BL"]',
  bookingPartyCombobox: '[role="combobox"]:has-text("Search booking party...")',
  receivingPartyCombobox: '[role="combobox"]:has-text("Search receiving party...")',
  bookingPartyText: 'text=Booking Party *ClearHEMA',
  receivingPartyText: 'text=Receiving Party *ClearCONSOLIDATED SHIPPING SERVICES LLCAddressNotify Party (',
  commodityInput: '(//input[contains(@class,"flex w-full")])[2]',
  hsCodeInput: '(//input[contains(@class,"flex w-full")])[3]',
  lengthInput: 'input[name="lclCargo.0.length"]',
  breadthInput: 'input[name="lclCargo.0.breadth"]',
  heightInput: 'input[name="lclCargo.0.height"]',
  weightPerPkgInput: 'role=spinbutton[name="Wt/Pkg (KG) *"]',
  noOfPkgsInput: 'role=textbox[name="No. of Pkgs *"]',
  cargoDetailsText: 'text=Cargo DetailsMetricTotal Wt & VolPackage and cargo informationPackage',
  commercialDetailsText6: 'text=6. Commercial DetailsManage buy costs, sell revenue, and profit marginsTotal',
  commercialDetailsText1: 'text=1. Commercial DetailsManage buy costs, sell revenue, and profit marginsTotal',
  draftRowText: 'text=Draft >> nth=1',
  numberText: (no) => `text=${no}`,


  // ---------- MBL details
  mblHeading: (no) => `role=heading[name="${no}"]`,
  mblDetailsText: (no) => `text=${no}View MBL details · Confirmed Delete Clone EditDetailsInvoiceHistory`,
  attachToMasterBtn: 'role=button[name="Attach to Master BL"]',
  mblSearchInput: '[placeholder="Search MBL no., type, route..."]',
  updateShipmentBtn: 'role=button[name="Update Shipment"]',
  shipmentUpdatedToast: (no) => `text=Shipment ${no} updated`,

  errorMessage: 'Expected element was not visible on the ERP page'

  // errorMessage: should spot the exact place not as common method, apply this method for toast
}
