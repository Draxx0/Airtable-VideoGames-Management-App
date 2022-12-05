import baseAirtable from "./base";

export default function ReadAirtable(setData, sheet) {
  baseAirtable(sheet)
    .select({
      view: "Grid view",
    })
    .eachPage(
      function page(records) {
        const recordsData = records.map((record) => ({
          id: record.id,
          field: record.fields,
        }));
        setData(recordsData);
      },
      function done(err) {
        if (err) {
          console.error(err);
          return;
        }
      }
    );
}
