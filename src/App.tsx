import React, { Component } from 'react';
import './App.css';
import FilterContainer from './container/Filter/FilterContainer';
import ContentContainer from './container/Content/ContentContainer';
import Loader from 'react-loader';
import { Character, getAllCharacters } from './lib/api';
import { uniq, map } from 'lodash';
import { AllOption } from './component/FilterMultiSelect';

type AppState = {
  allCharacters: Character[],
  isLoading: boolean,
  results: Character[],
  resultToggler: boolean,
};

enum filterType {
  species = 1,
  gender = 2,
  origin = 3
}

export default class App extends Component<{}, AppState> {
  state: AppState = {
    isLoading: true,
    results: [],
    allCharacters: [],
    resultToggler: false
  };

  selectedSpecies: string[] = [];
  selectedOrigin: string[] = [];
  selectedGender: string[] = [];

  componentDidMount() {
    getAllCharacters()
      .then(({ data }) => {
        const pagesLeftToLoad = data.info.pages;
        const results: any[] = data.results;
        if (pagesLeftToLoad > 1) {
          const arr = [];
          for (let i = 2; i < pagesLeftToLoad + 1; i++) {
            arr.push(getAllCharacters(i));
          }
          Promise.all(arr).then((res: any[]) => {
            res.forEach(el => {
              results.push(...el.data.results);
            });
            this.setState({ results, allCharacters: results, isLoading: false });
          });
        } else {
          this.setState({ results, allCharacters: results, isLoading: false });
        }
      })
      .catch(() => this.setState({ results: [], isLoading: false }));
  }

  getDistinct = (list: string[]) => uniq(list).sort();

  getDistinctSpecies = (characters: Character[]) => {
    return this.getDistinct(map(characters, 'species'));
  }
  getDistinctGender = (characters: Character[]) => {
    return this.getDistinct(map(characters, 'gender'));
  }
  getDistinctOrigin = (characters: Character[]) => {
    return this.getDistinct(map(characters, 'origin.name'));
  }

  handleSpeciesCallback = (list: string[]) => this.filterCharacters(list, filterType.species)

  handleGenderCallback = (list: string[]) => this.filterCharacters(list, filterType.gender)

  handleOriginCallback = (list: string[]) => this.filterCharacters(list, filterType.origin);

  filterCharacters = (list: string[], type: filterType) => {
    let tempResult: Character[] = [];
    switch (type) {
      case filterType.gender:
        this.selectedGender = list.indexOf(AllOption) > -1 ? [] : list;
        break;
      case filterType.species:
        this.selectedSpecies = list.indexOf(AllOption) > -1 ? [] : list;
        break;
      case filterType.origin:
        this.selectedOrigin = list.indexOf(AllOption) > -1 ? [] : list;
        break;

      default:
        break;
    }
    if (!this.selectedGender.length && !this.selectedSpecies.length && !this.selectedOrigin.length) {
      this.setState({ results: this.state.allCharacters });
      return;
    }
    if (this.selectedGender.length) {
      tempResult.push(...this.state.allCharacters.filter(el => this.selectedGender.indexOf(el.gender) > -1));
    }

    if (this.selectedSpecies.length && tempResult.length) {
      tempResult = tempResult.filter(el => this.selectedSpecies.indexOf(el.species) > -1);
    } else if (this.selectedSpecies.length && !tempResult.length) {
      tempResult.push(...this.state.allCharacters.filter(el => this.selectedSpecies.indexOf(el.species) > -1));
    }

    if (this.selectedOrigin.length && tempResult.length) {
      tempResult = tempResult.filter(el => this.selectedOrigin.indexOf(el.origin.name) > -1);
    } else if (this.selectedOrigin.length && !tempResult.length) {
      tempResult.push(...this.state.allCharacters.filter(el => this.selectedOrigin.indexOf(el.origin.name) > -1));
    }

    this.setState({ results: tempResult, resultToggler: !this.state.resultToggler });
  }

  render() {
    const { isLoading, results, allCharacters } = this.state;
    return (
      <Loader loaded={!isLoading}>
        <div className='row'>
          <div className='col-md-3 col-sm-12'>
            <FilterContainer
              species={this.getDistinctSpecies(allCharacters)}
              speciesCallback={this.handleSpeciesCallback}
              gender={this.getDistinctGender(allCharacters)}
              genderCallback={this.handleGenderCallback}
              origin={this.getDistinctOrigin(allCharacters)}
              originCallback={this.handleOriginCallback}
            />
          </div>

          <div className='col-md-9 col-sm-12'>
            <ContentContainer key={this.state.resultToggler.toString()}
              characters={results}
              selectedGender={this.selectedGender}
              selectedOrigin={this.selectedOrigin}
              selectedSpecies={this.selectedSpecies}
            />
          </div>
        </div>
      </Loader>
    );
  }
}
