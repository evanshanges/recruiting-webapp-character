import { useEffect, useState } from "react";
import { SKILL_LIST } from "../consts";
import { getModifier, getAttributeValue } from "../utils/helpers";

const SkillCheck = ({ attributes, skills }) => {
  const [selectedSkill, setSelectedSkill] = useState(SKILL_LIST[0].name);
  const [difficulty, setDifficulty] = useState(0);
  const [rollValue, setRollValue] = useState();
  const [totalSkillValue, setTotalSkillValue] = useState();
  const [result, setResult] = useState()

  useEffect(() =>{
    setResult(null)
  }, [skills])

  const checkResult = () => {
    const randomValue = Math.floor(Math.random() * 20) + 1;
    setRollValue(randomValue);

    const characterSkill = skills.find((skill) => skill.name === selectedSkill);
    const skillValue = characterSkill.value;
    const attributeValue = getAttributeValue(attributes, characterSkill.attributeModifier);
    const modifierValue = getModifier(attributeValue);

    setTotalSkillValue(skillValue + modifierValue);
    setResult((skillValue + modifierValue + randomValue) >= difficulty);
  }

  return (
    <>
      <div>
        <h3>SkillCheck</h3>
        <span>
          <span>Skill: &nbsp;</span>
          <select onChange={(e) => setSelectedSkill(e.target.value)}>
            {SKILL_LIST.map((skill) => (
              <option key={skill.name}>{skill.name}</option>
            ))}
          </select>
          <span>&nbsp;DC:&nbsp;</span>
          <input
            type='number'
            size='10'
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          />
          <button onClick={checkResult}>Roll</button>
        </span>
      </div>
      {result !== null && (
        <div style={{marginTop: 20}}>
          <span>Skill: {selectedSkill}: {totalSkillValue}</span><br />
          <span>Dice Roll: {rollValue}</span><br />
          <span>DC Value: {difficulty}</span><br />
          <span>Result: <b>{result ? 'Success' : 'Failure' }</b></span>
        </div>
      )}
    </> 
  );
}

export default SkillCheck;