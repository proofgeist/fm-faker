import generateData from "../../../utils/generateData";

export default async function fieldClassifier(Field) {
  Field.schema = getType(Field.datatype);
  byName(Field);
  try {
    Field.sample = await generateData(Field.schema);
  } catch (e) {
    Field.sample = "invalid schema";
  }
}

function getType(datatype) {
  switch (datatype) {
    case "Text":
      return { type: "string" };
    case "Number":
      return { type: "integer", minimum: 0 };
    case "Date":
      return { type: "string" };
    case "Timestamp":
      return { type: "string" };
    case "Binary":
      return { type: "string" };
    default:
      return "unknown";
  }
}

function byName(Field) {
  const fieldName = Field.name.toLowerCase();
  const matchers = Object.keys(NameMatches);

  matchers.forEach(matcher => {
    let matched = true;
    if (matcher.includes("|")) {
      const split = matcher.split("|");
      split.forEach(matcher => {
        if (!fieldName.includes(matcher)) {
          matched = false;
        }
      });
    } else {
      matched = fieldName.includes(matcher);
    }

    if (matched) {
      const obj = NameMatches[matcher];
      Field.schema = { ...Field.schema, ...obj };
      return;
    }
  });
}

const NameMatches = {
  email: { chance: "email" },
  city: { faker: "address.city" },
  state: { faker: "address.stateAbbr" },
  street: { faker: "address.streetAddress" },
  zip: { faker: "address.zipCode" },
  user: { faker: "internet.userName" },
  phone: { chance: "phone" },
  url: { chance: "internet.url" },
  website: { chance: "internet.url" },
  password: { faker: "internet.password" },
  company: { faker: "company.companyName" },
  "name|first": { faker: "name.firstName" },
  "name|last": { faker: "name.lastName" },
  title: { faker: "name.jobTitle" },
  notes: { faker: "lorem.sentences" },
  photo: { faker: "image.image" }
};