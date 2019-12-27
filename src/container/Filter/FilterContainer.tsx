import React from 'react';
import Species from '../../component/Species/Species';
import Gender from '../../component/Gender/Gender';
import Origin from '../../component/Origin/Origin';
import './FilterContainer.css'

type FilterContainerProps = {
    species: string[],
    speciesCallback: (list: string[]) => any,
    gender: string[],
    genderCallback: (list: string[]) => any,
    origin: string[],
    originCallback: (list: string[]) => any,
};

export default ({ species, gender, origin, genderCallback, originCallback, speciesCallback }: FilterContainerProps) => {
    return (
        <div className='container'>
            <h1> Filters</h1> 
            <hr />
            {species.length && <Species species={species} callback={speciesCallback} />}
            {gender.length && <Gender gender={gender} callback={genderCallback} />}
            {origin.length && <Origin origin={origin} callback={originCallback} />}
        </div>
    );
}
