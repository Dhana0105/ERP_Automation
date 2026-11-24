import test from '../fixtures/fixture.js'

  test.describe('@ERP: MBL and HBL Management', () => {
    test('@ERP_Flow: Create MBL, confirm, create HBL, confirm and attach to MBL', async ({ erp }) => {
      test.setTimeout(180000)

      await test.step('Login', async () => {
        await erp.login()
      })

      await test.step('Create MBL draft', async () => {
        await erp.createMblDraft()
      })

      await test.step('Open first draft MBL and add cost charges', async () => {
        await erp.openDraftMbl()
        await erp.addInitialCostCharges()
      })

      
      await test.step('Create HBL', async () => {
        await erp.createHbl()
      })

      await test.step('Add revenue charges, save draft and confirm HBL', async () => {
        await erp.addRevenueChargesAndConfirm()
      })

      await test.step('View first confirmed MBL', async () => {
        await erp.viewConfirmedMbl()
      })

      await test.step('Attach first confirmed HBL to MBL', async () => {
        await erp.attachHblToMbl()
      })
      })
  })