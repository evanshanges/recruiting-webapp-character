import { getModifier } from '../utils/helpers'

const Attributes = ({ attributes, updateCharacter }) => {
  const totalPoints = () => attributes.reduce((total, attribute) => total + attribute.value, 0)

  return (
    <div>
      <h4 style={{marginBottom: 0}}>Attributes</h4>
      <h5 style={{marginTop: 0}}>Points Remaining: {70 - totalPoints()}</h5>
      {attributes.map(({ name, value }) => (
        <div key={name}>   
            <span>{name}: {value}</span>
            <span style={{ marginLeft: 20, marginRight: 20 }}>(Modifier : {getModifier(value)})</span>
            <button
              onClick={() => updateCharacter("attributes", name, --value)}
              style={{ marginRight: 2 }}
            >
              -
            </button>
            <button
                onClick={() => { 
                  totalPoints() < 70 ? updateCharacter("attributes", name, ++value)
                  : alert("No more available attribute points!")
                }}
            >
              +
            </button>
        </div>
      ))}
    </div>
  )
}

export default Attributes