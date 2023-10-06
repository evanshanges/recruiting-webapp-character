import { getModifier, getAttributeValue } from "../utils/helpers";

const Skills = ({ attributes, skills, updateCharacter }) => {
  const totalPoints = () =>  {
    const availalbePoints = 10 + 4 * getModifier(getAttributeValue(attributes, "Intelligence"));
    return availalbePoints > 0 ? availalbePoints : 0;
  }

  const totalPointsSpent = () => skills.reduce((total, skill) => total + skill.value, 0);

  return (
    <div>
      <h4 style={{marginBottom: 0}}>Skills</h4>
      <h5 style={{marginTop: 0}}>Points Remaining: {totalPoints() - totalPointsSpent()}</h5>
      {skills.map(({ name, value, attributeModifier }) => {
        const attributeValue = getAttributeValue(attributes, attributeModifier);
        const modifierValue = getModifier(attributeValue)

        return (
          <div key={name}>   
            <span style={{ marginRight: 20 }}>{name}: {value}</span>
            <button
              onClick={() => updateCharacter("skills", name, --value)}
            >
              -
            </button>
            <button
              onClick={() => { 
                totalPointsSpent() < totalPoints() ? updateCharacter("skills", name, ++value)
                : alert("No more available skill points!")
              }}
            >
              +
            </button>
            <span style={{ marginLeft: 20, marginRight: 20 }}>(Modifier - {attributeModifier}): {modifierValue}</span>
            <span>Total: {modifierValue + value}</span>
          </div>
        )
      })}
    </div>
  );
}

export default Skills