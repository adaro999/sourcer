import diceProfile from './Dice.json';
import cabProfile from './CareerBuilder.json';
import indeedProfile from './Indeed.json';
import jtProfile from './JobTarget.json';
import pdlProfile from './PDL.json';
import rliProfile from './RLI.json';
import fullSearch from '../search/search.json';

const searchResults = {
  ...fullSearch,
  card: [diceProfile, cabProfile, indeedProfile, jtProfile, pdlProfile, rliProfile, ...fullSearch.card],
};

export { searchResults };
