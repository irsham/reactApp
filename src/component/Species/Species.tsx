import React from 'react';
import FilterCheckbox from '../FilterMultiSelect';

type SpeciesProps = {
    species: string[],
    callback: (list: string[]) => any,
};

export default ({ species, callback }: SpeciesProps) => {
    return (
        <FilterCheckbox heading='Species' list={species} callback={callback} />
    );
}
