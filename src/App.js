import { useEffect } from 'react';
import { useImmer } from "use-immer";
import { produce } from 'immer';

import Character from './components/Character';
import { ATTRIBUTE_LIST, SKILL_LIST, API_URL } from './consts.js';

import './App.css';

function App() {
  const [characterList, updateCharacterList] = useImmer([]);

  useEffect(()=>{
    if (characterList.length === 0) {
      fetch(API_URL)
        .then((response) => response.json())
        .then((response) => {
          updateCharacterList(draft => 
            draft = response.body
          );
        })
        .catch(() => {
          alert('There was an error fetching characters from DB.');
        });
    }
  }, [])

  const addNewCharacter = () => {
    const newCharacter = {
      attributes: ATTRIBUTE_LIST.map(name => ({
        name,
        value: 0
      })),
      skills: SKILL_LIST.map(skill => ({
        ...skill,
        value: 0
      }))
    }

    updateCharacterList(draft => {
      draft.push(newCharacter)
    });
  }

  /**
   * Updates the specific trait of the character
   * @param  {Number} characterIndex the index of the character being updated
   * @param  {String} traitName the name of the trait eg:  "attributes" || "skills"
   * @param  {String} fieldName the field name of the trait being updated eg: "Strength"
   * @param  {Number} newVFieldValue the new value of the field being updated
  */
  const updateCharacter = (characterIndex, traitName, fieldName, newVFieldValue) => {
    //characterList[characterIndex][traitName] will return the list of attributes or skills
    const updatedTrait = produce(characterList[characterIndex][traitName], (draftTraits) => {
      const traitIndex = draftTraits.findIndex(trait => trait.name === fieldName)
      
      draftTraits[traitIndex].value = newVFieldValue
    })

    updateCharacterList(draft => {
      draft[characterIndex][traitName] = updatedTrait
    });
  }

  let debounceTimer;
  const saveAllCharacters = () => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(characterList)
      })
      .then(() => {
        if(characterList.length == 0){
          alert('All Characters were saved successfully!');
        }
        alert('All Characters were reset successfully!');
      })
      .catch(() => {
        alert('There was an error when saving characters :(');
      });
    }, 500);
  }

  const resetAllCharacters = () => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify([])
      })
      .then(() => {
        updateCharacterList(draft => 
          draft = []
        );
        alert('All Characters were reset successfully!');
      })
      .catch(() => {
        alert('There was an error when resetting characters :(');
      });
    }, 500)
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <h1>React Coding Exercise - Evan Shang</h1>
      </header>
      <section className="App-section">
      <div style={{ margin: '40px 0px 40px 0px' }}>
        <button onClick={addNewCharacter}>
          Add New Character
        </button>
        
        {characterList.length > 0 && (
          <>
            <button onClick={saveAllCharacters} style={{ marginLeft: 20, marginRight: 20 }}>
              Save All Characters
            </button>
            <button onClick={resetAllCharacters}>
              Reset All Characters
            </button>
          </>
        )}
      </div>
      {characterList.length > 0 && characterList.map((character, index) => (
        <Character
          key={index}
          index={index}
          attributes={character.attributes}
          updateCharacter={(traitName, fieldName, newFieldValue) => updateCharacter(index, traitName, fieldName, newFieldValue)}
          skills={character.skills}
        />
      ))}
      </section>
    </div>
  );
}

export default App;
