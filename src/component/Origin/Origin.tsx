import React from 'react';
import FilterCheckbox from '../FilterMultiSelect';

type OriginProps = {
    origin: string[],
    callback: (list: string[]) => any,
};

export default ({ origin, callback }: OriginProps) => {
    return (
        <FilterCheckbox heading='Origin' list={origin} callback={callback}/>
    );
}
