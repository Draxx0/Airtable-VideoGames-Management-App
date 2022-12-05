import baseAirtable from "./base";

export default function DeleteAirtable(id) {
  baseAirtable("COMMANDES").destroy([id], function (err) {
    if (err) {
      console.error(err);
      return;
    }
  });
}
