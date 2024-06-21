export default {
    async createCustomApi() {
        const { GoogleSpreadsheet } = require('google-spreadsheet');
  
        // Initialize the sheet - doc ID is the long id in the sheets URL
        const doc = new GoogleSpreadsheet(process.env.SHEETS_ID);
        await doc.useServiceAccountAuth({
          client_email: process.env.CLIENT_EMAIL,
          private_key: process.env.SHEETS_PRIVATE_KEY,
        });
  
        await doc.loadInfo(); // loads document properties and worksheets
        const sheet = doc.sheetsById[0]
  
        // make row
        await sheet.addRow({ username: 'test', mapname: 'pain', code: '{appl,am}' });;
      },
      async postApi() {
        const { GoogleSpreadsheet } = require('google-spreadsheet');
  
        const doc = new GoogleSpreadsheet(process.env.SHEETS_ID);
        await doc.useServiceAccountAuth({
          client_email: process.env.CLIENT_EMAIL,
          private_key: process.env.SHEETS_PRIVATE_KEY,
        });
  
        await doc.loadInfo();
        const sheet = doc.sheetsById[0]
  
        const rows = await sheet.getRows(); 
        for(let i = 0; i < rows.length; i++) {
          const row = rows[i]
          if(row.username == 'test') {
            if(row.mapname == 'pain') {
              console.log(row.code)
              return row.code
            }
          }
        }
  
      }
}