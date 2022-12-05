import base from "./base";
import formatDate from "./formatDate";

export default function CreateAirtable(sheet, credentials, currentProduct) {
  const newProduct = [
    {
      fields: {
        sku: Math.random().toString(36).substring(2, 15),
        names: credentials.names,
        price: +credentials.price,
        quantity: +credentials.quantity,
        description: credentials.description,
        photo: credentials.photo,
        type: [credentials.type],
        status: "en stock",
      },
    },
  ];

  const newOrder = [
    {
      fields: {
        email: credentials.email,
        sku: Math.random().toString(36).substring(7),
        numberproducts: parseFloat(credentials.quantity),
        total: credentials.totalPrice,
        status: "confirmé",
        date: formatDate(new Date()),
        name: currentProduct?.field.names,
      },
    },
  ];

  base(sheet).create(
    sheet === "PRODUITS" ? newProduct : newOrder,
    function (err, datas) {
      if (err) {
        console.error(err);
        return;
      }
      datas.forEach(function (record) {
        console.log(record.getId());
      });
    }
  );
}
