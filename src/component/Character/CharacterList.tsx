import React from 'react';
import './CharacterList.css';
import { Character } from '../../lib/api';
import CharacterCard from './CharacterCard';

type CharacterListProps = {
  characters: Character[],
};

export default ({ characters }: CharacterListProps) => (
  <>
    {characters.length && (
      <>
        {characters.map(character => (
          <CharacterCard character={character} key={character.id} />
        ))}
      </>
    )}
  </>
);
