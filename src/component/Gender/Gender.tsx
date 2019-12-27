import React from 'react';
import FilterCheckbox from '../FilterMultiSelect';

type GenderProps = {
    gender: string[],
    callback: (list: string[]) => any,
};

export default ({ gender, callback }: GenderProps) => {
    return (
        <FilterCheckbox heading='Gender' list={gender} callback={callback} />
    );
}
