import React, { useState } from 'react';
import './ContentContainer.css'
import CharacterList from '../../component/Character/CharacterList';
import { Character } from '../../lib/api';
import { InputGroup, InputGroupAddon, Button, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

type ContentProps = {
    characters: Character[],
    selectedSpecies: string[],
    selectedGender: string[],
    selectedOrigin: string[],
};

export default ({ characters, selectedGender, selectedOrigin, selectedSpecies }: ContentProps) => {
    const initList: Character[] = characters;
    let searchText = '';
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [userList, updateList] = useState(characters);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    const nameSearch = () => {
        if (searchText.trim()) {
            const findList = userList.filter(el => el.name.toLowerCase().includes(searchText.trim().toLowerCase()));
            if (findList.length) {
                updateList(findList);
            } else {
                updateList([]);
            }
        }
        else {
            updateList(initList);
        }
    }
    const sortListDesc = () => { updateList(userList.sort((a: Character, b: Character) => b.id - a.id)) }
    const sortListAsc = () => { updateList(userList.sort((a: Character, b: Character) => a.id - b.id)) }

    const onChangeSearchText = (str: string) => searchText = str;
    return (
        <>
            <div className='row filterSummary'>
                <div className='col-md-4 col-sm-12'>
                    <h2>Selected Filters</h2>
                </div>
                <div className='col-md-8 col-sm-12'>
                    <p><b>Species:</b> {selectedSpecies.length ? selectedSpecies.join(', ') : 'None'}</p>
                    <p><b>Gender:</b> {selectedGender.length ? selectedGender.join(', ') : 'None'}</p>
                    <p><b>Origin:</b> {selectedOrigin.length ? selectedOrigin.join(', ') : 'None'}</p>
                </div>

            </div>
            <div className='row'>
                <div className='col-md-6 col-sm-12'>
                    <InputGroup>
                        <Input type="text" onChange={(e: any) => onChangeSearchText(`${e.target.value}`)} />
                        <InputGroupAddon addonType='append'><Button onClick={nameSearch}>Search</Button></InputGroupAddon>
                    </InputGroup>
                </div>
                <div className='col-md-6 col-sm-12'>
                    <Dropdown isOpen={dropdownOpen} toggle={toggle} className='float-right sortDropdown'>
                        <DropdownToggle caret>
                            Sort by ID
                        </DropdownToggle>
                        <DropdownMenu>
                            <DropdownItem onClick={sortListAsc}>Ascending</DropdownItem>
                            <DropdownItem onClick={sortListDesc}>Descending</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </div>
            <div className='row'>
                {!userList.length
                    ? <p>No results found</p>
                    : <CharacterList characters={userList} />
                }
            </div>
        </>);
};
