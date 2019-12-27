import React from 'react';
import { Form, FormGroup, Input } from 'reactstrap';

type ListProps = {
    heading: string,
    list: string[],
    callback: (list: string[]) => any,
};

export const AllOption = 'All';

export default ({ list, heading, callback }: ListProps) => {
    const handleChange = (e: any) => {
        const options = e.target.options;
        const value = [];
        for (let i = 0, l = options.length; i < l; i++) {
            if (options[i].selected) {
                value.push(options[i].value);
            }
        }
        const AllOptionIndex = value.indexOf(AllOption);
        if (AllOptionIndex > -1 && value.length === 2) {
            for (let i = 1, l = options.length; i < l; i++) {
                if (options[i].selected) {
                    options[i].selected = false;
                }
            }
            value.splice(1, 1);
        }
        if (AllOptionIndex > -1 && value.length > 1) {
            options[0].selected = false;
            value.splice(AllOptionIndex, 1);
        }
        callback(value);
    }
    return (
        <>
            <h3>{heading}</h3>
            <div>
                <Form>
                    <FormGroup >
                        <Input
                            type='select'
                            name={`selectMulti${heading}`}
                            id={`selectMulti${heading}`}
                            multiple
                            onChange={handleChange}
                        >
                            <option>{AllOption}</option>
                            {list.map(el => <option key={el}> {el}</ option>)}
                        </Input>
                    </FormGroup>
                </Form>
            </div>
            <hr />
        </>
    );
}
