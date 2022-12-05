import baseAirtable from "./base";
import formatDate from "./formatDate";
export default function UpdateAirtable(
  id,
  credentials,
  currentProductQuantity
) {
  const lastEmailSendTrigger = [
    {
      id: id,
      fields: {
        lastEmailSend: formatDate(new Date()),
        quantity: currentProductQuantity,
      },
    },
  ];

  const updateProduct = [
    {
      id: id,
      fields: {
        quantity: currentProductQuantity - credentials?.quantity,
      },
    },
  ];

  baseAirtable("PRODUITS").update(
    credentials ? updateProduct : lastEmailSendTrigger,
    function (err, records) {
      if (err) {
        console.error(err);
        return;
      }
      records.forEach(function (record) {
        console.log("Updated");
      });
    }
  );
}
