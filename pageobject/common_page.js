export const commonLocators = {
  shipmentTypeOption: (name) => `role=option[name="${name}"]`, 
  editBtn: 'role=button[name="Edit"]',
  option: (name) => `role=option[name="${name}"]`,
  polCombobox: "//button[contains(.,'Search POL...')]", 
  podCombobox: "//span[text()='Search POD...']",
  pickDateFirstBtn: 'role=button[name="Pick a date"] >> nth=0',
  nextMonthBtn: 'role=button[name="Go to next month"]',
  dateCell: (day) => `role=gridcell[name="${day}"]`,
  dateCellNth: (day, n) => `role=gridcell[name="${day}"] >> nth=${n}`,
  costHeadingCombobox: '//span[text()="Cost Heading"]',
  oceanFreight: '//span[text()="Ocean Freight"]',
  confirmBtn: 'role=button[name="Confirm"]',
  saveDraftBtn: 'role=button[name="Save Draft"]',
  errorMessage: 'Expected element was not visible on the ERP page' 

}