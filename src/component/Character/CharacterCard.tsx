import React from "react";
import './CharacterCard.css';
import { Character } from "../../lib/api";

type CharacterCardProps = {
  character: Character,
};


export default ({ character }: CharacterCardProps) => (
  <div className='card characterCard'>
    <img src={character.image} alt={character.name} />
    <div className='characterData'>
      <h3>{character.name}</h3>
      <p><b>Species</b><br />{character.species}</p>
      <p><b>Gender</b><br />{character.gender}</p>
      <p><b>Status</b><br />{character.status}</p>
      <p><b>From</b><br />{character.origin.name}</p>
      <p><b>Last Location</b><br />{character.location.name}</p>
    </div>
  </div>
);
