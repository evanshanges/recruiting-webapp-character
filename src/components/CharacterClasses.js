import { CLASS_LIST } from "../consts";
import { useState } from "react";
import { checkRequirements } from "../utils/helpers";

const CharacterClasses = ({ attributes }) => {
  const [currClass, setCurrClass] = useState()

  return (
    <>
      <div>
        <h4 style={{marginBottom: 0}}>Classes</h4>
        {Object.keys(CLASS_LIST).map((className) => (
          <div key={className}>   
            <span 
              onClick={() => setCurrClass(className)}
              style={{color: checkRequirements(attributes, CLASS_LIST[className]) && "red"}}
            >
              {className}
            </span>
          </div>
        ))}
      </div>

      {currClass && (
        <div>
          <h4 style={{marginBottom: 0}}>{currClass} Minimum Requirements</h4>
          {Object.keys(CLASS_LIST[currClass]).map((attribute) => (
            <div key={attribute}>
              <span>{attribute}: {CLASS_LIST[currClass][attribute]}</span>
            </div>
          ))}
          <br />
          <button onClick={() => setCurrClass()}>
            Cloase Requirement View
          </button>
        </div>
      )}
    </>
  );
}
export default CharacterClasses