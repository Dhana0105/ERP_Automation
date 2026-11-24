const test = require('../fixtures/fixture');

test.describe('@Schedule: Schedule Management', () => {

  test.beforeEach(async ({ loginPage }) => {
    await loginPage.openLoginPage();
  })

  test('@Create_Schedule: Create a new schedule', async ({ schedule }) => {
    await test.step('Login as user and create schedule', async () => {
      await schedule.loginAs('user');
      await schedule.createSchedule();
    })
  });

  test('@Add_Rate: Add rate to schedule', async ({ schedule }) => {
    await test.step('Login as user, create schedule and add rate', async () => {
      await schedule.loginAs('user');
      await schedule.createSchedule();
      await schedule.addRate();
    })
  });

  test('@Approve_Rate: Approve rate as admin', async ({ schedule }) => {
    await test.step('Login as admin and approve the rate', async () => {
      await schedule.loginAs('admin');
      await schedule.approveRate();
    })
  });

  test('@Book_Own_HBL: Book shipment with own HBL', async ({ schedule }) => {
    await test.step('Login as user and book own HB/L', async () => {
      await schedule.loginAs('user');
      await schedule.bookOwnHbl();
    })
  });

  test('@Book_Direct_MBL_BLR_NY: Book direct master BL from BLR to NY', async ({ schedule }) => {
    await test.step('Login as user and book direct master B/L BLR to NY', async () => {
      await schedule.loginAs('user');
      await schedule.bookDirectMasterBlrToNy();
    })
  });

  test('@View_Booking: View booking details', async ({ schedule }) => {
    await test.step('Login as user and view booking details', async () => {
      await schedule.loginAs('user');
      await schedule.viewBookingDetails('AMBQA-04-26-0666');
    })
  });

  test('@Book_Direct_MBL_BLR_CHI: Book direct master BL from BLR to CHI', async ({ schedule }) => {
    await test.step('Login as user and book direct master B/L BLR to CHI', async () => {
      await schedule.loginAs('user');
      await schedule.bookDirectMasterBlrToChi();
    })
  });

  test('@Book_Direct_MBL_NHA_CHI: Book direct master BL from NHA to CHI', async ({ schedule }) => {
    await test.step('Login as user and book direct master B/L NHA to CHI', async () => {
      await schedule.loginAs('user');
      await schedule.bookDirectMasterNhaToChi();
    })
  });

  test('@Verify_ERP: Verify shipment in ERP', async ({ schedule }) => {
    await test.step('Login to ERP and verify shipment details', async () => {
      await schedule.loginAs('erp');
      await schedule.verifyInErp();
    })
  });

})