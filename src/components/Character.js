import Attributes from "./Attributes";
import CharacterClasses from "./CharacterClasses";
import SkillCheck from "./SkillCheck";
import Skills from "./Skills";

const Character = ({ index, attributes, skills, updateCharacter }) => {
  return (
    <div style={{padding: '40px 40px 40px 40px', borderStyle: 'solid', margin: '40px 80px 40px 80px'}}>
      <h1>Character #{index + 1}</h1>
      <SkillCheck 
        attributes={attributes}
        skills={skills}
      />
      <div style={{display: 'flex', justifyContent: 'space-evenly'}}>
        <Attributes 
          attributes={attributes} 
          updateCharacter={updateCharacter}
        />
        <CharacterClasses 
          attributes={attributes}
        />
        <Skills
          attributes={attributes}
          skills={skills}
          updateCharacter={updateCharacter}
        />
      </div>
    </div>
  );
}

export default Character