export const serializeWifi = ({ ssid, encryption, password, hidden }) =>
  `WIFI:S:${ssid};T:${encryption};P:${password};H:${hidden};`;

export const serializeVCard = ({
  firstname,
  lastname,
  org,
  title,
  tel,
  url,
  email,
}) => {
  let name = lastname ? `N:${lastname};${firstname}\n` : `FN:${firstname}\n`;
  org = org ? `ORG: ${org}\n` : "";
  title = title ? `TITLE: ${title}\n` : "";
  tel = tel ? `TEL: ${tel}\n` : "";
  url = url ? `URL: ${url}\n` : "";
  email = email ? `EMAIL: ${email}\n` : "";

  return (
    "BEGIN:VCARD\n" + name + org + title + tel + url + email + "END:VCARD;"
  );
};

export const serializePhone = ({ tel }) => `tel:${tel}`;

export const serializeLink = ({ link }) => {
  let result = "";
  let match = link.match(/https?:\/\//i);
  if (!(match && !match.index)) {
    result = "https://";
  }
  return result + link;
};

let serializers = {
    wifi: serializeWifi,
    vcard: serializeVCard,
    phone: serializePhone,
    link: serializeLink,
    text: i => i
};

export default function matchSerializerO(type) {
    return serializers[type.toLowerCase()]
}
