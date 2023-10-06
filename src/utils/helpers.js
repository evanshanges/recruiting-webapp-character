export function checkRequirements(attributes, minimumRequirements){
  return attributes.every(attribute => attribute.value >= minimumRequirements[attribute.name]);
}

export function getModifier(value){
  const modifier = (value - 10) / 2;
  return value % 2 === 0 ? modifier : modifier - 0.5;
}

export function getAttributeValue(attributes, attributeName){
  return attributes.find((attribute) => attribute.name === attributeName).value;
};